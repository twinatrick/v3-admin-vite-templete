<script setup lang="ts">
import CustomTable from "@/components/CustomTable/index.vue"
import { ref } from "vue"
import { RoleVO } from "../type"
import { CustomTableOptionType } from "@/components/CustomTable/types/Option"
const prop = defineProps({
  data: {
    type: Array<RoleVO>,
    default: []
  },
  loading: {
    type: Boolean,
    default: false
  },
  total: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 20
  }
})
const emit = defineEmits(["selected", "page-change", "sort-change"])
const option: CustomTableOptionType = {
  realPagination: true,
  pagination: {
    layout: "total, sizes, prev, pager, next, jumper",
    pageSizes: [20, 50, 100, 200]
  },
  table: {
    highlightCurrentRow: true,
    height: "100%",
    border: true
  }
}
const selectedRow = ref<RoleVO>({})
const handleSelected = (rows: Array<RoleVO>) => {
  if (rows.length === 0) selectedRow.value = {}
  else selectedRow.value = rows[0]
  emit("selected", selectedRow.value)
}
const functionCountFormatter = (row: RoleVO) => {
  return String(row.functionKeys?.length || 0)
}
const handlePageChange = (payload: { page: number; size: number }) => {
  emit("page-change", payload)
}
const handleSortChange = (payload: { sortBy: string; sortDir: "asc" | "desc" | null }) => {
  emit("sort-change", payload)
}
defineExpose({
  selectedRow
})
</script>

<template>
  <CustomTable
    flex
    flex-col
    class="h-100%"
    :option="option"
    :data="prop.data"
    :total="prop.total"
    :current-page="prop.currentPage"
    :page-size="prop.pageSize"
    v-loading="prop.loading"
    @selected="handleSelected"
    @page-change="handlePageChange"
    @sort-change="handleSortChange"
  >
    <template #header>
      <slot />
    </template>
    <template #body>
      <el-table-column prop="name" label="Name" fixed="left" width="200px" align="right" sortable="custom" />
      <el-table-column
        label="Function Count"
        :formatter="functionCountFormatter"
        width="150px"
        align="center"
        :show-overflow-tooltip="false"
      />
      <el-table-column prop="description" label="Description" :show-overflow-tooltip="false" sortable="custom" />
    </template>
  </CustomTable>
</template>
