import dayjs from "dayjs"
import { ElLoading, ElMessageBox } from "element-plus"

/** 格式化时间 */
export const formatDateTime = (time: string | number | Date) => {
  return time ? dayjs(new Date(time)).format("YYYY-MM-DD HH:mm:ss") : "N/A"
}

/** 用 JS 获取全局 css 变量 */
export const getCssVariableValue = (cssVariableName: string) => {
  let cssVariableValue = ""
  try {
    // 没有拿到值时，会返回空串
    cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
  } catch (error) {
    console.error(error)
  }
  return cssVariableValue
}

/** 用 JS 设置全局 CSS 变量 */
export const setCssVariableValue = (cssVariableName: string, cssVariableValue: string) => {
  try {
    document.documentElement.style.setProperty(cssVariableName, cssVariableValue)
  } catch (error) {
    console.error(error)
  }
}

export const OpenLoading = async (func: any, para?: any) => {
  return new Promise((resolve, reject) => {
    const loading = ElLoading.service({
      lock: true,
      background: "rgba(0, 0, 0, 0.7)"
    })

    func(para)
      .then((res: any) => resolve(res))
      .catch((err: any) => reject(err))
      .finally(() => loading.close())
  })
}

export const OpenTextLoading = async (text: string, func: any, para?: any) => {
  const loading = ElLoading.service({
    lock: true,
    text: text,
    background: "rgba(0, 0, 0, 0.7)"
  })
  try {
    await func(para)
  } catch (err) {
    console.error(err)
  } finally {
    loading.close()
  }
}

export const showLoading = (text: string, target?: string) => {
  return ElLoading.service({
    lock: true,
    text: text,
    background: "rgba(0, 0, 0, 0.7)",
    target
  })
}
type MessageBoxType = "" | "success" | "warning" | "info" | "error"
export const showMessageBox = (option: {
  type?: MessageBoxType
  title?: string
  message?: string
  showConfirmButton?: boolean
  showCancelButton?: boolean
  cancelButtonText?: string
  confirmButtonText?: string
  closeOnClickModal?: boolean
  showClose?: boolean
}) => {
  return ElMessageBox({
    type: option.type,
    title: option.title,
    message: option.message,
    showConfirmButton: option.showConfirmButton !== false,
    showCancelButton: option.showCancelButton !== false,
    cancelButtonText: option.cancelButtonText,
    confirmButtonText: option.confirmButtonText,
    closeOnClickModal: option.closeOnClickModal === true,
    showClose: option.showClose === true
  })
    .then(() => true)
    .catch(() => false)
}
export async function waitUntil(func: () => boolean, interval = 100) {
  return new Promise<void>((resolve, reject) => {
    const timeID = setInterval(() => {
      try {
        if (!func()) return
        clearInterval(timeID)
        resolve()
      } catch (e) {
        clearInterval(timeID)
        reject(e)
      }
    }, interval)
  })
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
