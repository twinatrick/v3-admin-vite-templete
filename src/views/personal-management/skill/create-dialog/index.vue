<script setup lang="ts">
import { reactive, ref } from "vue"
import { ElForm, ElMessage } from "element-plus"
import { showLoading } from "@/utils"
import { resolveErrorMessage } from "@/utils"
import service from "../service"
import { SkillFormData, SkillLevelFormData } from "../type"

const visible = ref(false)
const formData = reactive(new SkillFormData())
const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const levelFormData = reactive(new SkillLevelFormData())
const levelFormRef = ref<InstanceType<typeof ElForm> | null>(null)
const emit = defineEmits(["reload"])

const show = () => {
  formData.reset()
  levelFormData.reset()
  formRef.value?.resetFields()
  levelFormRef.value?.resetFields()
  visible.value = true
}

const hide = () => {
  visible.value = false
}

const confirmBtnClick = async () => {
  const isSkillValid = await formRef.value?.validate()
  const isLevelValid = await levelFormRef.value?.validate()
  if (!isSkillValid || !isLevelValid) {
    ElMessage.error("請填寫必填欄位")
    return
  }

  const loading = showLoading("創建中...")
  try {
    await service.saveSkill(formData.data, {
      levelValue: levelFormData.levelValue,
      title: levelFormData.title,
      description: levelFormData.description
    })

    ElMessage.success("創建技能成功")
    emit("reload")
    hide()
  } catch (e: any) {
    ElMessage.error(resolveErrorMessage(e, "創建失敗"))
  } finally {
    loading.close()
  }
}

defineExpose({
  show,
  hide
})
</script>

<template>
  <el-dialog v-model="visible" id="skillCreateDialog" :close-on-click-modal="false" width="60%">
    <template #header>
      <h2 text-center>創建技能</h2>
    </template>

    <el-form
      ref="formRef"
      label-width="auto"
      :rules="SkillFormData.CreateRules"
      :model="formData"
      class="flex flex-wrap"
    >
      <el-form-item label="技能名稱" prop="name" class="form-item-1-1">
        <el-input v-model="formData.name" />
      </el-form-item>

      <el-form-item label="描述" prop="description" class="form-item-1-1">
        <el-input v-model="formData.description" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>

    <el-divider>技能等級（單一）</el-divider>
    <el-form
      ref="levelFormRef"
      label-width="auto"
      :rules="SkillLevelFormData.CreateRules"
      :model="levelFormData"
      class="flex flex-wrap"
    >
      <el-form-item label="等級值" prop="levelValue" class="form-item-1-1">
        <el-input-number v-model="levelFormData.levelValue" :min="1" />
      </el-form-item>
      <el-form-item label="標題" prop="title" class="form-item-1-1">
        <el-input v-model="levelFormData.title" />
      </el-form-item>
      <el-form-item label="描述" prop="description" class="form-item-1-1">
        <el-input v-model="levelFormData.description" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button icon="SwitchButton" type="info" @click="hide">取消</el-button>
      <el-button icon="Promotion" type="primary" @click="confirmBtnClick">確認</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.form-item-1-1 {
  width: 100%;
}
</style>
