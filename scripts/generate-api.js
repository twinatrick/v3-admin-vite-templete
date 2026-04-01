#!/usr/bin/env node

/**
 * Swagger TypeScript API Generator
 *
 * 此腳本從 Swagger/OpenAPI 規格自動生成 TypeScript API 客戶端程式碼
 *
 * 使用方式:
 *   npm run generate-api              # 使用預設環境 (development)
 *   npm run generate-api:dev          # 使用開發環境
 *   npm run generate-api:prod         # 使用生產環境
 *   node scripts/generate-api.js --env development
 */

const { generateApi } = require("swagger-typescript-api")
const path = require("path")
const fs = require("fs")

// 解析命令列參數
const args = process.argv.slice(2)
const envIndex = args.indexOf("--env")
const environment = envIndex !== -1 ? args[envIndex + 1] : "development"

// 載入環境變數
function loadEnv(env) {
  const envFile = path.resolve(__dirname, `../.env.${env}`)

  if (!fs.existsSync(envFile)) {
    console.warn(`⚠️  環境檔案不存在: ${envFile}`)
    console.warn(`⚠️  將使用預設配置`)
    return {}
  }

  const envContent = fs.readFileSync(envFile, "utf-8")
  const envVars = {}

  envContent.split("\n").forEach((line) => {
    // 移除註解和空行
    const trimmedLine = line.trim()
    if (!trimmedLine || trimmedLine.startsWith("#")) return

    // 解析 KEY=VALUE 或 KEY='VALUE' 或 KEY="VALUE"
    const match = trimmedLine.match(/^([^=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      let value = match[2].trim()

      // 移除引號
      if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
        value = value.slice(1, -1)
      }

      envVars[key] = value
    }
  })

  return envVars
}

// 載入環境變數
const envVars = loadEnv(environment)

// 配置
const SWAGGER_URL = envVars.VITE_SWAGGER_URL || "http://localhost:7000/api/swagger/v1/swagger.json"
const OUTPUT_DIR = path.resolve(__dirname, "../src/api/generated")
// const HTTP_CLIENT_PATH = path.resolve(OUTPUT_DIR, "http-client.ts")

console.log("🚀 開始生成 API 客戶端程式碼...")
console.log(`📝 環境: ${environment}`)
console.log(`📍 Swagger URL: ${SWAGGER_URL}`)
console.log(`📂 輸出目錄: ${OUTPUT_DIR}`)
console.log("")

// 生成 API
generateApi({
  name: "Api.ts",
  output: OUTPUT_DIR,
  url: SWAGGER_URL,
  httpClientType: "axios",

  // 生成選項
  generateClient: true, // 生成 API 客戶端類別
  generateRouteTypes: true, // 生成路由型別
  generateResponses: true, // 生成完整的 response 型別

  // 類型選項
  enumNamesAsValues: true, // 使用 enum 值作為名稱
  singleHttpClient: true, // 使用單一 HTTP 客戶端

  // 輸出選項
  cleanOutput: false, // 不清空輸出目錄 (保留 http-client.ts)
  modular: false, // 使用單一檔案模式

  // 代碼風格
  sortTypes: true, // 排序類型定義
  extractRequestParams: true, // 提取請求參數

  // 自訂模板選項
  templates: path.resolve(__dirname, "./api-templates"), // 如果需要自訂模板

  // Axios 配置
  unwrapResponseData: false, // 不自動解包 response.data (由我們的攔截器處理)

  // 鉤子函數
  hooks: {
    onCreateComponent: (component) => {
      // 可以在這裡修改生成的組件
      return component
    },
    onCreateRoute: (routeData) => {
      // 可以在這裡修改生成的路由
      return routeData
    },
    onCreateRequestParams: (rawType) => {
      // 可以在這裡修改請求參數
      return rawType
    },
    onParseSchema: (originalSchema, parsedSchema) => {
      // 可以在這裡修改 schema 解析結果
      return parsedSchema
    }
  }
})
  .then(({ files, _configuration }) => {
    console.log("✅ API 客戶端程式碼生成成功!")
    console.log("")
    console.log("📄 生成的檔案:")

    files.forEach(({ fileName, fileContent }) => {
      console.log(`   - ${fileName} (${(fileContent.length / 1024).toFixed(2)} KB)`)
    })

    console.log("")
    console.log("🎉 完成! 你現在可以在專案中使用生成的 API:")
    console.log("")
    console.log('   import { Api } from "@/api/generated/Api"')
    console.log("   ")
    console.log("   const api = new Api({ ")
    console.log("     baseURL: import.meta.env.VITE_BASE_API ")
    console.log("   })")
    console.log("")
    console.log("📚 詳細使用說明請參考: docs/API_GENERATION.md")
    console.log("")
  })
  .catch((error) => {
    console.error("❌ API 生成失敗:")
    console.error("")

    const errorMessage = error.message || String(error)
    const hasConnectionError =
      errorMessage.includes("ECONNREFUSED") ||
      errorMessage.includes("connect") ||
      errorMessage.includes("fetch failed") ||
      errorMessage.includes("internalConnectMultiple")

    if (hasConnectionError) {
      console.error("🔌 無法連接到 Swagger API:")
      console.error(`   URL: ${SWAGGER_URL}`)
      console.error("")
      console.error("💡 請確認:")
      console.error("   1. 後端服務是否正在運行")
      console.error("   2. Swagger URL 是否正確")
      console.error("   3. 是否有網路連線問題")
      console.error("")
      console.error("🔧 你可以嘗試:")
      console.error("   - 檢查 .env.development 中的 VITE_SWAGGER_URL")
      console.error("   - 在瀏覽器中訪問 Swagger URL 確認可訪問")
      console.error("   - 確認後端服務已啟動")
      console.error("   - 使用 curl 測試: curl " + SWAGGER_URL)
    } else if (errorMessage.includes("404")) {
      console.error("🔍 Swagger 文檔不存在:")
      console.error(`   URL: ${SWAGGER_URL}`)
      console.error("")
      console.error("💡 請確認:")
      console.error("   1. Swagger 文檔路徑是否正確")
      console.error("   2. 後端是否已配置 Swagger")
      console.error("")
    } else {
      console.error("⚠️  發生未預期的錯誤")
      console.error("")
      console.error("錯誤詳情:")
      console.error(errorMessage)
      if (error.stack) {
        console.error("")
        console.error("堆疊追蹤:")
        console.error(error.stack)
      }
    }

    console.error("")
    console.error("📖 更多資訊請參考: docs/API_GENERATION.md")
    console.error("")
    process.exit(1)
  })
