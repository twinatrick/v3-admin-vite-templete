# 需求 API 規格

## 1. 新增 `getUserById` ✅ 已實作

**用途**：`UserEntitySelect` 元件在編輯表單時，需要將預設的 `modelValue`（user ID）解析為顯示名稱。

**端點**：`GET /api/users/{id}`

**請求參數**：

| 參數 | 位置 | 型別   | 必填 | 說明      |
| ---- | ---- | ------ | ---- | --------- |
| id   | Path | string | 是   | 使用者 ID |

**回應 `200`**：

```json
{
  "code": 200,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "disabled": false
  },
  "message": "success"
}
```

**回應 `404`**：

```json
{
  "code": 404,
  "data": null,
  "message": "使用者不存在"
}
```

**前端使用方式**：`api.userController.getUserById(id)`（位於 `UserEntitySelect/index.vue`）

---

## 2. 新增 `searchCompanies` ✅ 已實作

**用途**：`CompanyEntitySelect` 元件需要透過關鍵字遠端查詢公司。

**端點**：`POST /api/company/search`

**請求參數**：

```json
{
  "keyword": "公司名稱關鍵字",
  "page": 0,
  "size": 20
}
```

| 參數    | 型別   | 必填 | 說明                       |
| ------- | ------ | ---- | -------------------------- |
| keyword | string | 是   | 公司名稱關鍵字（模糊查詢） |
| page    | int32  | 否   | 頁碼，從 0 開始，預設 0    |
| size    | int32  | 否   | 每頁大小，預設 20          |

**回應 `200`**：

```json
{
  "code": 200,
  "data": {
    "content": [
      {
        "id": "string",
        "name": "string",
        "websites": ["string"],
        "description": "string"
      }
    ],
    "totalElements": 0,
    "totalPages": 0,
    "currentPage": 0,
    "pageSize": 20
  },
  "message": "success"
}
```

**前端使用方式**：`api.companyController.searchCompanies(data)`（位於 `CompanyEntitySelect/index.vue` 及 `Company/service.ts`）

---

## 3. 新增 `getJobPostingById` ✅ 已實作

**用途**：`JobPostingEntitySelect` 元件在編輯表單時，需要將預設的 `modelValue`（職缺 ID）解析為顯示標題。

**端點**：`GET /api/job-posting/get/{id}`

**請求參數**：

| 參數 | 位置 | 型別   | 必填 | 說明    |
| ---- | ---- | ------ | ---- | ------- |
| id   | Path | string | 是   | 職缺 ID |

**回應 `200`**：

```json
{
  "code": 200,
  "data": {
    "id": "string",
    "companyId": "string",
    "companyName": "string",
    "title": "string",
    "description": "string"
  },
  "message": "success"
}
```

**回應 `404`**：

```json
{
  "code": 404,
  "data": null,
  "message": "職缺不存在"
}
```

**前端使用方式**：`api.jobPostingController.getJobPostingById(id)`（位於 `JobPostingEntitySelect/index.vue`）
