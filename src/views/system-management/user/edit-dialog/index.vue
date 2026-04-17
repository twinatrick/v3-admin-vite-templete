<script setup lang="ts">
import { reactive, ref, computed } from "vue"
import { ElForm, ElMessage } from "element-plus"
import { showLoading } from "@/utils"
import service from "../service"
import { UserVOFormData } from "../type"
import { UserVo } from "@/api/generated/Api"
//data
const visible = ref(false)
const roleList = computed(() => service.data.role)
const formData = reactive(new UserVOFormData())
const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const emit = defineEmits(["reload"])
//functions
const confirmBtnClick = async () => {
  if (!(await formRef.value?.validate())) throw new Error("Form validate failed")
  const loading = showLoading("Updating...")
  try {
    await service.saveUser(formData.data)
    ElMessage.success("Update user successfully")
    emit("reload")
    hide()
  } catch (e: any) {
    ElMessage.error(e.message)
  } finally {
    loading.close()
  }
}
const show = (data: UserVo) => {
  formData.data = data
  formRef.value?.clearValidate()
  visible.value = true
}
const hide = () => {
  visible.value = false
}
defineExpose({
  show,
  hide
})
</script>
<template>
  <el-dialog v-model="visible" id="userCreateDialog" :close-on-click-modal="false">
    <template #header>
      <h2 text-center>Edit User</h2>
    </template>
    <el-form ref="formRef" label-width="auto" :rules="UserVOFormData.Rules" :model="formData" class="flex flex-wrap">
      <el-form-item label="E-mail" prop="email" class="form-item-1-2">
        <el-input v-model="formData.email" disabled />
      </el-form-item>
      <el-form-item label="Password" prop="password" class="form-item-1-2">
        <el-input v-model="formData.password" type="password" />
      </el-form-item>
      <el-form-item label="disabled" prop="disabled" class="form-item-1-2">
        <el-switch v-model="formData.disabled" active-text="Disabled" inactive-text="Enable" />
      </el-form-item>
      <el-form-item label="Roles" prop="roles" class="form-item-1-1">
        <el-select v-model="formData.roles" multiple filterable clearable class="w-100%!">
          <el-option v-for="role in roleList" :key="role.id" :value="role.id || ''" :label="role.name || ''" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button icon="SwitchButton" type="info" @click="hide">Cancel</el-button>
      <el-button icon="Promotion" type="primary" @click="confirmBtnClick">Confirm</el-button>
    </template>
  </el-dialog>
</template>
<style></style>
