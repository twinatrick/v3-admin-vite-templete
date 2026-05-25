# OpenCode Agent 專案指南

請所有 Agent 在協助開發本專案時，嚴格遵守以下準則。**請務必使用繁體中文與使用者溝通與撰寫說明。**

## 📦 套件與指令 (重要陷阱)

- **環境設定與執行優先權 (重要)** : 在執行任何開發伺服器、建置、API 生成或測試指令前，請先檢查當前專案目錄下是否存在 .run
  資料夾。 若存在 .run 目錄，必須優先讀取其中的配置檔案 (如 XML)，並將其內嵌的環境變數（如 .env
  覆寫項目）或啟動參數作為最高優先級應用於後續的執行環境中。
- **套件管理員**：雖然 `README.md` 中提到了 `pnpm`，但目前專案中**僅存在 `package-lock.json`**，且 `package.json` 中的腳本都使用 `npm run`。請**一律使用 `npm`** 來安裝套件與執行指令。
- **開發伺服器**：`npm run dev`
- **建置指令**：提供不同環境的建置 `npm run build:dev`, `npm run build:stage`, `npm run build:prod`。
- **API 生成**：本專案包含自動生成 API 的腳本，使用 `npm run generate-api`。

## 🏗️ 架構與技術棧

- **核心**：Vue 3 (Composition API / `<script setup>`), TypeScript, Vite。
- **UI & 樣式**：Element Plus, UnoCSS (原子化 CSS), Scss。
- **狀態管理**：Pinia。
- **路徑別名**：使用 `@` 指向 `./src` 目錄。
- **圖標**：透過 `vite-plugin-svg-icons` 處理，SVG 放在 `src/icons/svg` 中。

## 🧪 驗證與測試 (Commit 前必讀)

- **程式碼風格**：請務必在提交或完成修改前執行程式碼風格檢查。

  - 專案標準腳本為 `npm run lint`。
  - **【Token 節省黑魔法】**：為了幫用戶極致節省 Token 成本，在實際執行時，請優先將其拆解並轉換為原生指令：\* \*`rtk npx eslint .`\*\*。

- **單元測試**：使用 Vitest 執行測試，測試環境預設為 `jsdom`，測試檔路徑：`tests/**/*.test.ts`。
  - 專案標準腳本為 `npm run test`。
  - **【Token 節省黑魔法】**：為了讓底層的 RTK 盾牌能夠看穿 npm 包裝並發揮 90% 以上的壓縮率，在實際執行測試時，**禁止**
    直接使用 `npm run test`，請**必須優先使用原生指令：`rtk npx vitest run`**。

## ✍️ 溝通與回應準則

- **請強制使用繁體中文**回應使用者，包含註解以及之後所有的 PR 說明與 Commits (若無特別規定)。
- 避免冗長的步驟說明，直接執行修改或給出最終解決方案即可。
