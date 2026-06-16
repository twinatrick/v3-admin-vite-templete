<script lang="ts" setup>
import { computed, onMounted, ref } from "vue"
import { QueryForm, QueryFormItem } from "@/components/QueryForm"
import { showLoading } from "@/utils"
import service from "./service"
import type { UserJobLink } from "./type"
import DataTable from "./data-table/index.vue"
import CreateDialog from "./create-dialog/index.vue"
import EditDialog from "./edit-dialog/index.vue"
import DeleteDialog from "./delete-dialog/index.vue"

const queryFormRef = ref<any>(null)
const selectedRow = ref<UserJobLink>({})
const createDialogRef = ref<InstanceType<typeof CreateDialog> | null>(null)
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)
const deleteDialogRef = ref<InstanceType<typeof DeleteDialog> | null>(null)
const linkFilters = ref({
  userEmail: "",
  jobTitle: "",
  companyName: ""
})

const queryLinks = async (params: any) => {
  await service.queryUserJobLink({
    page: params.page,
    size: params.size,
    sortBy: params.sortBy,
    sortDir: params.sortDir,
    filters: params.filters
  })
  return {
    data: service.data.list,
    total: service.data.totalElements,
    page: service.data.page,
    size: service.data.size
  }
}

const isSelected = computed(() => Object.values(selectedRow.value).length > 0)
const createBtnClick = () => {
  createDialogRef.value?.show()
}
const editBtnClick = () => {
  editDialogRef.value?.show(selectedRow.value)
}
const deleteBtnClick = () => {
  deleteDialogRef.value?.show(selectedRow.value)
}
const onRowDbClick = (row: UserJobLink) => {
  editDialogRef.value?.show(row)
}

const init = async () => {
  const loading = showLoading("Initializing...", "#user-job-link-page")
  try {
    await queryFormRef.value?.search()
  } catch (e) {
    console.error(e)
  } finally {
    loading.close()
  }
}
const onRowSelect = (rows: UserJobLink) => {
  selectedRow.value = rows
}

onMounted(() => {
  init()
})
</script>
<template>
  <div class="app-container" id="user-job-link-page">
    <QueryForm
      ref="queryFormRef"
      v-model="linkFilters"
      :grid-cols="3"
      :query-fn="queryLinks"
      :bind-url="true"
      :button-col-span="1"
      :default-page-size="20"
      :default-sort-by="'createdTime'"
      :default-sort-dir="'desc'"
      :query-on-mounted="false"
    >
      <QueryFormItem label="User" :col-span="1">
        <el-input v-model="linkFilters.userEmail" placeholder=" " clearable />
      </QueryFormItem>
      <QueryFormItem label="Job Title" :col-span="1">
        <el-input v-model="linkFilters.jobTitle" placeholder=" " clearable />
      </QueryFormItem>
      <QueryFormItem label="Company" :col-span="1">
        <el-input v-model="linkFilters.companyName" placeholder=" " clearable />
      </QueryFormItem>
    </QueryForm>

    <data-table
      v-if="queryFormRef"
      :data="queryFormRef.data"
      :loading="queryFormRef.loading"
      :remote-pagination="{
        currentPage: queryFormRef.currentPage,
        pageSize: queryFormRef.size,
        total: queryFormRef.total
      }"
      @row-click="onRowSelect"
      @row-dbclick="onRowDbClick"
      @page-change="queryFormRef.onPageChange"
      @sort-change="queryFormRef.onSortChange"
    >
      <template #header>
        <el-form
          ><el-form-item>
            <el-space>
              <el-button icon="Plus" type="primary" @click="createBtnClick">Create</el-button>
              <el-button icon="Edit" type="warning" :disabled="!isSelected" @click="editBtnClick">Edit</el-button>
              <el-button icon="Delete" type="danger" :disabled="!isSelected" @click="deleteBtnClick">Delete</el-button>
            </el-space>
          </el-form-item></el-form
        >
      </template>
    </data-table>

    <CreateDialog ref="createDialogRef" @reload="queryFormRef?.refresh" />
    <EditDialog ref="editDialogRef" @reload="queryFormRef?.refresh" />
    <DeleteDialog ref="deleteDialogRef" @reload="queryFormRef?.refresh" />
  </div>
</template>
