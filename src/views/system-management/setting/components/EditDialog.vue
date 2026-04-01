<script setup lang="ts">
import { ref } from "vue"
import { ElLoading, ElNotification } from "element-plus"
import { updateSetting } from "@/api/settings"
//type
type ParameterFormData = {
  key: string
  name: string
  values: string[]
  note: string
}
//data
const visible = ref(false)
const prop = defineProps({
  data: {
    type: Object as () => {
      key?: string
      name?: string
      values?: Array<{
        key?: number
        value?: string
      }>
      note?: string
    },
    default: () => {}
  }
})
const emit = defineEmits<{
  (e: "update"): void
}>()
const formData = ref<ParameterFormData>({
  key: "",
  name: "",
  note: "",
  values: []
})
const closeOnClickModel = ref(true)
//function
const handleMinus = (index: number) => {
  formData.value.values?.splice(index, 1)
}
const handleAdd = () => {
  formData.value.values?.push("")
}
const handleConfirm = async () => {
  closeOnClickModel.value = false
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
    target: "#paramEditDialog"
  })
  try {
    const reqData = {
      key: formData.value.key || "",
      values: formData.value.values,
      note: formData.value.note || ""
    }
    console.log("reqData:", reqData)
    const res = await updateSetting(reqData)
    console.log("res:", res)
    if (res.code !== 0) throw new Error(res.message)
    ElNotification({
      title: "Success",
      message: "Setting updated successfully",
      type: "success"
    })
    emit("update")
    hide()
  } catch (err) {
    console.error(err)
    ElNotification({
      title: "Error",
      message: "Something went wrong",
      type: "error"
    })
  } finally {
    loading.close()
    closeOnClickModel.value = true
  }
}
const show = () => {
  setPropToFormData()
  visible.value = true
}
const hide = () => {
  visible.value = false
}
const setPropToFormData = () => {
  formData.value.key = prop.data.key || ""
  formData.value.name = prop.data.name || ""
  formData.value.values = prop.data.values?.map((item) => item.value || "") || []
  formData.value.note = prop.data.note || ""
}
defineExpose({
  show,
  hide
})
</script>
<style>
.description-value {
  width: 80%;
}
.description-label {
  width: 20%;
}
</style>
<template>
  <el-dialog id="paramEditDialog" v-model="visible" :destroy-on-close="true" :close-on-click-modal="closeOnClickModel">
    <template #header>
      <h2 text-center>Edit</h2>
    </template>
    <el-card mx-a shadow="never">
      <el-form label-width="20%">
        <el-form-item label="Key-Name:">
          <template #label>
            <span text-nowrap> Key: </span>
          </template>
          {{ formData.name }}
        </el-form-item>
        <el-form-item label="Description:">
          <el-input type="textarea" v-model="formData.note" />
        </el-form-item>
        <el-form-item label="Values:">
          <template v-for="(_, index) in formData.values" :key="index">
            <div mb-3 flex flex-nowrap class="w-100%">
              <el-input v-model="formData.values[index]" />
              <el-button ml-1 circle icon="Minus" v-on:click="handleMinus(index)" />
            </div>
          </template>
          <el-button class="w-100%" type="primary" icon="Plus" @click="handleAdd" />
        </el-form-item>
      </el-form>
    </el-card>
    <template #footer>
      <el-button icon="SwitchButton" type="info" @click="hide"> Cancel </el-button>
      <el-button icon="Promotion" type="primary" @click="handleConfirm"> Confirm </el-button>
    </template>
  </el-dialog>
</template>
