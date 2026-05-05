<script setup lang="ts">
import { UserVo } from "@/api/generated/Api"
import { computed, ref, reactive } from "vue"
import { UserVOFormData } from "@/views/system-management/user/type"
import service from "../service"
import { showLoading } from "@/utils"
import { ElMessage } from "element-plus"
//data
const formData = reactive(new UserVOFormData())
const visible = ref(false)
const roleList = computed(() => service.data.role)
//functions
const show = (data: UserVo) => {
  formData.data = { ...data }
  visible.value = true
}
const hide = () => {
  visible.value = false
}
const roleNames = computed(() => {
  const roleNameList = formData.roles?.map((role) => roleList.value.find((item) => item.id === role)?.name)
  return roleNameList?.join(", ")
})
const confirmBtnClick = async () => {
  const loading = showLoading("Deleting...")
  try {
    await service.deleteUser(formData.data)
    ElMessage.success("User deleted successfully")
    hide()
  } catch (e: any) {
    console.error(e.message)
    ElMessage.error(e.message)
  } finally {
    loading.close()
  }
}
//init
defineExpose({
  show,
  hide
})
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
  <el-dialog v-model="visible" id="userDeleteDialog" :close-on-click-modal="false">
    <template #header><h2>Do you want to delete this user?</h2></template>
    <el-descriptions :column="2" :border="true">
      <el-descriptions-item :span="2" label-class-name="description-label" label="E-mail:">
        {{ formData.email }}
      </el-descriptions-item>

      <el-descriptions-item :span="2" label-class-name="description-label" label="Roles:">
        {{ roleNames }}
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button icon="SwitchButton" type="info" @click="hide">Cancel</el-button>
      <el-button icon="Delete" type="primary" @click="confirmBtnClick">Confirm</el-button>
    </template>
  </el-dialog>
</template>
