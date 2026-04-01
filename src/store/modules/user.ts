import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { useTagsViewStore } from "./tags-view"
import { useSettingsStore } from "./settings"
import { getToken, removeToken } from "@/utils/cache/cookies"
import router, { resetRouter } from "@/router"
import { loginApi } from "@/api/login"
import { checkAccessToken, getUserInfoApi } from "@/api/users"
import { UserInfoVO } from "@/api/users/types/user"
import * as RoleType from "@/views/system-management/role/type"
import { loginUseEmail, registerUseEmail } from "../../api/login"

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "")
  const userInfo = ref<UserInfoVO>()
  const accessToken = ref<string>("")
  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()

  /** 登入 */
  const login = async (authCode: string) => {
    const res = await loginApi(authCode)
    accessToken.value = res.data.accessToken
    await getInfo()
  }
  const loginByEmail = async (email: string, password: string) => {
    const res = await loginUseEmail(email, password)
    if (res.code == -1) return
    accessToken.value = res.data.accessToken
    setAccessToken(accessToken.value)
    // setToken(accessToken.value)
    console.log(accessToken.value)
    await getInfo()
    return res
  }
  const register = async (email: string, password: string) => {
    const res = await registerUseEmail(email, password)
    if (res.code == -1) return
    accessToken.value = res.data.accessToken
    setAccessToken(accessToken.value)
    // setToken(accessToken.value)
    await getInfo()
    return res
  }
  /** 取得用戶資訊 */
  const getInfo = async () => {
    try {
      const { data } = await getUserInfoApi()
      userInfo.value = data
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
    const { data } = await checkAccessToken(accessToken.value)
    accessToken.value = data.access_token
    return accessToken.value
  }
  const setAccessToken = (token: string) => {
    accessToken.value = token
  }

  const getFirstPermissionRoute = () => {
    //
    const permissions = userInfo.value?.permissions
    if (!permissions) return { path: "/404" }
    const firstView = permissions.find((item) => item.name === "View")
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
    function isValid(permissions: RoleType.Function[], page: string, func: string) {
      const parent = permissions.find((item) => item.parent && item.name === page)
      if (!parent) return false
      const child = permissions.find((item) => item.parent == parent.id && item.name === func)
      if (!child) return false
      return true
    }

    const routerName = router.currentRoute.value.name?.toString()
    const permissions = userInfo.value?.permissions
    if (!permissions || !routerName) return false
    const { page, func } = parseFunction(permissionRoles)
    return isValid(permissions, page, func)
  }

  const hasTag = (tagName: string) => {
    return userInfo.value?.tags?.includes(tagName)
  }

  const isSubordinate = (email?: string) => {
    if (!email) return false
    if (!userInfo.value) return false
    if (email === userInfo.value.email) return true
    return userInfo.value.subordinate?.includes(email)
  }
  const isSupervisor = (email?: string) => {
    if (!email) return false
    if (!userInfo.value) return false
    if (email === userInfo.value.email) return true
    return userInfo.value.supervisor?.includes(email)
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
    hasTag,
    isSubordinate,
    isSupervisor,
    loginByEmail,
    register
  }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
