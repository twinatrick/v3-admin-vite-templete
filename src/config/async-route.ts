/** 動態路由配置 */
interface AsyncRouteSettings {
  /**
   * 是否開啟動態路由功能？
   * 1. 開啟後需要後端配合，在查詢用戶詳情的API返回當前用戶可以用來判斷並加載動態路由的字段（該項目用的是角色 roles 字段）
   * 2. 假如項目不需要根據不同的用戶來顯示不同的頁面，則應該將 open: false
   */
  open: boolean
  /** 當動態路由功能關閉時：
   * 1. 應該將所有路由都寫到常駐路由里面（表明所有登入的用戶能訪問的頁面都是一樣的）
   * 2. 系統自動給當前登入用戶賦予一個沒有任何作用的默認角色
   */
  defaultRoles: Array<string>
}

const asyncRouteSettings: AsyncRouteSettings = {
  open: true,
  defaultRoles: ["DEFAULT_ROLE"]
}

export default asyncRouteSettings
