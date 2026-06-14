<script setup lang="ts">
import { PropType, reactive, ref } from "vue"
import { RoleVO, TreeProp, RoleFormData } from "../type"
import { showLoading } from "@/utils"
import { resolveErrorMessage } from "@/utils"
import { api } from "@/api/client"
import { CascaderProps, ElForm, ElMessage } from "element-plus"
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
const cascaderProps: CascaderProps = {
  multiple: true, // 多選模式
  checkStrictly: false, // 只能選擇葉子節點
  emitPath: false, // 只返回葉子節點的值
  value: "id", // 節點的唯一標識
  label: "name", // 節點顯示的文本
  children: "children", // 子節點的屬性名
  expandTrigger: "hover" // 滑鼠懸停展開
}
const formData = reactive(new RoleFormData(prop.data))
const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const selectedFunctionIds = ref<string[]>([])
const emit = defineEmits(["update"])
const visible = ref(false)
//function
const show = async () => {
  formData.data = { ...prop.data } // 使用 formData.data = { ...prop.data } 來更新響應式對象
  formData.reset()
  formData.data = { ...prop.data } // 確保數據完整複製

  // 1. 優先使用 functionKeys，若不存在則使用 functionIds
  const rawFunctionIds = formData.functionKeys || formData.data.functionIds || []

  // 2. 過濾掉不存在於 allFunctions 中的 function ID
  const validFunctionIds = rawFunctionIds.filter((id) => isFunctionIdValid(id, prop.allFunctions))

  // 3. 更新 formData 中的 functionKeys
  formData.functionKeys = validFunctionIds

  // 4. 初始化選擇框的值
  selectedFunctionIds.value = [...validFunctionIds]

  formRef.value?.resetFields()
  visible.value = true
}

/**
 * 檢查 function ID 是否存在於樹形結構中
 */
const isFunctionIdValid = (id: string, functions: TreeProp[]): boolean => {
  for (const func of functions) {
    if (func.id === id) return true
    if (func.children && isFunctionIdValid(id, func.children)) return true
  }
  return false
}

const hide = () => {
  visible.value = false
}
const confirmClick = async () => {
  if (!(await formRef.value?.validate())) {
    ElMessage.error("請填寫必填欄位")
    return
  }
  const loading = showLoading("角色更新中...")
  try {
    formData.functionKeys = selectedFunctionIds.value
    const { data } = await api.roleController.updateRoleWithFunctions({
      ...formData.data,
      functionIds: selectedFunctionIds.value
    })
    emit("update", { ...data, functionKeys: selectedFunctionIds.value, functionIds: selectedFunctionIds.value })
    hide()
  } catch (e) {
    console.log(e)
    ElMessage.error(resolveErrorMessage(e, "更新角色失敗"))
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
    <template #header>
      <h1 text-center my-0>編輯角色</h1>
    </template>
    <el-form ref="formRef" label-width="auto" :rules="RoleFormData.EditRules" :model="formData.data">
      <el-form-item label="名稱">
        <el-input v-model="formData.name" disabled />
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
        <div class="text-xs text-gray-400 mt-1">儲存時會以目前選取結果完整同步權限，清空代表移除所有權限。</div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button icon="Check" type="primary" @click="confirmClick"> 確認</el-button>
      <el-button icon="Close" type="danger" @click="hide"> 取消</el-button>
    </template>
  </el-dialog>
</template>
