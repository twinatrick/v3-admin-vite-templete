<script setup lang="ts">
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { showLoading, resolveErrorMessage } from "@/utils"
import { Company } from "../type"
import service from "../service"

const visible = ref(false)
const target = ref<Company>({})
const emit = defineEmits(["reload"])

const show = (row: Company) => {
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
    await service.deleteCompany(target.value.id)
    ElMessage.success("Company deleted successfully")
    emit("reload")
    hide()
  } catch (e: any) {
    ElMessage.error(resolveErrorMessage(e, "Delete company failed"))
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
  <el-dialog v-model="visible" id="companyDeleteDialog" :close-on-click-modal="false">
    <template #header><h2>Do you want to delete this company?</h2></template>
    <el-descriptions :column="2" :border="true">
      <el-descriptions-item :span="2" label-class-name="description-label" label="Name:">
        {{ target.name }}
      </el-descriptions-item>
      <el-descriptions-item :span="2" label-class-name="description-label" label="Websites:">
        {{ target.websites?.join(", ") || "-" }}
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button icon="SwitchButton" type="info" @click="hide">Cancel</el-button>
      <el-button icon="Delete" type="primary" @click="confirmBtnClick">Confirm</el-button>
    </template>
  </el-dialog>
</template>
