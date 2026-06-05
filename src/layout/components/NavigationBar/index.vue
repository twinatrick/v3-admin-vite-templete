<script lang="ts" setup>
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useAppStore } from "@/store/modules/app"
import { useSettingsStore } from "@/store/modules/settings"
import { useUserStore } from "@/store/modules/user"
import { UserFilled } from "@element-plus/icons-vue"
import Breadcrumb from "../Breadcrumb/index.vue"
import Hamburger from "../Hamburger/index.vue"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import Screenfull from "@/components/Screenfull/index.vue"
import { onMounted, ref } from "vue"
import { getActiveThemeName } from "@/utils/cache/local-storage"

const router = useRouter()
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const userStore = useUserStore()
const dialogVisible = ref(false)
const DEFAULT_THEME_NAME = "normal"
const activeThemeName = ref(DEFAULT_THEME_NAME)
const { sidebar } = storeToRefs(appStore)
const { showThemeSwitch, showScreenfull } = storeToRefs(settingsStore)

/** 切换侧边栏 */
const toggleSidebar = () => {
  appStore.toggleSidebar(false)
}
const showUserInfo = () => {
  dialogVisible.value = true
}
/** 登出 */
const logout = () => {
  userStore.logout()
  router.push("/login")
}

const getMarquee = async () => {
  changeColor()
}
const changeColor = () => {
  setTimeout(() => {
    activeThemeName.value = getActiveThemeName() || DEFAULT_THEME_NAME
  }, 30)
}
onMounted(() => {
  getMarquee()
})
</script>

<template>
  <div class="navigation-bar">
    <Hamburger :is-active="sidebar.opened" class="hamburger" @toggle-click="toggleSidebar" />
    <Breadcrumb class="breadcrumb display-none!" />

    <div class="right-menu items-end">
      <Screenfull v-if="showScreenfull" class="right-menu-item" />
      <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" @changeTheme="changeColor" />

      <div :style="{ color: 'var(--el-text-color-primary)' }">
        {{ userStore.userInfo?.name || userStore.userInfo?.email }}
      </div>

      <el-dropdown class="right-menu-item">
        <div class="right-menu-avatar">
          <el-avatar :icon="UserFilled" :size="30" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="showUserInfo" align="right"> User Info </el-dropdown-item>
            <el-dropdown-item @click="logout" align="right"> Logout </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" align-center width="40%">
    <el-descriptions title="User Info" size="large" :column="1" border>
      <el-descriptions-item label="E-mail" label-align="right" text-truncate>
        {{ userStore.userInfo?.email }}
      </el-descriptions-item>
      <el-descriptions-item label="Role" label-align="right">
        {{ userStore.userInfo?.roleArr?.join(",") }}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<style lang="scss" scoped>
.customDescriptionItem {
  text-overflow: ellipsis;
}
.navigation-bar {
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  background: #fff;
  display: flex;
  width: 100%;
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    float: left;
    // 参考 Bootstrap 的响应式设计将宽度设置为 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  .marquee {
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: 5px;
    font-size: 30px;
  }
  .right-menu {
    margin-left: auto;
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #606266;
    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
      .right-menu-avatar {
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 10px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
