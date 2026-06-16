<script setup lang="ts">
import { reactive, ref } from "vue"
import { ElForm, ElMessage } from "element-plus"
import { showLoading, resolveErrorMessage } from "@/utils"
import service from "../service"
import { userJobLinkCreateRules } from "../rules"
import { UserJobLink } from "../type"
import UserEntitySelect from "@/components/UserEntitySelect/index.vue"
import JobPostingEntitySelect from "@/components/JobPostingEntitySelect/index.vue"

const visible = ref(false)
const form = reactive({ id: "", userId: "", jobPostingId: "", userNotes: "" })
const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const emit = defineEmits(["reload"])

const confirmBtnClick = async () => {
  if (!(await formRef.value?.validate())) throw new Error("Form validate failed")
  const loading = showLoading("Updating...")
  try {
    await service.saveUserJobLink({
      id: form.id,
      userId: form.userId,
      jobPostingId: form.jobPostingId,
      userNotes: form.userNotes || undefined
    })
    ElMessage.success("Update user job link successfully")
    emit("reload")
    hide()
  } catch (e: any) {
    ElMessage.error(resolveErrorMessage(e, "Update user job link failed"))
  } finally {
    loading.close()
  }
}

const show = (row: UserJobLink) => {
  form.id = row.id || ""
  form.userId = row.userId || ""
  form.jobPostingId = row.jobPostingId || ""
  form.userNotes = row.userNotes || ""
  formRef.value?.clearValidate()
  visible.value = true
}
const hide = () => {
  visible.value = false
}

defineExpose({ show, hide })
</script>
<template>
  <el-dialog v-model="visible" id="userJobLinkEditDialog" :close-on-click-modal="false">
    <template #header><h2 text-center>Edit User Job Link</h2></template>
    <el-form ref="formRef" :model="form" :rules="userJobLinkCreateRules" label-width="auto" class="flex flex-wrap">
      <el-form-item label="User" prop="userId" class="form-item-1-1">
        <UserEntitySelect v-model="form.userId" />
      </el-form-item>
      <el-form-item label="Job Posting" prop="jobPostingId" class="form-item-1-1">
        <JobPostingEntitySelect v-model="form.jobPostingId" />
      </el-form-item>
      <el-form-item label="Notes" prop="userNotes" class="form-item-1-1">
        <el-input v-model="form.userNotes" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button icon="SwitchButton" type="info" @click="hide">Cancel</el-button>
      <el-button icon="Promotion" type="primary" @click="confirmBtnClick">Confirm</el-button>
    </template>
  </el-dialog>
</template>
