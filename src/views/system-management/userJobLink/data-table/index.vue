<script setup lang="ts">
import CustomTable from "@/components/CustomTable/index.vue"
import type { CustomTableOptionType } from "@/components/CustomTable/types/Option"
import { UserJobLink } from "../type"

const prop = defineProps<{
  data: UserJobLink[]
  loading: boolean
}>()

const emit = defineEmits<{
  (event: "delete", row: UserJobLink): void
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
      <el-table-column prop="userEmail" label="使用者" min-width="180" />
      <el-table-column prop="jobTitle" label="職缺名稱" min-width="180" />
      <el-table-column prop="companyName" label="公司" min-width="150" />
      <el-table-column prop="userNotes" label="備註" min-width="200" show-overflow-tooltip />
      <el-table-column label="操作" width="80" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="danger" @click="emit('delete', row)">刪除</el-button>
        </template>
      </el-table-column>
    </template>
  </custom-table>
</template>
