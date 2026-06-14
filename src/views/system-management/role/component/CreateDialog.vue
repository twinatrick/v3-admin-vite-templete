<script setup lang="ts">
import { PropType, reactive, ref } from "vue"
import { CascaderProps, ElLoading, ElForm, ElMessage } from "element-plus"
import { api } from "@/api/client"
import { RoleVO, TreeProp, RoleFormData } from "../type"
import { resolveErrorMessage } from "@/utils"
//data
const visible = ref(false)
const prop = defineProps({
  allFunctions: {
    type: Array as PropType<TreeProp[]>,
    default: () => []
  }
})
const cascaderProps: CascaderProps = {
  multiple: true, // 多選模式
  checkStrictly: false, // 只能選擇葉子節點
  emitPath: false, // 只返回葉子節點的值（不返回完整路徑）
  value: "id", // 節點的唯一標識
  label: "name", // 節點顯示的文本
  children: "children", // 子節點的屬性名
  expandTrigger: "hover" // 滑鼠懸停展開
}
const formData = reactive(new RoleFormData())
const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const selectedFunctionIds = ref<string[]>([])
const emit = defineEmits<{
  (event: "create", value: RoleVO): void
}>()
//function
const show = async () => {
  visible.value = true
  formData.reset()
  selectedFunctionIds.value = []
  formRef.value?.resetFields()
}
const hide = () => {
  visible.value = false
}
const confirmClick = async () => {
  if (!(await formRef.value?.validate())) {
    ElMessage.error("請填寫必填欄位")
    return
  }
  const loading = ElLoading.service({
    text: "創建中..."
  })
  try {
    const checkedKeys = selectedFunctionIds.value

    const requestData: RoleVO = {
      name: formData.name,
      description: formData.description,
      functionIds: checkedKeys
    }

    const res = await api.roleController.addRoleWithFunctions(requestData)
    const data = res?.data

    emit("create", { ...data, functionKeys: checkedKeys, functionIds: checkedKeys })
    hide()
  } catch (e) {
    console.error(e)
    ElMessage.error(resolveErrorMessage(e, "創建角色失敗"))
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
      <h1 text-center my-0>創建角色</h1>
    </template>
    <el-form ref="formRef" label-width="auto" :rules="RoleFormData.CreateRules" :model="formData.data">
      <el-form-item label="名稱">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="formData.description" />
      </el-form-item>
      <el-form-item label="功能權限">
        <el-cascader
          v-model="selectedFunctionIds"
          :options="prop.allFunctions as any"
          :props="cascaderProps"
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          placeholder="請選擇功能權限"
          style="width: 100%"
        />
        <div class="text-xs text-gray-400 mt-1">儲存時會以目前選取結果完整同步權限。</div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button icon="Check" type="primary" @click="confirmClick"> 確認</el-button>
      <el-button icon="Close" type="danger" @click="hide"> 取消</el-button>
    </template>
  </el-dialog>
</template>

<style scoped></style>
