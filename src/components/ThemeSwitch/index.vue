<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme"
import { MagicStick } from "@element-plus/icons-vue"

const prop = defineProps({
  iconSize: {
    type: Number,
    default: 20
  }
})

const { themeList, activeThemeName, setTheme } = useTheme()
const changeTheme = () => {
  emit("changeTheme")
}
const emit = defineEmits(["changeTheme"])
</script>

<template>
  <el-dropdown trigger="click" @command="setTheme">
    <div>
      <el-tooltip effect="dark" content="Theme" placement="bottom">
        <el-icon :size="prop.iconSize">
          <MagicStick />
        </el-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(theme, index) in themeList"
          :key="index"
          :disabled="activeThemeName === theme.name"
          :command="theme.name"
          @click="changeTheme"
        >
          <span>{{ theme.title }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
