# API 自動生成指南

本專案已整合 [swagger-typescript-api](https://github.com/acacode/swagger-typescript-api),可從 Swagger/OpenAPI 規格自動生成型別安全的 TypeScript API 客戶端程式碼。

---

## 📋 目錄

- [快速開始](#快速開始)
- [配置說明](#配置說明)
- [生成 API](#生成-api)
- [使用生成的 API](#使用生成的-api)
- [進階用法](#進階用法)
- [常見問題](#常見問題)
- [最佳實踐](#最佳實踐)

---

## 🚀 快速開始

### 1. 確認後端 Swagger 文檔可訪問

在瀏覽器中訪問你的 Swagger 文檔 URL,確認可以正常載入:

```
http://localhost:7000/api/swagger/v1/swagger.json
```

### 2. 生成 API 程式碼

```bash
# 使用開發環境配置生成 (預設)
npm run generate-api

# 明確指定開發環境
npm run generate-api:dev

# 使用生產環境配置生成
npm run generate-api:prod
```

### 3. 檢查生成的檔案

生成完成後,會在 `src/api/generated/` 目錄下看到:

```
src/api/generated/
├── http-client.ts       # HTTP 客戶端適配器 (手動維護)
├── Api.ts               # 自動生成的 API 類別
└── data-contracts.ts    # 自動生成的 TypeScript 型別定義
```

---

## ⚙️ 配置說明

### 環境變數

API 生成腳本會從對應的環境檔案中讀取配置:

#### 開發環境 (`.env.development`)

```env
VITE_SWAGGER_URL='http://localhost:7000/api/swagger/v1/swagger.json'
```

#### 生產環境 (`.env.production`)

```env
VITE_SWAGGER_URL='https://your-production-domain.com/api/swagger/v1/swagger.json'
```

### npm Scripts

專案提供以下命令:

| 命令                        | 說明                               |
| --------------------------- | ---------------------------------- |
| `npm run generate-api`      | 使用預設環境生成 API (development) |
| `npm run generate-api:dev`  | 使用開發環境配置生成               |
| `npm run generate-api:prod` | 使用生產環境配置生成               |

### 生成腳本配置

生成腳本位於 `scripts/generate-api.js`,主要配置選項:

```javascript
{
  name: 'Api.ts',                    // 生成的 API 類別檔案名
  output: 'src/api/generated',       // 輸出目錄
  url: SWAGGER_URL,                  // Swagger JSON URL
  httpClientType: 'axios',           // HTTP 客戶端類型
  generateClient: true,              // 生成 API 客戶端類別
  generateRouteTypes: true,          // 生成路由型別
  generateResponses: true,           // 生成完整的 response 型別
  enumNamesAsValues: true,           // 使用 enum 值作為名稱
  singleHttpClient: true,            // 使用單一 HTTP 客戶端
  cleanOutput: false,                // 不清空輸出目錄 (保留 http-client.ts)
  modular: false,                    // 使用單一檔案模式
  sortTypes: true,                   // 排序類型定義
  extractRequestParams: true,        // 提取請求參數
  unwrapResponseData: false          // 不自動解包 (由攔截器處理)
}
```

---

## 🔧 生成 API

### 基本用法

```bash
# 確保後端服務正在運行
npm run generate-api
```

### 生成流程

1. 腳本從環境變數讀取 `VITE_SWAGGER_URL`
2. 發送 HTTP 請求獲取 Swagger JSON
3. 解析 OpenAPI 規格
4. 生成 TypeScript 程式碼
5. 寫入 `src/api/generated/` 目錄

### 成功輸出範例

```
🚀 開始生成 API 客戶端程式碼...
📝 環境: development
📍 Swagger URL: http://localhost:7000/api/swagger/v1/swagger.json
📂 輸出目錄: D:\personal\v3-admin-vite-templete\src\api\generated

✅ API 客戶端程式碼生成成功!

📄 生成的檔案:
   - Api.ts (125.43 KB)
   - data-contracts.ts (87.21 KB)

🎉 完成! 你現在可以在專案中使用生成的 API
```

---

## 💻 使用生成的 API

### 1. 基本使用

```typescript
import { Api } from "@/api/generated/Api"

// 創建 API 實例
const api = new Api({
  baseURL: import.meta.env.VITE_BASE_API
})

// 呼叫 API (自動型別提示)
const fetchUsers = async () => {
  const response = await api.users.getUserList()
  console.log(response.data)
}
```

### 2. 在 Vue 3 組件中使用

#### 使用 Composition API

```vue
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { Api } from "@/api/generated/Api"
import type { UserVO } from "@/api/generated/data-contracts"

// 創建 API 實例
const api = new Api({ baseURL: import.meta.env.VITE_BASE_API })

// 定義響應式數據
const users = ref<UserVO[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// 獲取用戶列表
const fetchUsers = async () => {
  loading.value = true
  error.value = null

  try {
    const { data } = await api.users.getUserList()
    users.value = data
  } catch (err: any) {
    error.value = err.message
    // 錯誤已由 service.ts 的攔截器處理
  } finally {
    loading.value = false
  }
}

// 組件掛載時獲取數據
onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div>
    <el-button @click="fetchUsers" :loading="loading"> 刷新 </el-button>

    <el-alert v-if="error" type="error" :title="error" />

    <el-table :data="users" v-loading="loading">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="Email" />
    </el-table>
  </div>
</template>
```

#### 使用 Options API

```vue
<script lang="ts">
import { defineComponent } from "vue"
import { Api } from "@/api/generated/Api"
import type { UserVO } from "@/api/generated/data-contracts"

export default defineComponent({
  name: "UserList",

  data() {
    const api = new Api({ baseURL: import.meta.env.VITE_BASE_API })

    return {
      api,
      users: [] as UserVO[],
      loading: false
    }
  },

  methods: {
    async fetchUsers() {
      this.loading = true
      try {
        const { data } = await this.api.users.getUserList()
        this.users = data
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  },

  mounted() {
    this.fetchUsers()
  }
})
</script>
```

### 3. 在 Pinia Store 中使用

```typescript
import { defineStore } from "pinia"
import { ref } from "vue"
import { Api } from "@/api/generated/Api"
import type { UserVO, LoginRequestDto } from "@/api/generated/data-contracts"

export const useUserStore = defineStore("user", () => {
  // 創建 API 實例
  const api = new Api({ baseURL: import.meta.env.VITE_BASE_API })

  // State
  const currentUser = ref<UserVO | null>(null)
  const token = ref<string>("")

  // Actions
  const login = async (credentials: LoginRequestDto) => {
    try {
      const { data } = await api.auth.login(credentials)
      token.value = data.token
      await fetchCurrentUser()
      return true
    } catch (error) {
      console.error("登入失敗:", error)
      return false
    }
  }

  const fetchCurrentUser = async () => {
    try {
      const { data } = await api.users.getCurrentUser()
      currentUser.value = data
    } catch (error) {
      console.error("獲取用戶資訊失敗:", error)
    }
  }

  const logout = () => {
    currentUser.value = null
    token.value = ""
  }

  return {
    currentUser,
    token,
    login,
    fetchCurrentUser,
    logout
  }
})
```

### 4. 使用型別定義

```typescript
import type { UserVO, CreateUserDto, UpdateUserDto, UserListQuery } from "@/api/generated/data-contracts"

// 在函數中使用型別
const createUser = async (userData: CreateUserDto): Promise<UserVO> => {
  const { data } = await api.users.createUser(userData)
  return data
}

// 在介面定義中使用
interface UserFormState extends Partial<CreateUserDto> {
  confirmPassword?: string
}

// 在響應式數據中使用
const users = ref<UserVO[]>([])
const currentUser = ref<UserVO | null>(null)
```

### 5. 帶參數的 API 呼叫

```typescript
// Query 參數
const users = await api.users.getUserList({
  page: 1,
  pageSize: 10,
  search: "關鍵字"
})

// Path 參數
const user = await api.users.getUserById("user-id-123")

// Request Body
const newUser = await api.users.createUser({
  name: "張三",
  email: "zhang@example.com",
  role: "admin"
})

// 混合使用
const result = await api.users.updateUser(
  "user-id-123", // path 參數
  {
    // request body
    name: "李四",
    email: "li@example.com"
  },
  {
    // query 參數
    notify: true
  }
)
```

### 6. 錯誤處理

生成的 API 使用專案現有的 axios 配置 (`src/utils/service.ts`),所有錯誤已經由攔截器統一處理:

- **401 Unauthorized**: 自動登出並重新載入頁面
- **500 Server Error**: 顯示錯誤通知並附詳細資訊
- **Timeout**: 顯示超時錯誤通知
- **其他錯誤**: 顯示一般錯誤通知

```typescript
// 基本錯誤處理
try {
  const response = await api.users.getUserList()
  // 處理成功響應
} catch (error) {
  // 錯誤已被攔截器處理並顯示通知
  // 這裡可以執行額外的清理或日誌記錄
  console.error("API 呼叫失敗:", error)
}

// 自訂錯誤處理
try {
  const response = await api.users.createUser(userData)
  ElMessage.success("用戶創建成功!")
} catch (error: any) {
  // 可以根據需要添加自訂錯誤處理
  if (error.response?.status === 409) {
    ElMessage.warning("用戶已存在")
  }
}
```

---

## 🔥 進階用法

### 1. 創建可復用的 API 實例

**推薦方式**: 創建一個單例 API 實例供全專案使用

```typescript
// src/api/generated/instance.ts
import { Api } from "./Api"

export const apiClient = new Api({
  baseURL: import.meta.env.VITE_BASE_API
})

export default apiClient
```

**使用方式**:

```typescript
// 在任何組件或 store 中
import apiClient from "@/api/generated/instance"

const users = await apiClient.users.getUserList()
```

### 2. 封裝 Composable

創建可復用的組合式函數:

```typescript
// src/composables/useApi.ts
import { Api } from "@/api/generated/Api"
import { ref } from "vue"

export function useApi() {
  const api = new Api({ baseURL: import.meta.env.VITE_BASE_API })
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const execute = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    loading.value = true
    error.value = null

    try {
      const result = await apiCall()
      return result
    } catch (err: any) {
      error.value = err
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    api,
    loading,
    error,
    execute
  }
}
```

**使用 Composable**:

```vue
<script setup lang="ts">
import { useApi } from "@/composables/useApi"
import { ref } from "vue"

const { api, loading, error, execute } = useApi()
const users = ref([])

const fetchUsers = async () => {
  const result = await execute(() => api.users.getUserList())
  if (result) {
    users.value = result.data
  }
}
</script>
```

### 3. 自訂請求配置

```typescript
import { Api } from "@/api/generated/Api"

// 創建帶自訂配置的實例
const api = new Api({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 60000, // 自訂超時時間
  headers: {
    "X-Custom-Header": "custom-value"
  }
})
```

### 4. 攔截器處理

生成的 API 自動使用 `src/utils/service.ts` 中配置的攔截器,包括:

- ✅ 自動注入 Bearer Token
- ✅ 自動更新 Token (從 response headers)
- ✅ 統一錯誤處理和使用者通知
- ✅ Request/Response 日誌記錄
- ✅ 超時處理

如需修改攔截器行為,請編輯 `src/utils/service.ts`。

### 5. 與現有 API 共存

生成的 API 可以與手寫的 API 程式碼並存:

```typescript
// 使用生成的 API
import { Api } from "@/api/generated/Api"
const generatedApi = new Api({ baseURL: import.meta.env.VITE_BASE_API })

// 使用手寫的 API
import * as manualApi from "@/api/users"

// 兩者可以同時使用
const newUsers = await generatedApi.users.getUserList()
const legacyUsers = await manualApi.getUserList()
```

**逐步遷移建議**:

1. 保留現有手寫 API
2. 新功能優先使用生成的 API
3. 逐步重構舊程式碼使用生成的 API
4. 最終移除手寫 API

---

## ❓ 常見問題

### Q1: API 生成失敗,無法連接到 Swagger URL

**原因**: 後端服務未啟動或 Swagger URL 配置錯誤

**解決方法**:

1. 確認後端服務正在運行
2. 在瀏覽器中訪問 Swagger URL 確認可訪問
3. 檢查 `.env.development` 中的 `VITE_SWAGGER_URL` 是否正確
4. 確認防火牆沒有阻擋連線

```bash
# 測試 Swagger URL
curl http://localhost:7000/api/swagger/v1/swagger.json

# 或在瀏覽器中訪問
http://localhost:7000/api/swagger/v1/swagger.json
```

### Q2: 生成的 API 呼叫時出現 401 錯誤

**原因**: Token 未正確設定或已過期

**解決方法**:

1. 確認已登入並獲取 Token
2. 檢查 `src/utils/service.ts` 中的 Token 處理邏輯
3. 確認 Token 存儲在 Cookie 中 (使用 `getToken()`)

```typescript
// 檢查 Token
import { getToken } from "@/utils/cache/cookies"
console.log("Current Token:", getToken())
```

### Q3: TypeScript 型別錯誤

**原因**: 生成的型別與使用方式不匹配

**解決方法**:

1. 重新生成 API: `npm run generate-api`
2. 檢查是否正確導入型別
3. 確認後端 Swagger 定義正確

```typescript
// 正確的型別導入
import type { UserVO } from "@/api/generated/data-contracts"

// 錯誤:沒有使用 type 關鍵字
import { UserVO } from "@/api/generated/data-contracts" // ❌
```

### Q4: 如何更新生成的 API?

**當後端 API 變更時**:

```bash
# 1. 確保後端服務已更新並重新啟動
# 2. 重新生成 API
npm run generate-api

# 3. 檢查變更
git diff src/api/generated/

# 4. 測試相關功能確保相容性
npm run test

# 5. 提交變更
git add src/api/generated/
git commit -m "chore: update generated API from swagger"
```

### Q5: 生成的檔案應該加入 Git 嗎?

**建議: 是的,應該加入 Git**

**優點**:

- ✅ 團隊成員 clone 專案後可以直接使用
- ✅ 不需要每次都連接後端生成
- ✅ 可以追蹤 API 變更歷史
- ✅ CI/CD 流程更簡單

**缺點**:

- ❌ 每次 API 變更需要重新生成並提交
- ❌ 增加 Git diff 大小

### Q6: 如何處理不同環境的 Swagger URL?

**方法 1**: 使用環境變數 (已實作)

```bash
# 開發環境
npm run generate-api:dev

# 生產環境
npm run generate-api:prod
```

**方法 2**: 手動指定 URL

編輯 `scripts/generate-api.js`,暫時修改 `SWAGGER_URL`:

```javascript
const SWAGGER_URL = "https://staging-api.example.com/swagger.json"
```

### Q7: 生成的 API 方法名稱不符合預期

**原因**: Swagger 定義中的 `operationId` 影響生成的方法名

**解決方法**:

1. 與後端協調修改 Swagger 定義中的 `operationId`
2. 或使用別名包裝:

```typescript
// src/api/generated/aliases.ts
import { Api } from "./Api"

const api = new Api({ baseURL: import.meta.env.VITE_BASE_API })

// 創建別名
export const getUserList = api.users.userControllerGetUserList.bind(api.users)
export const createUser = api.users.userControllerCreateUser.bind(api.users)
```

### Q8: 如何在生成前自訂模板?

**進階**: 可以創建自訂模板

1. 創建模板目錄:

```bash
mkdir scripts/api-templates
```

2. 參考 [swagger-typescript-api 模板文檔](https://github.com/acacode/swagger-typescript-api#templates)

3. 修改 `scripts/generate-api.js`:

```javascript
generateApi({
  // ...其他配置
  templates: path.resolve(__dirname, "./api-templates")
})
```

---

## 🎯 最佳實踐

### 1. 定期更新生成的 API

建議在以下時機重新生成 API:

- ✅ 後端 API 有重大更新時
- ✅ 每次 Sprint 結束前
- ✅ 發現型別不匹配時
- ✅ 新增或修改 API 端點後

### 2. 使用型別安全

充分利用 TypeScript 的型別檢查:

```typescript
// ✅ 好的做法 - 使用生成的型別
import type { CreateUserDto } from "@/api/generated/data-contracts"

const userData: CreateUserDto = {
  name: "張三",
  email: "zhang@example.com",
  role: "admin"
}

// ❌ 不好的做法 - 使用 any
const userData: any = {
  name: "張三",
  email: "zhang@example.com",
  role: "admin"
}
```

### 3. 集中管理 API 實例

```typescript
// src/api/generated/instance.ts
import { Api } from "./Api"

export const apiClient = new Api({
  baseURL: import.meta.env.VITE_BASE_API
})

// 匯出常用的 API 組
export const userApi = apiClient.users
export const authApi = apiClient.auth
export const settingsApi = apiClient.settings
```

### 4. 錯誤處理標準化

```typescript
// src/utils/api-helpers.ts
import { ElMessage } from "element-plus"

export async function handleApiCall<T>(
  apiCall: () => Promise<T>,
  options?: {
    successMessage?: string
    errorMessage?: string
  }
): Promise<T | null> {
  try {
    const result = await apiCall()
    if (options?.successMessage) {
      ElMessage.success(options.successMessage)
    }
    return result
  } catch (error: any) {
    if (options?.errorMessage) {
      ElMessage.error(options.errorMessage)
    }
    return null
  }
}

// 使用
const user = await handleApiCall(() => api.users.createUser(userData), {
  successMessage: "用戶創建成功",
  errorMessage: "用戶創建失敗"
})
```

### 5. 建立 API 測試

```typescript
// tests/api/users.test.ts
import { describe, it, expect } from "vitest"
import { Api } from "@/api/generated/Api"

describe("Users API", () => {
  const api = new Api({ baseURL: "http://localhost:8000" })

  it("should fetch user list", async () => {
    const response = await api.users.getUserList()
    expect(response.data).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
  })

  it("should create user", async () => {
    const userData = {
      name: "Test User",
      email: "test@example.com"
    }
    const response = await api.users.createUser(userData)
    expect(response.data.name).toBe(userData.name)
  })
})
```

### 6. 文檔註解

為自訂的 API 包裝添加 JSDoc 註解:

````typescript
/**
 * 獲取用戶列表
 * @param query - 查詢參數
 * @returns 用戶列表
 * @example
 * ```typescript
 * const users = await fetchUsers({ page: 1, pageSize: 10 })
 * ```
 */
export async function fetchUsers(query?: UserListQuery) {
  return api.users.getUserList(query)
}
````

### 7. 效能優化

```typescript
// 使用快取避免重複請求
import { ref } from "vue"

const userCache = new Map()

export async function getCachedUser(userId: string) {
  if (userCache.has(userId)) {
    return userCache.get(userId)
  }

  const user = await api.users.getUserById(userId)
  userCache.set(userId, user)

  return user
}
```

---

## 🔗 相關資源

- [swagger-typescript-api GitHub](https://github.com/acacode/swagger-typescript-api)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Vue 3 文檔](https://v3.vuejs.org/)
- [Pinia 文檔](https://pinia.vuejs.org/)
- [Axios 文檔](https://axios-http.com/)
- [TypeScript 文檔](https://www.typescriptlang.org/)

---

## 📝 更新日誌

- **2026-04-01**: 初始版本,整合 swagger-typescript-api

---

## 💬 需要幫助?

如果遇到問題或有建議,請:

1. 查看本文檔的 [常見問題](#常見問題) 部分
2. 檢查 [swagger-typescript-api Issues](https://github.com/acacode/swagger-typescript-api/issues)
3. 聯繫團隊技術負責人

---

**Happy Coding! 🎉**
