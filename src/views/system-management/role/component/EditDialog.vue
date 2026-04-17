<script setup lang="ts">
import { PropType, ref } from "vue"
import { RouteRecordRaw } from "vue-router"
import { RoleVO, TreeProp } from "../type"
import { ElTree } from "element-plus"
import { showLoading } from "@/utils"
import { api } from "@/api/client"
//data
const prop = defineProps({
  allFunctions: {
    type: Array as PropType<TreeProp[]>,
    default: () => []
  },
  data: {
    type: Object as PropType<RoleVO>,
    default: () => ({})
  }
})
const formData = ref<RoleVO>({})
const emit = defineEmits(["update"])
const treeRef = ref<InstanceType<typeof ElTree> | null>(null)
const defaultProps: Object = {
  children: "children",
  label: (data: RouteRecordRaw) => {
    return data.name || data.path
  }
}
const visible = ref(false)
//function
const treeIsReady = async () => {
  if (treeRef.value !== null) return Promise.resolve()
  else
    return new Promise<void>((resolve) => {
      const timer = setInterval(() => {
        if (treeRef.value !== null) {
          console.log("tree is ready")
          clearInterval(timer)
          resolve()
        }
      }, 100)
    })
}
const show = async () => {
  formData.value = { ...prop.data }
  visible.value = true
  await treeIsReady()
  treeRef.value?.setCheckedKeys(formData.value.functionKeys || [])
  OldFunctionKeys.value = formData.value.functionKeys || []
  OldFunctionKeys.value = [...OldFunctionKeys.value]
}
const OldFunctionKeys = ref<string[]>([])
const hide = () => {
  visible.value = false
}
const confirmClick = async () => {
  const loading = showLoading("Role updating...")
  try {
    formData.value.functionKeys = (treeRef.value?.getCheckedKeys(true) || []) as string[]
    const { data } = await api.roles.updateRole(formData.value)
    const removeKeys = OldFunctionKeys.value.filter((key) => !formData.value.functionKeys?.includes(key))
    const addKeys = formData.value.functionKeys?.filter((key) => !OldFunctionKeys.value.includes(key))
    if (removeKeys.length > 0)
      await api.roles.roleUnbindFunction({ role: formData.value.id || "", functionList: removeKeys })
    if (addKeys.length > 0) await api.roles.roleBindFunction({ role: formData.value.id || "", functionList: addKeys })
    emit("update", data)
    hide()
  } catch (e) {
    console.log(e)
  } finally {
    loading.close()
  }
}
defineExpose({
  show,
  hide
})
</script>
<style scoped></style>
<template>
  <el-dialog v-model="visible" id="edit-dialog" top="5vh" :close-on-click-modal="false">
    <el-form label-width="auto">
      <el-form-item label="Name">
        <el-input v-model="formData.name" disabled />
      </el-form-item>
      <el-form-item label="Description">
        <el-input type="textarea" v-model="formData.description" />
      </el-form-item>
      <el-form-item label="Function">
        <el-tree ref="treeRef" :data="prop.allFunctions" :props="defaultProps" show-checkbox node-key="id" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button icon="Check" type="primary" @click="confirmClick"> Confirm</el-button>
      <el-button icon="Close" type="danger" @click="hide"> Cancel</el-button>
    </template>
  </el-dialog>
</template>
