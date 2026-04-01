<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme"
import en from "element-plus/es/locale/lang/en"
import { ElementPlus } from "@element-plus/icons-vue"
import { ElMessageBox, ElText } from "element-plus"
import { h } from "vue"

const { initTheme } = useTheme()
const handleClick = () => {
  // @ts-ignore
  const frontendVersion = _GIT_SHA
  const backendVersion = "not implement yet"
  ElMessageBox({
    title: "Version",
    message: h("div", null, [
      h(
        "p",
        null,
        h(ElText, { truncated: true }, () => `Frontend version: ${frontendVersion}`)
      ),
      h("p", null, `BackendVersion: ${backendVersion}`)
    ])
  })
}
initTheme()
</script>
<style lang="scss">
.el-select {
  --el-select-width: 220px;
}
</style>
<template>
  <ElConfigProvider :locale="en">
    <router-view />
    <el-button
      size="small"
      z-10000
      position-absolute
      bottom-0
      right-0
      m-2
      text
      circle
      :icon="ElementPlus"
      @click="handleClick"
    />
  </ElConfigProvider>
</template>
