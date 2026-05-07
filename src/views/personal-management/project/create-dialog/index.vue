<script setup lang="ts">
import { reactive, ref } from "vue"
import { ElForm, ElMessage, ElMessageBox } from "element-plus"
import { showLoading } from "@/utils"
import { resolveErrorMessage } from "@/utils"
import service from "../service"
import { ProjectFormData, ProjectSkillBinding } from "../type"
import { CurrentUserSkillVo, SkillLevelVo } from "@/api/generated/Api"

// Data
const visible = ref(false)
const formData = reactive(new ProjectFormData())
const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const projectSkillBindings = ref<ProjectSkillBinding[]>([])
const emit = defineEmits(["reload"])

// Skill 綁定相關
const allSkills = ref<CurrentUserSkillVo[]>([])
const selectedSkillId = ref("")
const availableLevels = ref<SkillLevelVo[]>([])
const selectedLevelId = ref("")

// Functions
const show = async () => {
  formData.reset()
  projectSkillBindings.value = []
  formRef.value?.resetFields()
  visible.value = true

  // 加載所有 Skills
  const loading = showLoading("加載中...")
  try {
    allSkills.value = await service.getAllSkills()
  } catch (e) {
    console.error(e)
    ElMessage.error(resolveErrorMessage(e, "加載技能列表失敗"))
  } finally {
    loading.close()
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

  const loading = showLoading("創建中...")
  try {
    // 1. 先創建 Project
    const createdProject = await service.saveProject(formData.data)

    // 2. 如果有 Skill 綁定，使用返回的 Project ID 綁定 Skills
    if (projectSkillBindings.value.length > 0 && createdProject?.id) {
      for (const binding of projectSkillBindings.value) {
        await service.bindSkillToProject(createdProject.id, binding.skillId, binding.skillLevelId)
      }
    }

    ElMessage.success("創建項目成功")
    emit("reload")
    hide()
  } catch (e: any) {
    ElMessage.error(resolveErrorMessage(e, "創建失敗"))
  } finally {
    loading.close()
  }
}

// Skill 綁定管理函數
const onSkillChange = async (skillId: string) => {
  selectedLevelId.value = ""
  availableLevels.value = []

  if (!skillId) return

  const loading = showLoading("加載等級...")
  try {
    availableLevels.value = await service.getSkillLevels(skillId)
  } catch (e) {
    console.error(e)
    ElMessage.error(resolveErrorMessage(e, "加載技能等級失敗"))
  } finally {
    loading.close()
  }
}

const addSkillBinding = () => {
  if (!selectedSkillId.value) {
    ElMessage.warning("請選擇技能")
    return
  }

  if (!selectedLevelId.value) {
    ElMessage.warning("請選擇等級")
    return
  }

  // 檢查是否已經綁定此 Skill
  const existingIndex = projectSkillBindings.value.findIndex((binding) => binding.skillId === selectedSkillId.value)

  if (existingIndex !== -1) {
    ElMessage.warning("此技能已經綁定，請選擇其他技能")
    return
  }

  const skill = allSkills.value.find((s) => s.id === selectedSkillId.value)
  const level = availableLevels.value.find((l) => l.id === selectedLevelId.value)

  if (skill && level) {
    projectSkillBindings.value.push({
      skillId: skill.id!,
      skillName: skill.name!,
      skillLevelId: level.id!,
      skillLevelTitle: level.title!,
      skillLevelValue: level.levelValue!
    })

    // 重置選擇
    selectedSkillId.value = ""
    selectedLevelId.value = ""
    availableLevels.value = []

    ElMessage.success("已添加技能綁定")
  }
}

const removeSkillBinding = async (index: number) => {
  const confirmed = await ElMessageBox.confirm("確定要移除此技能綁定嗎？", "確認移除", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => true)
    .catch(() => false)

  if (confirmed) {
    projectSkillBindings.value.splice(index, 1)
    ElMessage.success("已移除")
  }
}

defineExpose({
  show,
  hide
})
</script>

<template>
  <el-dialog v-model="visible" id="projectCreateDialog" :close-on-click-modal="false" width="60%">
    <template #header>
      <h2 text-center>創建項目</h2>
    </template>

    <el-form
      ref="formRef"
      label-width="auto"
      :rules="ProjectFormData.CreateRules"
      :model="formData"
      class="flex flex-wrap"
    >
      <el-form-item label="項目名稱" prop="name" class="form-item-1-1">
        <el-input v-model="formData.name" />
      </el-form-item>

      <el-form-item label="描述" prop="description" class="form-item-1-1">
        <el-input v-model="formData.description" type="textarea" :rows="3" />
      </el-form-item>

      <el-divider>技能綁定</el-divider>

      <div class="w-100% mb-4">
        <!-- 已綁定的技能列表 -->
        <el-table :data="projectSkillBindings" border style="width: 100%; margin-bottom: 20px">
          <el-table-column prop="skillName" label="技能名稱" min-width="150" />
          <el-table-column label="技能等級" min-width="150">
            <template #default="{ row }"> {{ row.skillLevelTitle }} ({{ row.skillLevelValue }}) </template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template #default="{ $index }">
              <el-button size="small" type="danger" @click="removeSkillBinding($index)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 添加技能綁定表單 -->
        <el-form inline>
          <el-form-item label="選擇技能">
            <el-select
              v-model="selectedSkillId"
              placeholder="請選擇技能"
              filterable
              clearable
              @change="onSkillChange"
              style="width: 200px"
            >
              <el-option v-for="skill in allSkills" :key="skill.id" :label="skill.name" :value="skill.id || ''" />
            </el-select>
          </el-form-item>

          <el-form-item label="選擇等級">
            <el-select
              v-model="selectedLevelId"
              placeholder="請選擇等級"
              :disabled="!selectedSkillId"
              filterable
              clearable
              style="width: 200px"
            >
              <el-option
                v-for="level in availableLevels"
                :key="level.id"
                :label="`${level.title} (${level.levelValue})`"
                :value="level.id || ''"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addSkillBinding">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
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
