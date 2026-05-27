<script lang="ts" setup>
import { computed, onMounted, ref } from "vue"
import { QueryForm, QueryFormItem } from "@/components/QueryForm"
import CreateDialog from "./create-dialog/index.vue"
import EditDialog from "./edit-dialog/index.vue"
import { UserVo } from "@/api/generated/Api"
import DeleteDialog from "./delete-dialog/index.vue"
import { showLoading } from "@/utils"
import service from "./service"
import DataTable from "./data-table/index.vue"
import UserEntitySelect from "@/components/UserEntitySelect/index.vue"
//data

const queryFormRef = ref<any>(null)
//等待双極
const selectedRow = ref<UserVo>({})
const createDialogRef = ref<InstanceType<typeof CreateDialog> | null>(null)
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)
const deleteDialogRef = ref<InstanceType<typeof DeleteDialog> | null>(null)
const userListFilters = ref({
  name: "",
  email: "",
  phone: "",
  disabled: "" as "" | "true" | "false",
  createdBy: ""
})
//functions
const queryUsers = async (params: any) => {
  const filters = { ...params.filters }
  // Convert disabled string to boolean if not empty
  if (filters.disabled === "true") {
    filters.disabled = true
  } else if (filters.disabled === "false") {
    filters.disabled = false
  } else {
    // Empty string means "All", don't send it to API
    delete filters.disabled
  }

  await service.queryUser({
    page: params.page,
    size: params.size,
    sortBy: params.sortBy,
    sortDir: params.sortDir,
    ...filters
  })

  return {
    data: service.data.user,
    total: service.data.totalElements,
    page: service.data.page,
    size: service.data.size
  }
}

const isSelected = computed(() => Object.values(selectedRow.value).length > 0)
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
    // Trigger initial query after roles are loaded
    await queryFormRef.value?.search()
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
//init
onMounted(() => {
  init()
})
</script>
<template>
  <div class="app-container" id="user-page">
    <!-- Query Form -->
    <QueryForm
      ref="queryFormRef"
      v-model="userListFilters"
      :grid-cols="3"
      :query-fn="queryUsers"
      :bind-url="true"
      :button-col-span="1"
      :default-page-size="20"
      :default-sort-by="'createdTime'"
      :default-sort-dir="'desc'"
      :query-on-mounted="false"
    >
      <QueryFormItem label="Name" :col-span="1">
        <el-input v-model="userListFilters.name" placeholder=" " clearable />
      </QueryFormItem>
      <QueryFormItem label="E-mail" :col-span="1">
        <el-input v-model="userListFilters.email" placeholder=" " clearable />
      </QueryFormItem>
      <QueryFormItem label="Phone" :col-span="1">
        <el-input v-model="userListFilters.phone" placeholder=" " clearable />
      </QueryFormItem>
      <QueryFormItem label="Status" :col-span="1">
        <el-select v-model="userListFilters.disabled" placeholder=" " clearable>
          <el-option label="All" value="" />
          <el-option label="Enabled" value="false" />
          <el-option label="Disabled" value="true" />
        </el-select>
      </QueryFormItem>
      <QueryFormItem label="Created By" :col-span="1" field="createdBy">
        <UserEntitySelect v-model="userListFilters.createdBy" placeholder=" " />
      </QueryFormItem>
    </QueryForm>

    <!-- Data Table -->
    <data-table
      v-if="queryFormRef"
      :data="queryFormRef.data"
      :loading="queryFormRef.loading"
      :remote-pagination="{
        currentPage: queryFormRef.currentPage,
        pageSize: queryFormRef.size,
        total: queryFormRef.total
      }"
      @row-dbclick="onRowDbClick"
      @row-click="onRowSelect"
      @page-change="queryFormRef.onPageChange"
      @sort-change="queryFormRef.onSortChange"
    >
      <template #header>
        <el-form>
          <el-form-item>
            <el-space>
              <el-button icon="Plus" type="primary" @click="createBtnClick">Create</el-button>
              <el-button icon="Delete" type="danger" :disabled="!isSelected" @click="deleteBtnClick">Delete</el-button>
            </el-space>
          </el-form-item>
        </el-form>
      </template>
    </data-table>

    <!-- Dialogs -->
    <CreateDialog ref="createDialogRef" @reload="queryFormRef?.refresh" />
    <EditDialog ref="editDialogRef" @reload="queryFormRef?.refresh" />
    <DeleteDialog ref="deleteDialogRef" @reload="queryFormRef?.refresh" />
  </div>
</template>
