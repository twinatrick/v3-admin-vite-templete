<script setup lang="ts">
import { PropType, ref } from "vue"
type DrawerType = {
  [key: string]: DrawerMethodType[]
}
type DrawerMethodType = {
  methodName: string
  method: Function
}
const prop = defineProps({
  data: {
    type: Object as PropType<DrawerType>,
    default: () => ({})
  }
})
const isDev = import.meta.env.DEV
const visible = ref(false)
const show = () => (visible.value = true)
const hide = () => (visible.value = false)
const toggle = () => (visible.value = !visible.value)
const buttonOnClick = async (f: Function) => {
  try {
    await f()
  } catch (e) {
    console.error(e)
  }
}
defineExpose({
  show,
  hide,
  toggle
})
</script>
<style lang="scss">
#dev-drawer-20240301 {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
<template>
  <div v-if="isDev" id="dev-drawer-20240301">
    <el-button circle text icon="Tools" @click="toggle" />
    <el-drawer v-model="visible">
      <el-collapse>
        <el-collapse-item v-for="([key, children], index) in Object.entries(prop.data)" :key="index" :title="key">
          <el-button v-for="(f, c_index) in children" :key="c_index" @click="buttonOnClick(f.method)">
            {{ f.methodName }}
          </el-button>
        </el-collapse-item>
      </el-collapse>
    </el-drawer>
  </div>
</template>
