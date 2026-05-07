import router from "@/router"
import { useUserStoreHook } from "@/store/modules/user"
import { usePermissionStoreHook } from "@/store/modules/permission"
import { ElMessage, ElLoading } from "element-plus"
import { getToken } from "@/utils/cache/cookies"
import isWhiteList from "@/config/white-list"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { RouteRecordRaw } from "vue-router"
import { resolveErrorMessage } from "@/utils"

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to) => {
  NProgress.start()
  const userStore = useUserStoreHook()
  const permissionStore = usePermissionStoreHook()
  const loading = ElLoading.service({
    lock: true,
    text: `Goto ${to.meta.title || to.path}...`,
    background: "rgba(0, 0, 0, 0.7)"
  })
  //檢查Cache裡是否有token
  try {
    if (getToken()) {
      if (to.path === "/login") {
        //如果已經登入，且準備進入Login頁面，則導到主頁
        return { path: "/" }
      } else {
        await userStore.getInfo()
        const permissions = userStore.userInfo?.permissions
        if (!permissions) {
          userStore.logout()
          throw new Error("You hava no permission to access this page.")
        }
        await permissionStore.setRoutesByFunctions(permissions)

        const dynamicRoutes = permissionStore.routes
        const dynamicRouteUrls = generateAllUrls(dynamicRoutes, "")
        const inDynamicRouteUrl = includeUrl(dynamicRouteUrls, to.path)
        // console.log(dynamicRoutes, dynamicRouteUrls, inDynamicRouteUrl)
        // console.log("allUrl", dynamicRouteUrls)
        // console.log("in allUrl", dynamicRouteUrls)
        if (inDynamicRouteUrl) return true
        const allUrl = generateAllUrls(router.getRoutes(), "")
        const inAllUrl = includeUrl(allUrl, to.path)
        if (inAllUrl) return { path: "/403" }
        return { path: "/404" }
        // const allUrl = generateAllUrls(_allRoutes, "")
        // const permissionUrl = generateAllUrls(permissionRoutes, "")
        // const path = getCleanUrl(to.fullPath, to.params)
        // const inAllUrl = includeUrl(allUrl, path)
        // const inPermissionUrl = includeUrl(permissionUrl, path)
        // console.log("path", path)
        // console.log("inAllUrl", inAllUrl)
        // console.log("permissionUrl", permissionUrl)
        // console.log("inPermissionUrl", inPermissionUrl)
        // return inDynamicRouteUrl
        // if (inPermissionUrl) {
        //   if (inAllUrl) return true
        //   return { path: "/404" }
        // } else {
        //   if (inAllUrl) return true
        //   return { path: "/403" }
        // }
      }
    } else {
      // 如果没有 Token
      // 如果在免登入的白名单中，则直接進入
      if (!isWhiteList(to)) {
        // 其他没有權限的頁面會被導到登入頁面
        return { path: "/login" }
      }
      return true
    }
  } catch (err: any) {
    // 過程中發生任何錯誤，都直接重置 Token，並導到登錄頁面
    userStore.resetToken()
    console.error(err)
    ElMessage.error(resolveErrorMessage(err, "路由守衛發生錯誤"))
    return { path: "/login" }
  } finally {
    NProgress.done()
    loading.close()
  }
})

router.afterEach(() => {
  NProgress.done()
})

function generateAllUrls(routesArray: RouteRecordRaw[], baseUrl = "") {
  const urls: Array<string> = []

  routesArray.forEach((route) => {
    // 當前路由的完整url
    const fullPath = baseUrl + route.path

    urls.push(fullPath)

    // 如果有子路由，则遞迴生成子路由的url
    if (route.children && route.children.length > 0) {
      const childUrls = generateAllUrls(route.children, fullPath === "/" ? fullPath : fullPath + "/")
      urls.push(...childUrls)
    }
  })

  return urls
}

// function getCleanUrl(fullPath: string, _params: RouteParams): string {
//   // const pathArray = fullPath.split("/")
//   // for (let i = 0; i < Object.keys(params).length; i++) {
//   //   pathArray.pop()
//   // }
//   // return pathArray.join("/")
//   const pathArray = fullPath.split("?")
//   return pathArray[0]
// }

function includeUrl(urls: Array<string>, target: string): boolean {
  return urls.some((url) => {
    url = url.split(":")[0]
    return url === target
  })
}
