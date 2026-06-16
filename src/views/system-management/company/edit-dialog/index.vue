<script setup lang="ts">
import { reactive, ref } from "vue"
import { ElForm, ElMessage } from "element-plus"
import { showLoading, resolveErrorMessage } from "@/utils"
import service from "../service"
import { companyEditRules } from "../rules"
import { Company } from "../type"

const visible = ref(false)
const form = reactive({ id: "", name: "", websites: [] as string[], description: "" })
const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const emit = defineEmits(["reload"])

const confirmBtnClick = async () => {
  if (!(await formRef.value?.validate())) throw new Error("Form validate failed")
  const loading = showLoading("Updating...")
  try {
    await service.saveCompany({
      id: form.id,
      name: form.name,
      websites: form.websites,
      description: form.description || undefined
    })
    ElMessage.success("Update company successfully")
    emit("reload")
    hide()
  } catch (e: any) {
    ElMessage.error(resolveErrorMessage(e, "Update company failed"))
  } finally {
    loading.close()
  }
}

const show = (row: Company) => {
  form.id = row.id || ""
  form.name = row.name || ""
  form.websites = row.websites || []
  form.description = row.description || ""
  formRef.value?.clearValidate()
  visible.value = true
}
const hide = () => {
  visible.value = false
}

defineExpose({ show, hide })
</script>
<template>
  <el-dialog v-model="visible" id="companyEditDialog" :close-on-click-modal="false">
    <template #header><h2 text-center>Edit Company</h2></template>
    <el-form ref="formRef" :model="form" :rules="companyEditRules" label-width="auto" class="flex flex-wrap">
      <el-form-item label="Name" prop="name" class="form-item-1-1">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Websites" prop="websites" class="form-item-1-1">
        <el-select
          v-model="form.websites"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder=" "
          clearable
        />
      </el-form-item>
      <el-form-item label="Description" prop="description" class="form-item-1-1">
        <el-input v-model="form.description" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button icon="SwitchButton" type="info" @click="hide">Cancel</el-button>
      <el-button icon="Promotion" type="primary" @click="confirmBtnClick">Confirm</el-button>
    </template>
  </el-dialog>
</template>
