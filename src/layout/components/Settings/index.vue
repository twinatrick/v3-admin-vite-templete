<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/store/modules/settings"
import { removeConfigLayout } from "@/utils/cache/local-storage"
import { Refresh } from "@element-plus/icons-vue"

const settingsStore = useSettingsStore()

/** 使用 storeToRefs 將提取的屬性保持其響應性 */
const {
  showTagsView,
  // showSidebarLogo,
  // fixedHeader,
  showNotify,
  showThemeSwitch,
  // showScreenfull,
  cacheTagsView,
  // showGreyMode,
  showColorWeakness
} = storeToRefs(settingsStore)

/** 定義 switch 設定 */
const switchSettings = {
  "Show Tag View": showTagsView,
  // "Show Sidebar Logo": showSidebarLogo,
  // "Fixed Header": fixedHeader,
  "Show Notify": showNotify,
  "Show Theme Switch": showThemeSwitch,
  // "Show Fullscreen": showScreenfull,
  "Cache Tags View": cacheTagsView,
  // "Show Gray Mode": showGreyMode,
  "Show Color Weakness": showColorWeakness
}

/** 重置設定 */
const reset = () => {
  removeConfigLayout()
  location.reload()
}
</script>

<template>
  <div class="setting-container">
    <h4>System Layout Config</h4>
    <div class="setting-item" v-for="(settingValue, settingName, index) in switchSettings" :key="index">
      <span class="setting-name">{{ settingName }}</span>
      <el-switch v-model="settingValue.value" />
    </div>
    <el-button type="danger" :icon="Refresh" @click="reset">Reset</el-button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.setting-container {
  padding: 20px;
  .setting-item {
    font-size: 14px;
    padding: 6px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .setting-name {
      @include ellipsis;
    }
  }
  .el-button {
    margin-top: 40px;
    width: 100%;
  }
}
</style>
