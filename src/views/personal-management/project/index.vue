<script lang="ts" setup>
import { computed, ref } from "vue"
import { QueryForm, QueryFormItem } from "@/components/QueryForm"
import CreateDialog from "./create-dialog/index.vue"
import EditDialog from "./edit-dialog/index.vue"
import DeleteDialog from "./delete-dialog/index.vue"
import { ProjectVo } from "@/api/generated/Api"
import service from "./service"
import DataTable from "./data-table/index.vue"

// Data
const queryFormRef = ref<any>(null)
const selectedRow = ref<ProjectVo>({})
const createDialogRef = ref<InstanceType<typeof CreateDialog> | null>(null)
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)
const deleteDialogRef = ref<InstanceType<typeof DeleteDialog> | null>(null)

const projectListFilters = ref({
  name: "",
  description: ""
  // 注意：個人管理頁面不包含 createdBy 過濾器
})

// Functions
const queryProjects = async (params: any) => {
  const filters = { ...params.filters }

  await service.queryProject({
    page: params.page,
    size: params.size,
    sortBy: params.sortBy,
    sortDir: params.sortDir,
    ...filters
  })

  return {
    data: service.data.projects,
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
  if (selectedRow.value.id) {
    editDialogRef.value?.show(selectedRow.value)
  }
}

const deleteBtnClick = () => {
  if (selectedRow.value.id) {
    deleteDialogRef.value?.show(selectedRow.value)
  }
}

const onRowDbClick = (row: ProjectVo) => {
  editDialogRef.value?.show(row)
}

const onRowSelect = (row: ProjectVo) => {
  selectedRow.value = row
}
</script>

<template>
  <div class="app-container" id="personal-project-page">
    <!-- 查詢表單 -->
    <QueryForm
      ref="queryFormRef"
      v-model="projectListFilters"
      :grid-cols="2"
      :query-fn="queryProjects"
      :bind-url="true"
      :button-col-span="1"
      :default-page-size="20"
      :default-sort-by="'createdTime'"
      :default-sort-dir="'desc'"
    >
      <QueryFormItem label="項目名稱" :col-span="1">
        <el-input v-model="projectListFilters.name" placeholder=" " clearable />
      </QueryFormItem>
      <QueryFormItem label="描述" :col-span="1">
        <el-input v-model="projectListFilters.description" placeholder=" " clearable />
      </QueryFormItem>
    </QueryForm>

    <!-- 數據表格 -->
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
              <el-button icon="Plus" type="primary" @click="createBtnClick">創建</el-button>
              <el-button icon="Edit" type="warning" :disabled="!isSelected" @click="editBtnClick">編輯</el-button>
              <el-button icon="Delete" type="danger" :disabled="!isSelected" @click="deleteBtnClick">刪除</el-button>
            </el-space>
          </el-form-item>
        </el-form>
      </template>
    </data-table>

    <!-- 對話框 -->
    <CreateDialog ref="createDialogRef" @reload="queryFormRef?.refresh" />
    <EditDialog ref="editDialogRef" @reload="queryFormRef?.refresh" />
    <DeleteDialog ref="deleteDialogRef" @reload="queryFormRef?.refresh" />
  </div>
</template>
