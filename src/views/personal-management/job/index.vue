<script setup lang="ts">
import { onMounted, ref } from "vue"
import service from "./service"
import DataTable from "./data-table/index.vue"
import CreateDialog from "./create-dialog/index.vue"
import DeleteDialog from "./delete-dialog/index.vue"

const createDialogRef = ref<InstanceType<typeof CreateDialog> | null>(null)
const deleteDialogRef = ref<InstanceType<typeof DeleteDialog> | null>(null)

onMounted(() => {
  service.getMyLinks()
})
</script>

<template>
  <div class="app-container">
    <el-card class="mb-16px">
      <el-button type="primary" icon="Plus" @click="createDialogRef?.show()">新增職缺連結</el-button>
      <el-button icon="Refresh" @click="service.getMyLinks()">刷新</el-button>
    </el-card>

    <data-table :data="service.data.list" :loading="service.data.loading" @delete="deleteDialogRef?.show($event)" />

    <CreateDialog ref="createDialogRef" @done="service.getMyLinks()" />
    <DeleteDialog ref="deleteDialogRef" @done="service.getMyLinks()" />
  </div>
</template>

<style scoped>
.mb-16px {
  margin-bottom: 16px;
}
</style>
