/**
 * HTTP Client Adapter for Swagger Generated API
 *
 * 此檔案將專案現有的 axios 配置適配給自動生成的 API 客戶端使用
 * 確保生成的 API 使用相同的:
 * - 攔截器 (Token 注入、錯誤處理)
 * - 超時設定
 * - Base URL 配置
 * - Response/Request 轉換邏輯
 *
 * ⚠️ 注意: 此檔案為手動維護,不會被 generate-api 腳本覆蓋
 */

import type { AxiosRequestConfig, AxiosResponse } from "axios"
import { request } from "@/utils/service"

/**
 * HTTP Client 類別
 * swagger-typescript-api 生成的 Api 類別會使用此客戶端
 */
export class HttpClient {
  private baseConfig: AxiosRequestConfig

  constructor(config?: AxiosRequestConfig) {
    // 這裡不創建新的 axios 實例
    // 而是使用專案現有的 request 函數
    // request 函數已經配置好所有攔截器和錯誤處理

    // 將配置傳遞給請求函數
    this.baseConfig = config || {}
  }

  /**
   * 通用請求方法
   * 會被生成的 API 類別調用
   */
  public request = <T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> => {
    // 合併基礎配置和請求配置
    const mergedConfig = {
      ...this.baseConfig,
      ...config,
      headers: {
        ...this.baseConfig.headers,
        ...config.headers
      }
    }

    // 使用專案現有的 request 函數
    // 這確保了所有攔截器、Token 處理、錯誤處理都能正常運作
    return request<R>(mergedConfig)
  }

  // 便捷方法
  public get = <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> => {
    return this.request<T, R>({ ...config, method: "GET", url })
  }

  public post = <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> => {
    return this.request<T, R>({ ...config, method: "POST", url, data })
  }

  public put = <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> => {
    return this.request<T, R>({ ...config, method: "PUT", url, data })
  }

  public delete = <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> => {
    return this.request<T, R>({ ...config, method: "DELETE", url })
  }

  public patch = <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> => {
    return this.request<T, R>({ ...config, method: "PATCH", url, data })
  }
}

/**
 * 預設匯出
 * 可直接在其他檔案中導入使用
 */
export default HttpClient

/**
 * 使用範例:
 *
 * ```typescript
 * import { Api } from '@/api/generated/Api'
 * import { HttpClient } from '@/api/generated/http-client'
 *
 * // 創建 API 實例
 * const httpClient = new HttpClient({
 *   baseURL: import.meta.env.VITE_BASE_API
 * })
 *
 * const api = new Api(undefined, undefined, httpClient)
 *
 * // 或者更簡單的方式
 * const api = new Api({ baseURL: import.meta.env.VITE_BASE_API })
 *
 * // 使用 API
 * const response = await api.users.getUserList()
 * ```
 */
