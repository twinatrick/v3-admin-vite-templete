<script setup lang="ts">
import { reactive, ref, computed } from "vue"
import { ElForm, ElMessage } from "element-plus"
import { showLoading } from "@/utils"
import service from "../service"
import { UserVOFormData } from "../type"
import { UserVO } from "@/api/users/types/user"
//data
const visible = ref(false)
//computed
// const userList = computed(() => service.data.user)
const roleList = computed(() => service.data.role)
// const locationList = computed(() => service.data.location)
// const tagList = computed(() => service.data.tag)
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
const show = (data: UserVO) => {
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
      <!--      <el-form-item label="Location" prop="location" class="form-item-1-2" label-width="80px">-->
      <!--        <el-select v-model="formData.location" filterable class="w-100%!">-->
      <!--          <el-option v-for="loc in locationList" :key="loc.key" :value="loc.value" :label="loc.value" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="Name" prop="name" class="form-item-1-1">-->
      <!--        <el-input v-model="formData.familyName" placeholder="Family Name" class="w-48%! mr-a" />-->
      <!--        <el-input v-model="formData.givenName" placeholder="Given Name" class="w-48%!" />-->
      <!--      </el-form-item>-->
      <el-form-item label="Roles" prop="roles" class="form-item-1-1">
        <el-select v-model="formData.roles" multiple filterable clearable class="w-100%!">
          <el-option v-for="role in roleList" :key="role.key" :value="role.key || ''" :label="role.name || ''" />
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="Tags" prop="tags" class="form-item-1-1">-->
      <!--        <el-select v-model="formData.tags" multiple filterable clearable class="w-100%!">-->
      <!--          <el-option v-for="tag in tagList" :key="tag.key" :value="tag.key || ''" :label="tag.name || ''" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="Supervisors" prop="supervisor" class="form-item-1-1">-->
      <!--        <el-select v-model="formData.supervisor" multiple filterable clearable class="w-100%!">-->
      <!--          <el-option v-for="user in userList" :key="user.id" :value="user.id!" :label="user.email" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
    </el-form>
    <template #footer>
      <el-button icon="SwitchButton" type="info" @click="hide">Cancel</el-button>
      <el-button icon="Promotion" type="primary" @click="confirmBtnClick">Confirm</el-button>
    </template>
  </el-dialog>
</template>
<style></style>
