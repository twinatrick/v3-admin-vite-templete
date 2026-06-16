<script setup lang="ts">
import { reactive, ref } from "vue"
import { ElForm, ElMessage } from "element-plus"
import { showLoading, resolveErrorMessage } from "@/utils"
import service from "../service"
import { jobPostingEditRules } from "../rules"
import { JobPosting } from "../type"
import CompanyEntitySelect from "@/components/CompanyEntitySelect/index.vue"

const visible = ref(false)
const form = reactive({
  id: "",
  companyId: "",
  title: "",
  url: "",
  description: "",
  requirements: "",
  responsibilities: "",
  salaryRange: "",
  postedDate: ""
})
const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const emit = defineEmits(["reload"])

const confirmBtnClick = async () => {
  if (!(await formRef.value?.validate())) throw new Error("Form validate failed")
  const loading = showLoading("Updating...")
  try {
    await service.saveJobPosting({
      id: form.id,
      companyId: form.companyId,
      title: form.title,
      url: form.url,
      description: form.description || undefined,
      requirements: form.requirements || undefined,
      responsibilities: form.responsibilities || undefined,
      salaryRange: form.salaryRange || undefined,
      postedDate: form.postedDate || undefined
    })
    ElMessage.success("Update job posting successfully")
    emit("reload")
    hide()
  } catch (e: any) {
    ElMessage.error(resolveErrorMessage(e, "Update job posting failed"))
  } finally {
    loading.close()
  }
}

const show = (row: JobPosting) => {
  form.id = row.id || ""
  form.companyId = row.companyId || ""
  form.title = row.title || ""
  form.url = row.url || ""
  form.description = row.description || ""
  form.requirements = row.requirements || ""
  form.responsibilities = row.responsibilities || ""
  form.salaryRange = row.salaryRange || ""
  form.postedDate = row.postedDate || ""
  formRef.value?.clearValidate()
  visible.value = true
}
const hide = () => {
  visible.value = false
}

defineExpose({ show, hide })
</script>
<template>
  <el-dialog v-model="visible" id="jobPostingEditDialog" :close-on-click-modal="false" width="600px">
    <template #header><h2 text-center>Edit Job Posting</h2></template>
    <el-form ref="formRef" :model="form" :rules="jobPostingEditRules" label-width="auto" class="flex flex-wrap">
      <el-form-item label="Company" prop="companyId" class="form-item-1-1">
        <CompanyEntitySelect v-model="form.companyId" />
      </el-form-item>
      <el-form-item label="Title" prop="title" class="form-item-1-1">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="URL" prop="url" class="form-item-1-1">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item label="Description" prop="description" class="form-item-1-1">
        <el-input v-model="form.description" type="textarea" :rows="2" />
      </el-form-item>
      <el-form-item label="Requirements" prop="requirements" class="form-item-1-1">
        <el-input v-model="form.requirements" type="textarea" :rows="2" />
      </el-form-item>
      <el-form-item label="Responsibilities" prop="responsibilities" class="form-item-1-1">
        <el-input v-model="form.responsibilities" type="textarea" :rows="2" />
      </el-form-item>
      <el-form-item label="Salary" prop="salaryRange" class="form-item-1-2">
        <el-input v-model="form.salaryRange" placeholder="e.g. 100K-150K" />
      </el-form-item>
      <el-form-item label="Posted Date" prop="postedDate" class="form-item-1-2">
        <el-date-picker
          v-model="form.postedDate"
          type="date"
          placeholder=" "
          value-format="YYYY-MM-DD"
          class="w-full"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button icon="SwitchButton" type="info" @click="hide">Cancel</el-button>
      <el-button icon="Promotion" type="primary" @click="confirmBtnClick">Confirm</el-button>
    </template>
  </el-dialog>
</template>
