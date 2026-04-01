// core
import { createApp } from "vue"
import App from "@/App.vue"
import store from "@/store"
import router from "@/router"
import "@/router/permission"
import { setupCalendar } from "v-calendar"

// load
import { loadSvg } from "@/icons"
import { loadPlugins } from "@/plugins"
import { loadDirectives } from "@/directives"
// css
import "uno.css"
import "normalize.css"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "vxe-table/lib/style.css"
import "vxe-table-plugin-element/dist/style.css"
import "@/styles/index.scss"
import "v-calendar/style.css"

import googleApis from "./plugin/google-apis"

const app = createApp(App)

/** 載入插件 */
loadPlugins(app)
/** 載入全域 SVG */
loadSvg(app)
/** 載入自定義指令 */
loadDirectives(app)

app.use(store).use(router)

app.use(googleApis, {
  client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  scope: "https://www.googleapis.com/auth/drive.readonly"
})

// Use plugin with optional defaults
app.use(setupCalendar, {})
router.isReady().then(() => {
  app.mount("#app")
})
