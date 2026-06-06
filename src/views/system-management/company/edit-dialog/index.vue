<script setup lang="ts">
import { reactive, ref } from "vue"
import { rules } from "../rules"
import service from "../service"
import { Company } from "../type"

const emit = defineEmits<{ (event: "done"): void }>()

const visible = ref(false)

const form = reactive({
  id: "",
  name: "",
  websites: [] as string[],
  description: ""
})

const formRef = ref()

function show(row: Company) {
  form.id = row.id || ""
  form.name = row.name || ""
  form.websites = row.websites || []
  form.description = row.description || ""
  visible.value = true
}

async function handleConfirm() {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return
  await service.update({
    id: form.id,
    name: form.name,
    websites: form.websites,
    description: form.description || undefined
  })
  visible.value = false
  emit("done")
}

defineExpose({ show })
</script>

<template>
  <el-dialog v-model="visible" title="編輯公司" width="500px" @closed="formRef?.clearValidate()">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="公司名稱" prop="name">
        <el-input v-model="form.name" placeholder="請輸入公司名稱" />
      </el-form-item>
      <el-form-item label="網址" prop="websites">
        <el-select
          v-model="form.websites"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="輸入網址按 Enter 新增"
        />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="3" placeholder="請輸入描述" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm">確認</el-button>
    </template>
  </el-dialog>
</template>
