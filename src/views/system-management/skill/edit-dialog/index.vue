<script setup lang="ts">
import { reactive, ref } from "vue"
import { ElForm, ElMessage, ElMessageBox } from "element-plus"
import { showLoading } from "@/utils"
import { resolveErrorMessage } from "@/utils"
import service from "../service"
import { SkillFormData, SkillLevelFormData } from "../type"
import { SkillVo, SkillLevelVo } from "@/api/generated/Api"

// Data
const visible = ref(false)
const formData = reactive(new SkillFormData())
const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const skillLevels = ref<SkillLevelVo[]>([])
const deletedLevelIds = ref<string[]>([])
const emit = defineEmits(["reload"])

// Level 編輯相關
const levelDialogVisible = ref(false)
const levelFormData = reactive(new SkillLevelFormData())
const levelFormRef = ref<InstanceType<typeof ElForm> | null>(null)
const editingLevelIndex = ref(-1)

// Functions
const show = async (data: SkillVo) => {
  formData.data = data
  deletedLevelIds.value = []
  formRef.value?.clearValidate()
  visible.value = true

  // 加載 Skill Levels
  if (data.id) {
    const loading = showLoading("加載中...")
    try {
      skillLevels.value = await service.getSkillLevels(data.id)
    } catch (e) {
      console.error(e)
      ElMessage.error(resolveErrorMessage(e, "加載技能等級失敗"))
    } finally {
      loading.close()
    }
  }
}

const hide = () => {
  visible.value = false
}

const confirmBtnClick = async () => {
  if (!(await formRef.value?.validate())) {
    ElMessage.error("請填寫必填欄位")
    return
  }

  // ✅ 驗證至少有一個 Level
  if (skillLevels.value.length === 0) {
    ElMessage.error("至少需要保留一個技能等級")
    return
  }

  const loading = showLoading("更新中...")
  try {
    // 1. 更新 Skill 基本資訊
    await service.saveSkill(formData.data)

    // 2. 刪除已標記的 Levels
    for (const levelId of deletedLevelIds.value) {
      await service.deleteSkillLevel({ id: levelId })
    }

    // 3. 保存或更新 Levels
    for (const level of skillLevels.value) {
      level.skillId = formData.data.id
      await service.saveSkillLevel(level)
    }

    ElMessage.success("更新技能成功")
    emit("reload")
    hide()
  } catch (e: any) {
    ElMessage.error(resolveErrorMessage(e, "更新失敗"))
  } finally {
    loading.close()
  }
}

// Level 管理函數
const addLevel = () => {
  levelFormData.reset()
  levelFormData.skillId = formData.data.id
  editingLevelIndex.value = -1
  levelDialogVisible.value = true
}

const editLevel = (row: SkillLevelVo, index: number) => {
  levelFormData.data = { ...row }
  editingLevelIndex.value = index
  levelDialogVisible.value = true
}

const deleteLevel = async (row: SkillLevelVo, index: number) => {
  const confirmed = await ElMessageBox.confirm("確定要刪除此等級嗎？", "確認刪除", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => true)
    .catch(() => false)

  if (confirmed) {
    // 如果有 ID，表示是已存在的 Level，需要記錄以便刪除
    if (row.id) {
      deletedLevelIds.value.push(row.id)
    }
    skillLevels.value.splice(index, 1)
    ElMessage.success("已刪除")
  }
}

const confirmLevelBtnClick = async () => {
  if (!(await levelFormRef.value?.validate())) {
    ElMessage.error("請填寫必填欄位")
    return
  }

  // 檢查 Level Value 是否重複
  const existingIndex = skillLevels.value.findIndex(
    (level, index) => level.levelValue === levelFormData.data.levelValue && index !== editingLevelIndex.value
  )

  if (existingIndex !== -1) {
    ElMessage.error("等級值已存在，請使用不同的值")
    return
  }

  if (editingLevelIndex.value >= 0) {
    // 編輯
    skillLevels.value[editingLevelIndex.value] = { ...levelFormData.data }
  } else {
    // 新增
    skillLevels.value.push({ ...levelFormData.data })
  }

  levelDialogVisible.value = false
  ElMessage.success(editingLevelIndex.value >= 0 ? "已更新" : "已添加")
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

      <el-divider>技能等級</el-divider>

      <div class="w-100% mb-4">
        <el-alert v-if="skillLevels.length === 0" type="warning" :closable="false" class="mb-3">
          <template #title>
            <span>⚠️ 至少需要保留一個技能等級</span>
          </template>
        </el-alert>
        <el-table :data="skillLevels" border style="width: 100%">
          <el-table-column prop="levelValue" label="等級值" width="100" />
          <el-table-column prop="title" label="標題" min-width="150" />
          <el-table-column prop="description" label="描述" min-width="200" />
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row, $index }">
              <el-button size="small" @click="editLevel(row, $index)">編輯</el-button>
              <el-button size="small" type="danger" @click="deleteLevel(row, $index)">刪除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" class="mt-3" @click="addLevel">+ 新增等級</el-button>
      </div>
    </el-form>

    <template #footer>
      <el-button icon="SwitchButton" type="info" @click="hide">取消</el-button>
      <el-button icon="Promotion" type="primary" @click="confirmBtnClick">確認</el-button>
    </template>
  </el-dialog>

  <!-- Level 編輯 Dialog -->
  <el-dialog v-model="levelDialogVisible" title="編輯等級" width="500px">
    <el-form ref="levelFormRef" label-width="auto" :rules="SkillLevelFormData.EditRules" :model="levelFormData">
      <el-form-item label="等級值" prop="levelValue">
        <el-input-number v-model="levelFormData.levelValue" :min="1" />
      </el-form-item>
      <el-form-item label="標題" prop="title">
        <el-input v-model="levelFormData.title" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="levelFormData.description" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="levelDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirmLevelBtnClick">確認</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.form-item-1-1 {
  width: 100%;
}
</style>
