/**
 * API 使用示範
 *
 * 此檔案展示如何使用自動生成的 API 客戶端
 *
 * ⚠️ 注意:
 * 1. 這只是示範檔案,實際使用時請根據你的需求調整
 * 2. 在執行 `npm run generate-api` 之前,此檔案會有 TypeScript 錯誤
 * 3. 生成 API 後,Api.ts 和 data-contracts.ts 會自動創建
 */

// @ts-nocheck - 在 API 生成前忽略型別錯誤
import { ref } from "vue"
import { Api } from "./Api"
import type { UserVO, CreateUserDto } from "./data-contracts"

/**
 * 創建 API 實例
 */
export const apiClient = new Api({
  baseURL: import.meta.env.VITE_BASE_API
})

/**
 * 使用範例 1: 基本 API 呼叫
 */
export async function exampleBasicApiCall() {
  try {
    // 呼叫 API,會有完整的型別提示
    const response = await apiClient.users.getUserList()

    // response.data 的型別會自動推斷
    console.log("用戶列表:", response.data)

    return response.data
  } catch (error) {
    // 錯誤已被 service.ts 攔截器處理
    console.error("API 呼叫失敗:", error)
    return null
  }
}

/**
 * 使用範例 2: 帶參數的 API 呼叫
 */
export async function exampleApiCallWithParams(userId: string) {
  try {
    const response = await apiClient.users.getUserById(userId)
    return response.data
  } catch (error) {
    console.error("獲取用戶失敗:", error)
    return null
  }
}

/**
 * 使用範例 3: POST 請求
 */
export async function examplePostRequest(userData: CreateUserDto) {
  try {
    const response = await apiClient.users.createUser(userData)
    console.log("用戶創建成功:", response.data)
    return response.data
  } catch (error) {
    console.error("創建用戶失敗:", error)
    return null
  }
}

/**
 * 使用範例 4: 在 Vue Composition API 中使用
 */
export function useUserApi() {
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const users = ref<UserVO[]>([])

  const fetchUsers = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await apiClient.users.getUserList()
      users.value = response.data
    } catch (err: any) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers
  }
}

/**
 * 使用範例 5: 匯出常用的 API 分組
 *
 * 這樣可以更方便地在其他檔案中導入使用
 */
export const userApi = apiClient.users
export const authApi = apiClient.auth
export const settingsApi = apiClient.settings

// 使用方式:
// import { userApi } from '@/api/generated/examples'
// const users = await userApi.getUserList()
