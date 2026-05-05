<script lang="ts" setup>
import { computed, onMounted, ref } from "vue"
import CreateDialog from "./create-dialog/index.vue"
import EditDialog from "./edit-dialog/index.vue"
import { UserVo } from "@/api/generated/Api"
import DeleteDialog from "./delete-dialog/index.vue"
import { showLoading } from "@/utils"
import service from "./service"
import DataTable from "./data-table/index.vue"
import { useRemoteTableQuery } from "@/hooks/useRemoteTableQuery"
import type { LocationQuery } from "vue-router"
//data

//等待双極
const selectedRow = ref<UserVo>({})
const createDialogRef = ref<InstanceType<typeof CreateDialog> | null>(null)
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)
const deleteDialogRef = ref<InstanceType<typeof DeleteDialog> | null>(null)
const userListFilters = ref({
  name: "",
  email: "",
  phone: "",
  createdBy: ""
})
const toQueryValue = (query: LocationQuery[string]) => {
  if (Array.isArray(query)) return query[0] || ""
  return query || ""
}
const queryState = useRemoteTableQuery({
  defaultPageSize: 20,
  defaultSortBy: "createdTime",
  defaultSortDir: "desc",
  defaultFilters: {
    name: "",
    email: "",
    phone: "",
    createdBy: ""
  },
  codec: {
    keys: ["name", "email", "phone", "createdBy"],
    parseFilters(query) {
      return {
        name: toQueryValue(query.name),
        email: toQueryValue(query.email),
        phone: toQueryValue(query.phone),
        createdBy: toQueryValue(query.createdBy)
      }
    },
    serializeFilters(filters) {
      const result: Record<string, string> = {}
      if (filters.name) result.name = filters.name
      if (filters.email) result.email = filters.email
      if (filters.phone) result.phone = filters.phone
      if (filters.createdBy) result.createdBy = filters.createdBy
      return result
    }
  }
})
//functions
const isSelected = computed(() => Object.values(selectedRow.value).length > 0)
const remotePagination = computed(() => ({
  currentPage: service.data.page + 1,
  pageSize: service.data.size,
  total: service.data.totalElements
}))
const applyAndFetch = async () => {
  queryState.setFilters(userListFilters.value, false)
  await queryState.syncToRouteQuery()
  await service.queryUser(queryState.buildApiQuery())
}
const createBtnClick = () => {
  createDialogRef.value?.show()
}
const deleteBtnClick = () => {
  deleteDialogRef.value?.show(selectedRow.value)
}
const init = async () => {
  const loading = showLoading("Initializing...", "#user-page")
  try {
    await service.initialize()
    queryState.initFromRouteQuery()
    userListFilters.value = {
      name: queryState.filters.name || "",
      email: queryState.filters.email || "",
      phone: queryState.filters.phone || "",
      createdBy: queryState.filters.createdBy || ""
    }
    await service.queryUser(queryState.buildApiQuery())
  } catch (e) {
    console.error(e)
  } finally {
    loading.close()
  }
}

const onRowDbClick = (row: UserVo) => {
  // const row = scope.row as UserVO
  editDialogRef.value?.show(row)
}
const onRowSelect = (rows: UserVo) => {
  selectedRow.value = rows
}
const onPageChange = async (payload: { page: number; size: number }) => {
  if (queryState.size.value !== payload.size) {
    queryState.setPageSize(payload.size)
  }
  queryState.page.value = payload.page
  await applyAndFetch()
}
const onSortChange = async (payload: { sortBy: string; sortDir: "asc" | "desc" | null }) => {
  if (!payload.sortDir) {
    queryState.setSort("createdTime", "desc")
  } else {
    queryState.setSort(payload.sortBy, payload.sortDir)
  }
  await applyAndFetch()
}
const onFilterChange = async (payload: Record<string, any>) => {
  const toSingleString = (value: unknown) => {
    if (!Array.isArray(value)) return ""
    const firstValue = value.find((item) => typeof item === "string" && Boolean(item.trim()))
    return firstValue || ""
  }
  queryState.setFilters({
    ...userListFilters.value,
    name: toSingleString(payload.name),
    email: toSingleString(payload.email),
    phone: toSingleString(payload.phone),
    createdBy: toSingleString(payload.createdBy)
  })
  userListFilters.value = {
    ...queryState.filters
  }
  await applyAndFetch()
}
//init
onMounted(() => {
  init()
})
</script>
<template>
  <div class="app-container" id="user-page">
    <data-table
      :remote-pagination="remotePagination"
      @row-dbclick="onRowDbClick"
      @row-click="onRowSelect"
      @page-change="onPageChange"
      @sort-change="onSortChange"
      @filter-change="onFilterChange"
      @refresh="applyAndFetch"
    >
      <template #header>
        <el-button icon="Plus" type="primary" @click="createBtnClick">Create</el-button>
        <el-button icon="Delete" type="danger" :disabled="!isSelected" @click="deleteBtnClick"> Delete </el-button>
      </template>
    </data-table>
    <CreateDialog ref="createDialogRef" @reload="init" />
    <EditDialog ref="editDialogRef" @reload="init" />
    <DeleteDialog ref="deleteDialogRef" />
  </div>
</template>
