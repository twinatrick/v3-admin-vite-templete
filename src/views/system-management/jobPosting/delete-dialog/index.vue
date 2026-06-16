<script setup lang="ts">
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { showLoading, resolveErrorMessage } from "@/utils"
import { JobPosting } from "../type"
import service from "../service"

const visible = ref(false)
const target = ref<JobPosting>({})
const emit = defineEmits(["reload"])

const show = (row: JobPosting) => {
  target.value = row
  visible.value = true
}
const hide = () => {
  visible.value = false
}

const confirmBtnClick = async () => {
  if (!target.value.id) return
  const loading = showLoading("Deleting...")
  try {
    await service.deleteJobPosting(target.value.id)
    ElMessage.success("Job posting deleted successfully")
    emit("reload")
    hide()
  } catch (e: any) {
    ElMessage.error(resolveErrorMessage(e, "Delete job posting failed"))
  } finally {
    loading.close()
  }
}

defineExpose({ show, hide })
</script>
<style>
.description-label {
  width: 20%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
<template>
  <el-dialog v-model="visible" id="jobPostingDeleteDialog" :close-on-click-modal="false">
    <template #header><h2>Do you want to delete this job posting?</h2></template>
    <el-descriptions :column="2" :border="true">
      <el-descriptions-item :span="2" label-class-name="description-label" label="Title:">
        {{ target.title }}
      </el-descriptions-item>
      <el-descriptions-item :span="2" label-class-name="description-label" label="Company:">
        {{ target.companyName }}
      </el-descriptions-item>
      <el-descriptions-item :span="2" label-class-name="description-label" label="URL:">
        {{ target.url || "-" }}
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button icon="SwitchButton" type="info" @click="hide">Cancel</el-button>
      <el-button icon="Delete" type="primary" @click="confirmBtnClick">Confirm</el-button>
    </template>
  </el-dialog>
</template>
