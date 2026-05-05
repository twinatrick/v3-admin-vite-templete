<script setup lang="ts">
import { PropType, reactive, ref } from "vue"
import { ElMessageBox } from "element-plus"
import { AlertCheckLimitVo } from "@/api/generated/Api"
import { api } from "@/api/client"

const dialogVisible = ref(false)
const props = defineProps({
  rowData: {
    type: Object as PropType<AlertCheckLimitVo>,
    required: true,
    default: () => ({})
  }
})
const formData = reactive<AlertCheckLimitVo>({
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
  const res = await api.alertLimits.updateLimit(formData)
  if (res.code == 0) {
    await ElMessageBox.alert("success")

    emit("confirm")
    dialogVisible.value = false
  } else {
    await ElMessageBox.alert("error")
  }
}
const resetForm = () => {
  formData.id = props.rowData.id
  formData.tableName = props.rowData.tableName
  formData.columnName = props.rowData.columnName
  formData.limitValue = props.rowData.limitValue
  console.log(props.rowData)
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
  <el-dialog title="edit limit setting" v-model="dialogVisible" width="30%">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="tableName" prop="tableName">
        <el-input v-model="formData.tableName" />
      </el-form-item>
      <el-form-item label="columnName" prop="columnName">
        <el-input v-model="formData.columnName" />
      </el-form-item>
      <el-form-item label="limitValue" prop="limitValue">
        <el-input type="number" v-model="formData.limitValue" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">Submit</el-button>
        <el-button @click="resetForm()">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
