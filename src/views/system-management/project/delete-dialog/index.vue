<script setup lang="ts">
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { showLoading } from "@/utils"
import { resolveErrorMessage } from "@/utils"
import service from "../service"
import { ProjectVo } from "@/api/generated/Api"

// Data
const visible = ref(false)
const projectData = ref<ProjectVo>({})
const emit = defineEmits(["reload"])

// Functions
const show = (data: ProjectVo) => {
  projectData.value = data
  visible.value = true
}

const hide = () => {
  visible.value = false
}

const confirmBtnClick = async () => {
  const loading = showLoading("刪除中...")
  try {
    await service.deleteProject(projectData.value)
    ElMessage.success("刪除項目成功")
    emit("reload")
    hide()
  } catch (e: any) {
    ElMessage.error(resolveErrorMessage(e, "刪除失敗"))
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
  <el-dialog v-model="visible" title="確認刪除" width="500px">
    <div class="mb-4">
      <p class="text-lg mb-2">確定要刪除以下項目嗎？</p>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="項目名稱">{{ projectData.name }}</el-descriptions-item>
        <el-descriptions-item label="描述">{{ projectData.description || "無" }}</el-descriptions-item>
        <el-descriptions-item label="創建者">{{ projectData.createdBy }}</el-descriptions-item>
      </el-descriptions>
      <el-alert class="mt-4" type="warning" :closable="false">
        <template #title>
          <span class="font-bold">警告：刪除項目將會同時刪除所有相關的技能綁定！</span>
        </template>
      </el-alert>
    </div>

    <template #footer>
      <el-button icon="Close" type="info" @click="hide">取消</el-button>
      <el-button icon="Delete" type="danger" @click="confirmBtnClick">確認刪除</el-button>
    </template>
  </el-dialog>
</template>
