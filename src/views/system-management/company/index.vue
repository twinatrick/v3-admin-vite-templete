<script lang="ts" setup>
import { computed, onMounted, ref } from "vue"
import { QueryForm, QueryFormItem } from "@/components/QueryForm"
import { ElMessage, ElMessageBox } from "element-plus"
import { showLoading } from "@/utils"
import service from "./service"
import type { Company } from "./type"
import DataTable from "./data-table/index.vue"
import CreateDialog from "./create-dialog/index.vue"
import EditDialog from "./edit-dialog/index.vue"
import DeleteDialog from "./delete-dialog/index.vue"
import UserEntitySelect from "@/components/UserEntitySelect/index.vue"

const queryFormRef = ref<any>(null)
const selectedRow = ref<Company>({})
const createDialogRef = ref<InstanceType<typeof CreateDialog> | null>(null)
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)
const deleteDialogRef = ref<InstanceType<typeof DeleteDialog> | null>(null)
const companyFilters = ref({
  name: "",
  createdBy: ""
})

const queryCompanies = async (params: any) => {
  await service.queryCompany({
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

async function handleScrape() {
  try {
    await ElMessageBox.confirm(
      `Are you sure you want to scrape jobs for company "${selectedRow.value.name}"?`,
      "Confirm",
      {
        confirmButtonText: "Scrape",
        cancelButtonText: "Cancel",
        type: "warning"
      }
    )
    await service.scrape(selectedRow.value.id!)
    ElMessage.success("Scrape completed")
    await queryFormRef.value?.refresh()
  } catch {
    /* cancelled */
  }
}

const init = async () => {
  const loading = showLoading("Initializing...", "#company-page")
  try {
    await queryFormRef.value?.search()
  } catch (e) {
    console.error(e)
  } finally {
    loading.close()
  }
}
const onRowDbClick = (row: Company) => {
  editDialogRef.value?.show(row)
}
const onRowSelect = (rows: Company) => {
  selectedRow.value = rows
}

onMounted(() => {
  init()
})
</script>
<template>
  <div class="app-container" id="company-page">
    <QueryForm
      ref="queryFormRef"
      v-model="companyFilters"
      :grid-cols="3"
      :query-fn="queryCompanies"
      :bind-url="true"
      :button-col-span="1"
      :default-page-size="20"
      :default-sort-by="'createdTime'"
      :default-sort-dir="'desc'"
      :query-on-mounted="false"
    >
      <QueryFormItem label="Name" :col-span="1">
        <el-input v-model="companyFilters.name" placeholder=" " clearable />
      </QueryFormItem>
      <QueryFormItem label="Created By" :col-span="1" field="createdBy">
        <UserEntitySelect v-model="companyFilters.createdBy" placeholder=" " />
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
              <el-button icon="Refresh" type="info" :disabled="!isSelected" @click="handleScrape">Scrape</el-button>
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
