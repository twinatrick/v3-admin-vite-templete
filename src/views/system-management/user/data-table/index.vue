<script setup lang="ts">
import CustomTable from "@/components/CustomTable/index.vue"
import service from "../service"
import { computed, onMounted } from "vue"
import { CustomTableOptionType } from "@/components/CustomTable/types/Option"
import { useUserEmailCache } from "@/hooks/useUserEmailCache"

const prop = defineProps<{
  data: any[]
  loading: boolean
  remotePagination: { currentPage: number; pageSize: number; total: number }
}>()
const emit = defineEmits(["page-change", "sort-change", "row-click", "row-dbclick"])
const { loadUserEmailCache, getCreatorEmail } = useUserEmailCache()

const roleList = computed(() => service.data.role)

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

const roleFormatter = (row: any) => {
  const roles = row.roleArr || []
  if (roles.length === 0) return ""
  return roles.map((id: string) => roleList.value.find((r) => r.id == id)?.name).join(", ")
}

const statusFormatter = (row: any) => {
  return row.disabled ? "Disabled" : "Enabled"
}

const createdByFormatter = (row: any) => {
  return getCreatorEmail(row.createdBy)
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

onMounted(() => {
  loadUserEmailCache()
})
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
    id="user-data-table"
    @page-change="handlePageChange"
    @sort-change="handleSortChange"
    @row-click="onRowClick"
    @row-dbclick="onRowDbClick"
  >
    <template #header>
      <slot name="header" />
    </template>
    <template #body>
      <el-table-column prop="email" label="E-mail" fixed="left" min-width="200" sortable="custom" />
      <el-table-column prop="name" label="Name" min-width="150" sortable="custom" />
      <el-table-column prop="phone" label="Phone" min-width="150" sortable="custom" />
      <el-table-column label="Roles" min-width="200" :formatter="roleFormatter" sortable="custom" />
      <el-table-column label="Status" width="120" :formatter="statusFormatter" sortable="custom" />
      <el-table-column
        prop="createdBy"
        label="Created By"
        min-width="150"
        sortable="custom"
        :formatter="createdByFormatter"
      />
    </template>
  </custom-table>
</template>
