import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { type RouteRecordRaw } from "vue-router"
import { asyncRoutes, constantRoutes, ErrorPage } from "@/router"
import asyncRouteSettings from "@/config/async-route"
import * as RoleType from "@/views/system-management/role/type"

const hasPermission = (_roles: string[], _route: RouteRecordRaw) => {
  // return true
  const routeRoles = _route.meta?.roles
  return routeRoles ? _roles.some((role) => routeRoles.includes(role)) : true
}

const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tempRoute = { ...route }
    if (hasPermission(roles, tempRoute)) {
      if (tempRoute.children) {
        tempRoute.children = filterAsyncRoutes(tempRoute.children, roles)
      }
      res.push(tempRoute)
    }
  })
  return res
}
/** 根據permission陣列來生成對應的route陣列 */
const getAsyncRoutesByPermissions = (permissions: string[]) => {
  const routes: RouteRecordRaw[] = []
  permissions.forEach((path) => {
    const target = asyncRoutes.find((route) => route.path === path)
    if (target) routes.push(target)
  })
  return routes
}

function getAsyncRouteByName(routes: RouteRecordRaw[], permissions: string[]): RouteRecordRaw[] {
  function filterRoutes(route: RouteRecordRaw): RouteRecordRaw | undefined {
    if (route.children) {
      // 遞迴處理子路由
      const temp: RouteRecordRaw[] = []
      route.children.forEach((child) => {
        const res = filterRoutes(child)
        if (res) temp.push(res)
      })
      route.children = temp
    }

    // 檢查當前路由的 path 是否在 permissions 中存在
    if (permissions.find((name) => name === route.name) || route.children?.length) {
      return route
    }

    // 如果當前路由的 path 不在 permissions 中存在，返回 undefined
    return undefined
  }

  // 對每個路由配置進行篩選
  const filteredRoutes: RouteRecordRaw[] = routes.map(filterRoutes).filter(Boolean) as RouteRecordRaw[]

  return filteredRoutes
}

const getAsyncRouteByFunctions = (routes: RouteRecordRaw[], permissions: RoleType.Function[]): RouteRecordRaw[] => {
  function filterRoutes(route: RouteRecordRaw): RouteRecordRaw | undefined {
    if (route.children) {
      // 遞迴處理子路由
      const temp: RouteRecordRaw[] = []
      route.children.forEach((child) => {
        const res = filterRoutes(child)
        if (res) temp.push(res)
      })
      route.children = temp
    }
    const isMatch = (f: RoleType.Function) => {
      if (route.children === undefined && route.name === undefined) return true
      const parent = permissions.find((p) => f.parent === p.id)
      if (!parent) return false
      const name = `${parent.name}:${f.name}`
      return name === route.name
    }
    // 檢查當前路由的 path 是否在 permissions 中存在
    if (permissions.find(isMatch) || route.children?.length) {
      return route
    }

    // 如果當前路由的 path 不在 permissions 中存在，返回 undefined
    return undefined
  }
  // 對每個路由配置進行篩選
  return routes.map(filterRoutes).filter(Boolean) as RouteRecordRaw[]
}

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([])
  const dynamicRoutes = ref<RouteRecordRaw[]>([])

  const setRoutes = (roles: string[]) => {
    const accessedRoutes = asyncRouteSettings.open ? filterAsyncRoutes(asyncRoutes, roles) : asyncRoutes
    routes.value = constantRoutes.concat(accessedRoutes)
    dynamicRoutes.value = accessedRoutes
  }

  const setRoutesByPermissions = (permissions: string[]) => {
    const accessedRoutes = getAsyncRoutesByPermissions(permissions)
    routes.value = constantRoutes.concat(accessedRoutes).concat(ErrorPage)
    dynamicRoutes.value = accessedRoutes
  }

  const setRoutesByName = (permissions: string[]) => {
    // const accessedRoutes = getAsyncRouteByName(asyncRoutes, permissions)
    // routes.value = constantRoutes.concat(accessedRoutes).concat(ErrorPage)
    // dynamicRoutes.value = accessedRoutes
    dynamicRoutes.value = getAsyncRouteByName(asyncRoutes, permissions)
    routes.value = constantRoutes.concat(asyncRoutes).concat(ErrorPage)
  }
  const setRoutesByFunctions = (permissions: RoleType.Function[]) => {
    dynamicRoutes.value = getAsyncRouteByFunctions(asyncRoutes, permissions)
    routes.value = constantRoutes.concat(asyncRoutes).concat(ErrorPage)
  }

  return {
    routes,
    dynamicRoutes,
    setRoutes,
    setRoutesByPermissions,
    setRoutesByName,
    setRoutesByFunctions
  }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
