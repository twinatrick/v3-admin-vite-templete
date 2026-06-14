<script setup lang="ts">
import { reactive, ref } from "vue"
import { AlertCheckLimitVo } from "@/api/generated/Api"
import { api } from "@/api/client"

const dialogVisible = ref(false)
const form = reactive<AlertCheckLimitVo>({
  id: "",
  tableName: "",
  columnName: "",
  limitValue: 0
})
const emit = defineEmits(["confirm"])
const rules = ref({
  tableName: [{ required: true, message: "Please input tableName", trigger: "blur" }],
  columnName: [{ required: true, message: "Please input columnName", trigger: "blur" }],
  limitValue: [{ required: true, message: "Please input limitValue", trigger: "blur" }]
})
const submitForm = async () => {
  await api.alertCheckLimitController.addLimit(form)
  emit("confirm")
  dialogVisible.value = false
}
const resetForm = () => {
  form.tableName = ""
  form.columnName = ""
  form.limitValue = 0
}
const show = () => {
  dialogVisible.value = true
  resetForm()
}
const hide = () => {
  dialogVisible.value = false
}

defineExpose({ show, hide })
</script>

<template>
  <el-dialog title="Add" width="30%" v-model="dialogVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="tableName" prop="tableName">
        <el-input v-model="form.tableName" />
      </el-form-item>
      <el-form-item label="columnName" prop="columnName">
        <el-input v-model="form.columnName" />
      </el-form-item>
      <el-form-item label="limitValue" prop="limitValue">
        <el-input type="number" v-model="form.limitValue" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">Submit</el-button>
        <el-button @click="resetForm()">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
