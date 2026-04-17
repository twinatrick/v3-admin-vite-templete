import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { useTagsViewStore } from "./tags-view"
import { useSettingsStore } from "./settings"
import router, { resetRouter } from "@/router"
import { FunctionVo, UserVo } from "@/api/generated/Api"
import { api } from "@/api/client"
import { getToken, removeToken } from "@/utils/cache/cookies"

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "")
  const userInfo = ref<UserVo>()
  const accessToken = ref<string>("")
  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()

  /** 登入 (使用 authCode 的方法已停用) */
  const login = async (_authCode: string) => {
    console.warn(
      "login (with authCode) functionality is deprecated. Please update your API calls to use email/password."
    )
    throw new Error("此功能已停用，请更新您的 API 调用以使用邮箱/密码。")
  }
  const loginByEmail = async (email: string, password: string) => {
    const res = await api.auth.login({ email, password })
    if (res.data.code !== 200 || !(res.data.data as { accessToken?: string })?.accessToken) {
      throw new Error(res.data.message || "Login failed: No data returned or accessToken missing.")
    }
    accessToken.value = (res.data.data as { accessToken: string }).accessToken
    setAccessToken(accessToken.value)
    // setToken(accessToken.value)
    console.log(accessToken.value)
    await getInfo()
    return res
  }
  const register = async (email: string, password: string) => {
    const res = await api.auth.signup({ email, password })
    if (res.data.code !== 200 || !(res.data.data as { accessToken?: string })?.accessToken) {
      throw new Error(res.data.message || "Registration failed: No data returned or accessToken missing.")
    }
    accessToken.value = (res.data.data as { accessToken: string }).accessToken
    setAccessToken(accessToken.value)
    // setToken(accessToken.value)
    await getInfo()
    return res
  }
  /** 取得用戶資訊 */
  const getInfo = async () => {
    try {
      const { data } = await api.users.getUserInfo()
      userInfo.value = data.data
    } catch (e) {
      console.log(e)
    }
  }
  /** 登出 */
  const logout = () => {
    removeToken()
    token.value = ""
    resetRouter()
    _resetTagsView()
  }
  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    token.value = ""
  }
  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }
  const getAccessToken = async () => {
    console.warn("checkAccessToken functionality is deprecated. Please update your API calls.")
    throw new Error("此功能已停用，请更新您的 API 调用。")
  }
  const setAccessToken = (token: string) => {
    accessToken.value = token
  }

  const getFirstPermissionRoute = () => {
    //
    const permissions = userInfo.value?.permissions
    if (!permissions) return { path: "/404" }
    const firstView = permissions.find((item: FunctionVo) => item.name === "View")
    if (!firstView) return { path: "/404" }
    const parent = permissions.find((item) => item.id === firstView?.parent)
    if (!parent) return { path: "/404" }
    return { name: `${parent.name}:${firstView.name}` }
    // return {path:'/home'}
  }

  const hasPermission = (permissionRoles: string) => {
    function parseFunction(value: string) {
      const valueSplit = value.split(":")
      let page = ""
      let func = ""
      if (valueSplit.length === 2) {
        page = valueSplit[0]
        func = valueSplit[1]
      } else if (valueSplit.length === 1) {
        page = String(router.currentRoute.value.name || "").split(":")[0]
        func = valueSplit[0]
      }
      return { page, func }
    }
    function isValid(permissions: FunctionVo[], page: string, func: string) {
      const parent = permissions.find((item) => item.parent && item.name === page)
      if (!parent) return false
      return permissions.find((item) => item.parent == parent.id && item.name === func)
    }

    const routerName = router.currentRoute.value.name?.toString()
    const permissions = userInfo.value?.permissions
    if (!permissions || !routerName) return false
    const { page, func } = parseFunction(permissionRoles)
    return isValid(permissions, page, func)
  }

  return {
    token,
    userInfo,
    accessToken,
    getAccessToken,
    login,
    getInfo,
    logout,
    resetToken,
    setAccessToken,
    getFirstPermissionRoute,
    hasPermission,

    loginByEmail,
    register
  }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
