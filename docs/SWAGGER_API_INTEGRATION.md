# Swagger TypeScript API 整合總結

## ✅ 整合完成

已成功在專案中整合 `swagger-typescript-api`,可以從 Swagger/OpenAPI 規格自動生成型別安全的 TypeScript API 客戶端。

---

## 📦 安裝的依賴

```json
{
  "devDependencies": {
    "swagger-typescript-api": "^13.6.5"
  }
}
```

---

## 📁 創建的檔案

### 1. 核心檔案

| 檔案路徑                           | 說明                         |
| ---------------------------------- | ---------------------------- |
| `scripts/generate-api.js`          | API 生成腳本                 |
| `src/api/generated/http-client.ts` | HTTP 客戶端適配器 (手動維護) |
| `docs/API_GENERATION.md`           | 完整使用說明文檔             |

### 2. 配置變更

| 檔案路徑           | 變更內容                |
| ------------------ | ----------------------- |
| `package.json`     | 新增 3 個 npm scripts   |
| `.env.development` | 新增 `VITE_SWAGGER_URL` |
| `.env.production`  | 新增 `VITE_SWAGGER_URL` |

### 3. 自動生成的檔案 (當執行 generate-api 後)

| 檔案路徑                              | 說明                       |
| ------------------------------------- | -------------------------- |
| `src/api/generated/Api.ts`            | 自動生成的 API 類別        |
| `src/api/generated/data-contracts.ts` | 自動生成的 TypeScript 型別 |

---

## 🚀 快速開始

### 步驟 1: 確認後端 Swagger 文檔可訪問

```bash
# 在瀏覽器中訪問
http://localhost:7000/api/swagger/v1/swagger.json

# 或使用 curl 測試
curl http://localhost:7000/api/swagger/v1/swagger.json
```

### 步驟 2: 生成 API

```bash
# 使用開發環境配置
npm run generate-api

# 或明確指定環境
npm run generate-api:dev  # 開發環境
npm run generate-api:prod # 生產環境
```

### 步驟 3: 在程式碼中使用

```typescript
import { Api } from "@/api/generated/Api"

// 創建 API 實例
const api = new Api({
  baseURL: import.meta.env.VITE_BASE_API
})

// 呼叫 API (完整型別提示)
const { data } = await api.users.getUserList()
```

---

## 📋 新增的 npm Scripts

```bash
# 使用預設環境生成 API (development)
npm run generate-api

# 使用開發環境配置生成
npm run generate-api:dev

# 使用生產環境配置生成
npm run generate-api:prod
```

---

## ⚙️ 環境變數配置

### 開發環境 (`.env.development`)

```env
VITE_SWAGGER_URL='http://localhost:7000/api/swagger/v1/swagger.json'
```

### 生產環境 (`.env.production`)

```env
VITE_SWAGGER_URL='https://your-production-domain.com/api/swagger/v1/swagger.json'
```

---

## 🎯 主要特點

### ✅ 型別安全

- 100% TypeScript 覆蓋
- 編譯時型別檢查
- IDE 自動補全

### ✅ 無縫整合

- 使用專案現有的 axios 配置 (`src/utils/service.ts`)
- 自動注入 Token
- 統一錯誤處理
- 所有攔截器正常運作

### ✅ 易於維護

- 後端 API 變更後只需重新生成
- 自動同步 API 定義
- 減少手動維護成本

### ✅ 向後兼容

- 不影響現有手寫 API
- 可逐步遷移
- 兩者可以並存

---

## 📖 詳細文檔

完整的使用說明、範例和最佳實踐請參考:

**[docs/API_GENERATION.md](./API_GENERATION.md)**

包含:

- 🚀 快速開始指南
- ⚙️ 詳細配置說明
- 💻 使用範例 (Vue 組件、Pinia Store)
- 🔥 進階用法
- ❓ 常見問題
- 🎯 最佳實踐

---

## 🔄 開發工作流程

### 當後端 API 更新時

1. 確保後端服務已重新啟動
2. 重新生成 API:
   ```bash
   npm run generate-api
   ```
3. 檢查變更:
   ```bash
   git diff src/api/generated/
   ```
4. 測試相關功能
5. 提交變更:
   ```bash
   git add src/api/generated/
   git commit -m "chore: update generated API from swagger"
   ```

---

## 📂 目錄結構

```
專案根目錄/
├── scripts/
│   └── generate-api.js           # API 生成腳本
├── src/
│   ├── api/
│   │   ├── generated/            # 自動生成的 API (新增)
│   │   │   ├── http-client.ts   # HTTP 客戶端適配器 (手動維護)
│   │   │   ├── Api.ts            # 自動生成的 API 類別
│   │   │   └── data-contracts.ts # 自動生成的型別定義
│   │   ├── login/                # 現有的手寫 API (保留)
│   │   ├── users/                # 現有的手寫 API (保留)
│   │   └── ...
│   └── utils/
│       └── service.ts            # 現有的 axios 配置 (不變)
├── docs/
│   └── API_GENERATION.md         # 完整使用說明 (新增)
├── .env.development              # 更新: 新增 VITE_SWAGGER_URL
├── .env.production               # 更新: 新增 VITE_SWAGGER_URL
└── package.json                  # 更新: 新增 scripts
```

---

## 💡 使用範例

### 在 Vue 組件中

```vue
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { Api } from "@/api/generated/Api"
import type { UserVO } from "@/api/generated/data-contracts"

const api = new Api({ baseURL: import.meta.env.VITE_BASE_API })
const users = ref<UserVO[]>([])

const fetchUsers = async () => {
  const { data } = await api.users.getUserList()
  users.value = data
}

onMounted(fetchUsers)
</script>
```

### 在 Pinia Store 中

```typescript
import { defineStore } from "pinia"
import { Api } from "@/api/generated/Api"

export const useUserStore = defineStore("user", () => {
  const api = new Api({ baseURL: import.meta.env.VITE_BASE_API })

  const login = async (credentials) => {
    const { data } = await api.auth.login(credentials)
    return data
  }

  return { login }
})
```

---

## ⚠️ 注意事項

### 1. 首次使用前

- 確保後端服務正在運行
- 確認 Swagger URL 正確並可訪問
- 執行 `npm run generate-api` 生成 API 程式碼

### 2. 生成的檔案

- `Api.ts` 和 `data-contracts.ts` 會在每次生成時覆蓋
- `http-client.ts` 為手動維護,不會被覆蓋
- 建議將生成的檔案加入 Git 版本控制

### 3. 錯誤處理

- 所有錯誤由 `src/utils/service.ts` 統一處理
- 401 錯誤會自動登出
- 500 錯誤會顯示詳細通知
- 超時錯誤有專門提示

---

## 🔗 相關資源

- [swagger-typescript-api GitHub](https://github.com/acacode/swagger-typescript-api)
- [OpenAPI Specification](https://swagger.io/specification/)
- [專案內部文檔: API_GENERATION.md](./API_GENERATION.md)

---

## 📝 更新日誌

### 2026-04-01 - 初始整合

- ✅ 安裝 swagger-typescript-api v13.6.5
- ✅ 創建 API 生成腳本
- ✅ 配置 HTTP 客戶端適配器
- ✅ 更新環境變數配置
- ✅ 新增 npm scripts
- ✅ 創建完整使用文檔

---

## 🎉 整合完成!

現在你可以:

1. ✅ 執行 `npm run generate-api` 生成 API
2. ✅ 在程式碼中使用型別安全的 API 呼叫
3. ✅ 享受 IDE 的自動補全和型別檢查
4. ✅ 保持 API 定義與後端同步

**Happy Coding! 🚀**

---

**如有問題,請參考 [docs/API_GENERATION.md](./API_GENERATION.md) 或聯繫團隊技術負責人。**
