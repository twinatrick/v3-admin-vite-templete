<script lang="ts" setup>
// import { parseRouteTitle } from "@/utils"
import { ref, watch } from "vue"
import { type RouteLocationMatched, useRoute } from "vue-router"

const route = useRoute()
// const router = useRouter()

/** 定义响应式数据 breadcrumbs，用于存储面包屑导航信息 */
const breadcrumbs = ref<RouteLocationMatched[]>([])

/** 获取面包屑导航信息 */
const getBreadcrumb = () => {
  breadcrumbs.value = route.matched
    .filter((item) => item.path !== route.path && item.meta.title && item.meta?.breadcrumb !== false)
    .concat([route as any])
}

/** 编译路由路径 */
// const pathCompile = (path: string) => {
//   const toPath = compile(path)
//   return toPath(route.params)
// }

/** 处理面包屑导航点击事件 */
// const handleLink = (item: RouteLocationMatched) => {
//   const { redirect, path } = item
//   if (redirect) {
//     router.push(redirect as string)
//     return
//   }
//   router.push(pathCompile(path))
// }

/** 监听路由变化，更新面包屑导航信息 */
watch(
  () => route.path,
  (path) => {
    if (path.startsWith("/redirect/")) return
    getBreadcrumb()
  }
)

/** 初始化面包屑导航信息 */
getBreadcrumb()
</script>

<template>
  <el-breadcrumb class="app-breadcrumb">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
      <!-- <span v-if="item.redirect === 'noRedirect' || index === breadcrumbs.length - 1" class="no-redirect">
        {{ item.meta.title }}
      </span>
      <span disabled v-else @click.prevent="handleLink(item)">
        {{ item.meta.title }}
      </span> -->
      <!--      <span>-->
      <!--        {{ parseRouteTitle(item) }}-->
      <!--      </span>-->
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: var(--v3-navigationbar-height);
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
