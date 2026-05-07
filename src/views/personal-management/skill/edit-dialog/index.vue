<script setup lang="ts">
import { reactive, ref } from "vue"
import { ElForm, ElMessage } from "element-plus"
import { showLoading } from "@/utils"
import { resolveErrorMessage } from "@/utils"
import service from "../service"
import { SkillFormData, SkillLevelFormData } from "../type"
import { SkillVo } from "@/api/generated/Api"

const visible = ref(false)
const formData = reactive(new SkillFormData())
const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const levelFormData = reactive(new SkillLevelFormData())
const levelFormRef = ref<InstanceType<typeof ElForm> | null>(null)
const levelCount = ref(0)
const emit = defineEmits(["reload"])

const show = async (data: SkillVo) => {
  formData.data = data
  levelFormData.reset()
  levelCount.value = 0
  formRef.value?.clearValidate()
  levelFormRef.value?.clearValidate()
  visible.value = true

  if (!data.id) return

  const loading = showLoading("加載中...")
  try {
    const levels = await service.getSkillLevels(data.id)
    levelCount.value = levels.length
    if (levels.length > 0) {
      levelFormData.data = { ...levels[0] }
    } else {
      levelFormData.skillId = data.id
    }
  } catch (e) {
    console.error(e)
    ElMessage.error(resolveErrorMessage(e, "加載技能等級失敗"))
  } finally {
    loading.close()
  }
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

  const loading = showLoading("更新中...")
  try {
    await service.saveSkill(formData.data, {
      id: levelFormData.id,
      levelValue: levelFormData.levelValue,
      title: levelFormData.title,
      description: levelFormData.description
    })

    ElMessage.success("更新技能成功")
    emit("reload")
    hide()
  } catch (e: any) {
    ElMessage.error(resolveErrorMessage(e, "更新失敗"))
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
  <el-dialog v-model="visible" id="skillEditDialog" :close-on-click-modal="false" width="60%">
    <template #header>
      <h2 text-center>編輯技能</h2>
    </template>

    <el-form ref="formRef" label-width="auto" :rules="SkillFormData.EditRules" :model="formData" class="flex flex-wrap">
      <el-form-item label="技能名稱" prop="name" class="form-item-1-1">
        <el-input v-model="formData.name" />
      </el-form-item>

      <el-form-item label="描述" prop="description" class="form-item-1-1">
        <el-input v-model="formData.description" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>

    <el-divider>技能等級（單一）</el-divider>
    <el-alert v-if="levelCount > 1" type="warning" :closable="false" class="mb-3">
      <template #title>
        <span>偵測到多筆等級，個人頁僅會編輯第一筆。</span>
      </template>
    </el-alert>
    <el-form
      ref="levelFormRef"
      label-width="auto"
      :rules="SkillLevelFormData.EditRules"
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
