<script setup lang="ts">
import { reactive, ref } from "vue"
import { rules } from "../rules"
import service from "../service"
import { JobPosting } from "../type"
import CompanyEntitySelect from "@/components/CompanyEntitySelect/index.vue"

const emit = defineEmits<{ (event: "done"): void }>()

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

const formRef = ref()

function show(row: JobPosting) {
  form.id = row.id || ""
  form.companyId = row.companyId || ""
  form.title = row.title || ""
  form.url = row.url || ""
  form.description = row.description || ""
  form.requirements = row.requirements || ""
  form.responsibilities = row.responsibilities || ""
  form.salaryRange = row.salaryRange || ""
  form.postedDate = row.postedDate || ""
  visible.value = true
}

async function handleConfirm() {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return
  await service.update({
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
  visible.value = false
  emit("done")
}

defineExpose({ show })
</script>

<template>
  <el-dialog v-model="visible" title="編輯職缺" width="600px" @closed="formRef?.clearValidate()">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="公司" prop="companyId">
        <CompanyEntitySelect v-model="form.companyId" />
      </el-form-item>
      <el-form-item label="職缺名稱" prop="title">
        <el-input v-model="form.title" placeholder="請輸入職缺名稱" />
      </el-form-item>
      <el-form-item label="網址" prop="url">
        <el-input v-model="form.url" placeholder="請輸入職缺網址" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="2" placeholder="描述" />
      </el-form-item>
      <el-form-item label="需求" prop="requirements">
        <el-input v-model="form.requirements" type="textarea" :rows="2" placeholder="需求" />
      </el-form-item>
      <el-form-item label="職責" prop="responsibilities">
        <el-input v-model="form.responsibilities" type="textarea" :rows="2" placeholder="職責" />
      </el-form-item>
      <el-form-item label="薪資範圍" prop="salaryRange">
        <el-input v-model="form.salaryRange" placeholder="e.g. 100K-150K" />
      </el-form-item>
      <el-form-item label="發佈日期" prop="postedDate">
        <el-date-picker v-model="form.postedDate" type="date" placeholder="選擇日期" value-format="YYYY-MM-DD" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm">確認</el-button>
    </template>
  </el-dialog>
</template>
