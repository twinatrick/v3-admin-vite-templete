import { Api, HttpClient } from "./generated/Api"
import axios, { AxiosInstance } from "axios"
import { getToken, setToken } from "../utils/cache/cookies"

const http = new HttpClient<AxiosInstance>()

// Inject our custom axios instance with interceptors (token handling, error handling, etc.)
const service = createService()
http.instance = service

function createService() {
  const service = axios.create()
  service.defaults.baseURL = import.meta.env.VITE_BASE_API
  service.defaults.headers.common["Content-Type"] = "application/json"
  service.defaults.headers.common["Access-Control-Allow-Origin"] = location.origin
  service.defaults.timeout = 30000

  service.interceptors.request.use(
    (config) => {
      const token = getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  service.interceptors.response.use(
    (response) => {
      const token = response.headers.authorization
      if (token) {
        setToken(token.replace("Bearer ", ""))
      }
      const apiData = response.data

      // 二進制直接返回
      const responseType = response.request?.responseType
      if (responseType === "blob" || responseType === "arraybuffer") return apiData

      // Wrap data into ApiResponse
      // Checking if it's already wrapped (in case backend changes later)
      if (apiData && typeof apiData === "object" && "code" in apiData && "data" in apiData) {
        return apiData
      }

      return {
        code: response.status,
        data: apiData,
        message: "Success",
        success: true
      }
    },
    (error) => Promise.reject(error.response)
  )
  return service
}

export const api = new Api<AxiosInstance>(http)
export const request = service
