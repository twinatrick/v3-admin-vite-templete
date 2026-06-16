<script setup lang="ts">
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { showLoading, resolveErrorMessage } from "@/utils"
import { UserJobLink } from "../type"
import service from "../service"

const visible = ref(false)
const target = ref<UserJobLink>({})
const emit = defineEmits(["reload"])

const show = (row: UserJobLink) => {
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
    await service.deleteUserJobLink(target.value.id)
    ElMessage.success("User job link deleted successfully")
    emit("reload")
    hide()
  } catch (e: any) {
    ElMessage.error(resolveErrorMessage(e, "Delete user job link failed"))
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
  <el-dialog v-model="visible" id="userJobLinkDeleteDialog" :close-on-click-modal="false">
    <template #header><h2>Do you want to delete this link?</h2></template>
    <el-descriptions :column="2" :border="true">
      <el-descriptions-item :span="2" label-class-name="description-label" label="User:">
        {{ target.userEmail }}
      </el-descriptions-item>
      <el-descriptions-item :span="2" label-class-name="description-label" label="Job Title:">
        {{ target.jobTitle }}
      </el-descriptions-item>
      <el-descriptions-item :span="2" label-class-name="description-label" label="Company:">
        {{ target.companyName || "-" }}
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button icon="SwitchButton" type="info" @click="hide">Cancel</el-button>
      <el-button icon="Delete" type="primary" @click="confirmBtnClick">Confirm</el-button>
    </template>
  </el-dialog>
</template>
