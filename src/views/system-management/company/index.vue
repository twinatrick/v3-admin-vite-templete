<script setup lang="ts">
import { onMounted, ref } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import service from "./service"
import type { Company } from "./type"
import DataTable from "./data-table/index.vue"
import CreateDialog from "./create-dialog/index.vue"
import EditDialog from "./edit-dialog/index.vue"
import DeleteDialog from "./delete-dialog/index.vue"

const createDialogRef = ref<InstanceType<typeof CreateDialog> | null>(null)
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)
const deleteDialogRef = ref<InstanceType<typeof DeleteDialog> | null>(null)

async function handleScrape(row: Company) {
  try {
    await ElMessageBox.confirm(`確定要爬取公司「${row.name}」的職缺嗎？`, "確認", {
      confirmButtonText: "爬取",
      cancelButtonText: "取消",
      type: "warning"
    })
    await service.scrape(row.id!)
    ElMessage.success("爬取完成")
  } catch {
    // cancelled
  }
}

onMounted(() => {
  service.getAll()
})
</script>

<template>
  <div class="app-container">
    <el-card class="mb-16px">
      <el-button type="primary" icon="Plus" @click="createDialogRef?.show()">新增公司</el-button>
      <el-button icon="Refresh" @click="service.getAll()">刷新</el-button>
    </el-card>

    <data-table
      :data="service.data.list"
      :loading="service.data.loading"
      @edit="editDialogRef?.show($event)"
      @delete="deleteDialogRef?.show($event)"
      @scrape="handleScrape"
    />

    <CreateDialog ref="createDialogRef" @done="service.getAll()" />
    <EditDialog ref="editDialogRef" @done="service.getAll()" />
    <DeleteDialog ref="deleteDialogRef" @done="service.getAll()" />
  </div>
</template>

<style scoped>
.mb-16px {
  margin-bottom: 16px;
}
</style>
