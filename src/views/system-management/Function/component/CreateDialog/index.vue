<script setup lang="ts">
import { reactive, ref } from "vue"
import { ElForm, ElLoading, ElMessage, FormRules } from "element-plus"
import { createFunction } from "@/api/function"
//data
const visible = ref(false)
const formData = reactive({
  name: "",
  parent: ""
})
const rules: FormRules = {
  name: {
    required: true,
    message: "Please write a name"
  }
}
const form = ref<InstanceType<typeof ElForm> | null>(null)
//functions
const dataIsValid = async () => {
  form.value?.clearValidate()
  return await form.value?.validate()
}
const resetFormData = () => {
  formData.name = ""
  formData.parent = ""
}
const show = () => {
  resetFormData()
  visible.value = true
  form.value?.clearValidate()
}
const hide = () => {
  visible.value = false
}
defineExpose({
  show,
  hide
})
//api
const createData = async () => {
  await dataIsValid()
  const loadingAnima = ElLoading.service({
    target: "#createDialog"
  })
  try {
    const res = await createFunction({
      name: formData.name,
      parent: "",
      sort: 0,
      type: 1
    })
    if (res.code == 0) {
      emit("confirm")
      hide()
    } else if (res.code == 1) {
      ElMessage.error("You can't create this function with the same name(contain role name)")
    }
  } finally {
    loadingAnima.close()
  }
}
const emit = defineEmits(["confirm"])
</script>
<style scoped></style>
<template>
  <el-dialog v-model="visible" width="50%" id="createDialog" :close-on-click-modal="false">
    <template #header>
      <h2 text-center>Function Create</h2>
    </template>
    <el-form ref="form" label-width="100px" max-w-400px m-auto :rules="rules" :model="formData">
      <el-form-item label="Name" prop="name">
        <el-input v-model="formData.name" @change="formData.name = formData.name.trim()" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div text-center>
        <el-button icon="SwitchButton" type="info" @click="hide"> Cancel</el-button>
        <el-button icon="Promotion" type="primary" @click="createData"> Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>
