import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"
import { useUserStoreHook } from "@/store/modules/user"
import { ElDescriptions, ElDescriptionsItem, ElMessage, ElMessageBox, ElNotification, ElScrollbar } from "element-plus"
import { get, merge } from "lodash-es"
import { getToken, setToken } from "./cache/cookies"
import { h } from "vue"

const extractErrorMessage = (error: any, fallback = "Request failed") => {
  return error?.response?.data?.message || error?.response?.data?.data?.message || error?.message || fallback
}

/** 创建请求实例 */
function createService() {
  // 创建一个 axios 实例命名为 service
  const service = axios.create()
  // 请求拦截
  service.interceptors.request.use(
    (config) => config,
    // 发送失败
    (error) => Promise.reject(error)
  )
  // api Response 攔截
  service.interceptors.response.use(
    (response) => {
      const token = response.headers.authorization
      if (token) {
        setToken(token.replace("Bearer ", ""))
      }
      // apiData 是 api 返回的數據
      const apiData = response.data
      // 二進制直接返回
      const responseType = response.request?.responseType
      if (responseType === "blob" || responseType === "arraybuffer") return apiData
      return apiData
    },
    (error) => {
      // status 是 HTTP 状态码

      console.error(error)
      const status = get(error, "response.status")
      switch (status) {
        case "ECONNABORTED": {
          ElNotification.error({
            title: "Timeout error",
            message: "This request is over 30s, please try again later.",
            duration: 0
          })
          throw new Error("Time out")
        }
        case 401:
          // Unauthorized
          // Token 过期时，直接退出登录并强制刷新页面（会重定向到登录页）
          useUserStoreHook().logout()
          location.reload()
          ElMessage.error(extractErrorMessage(error, "Unauthorized"))
          return Promise.reject(error)
        case 500: {
          const {
            type = "Unknown Type",
            title = "Unknown Title",
            message = extractErrorMessage(error, "Internal server error"),
            exception,
            timestamp
          } = error.response?.data?.data || {}
          showErrorNotification(type, title, message, timestamp, exception)
          console.error(exception)
          throw new Error(message)
        }
        default: {
          const { status, statusText } = error.response
          const { path } = error.response.data
          ElNotification.error({
            title: `${status} ${statusText}`,
            message: path,
            duration: 0
          })
          throw new Error(extractErrorMessage(error, path || "Request failed"))
        }
      }
    }
  )
  return service
}

function createSPService() {
  const service = axios.create()
  service.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  )
  service.interceptors.response.use(
    (response) => {
      const token = response.headers.authorization
      if (token) {
        setToken(token.replace("Bearer ", ""))
      }
      const apiData = response.data
      const responseType = response.request?.responseType
      if (responseType === "blob" || responseType === "arraybuffer") return apiData
      return apiData
    },
    (error) => {
      console.error(error)
      const status = get(error, "response.status")
      switch (status) {
        case "ECONNABORTED": {
          ElNotification.error({
            title: "Timeout error",
            message: "This request is over 30s, please try again later.",
            duration: 0
          })
          throw new Error("Time out")
        }
        case 400: {
          const { title = "Validation Error", message = extractErrorMessage(error, "Invalid request") } =
            error.response.data || {}
          throw new Error(JSON.stringify({ title: title, message: message }))
        }
        case 401:
          useUserStoreHook().logout()
          location.reload()
          ElMessage.error(extractErrorMessage(error, "Unauthorized"))
          return Promise.reject(error)
        case 500: {
          const {
            title = "Unknown Title",
            message = extractErrorMessage(error, "Internal server error"),
            exception
          } = error.response?.data?.data || {}
          console.error(exception)
          throw new Error(JSON.stringify({ title: title, message: message }))
        }
        default: {
          const { status, statusText } = error.response
          const { path } = error.response.data
          ElNotification.error({
            title: `${status} ${statusText}`,
            message: path,
            duration: 0
          })
          throw new Error(extractErrorMessage(error, path || "Request failed"))
        }
      }
    }
  )
  return service
}

/** 建立自定義請求方法 */
function createRequest(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const token = getToken()
    const defaultConfig = {
      headers: {
        // 攜帶 Token
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": location.origin
        // eslint-disable-next-line prettier/prettier
      },
      timeout: 30000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {}
    }
    // 將預設配置 defaultConfig 和傳入的自定義配置 config 合併成 mergeConfig
    const mergeConfig = merge(defaultConfig, config)
    return service(mergeConfig)
  }
}
const showErrorNotification = (type: string, title: string, message: any, timestamp: any, exception: any) => {
  const elNotice = ElNotification.error({
    title: `${type} - ${title}`,
    message: `${timestamp}:\n${message}`,
    duration: 0,
    onClick() {
      showErrorMessageBox(type, title, message, timestamp, exception)
      elNotice.close()
    }
  })
}
const showErrorMessageBox = (type: string, title: string, message: any, timestamp: any, exception: any) => {
  return ElMessageBox({
    customStyle: {
      width: "80vw",
      maxWidth: "none"
    },
    message: h(
      ElScrollbar,
      {
        height: "50vh"
      },
      {
        default: () =>
          h(
            ElDescriptions,
            { title: `${type} - ${title}`, column: 1, border: true },
            {
              default: () => [
                h(
                  ElDescriptionsItem,
                  { label: "Timestamp", labelAlign: "right" },
                  {
                    default: () => timestamp
                  }
                ),
                h(
                  ElDescriptionsItem,
                  { label: "Message", labelAlign: "right" },
                  {
                    default: () => message
                  }
                ),
                h(
                  ElDescriptionsItem,
                  { label: "Exception", labelAlign: "right" },
                  {
                    default: () => exception
                  }
                )
              ]
            }
          )
      }
    )
  })
}
/** 用於網路請求的實體 */
const service = createService()
const SPservice = createSPService()
/** 用於網路請求的方法 */
export const request = createRequest(service)
export const SPrequest = createRequest(SPservice)
