import { type RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory } from "vue-router"

const Layout = () => import("@/layout/index.vue")

/** 常駐路由 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    redirect: "/personal-management"
  },
  {
    path: "/sa",
    redirect: "/sa/f",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "u",
        component: () => import("@/views/system-management/user/index.vue"),
        meta: {
          title: "User",
          elIcon: "Setting",
          hidden: true,
          tagView: false
        }
      },
      {
        path: "f",
        component: () => import("@/views/system-management/Function/index.vue"),
        meta: {
          title: "Function",
          elIcon: "Setting",
          hidden: true,
          tagView: false
        }
      },
      {
        path: "r",
        component: () => import("@/views/system-management/role/index.vue"),
        meta: {
          title: "Role Permission",
          elIcon: "User",
          hidden: true,
          tagView: false
        }
      }
    ]
  },
  {
    path: "/personal-management",
    component: Layout,
    redirect: "/personal-management/skill",
    meta: {
      title: "個人管理",
      elIcon: "User",
      alwaysShow: true
    },
    children: [
      {
        path: "skill",
        component: () => import("@/views/personal-management/skill/index.vue"),
        meta: {
          title: "我的技能",
          elIcon: "Star",
          keepAlive: false
        }
      },
      {
        path: "project",
        component: () => import("@/views/personal-management/project/index.vue"),
        meta: {
          title: "我的項目",
          elIcon: "Folder",
          keepAlive: false
        }
      },
      {
        path: "job",
        component: () => import("@/views/personal-management/job/index.vue"),
        meta: {
          title: "我的職缺",
          elIcon: "List",
          keepAlive: false
        }
      }
    ]
  },
  {
    path: "/ask",
    component: Layout,
    redirect: "/ask/index",
    meta: {
      title: "語音助理",
      elIcon: "Microphone",
      alwaysShow: true
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/ask/index.vue"),
        meta: {
          title: "語音辨識",
          elIcon: "Microphone",
          keepAlive: false
        }
      }
    ]
  }
]

/**
 * 動態路由
 * 用来放置有權限 (Roles 屬性) 的路由
 * 必須帶有 Name 屬性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/dataView",
    component: Layout,
    redirect: "/system/user",
    meta: {
      title: "System Mgmt",
      elIcon: "Odometer",
      alwaysShow: true
    },
    children: [
      {
        path: "aquarkData",
        component: () => import("@/views/system-management/aquarkData/index.vue"),
        name: "AquarkData:View",
        meta: {
          title: "aquarkData",
          elIcon: "UserFilled",
          keepAlive: false
        }
      },
      {
        path: "aquarkDataAverage",
        component: () => import("@/views/system-management/aquarkDataAvg/index.vue"),
        name: "AquarkDataAvg:View",
        meta: {
          title: "aquarkDataAvg",
          elIcon: "UserFilled",
          keepAlive: false
        }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    meta: {
      title: "System Mgmt",
      elIcon: "Odometer",
      alwaysShow: true
    },
    children: [
      {
        path: "user",
        component: () => import("@/views/system-management/user/index.vue"),
        name: "User:View",
        meta: {
          title: "User",
          elIcon: "UserFilled",
          keepAlive: false
        }
      },
      {
        path: "limitSetting",
        component: () => import("@/views/system-management/limitSetting/index.vue"),
        name: "LimitSetting:View",
        meta: {
          title: "limitSetting",
          elIcon: "UserFilled",
          keepAlive: false
        }
      }
    ]
  },
  {
    path: "/system-admin",
    component: Layout,
    redirect: "/system-admin/setting",
    meta: {
      title: "System Admin",
      elIcon: "Setting",
      alwaysShow: true
    },
    children: [
      {
        path: "role",
        component: () => import("@/views/system-management/role/index.vue"),
        name: "RolePermission:View",
        meta: {
          title: "Role Permission",
          elIcon: "User",
          keepAlive: false
        }
      },
      {
        path: "skill",
        component: () => import("@/views/system-management/skill/index.vue"),
        name: "SkillManagement:View",
        meta: {
          title: "技能管理",
          elIcon: "Star",
          keepAlive: false
        }
      },
      {
        path: "project",
        component: () => import("@/views/system-management/project/index.vue"),
        name: "ProjectManagement:View",
        meta: {
          title: "項目管理",
          elIcon: "Folder",
          keepAlive: false
        }
      },
      {
        path: "company",
        component: () => import("@/views/system-management/company/index.vue"),
        name: "Company:View",
        meta: {
          title: "公司管理",
          elIcon: "OfficeBuilding",
          keepAlive: false
        }
      },
      {
        path: "jobPosting",
        component: () => import("@/views/system-management/jobPosting/index.vue"),
        name: "JobPosting:View",
        meta: {
          title: "職缺管理",
          elIcon: "List",
          keepAlive: false
        }
      },
      {
        path: "userJobLink",
        component: () => import("@/views/system-management/userJobLink/index.vue"),
        name: "UserJobLink:View",
        meta: {
          title: "職缺連結管理",
          elIcon: "Link",
          keepAlive: false
        }
      }
    ]
  }
]
export const ErrorPage: RouteRecordRaw = {
  path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
  redirect: "/404",
  // name: "ErrorPage",
  meta: {
    hidden: true
  }
}

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === "hash"
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes.concat(asyncRoutes).concat(ErrorPage)
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
