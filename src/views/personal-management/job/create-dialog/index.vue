<script setup lang="ts">
import { reactive, ref } from "vue"
import service from "../service"
import EntitySelect from "@/components/EntitySelect/index.vue"
import { api } from "@/api/client"

const emit = defineEmits<{ (event: "done"): void }>()

const visible = ref(false)

const form = reactive({
  jobPostingId: "",
  userNotes: ""
})

function show() {
  form.jobPostingId = ""
  form.userNotes = ""
  visible.value = true
}

async function handleConfirm() {
  if (!form.jobPostingId) return
  await service.create({
    jobPostingId: form.jobPostingId,
    userNotes: form.userNotes || undefined
  })
  visible.value = false
  emit("done")
}

defineExpose({ show })
</script>

<template>
  <el-dialog v-model="visible" title="新增職缺連結" width="500px">
    <el-form :model="form" label-width="100px">
      <el-form-item label="職缺" prop="jobPostingId" required>
        <EntitySelect
          v-model="form.jobPostingId"
          :fetchFn="() => api.jobPosting.getAllJobPostings()"
          :labelRender="(j: any) => `${j.title}${j.companyName ? ` - ${j.companyName}` : ''}`"
          placeholder="選擇職缺"
        />
      </el-form-item>
      <el-form-item label="備註" prop="userNotes">
        <el-input v-model="form.userNotes" type="textarea" :rows="3" placeholder="備註" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm">確認</el-button>
    </template>
  </el-dialog>
</template>
