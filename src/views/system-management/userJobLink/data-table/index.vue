<script setup lang="ts">
import CustomTable from "@/components/CustomTable/index.vue"
import type { CustomTableOptionType } from "@/components/CustomTable/types/Option"
import { UserJobLink } from "../type"

const prop = defineProps<{
  data: UserJobLink[]
  loading: boolean
  remotePagination: { currentPage: number; pageSize: number; total: number }
}>()

const emit = defineEmits(["page-change", "sort-change", "row-click", "row-dbclick"])

const options: CustomTableOptionType = {
  realPagination: true,
  pagination: {
    layout: "total, prev, pager, next, jumper"
  },
  table: {
    highlightCurrentRow: true,
    height: "100%",
    border: true
  }
}

const handlePageChange = (payload: { page: number; size: number }) => {
  emit("page-change", payload)
}
const handleSortChange = (payload: { sortBy: string; sortDir: "asc" | "desc" | null }) => {
  emit("sort-change", payload)
}
const onRowClick = (payload: { row: any; column: any; event: any }) => {
  emit("row-click", payload.row)
}
const onRowDbClick = (payload: { row: any; column: any; event: any }) => {
  emit("row-dbclick", payload.row)
}
</script>
<template>
  <custom-table
    :data="prop.data"
    :option="options"
    :total="prop.remotePagination.total"
    :current-page="prop.remotePagination.currentPage"
    :page-size="prop.remotePagination.pageSize"
    v-loading="prop.loading"
    class="h-100%"
    @page-change="handlePageChange"
    @sort-change="handleSortChange"
    @row-click="onRowClick"
    @row-dbclick="onRowDbClick"
  >
    <template #header>
      <slot name="header" />
    </template>
    <template #body>
      <el-table-column prop="userEmail" label="User" min-width="180" sortable="custom" />
      <el-table-column prop="jobTitle" label="Job Title" min-width="180" sortable="custom" />
      <el-table-column prop="companyName" label="Company" min-width="150" sortable="custom" />
      <el-table-column prop="userNotes" label="Notes" min-width="200" show-overflow-tooltip sortable="custom" />
    </template>
  </custom-table>
</template>
