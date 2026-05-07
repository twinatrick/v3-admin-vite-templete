<script setup lang="ts">
import CustomTable from "@/components/CustomTable/index.vue"
import { CustomTableOptionType } from "@/components/CustomTable/types/Option"

const prop = defineProps<{
  data: any[]
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
    id="skill-data-table"
    @page-change="handlePageChange"
    @sort-change="handleSortChange"
    @row-click="onRowClick"
    @row-dbclick="onRowDbClick"
  >
    <template #header>
      <slot name="header" />
    </template>
    <template #body>
      <el-table-column prop="name" label="技能名稱" fixed="left" min-width="200" sortable="custom" />
      <el-table-column prop="description" label="描述" min-width="300" sortable="custom" />
      <el-table-column prop="sourceType" label="來源" min-width="120" sortable="custom" />
      <el-table-column prop="createdBy" label="創建者" min-width="150" sortable="custom" />
      <el-table-column prop="createdTime" label="創建時間" min-width="180" sortable="custom" />
    </template>
  </custom-table>
</template>
