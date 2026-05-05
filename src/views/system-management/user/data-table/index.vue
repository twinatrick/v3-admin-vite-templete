<script setup lang="ts">
import FilterTable from "@/components/FilterTable/v3.vue"
import service from "../service"
import { computed } from "vue"
import { TableColumnMap } from "@/components/FilterTable/type"
import { CustomTableOptionType } from "@/components/CustomTable/types/Option"

const prop = defineProps<{ remotePagination: { currentPage: number; pageSize: number; total: number } }>()
const emit = defineEmits(["page-change", "sort-change", "filter-change", "row-click", "row-dbclick", "refresh"])

const userList = computed(() => service.data.user)
const roleList = computed(() => service.data.role)
// const tagList = computed(() => service.data.tag)
const tableData = computed(() => {
  console.log(userList.value)
  return userList.value.map((data) => ({ data: { ...data } }))
})
const columnMap = computed(() => {
  const map: TableColumnMap[] = [
    {
      name: "email",
      value: "E-mail",
      type: "string",
      fixed: "left",
      sortable: true
    },
    {
      name: "roleArr",
      value: "Roles",
      type: "string",
      sortable: true,
      formatter(value: string[]) {
        if (value.length === 0) return ""
        return value.map((v) => roleList.value.find((r) => r.id == v)?.name).join(",")
      }
    },
    {
      name: "disabled",
      value: "disabled",
      type: "select",
      sortable: true,
      formatter: (value: boolean) => {
        return value ? "Disable" : "Enable"
      }
    }
  ]
  return map
})
const options: CustomTableOptionType = {
  pagination: {
    layout: "total, prev, pager, next, jumper"
  },
  table: {
    highlightCurrentRow: true,
    height: "100%",
    border: true
  }
}
const handleRefreshClick = async () => {
  emit("refresh")
}
const handlePageChange = (payload: { page: number; size: number }) => {
  emit("page-change", payload)
}
const handleSortChange = (payload: { sortBy: string; sortDir: "asc" | "desc" | null }) => {
  emit("sort-change", payload)
}
const handleFilterChange = (payload: Record<string, any>) => {
  emit("filter-change", payload)
}
const onRowClick = (row: any) => {
  emit("row-click", row)
}
const onRowDbClick = (row: any) => {
  emit("row-dbclick", row)
}
</script>
<template>
  <filter-table
    :data="tableData"
    :table-column-map="columnMap"
    :option="options"
    class="h-100%"
    id="user-data-table"
    remote
    :remote-pagination="prop.remotePagination"
    @page-change="handlePageChange"
    @sort-change="handleSortChange"
    @filter-change="handleFilterChange"
    @row-click="onRowClick"
    @row-dbclick="onRowDbClick"
  >
    <template #header>
      <slot name="header" />
      <el-button icon="Refresh" circle @click="handleRefreshClick" />
    </template>
  </filter-table>
</template>
