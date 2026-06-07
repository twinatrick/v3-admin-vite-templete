<script setup lang="ts">
import { reactive, ref } from "vue"
import service from "../service"
import UserEntitySelect from "@/components/UserEntitySelect/index.vue"
import JobPostingEntitySelect from "@/components/JobPostingEntitySelect/index.vue"

const emit = defineEmits<{ (event: "done"): void }>()

const visible = ref(false)

const form = reactive({
  userId: "",
  jobPostingId: "",
  userNotes: ""
})

function show() {
  form.userId = ""
  form.jobPostingId = ""
  form.userNotes = ""
  visible.value = true
}

async function handleConfirm() {
  if (!form.userId || !form.jobPostingId) return
  await service.create({
    userId: form.userId,
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
    <el-form :model="form" label-width="120px">
      <el-form-item label="使用者" required>
        <UserEntitySelect v-model="form.userId" placeholder="選擇使用者" />
      </el-form-item>
      <el-form-item label="職缺" required>
        <JobPostingEntitySelect v-model="form.jobPostingId" placeholder="選擇職缺" />
      </el-form-item>
      <el-form-item label="備註">
        <el-input v-model="form.userNotes" type="textarea" :rows="3" placeholder="備註" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm">確認</el-button>
    </template>
  </el-dialog>
</template>
