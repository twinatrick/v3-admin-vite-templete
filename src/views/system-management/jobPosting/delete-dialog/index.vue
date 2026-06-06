<script setup lang="ts">
import { ref } from "vue"
import service from "../service"
import { JobPosting } from "../type"

const emit = defineEmits<{ (event: "done"): void }>()

const visible = ref(false)
const target = ref<JobPosting>({})

function show(row: JobPosting) {
  target.value = row
  visible.value = true
}

async function handleConfirm() {
  if (!target.value.id) return
  await service.remove(target.value.id)
  visible.value = false
  emit("done")
}

defineExpose({ show })
</script>

<template>
  <el-dialog v-model="visible" title="刪除職缺" width="400px">
    <p>
      確定要刪除職缺 <strong>{{ target.title }}</strong> 嗎？
    </p>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="danger" @click="handleConfirm">刪除</el-button>
    </template>
  </el-dialog>
</template>
