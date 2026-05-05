<script setup lang="ts">
import { PropType, ref } from "vue"
import { ElLoading, ElTree } from "element-plus"
import { waitUntil } from "@/utils"
import { api } from "@/api/client"
import { RoleVO, TreeProp } from "../type"
//data
const visible = ref(false)
const prop = defineProps({
  allFunctions: {
    type: Array as PropType<TreeProp[]>,
    default: () => []
  }
})
const defaultProps: Object = {
  children: "children",
  label: (data: TreeProp) => {
    return data.name
  }
}
const formData = ref<RoleVO>({})
const treeRef = ref<InstanceType<typeof ElTree> | null>(null)
const emit = defineEmits<{
  (event: "create", value: RoleVO): void
}>()
//function
const show = async () => {
  visible.value = true
  formData.value = {}
  await waitUntil(() => treeRef.value !== null)
  // 清空 Tree 的選中狀態
  treeRef.value?.setCheckedKeys([])
}
const hide = () => {
  visible.value = false
}
const confirmClick = async () => {
  const loading = ElLoading.service({
    text: "Creating..."
  })
  try {
    // 獲取選中的 function IDs（leafOnly=true 只取葉子節點）
    const checkedKeys = (treeRef.value?.getCheckedKeys(true) || []) as string[]

    // 1. 先創建 role（不包含 functionIds，因為後端不會自動處理）
    const requestData: RoleVO = {
      name: formData.value.name,
      description: formData.value.description
    }

    const res = await api.roles.addRole(requestData)
    const data = res?.data

    // 2. 如果有選中的 functions 且創建成功，則綁定 functions
    if (checkedKeys.length > 0 && data?.id) {
      await api.roles.roleBindFunction({
        role: data.id,
        functionList: checkedKeys
      })
    }

    emit("create", { ...data, functionKeys: checkedKeys })
    hide()
  } catch (e) {
    console.error(e)
  } finally {
    loading.close()
  }
}
defineExpose({
  show,
  hide
})
</script>

<template>
  <el-dialog v-model="visible" top="5vh" :close-on-click-modal="false">
    <template #header>
      <h1 text-center my-0>Create Role</h1>
    </template>
    <el-form label-width="auto">
      <el-form-item label="Name">
        <el-input v-model="formData.name" />
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

<style scoped></style>
