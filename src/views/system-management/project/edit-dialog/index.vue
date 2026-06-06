<script setup lang="ts">
import { reactive, ref } from "vue"
import { ElForm, ElMessage, ElMessageBox } from "element-plus"
import { showLoading } from "@/utils"
import { resolveErrorMessage } from "@/utils"
import service from "../service"
import { ProjectFormData, ProjectMemberSkillBinding, ProjectSkillBinding } from "../type"
import { ProjectVo, SkillLevelVo, SkillVo, UserVo } from "@/api/generated/Api"

// Data
const visible = ref(false)
const formData = reactive(new ProjectFormData())
const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const projectSkillBindings = ref<ProjectSkillBinding[]>([])
const projectMemberSkillBindings = ref<ProjectMemberSkillBinding[]>([])
const emit = defineEmits(["reload"])

// Skill 綁定相關
const allSkills = ref<SkillVo[]>([])
const allUsers = ref<UserVo[]>([])
const selectedSkillId = ref("")
const availableLevels = ref<SkillLevelVo[]>([])
const selectedLevelId = ref("")
const selectedMemberSkillIds = ref<Record<string, string>>({})
const selectedMemberLevelIds = ref<Record<string, string>>({})
const memberAvailableLevels = ref<Record<string, SkillLevelVo[]>>({})

// Functions
const show = async (data: ProjectVo) => {
  formData.data = data
  projectSkillBindings.value = []
  projectMemberSkillBindings.value = []
  formRef.value?.clearValidate()
  visible.value = true

  // 加載所有 Skills
  const loading = showLoading("加載中...")
  try {
    const [skills, users] = await Promise.all([service.getAllSkills(), service.getAllUsers()])
    allSkills.value = skills
    allUsers.value = users
    if (data.id) {
      const boundSkills = await service.getProjectSkills(data.id)
      projectSkillBindings.value = boundSkills
        .filter((item: any) => item.skillId && item.skillName && item.skillLevelId)
        .map((item: any) => ({
          skillId: item.skillId!,
          skillName: item.skillName!,
          skillLevelId: item.skillLevelId!,
          levelTitle: item.levelTitle || "",
          levelValue: item.levelValue || 0
        }))
    }
    syncProjectMembers(formData.data.userIds || [])
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

  const loading = showLoading("更新中...")
  try {
    // 1. 更新 Project 基本資訊
    await service.saveProject(formData.data)

    // 2. 更新專案技能綁定
    if (formData.data.id) {
      await service.rebindProjectSkills(
        formData.data.id,
        projectSkillBindings.value.map((binding) => ({
          skillId: binding.skillId,
          skillLevelId: binding.skillLevelId
        }))
      )
      await service.rebindProjectMemberSkills(
        formData.data.id,
        projectMemberSkillBindings.value.map((member) => ({
          userId: member.userId,
          skills: member.skills.map((skill) => ({
            skillId: skill.skillId,
            skillLevelId: skill.skillLevelId
          }))
        }))
      )
    }

    ElMessage.success("更新項目成功")
    emit("reload")
    hide()
  } catch (e: any) {
    ElMessage.error(resolveErrorMessage(e, "更新失敗"))
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
      levelTitle: level.title!,
      levelValue: level.levelValue!
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
    const removedSkillId = projectSkillBindings.value[index]?.skillId
    projectSkillBindings.value.splice(index, 1)
    if (removedSkillId) {
      projectMemberSkillBindings.value.forEach((member) => {
        member.skills = member.skills.filter((skill) => skill.skillId !== removedSkillId)
      })
    }
    ElMessage.success("已移除")
  }
}

const userLabel = (userId: string) => {
  const user = allUsers.value.find((item) => item.id === userId)
  if (!user) return userId
  return user.name ? `${user.email || userId} (${user.name})` : user.email || userId
}

const syncProjectMembers = (userIds: string[]) => {
  const existing = new Map(projectMemberSkillBindings.value.map((member) => [member.userId, member]))
  projectMemberSkillBindings.value = userIds.map((userId) => existing.get(userId) || { userId, skills: [] })
}

const onMemberSkillChange = async (userId: string, skillId: string) => {
  selectedMemberLevelIds.value[userId] = ""
  memberAvailableLevels.value[userId] = []
  if (!skillId) return

  const loading = showLoading("加載等級...")
  try {
    memberAvailableLevels.value[userId] = await service.getSkillLevels(skillId)
  } catch (e) {
    console.error(e)
    ElMessage.error(resolveErrorMessage(e, "加載技能等級失敗"))
  } finally {
    loading.close()
  }
}

const addMemberSkillBinding = (member: ProjectMemberSkillBinding) => {
  const skillId = selectedMemberSkillIds.value[member.userId]
  const skillLevelId = selectedMemberLevelIds.value[member.userId]
  if (!skillId) {
    ElMessage.warning("請選擇技能")
    return
  }
  if (!skillLevelId) {
    ElMessage.warning("請選擇等級")
    return
  }
  if (member.skills.some((skill) => skill.skillId === skillId)) {
    ElMessage.warning("此成員已綁定此技能")
    return
  }

  const projectSkill = projectSkillBindings.value.find((skill) => skill.skillId === skillId)
  const level = memberAvailableLevels.value[member.userId]?.find((item) => item.id === skillLevelId)
  if (!projectSkill || !level) return

  member.skills.push({
    skillId: projectSkill.skillId,
    skillName: projectSkill.skillName,
    skillLevelId: level.id!,
    levelTitle: level.title || "",
    levelValue: level.levelValue || 0
  })
  selectedMemberSkillIds.value[member.userId] = ""
  selectedMemberLevelIds.value[member.userId] = ""
  memberAvailableLevels.value[member.userId] = []
}

const removeMemberSkillBinding = (member: ProjectMemberSkillBinding, index: number) => {
  member.skills.splice(index, 1)
}

defineExpose({
  show,
  hide
})
</script>

<template>
  <el-dialog v-model="visible" id="projectEditDialog" :close-on-click-modal="false" width="60%">
    <template #header>
      <h2 text-center>編輯項目</h2>
    </template>

    <el-form
      ref="formRef"
      label-width="auto"
      :rules="ProjectFormData.EditRules"
      :model="formData"
      class="flex flex-wrap"
    >
      <el-form-item label="項目名稱" prop="name" class="form-item-1-1">
        <el-input v-model="formData.name" />
      </el-form-item>

      <el-form-item label="描述" prop="description" class="form-item-1-1">
        <el-input v-model="formData.description" type="textarea" :rows="3" />
      </el-form-item>

      <el-form-item label="專案成員" class="form-item-1-1">
        <el-select
          v-model="formData.data.userIds"
          multiple
          filterable
          clearable
          placeholder="請選擇專案成員"
          class="w-100%!"
          @change="syncProjectMembers"
        >
          <el-option
            v-for="user in allUsers"
            :key="user.id"
            :label="userLabel(user.id || '')"
            :value="user.id || ''"
            :disabled="!user.id"
          />
        </el-select>
      </el-form-item>

      <el-divider>技能綁定</el-divider>

      <div class="w-100% mb-4">
        <el-alert class="mb-3" type="info" :closable="false">
          <template #title>
            <span>提示：此列表是儲存後的完整技能綁定結果，移除項目會在儲存後同步解除綁定。</span>
          </template>
        </el-alert>

        <!-- 已綁定的技能列表 -->
        <el-table :data="projectSkillBindings" border style="width: 100%; margin-bottom: 20px">
          <el-table-column prop="skillName" label="技能名稱" min-width="150" />
          <el-table-column label="技能等級" min-width="150">
            <template #default="{ row }"> {{ row.levelTitle }} ({{ row.levelValue }}) </template>
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

      <el-divider>成員技能等級</el-divider>

      <div class="w-100% mb-4">
        <el-alert class="mb-3" type="info" :closable="false">
          <template #title>
            <span>提示：成員必須先在「專案成員」中選取；儲存時會完整同步每位成員的技能等級。</span>
          </template>
        </el-alert>

        <el-empty v-if="projectMemberSkillBindings.length === 0" description="尚未選擇專案成員" />

        <el-card v-for="member in projectMemberSkillBindings" :key="member.userId" class="mb-3" shadow="never">
          <template #header>
            <strong>{{ userLabel(member.userId) }}</strong>
          </template>

          <el-table :data="member.skills" border style="width: 100%; margin-bottom: 16px">
            <el-table-column prop="skillName" label="技能名稱" min-width="150" />
            <el-table-column label="技能等級" min-width="150">
              <template #default="{ row }"> {{ row.levelTitle }} ({{ row.levelValue }}) </template>
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="right">
              <template #default="{ $index }">
                <el-button size="small" type="danger" @click="removeMemberSkillBinding(member, $index)">移除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-form inline>
            <el-form-item label="選擇技能">
              <el-select
                v-model="selectedMemberSkillIds[member.userId]"
                placeholder="請選擇技能"
                filterable
                clearable
                :disabled="projectSkillBindings.length === 0"
                style="width: 200px"
                @change="(skillId) => onMemberSkillChange(member.userId, skillId)"
              >
                <el-option
                  v-for="skill in projectSkillBindings"
                  :key="skill.skillId"
                  :label="skill.skillName"
                  :value="skill.skillId"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="選擇等級">
              <el-select
                v-model="selectedMemberLevelIds[member.userId]"
                placeholder="請選擇等級"
                :disabled="!selectedMemberSkillIds[member.userId]"
                filterable
                clearable
                style="width: 200px"
              >
                <el-option
                  v-for="level in memberAvailableLevels[member.userId] || []"
                  :key="level.id"
                  :label="`${level.title} (${level.levelValue})`"
                  :value="level.id || ''"
                />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                :disabled="projectSkillBindings.length === 0"
                @click="addMemberSkillBinding(member)"
              >
                添加
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
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
