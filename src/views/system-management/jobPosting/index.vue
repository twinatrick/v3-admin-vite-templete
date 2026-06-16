<script lang="ts" setup>
import { computed, onMounted, ref } from "vue"
import { QueryForm, QueryFormItem } from "@/components/QueryForm"
import { showLoading } from "@/utils"
import service from "./service"
import { JobPosting } from "./type"
import DataTable from "./data-table/index.vue"
import CreateDialog from "./create-dialog/index.vue"
import EditDialog from "./edit-dialog/index.vue"
import DeleteDialog from "./delete-dialog/index.vue"

const queryFormRef = ref<any>(null)
const selectedRow = ref<JobPosting>({})
const createDialogRef = ref<InstanceType<typeof CreateDialog> | null>(null)
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)
const deleteDialogRef = ref<InstanceType<typeof DeleteDialog> | null>(null)
const jobPostingFilters = ref({
  title: "",
  companyName: "",
  salaryRange: "",
  createdBy: ""
})

const queryJobPostings = async (params: any) => {
  const filters = { ...params.filters }
  await service.queryJobPosting({
    page: params.page,
    size: params.size,
    sortBy: params.sortBy,
    sortDir: params.sortDir,
    ...filters
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

const init = async () => {
  const loading = showLoading("Initializing...", "#job-posting-page")
  try {
    await queryFormRef.value?.search()
  } catch (e) {
    console.error(e)
  } finally {
    loading.close()
  }
}
const onRowDbClick = (row: JobPosting) => {
  editDialogRef.value?.show(row)
}
const onRowSelect = (rows: JobPosting) => {
  selectedRow.value = rows
}

onMounted(() => {
  init()
})
</script>
<template>
  <div class="app-container" id="job-posting-page">
    <QueryForm
      ref="queryFormRef"
      v-model="jobPostingFilters"
      :grid-cols="4"
      :query-fn="queryJobPostings"
      :bind-url="true"
      :button-col-span="1"
      :default-page-size="20"
      :default-sort-by="'createdTime'"
      :default-sort-dir="'desc'"
      :query-on-mounted="false"
    >
      <QueryFormItem label="Title" :col-span="1">
        <el-input v-model="jobPostingFilters.title" placeholder=" " clearable />
      </QueryFormItem>
      <QueryFormItem label="Company" :col-span="1">
        <el-input v-model="jobPostingFilters.companyName" placeholder=" " clearable />
      </QueryFormItem>
      <QueryFormItem label="Salary" :col-span="1">
        <el-input v-model="jobPostingFilters.salaryRange" placeholder=" " clearable />
      </QueryFormItem>
      <QueryFormItem label="Created By" :col-span="1">
        <el-input v-model="jobPostingFilters.createdBy" placeholder=" " clearable />
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
      @row-dbclick="onRowDbClick"
      @row-click="onRowSelect"
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
