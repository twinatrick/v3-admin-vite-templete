<script setup lang="ts">
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { showLoading } from "@/utils"
import { resolveErrorMessage } from "@/utils"
import service from "../service"
import { SkillVo } from "@/api/generated/Api"

// Data
const visible = ref(false)
const skillData = ref<SkillVo>({})
const emit = defineEmits(["reload"])

// Functions
const show = (data: SkillVo) => {
  skillData.value = data
  visible.value = true
}

const hide = () => {
  visible.value = false
}

const confirmBtnClick = async () => {
  const loading = showLoading("刪除中...")
  try {
    await service.deleteSkill(skillData.value)
    ElMessage.success("解除技能綁定成功")
    emit("reload")
    hide()
  } catch (e: any) {
    ElMessage.error(resolveErrorMessage(e, "刪除失敗"))
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
  <el-dialog v-model="visible" title="確認刪除" width="500px">
    <div class="mb-4">
      <p class="text-lg mb-2">確定要解除以下技能綁定嗎？</p>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="技能名稱">{{ skillData.name }}</el-descriptions-item>
        <el-descriptions-item label="描述">{{ skillData.description || "無" }}</el-descriptions-item>
        <el-descriptions-item label="創建者">{{ skillData.createdBy }}</el-descriptions-item>
      </el-descriptions>
      <el-alert class="mt-4" type="warning" :closable="false">
        <template #title>
          <span class="font-bold">注意：這會解除你與此技能的綁定，不一定會刪除技能主資料。</span>
        </template>
      </el-alert>
    </div>

    <template #footer>
      <el-button icon="Close" type="info" @click="hide">取消</el-button>
      <el-button icon="Delete" type="danger" @click="confirmBtnClick">確認解除</el-button>
    </template>
  </el-dialog>
</template>
