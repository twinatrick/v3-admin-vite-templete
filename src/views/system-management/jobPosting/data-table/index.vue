<script setup lang="ts">
import CustomTable from "@/components/CustomTable/index.vue"
import type { CustomTableOptionType } from "@/components/CustomTable/types/Option"
import { JobPosting } from "../type"

const prop = defineProps<{
  data: JobPosting[]
  loading: boolean
}>()

const emit = defineEmits<{
  (event: "edit", row: JobPosting): void
  (event: "delete", row: JobPosting): void
}>()

const options: CustomTableOptionType = {
  table: {
    border: true
  },
  pagination: {
    layout: "total, prev, pager, next, jumper"
  }
}
</script>

<template>
  <custom-table :data="prop.data" :option="options" :total="prop.data.length" :loading="prop.loading" class="h-100%">
    <template #body>
      <el-table-column prop="title" label="職缺名稱" min-width="180" />
      <el-table-column prop="companyName" label="公司" min-width="150" />
      <el-table-column prop="url" label="網址" min-width="200">
        <template #default="{ row }">
          <el-link v-if="row.url" type="primary" :href="row.url" target="_blank">{{ row.url }}</el-link>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="salaryRange" label="薪資範圍" width="120" />
      <el-table-column prop="description" label="描述" min-width="150" show-overflow-tooltip />
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="emit('edit', row)">編輯</el-button>
          <el-button size="small" type="danger" @click="emit('delete', row)">刪除</el-button>
        </template>
      </el-table-column>
    </template>
  </custom-table>
</template>
