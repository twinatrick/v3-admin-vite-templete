<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import router, { asyncRoutes } from "@/router"
import { FunctionVo, TreeProp, RoleVO } from "./type"
import { api } from "@/api/client"
import CreateDialog from "./component/CreateDialog.vue"
import EditDialog from "./component/EditDialog.vue"
import Table from "./component/Table.vue"
import { ElLoading, ElMessageBox } from "element-plus"
import { showLoading } from "@/utils"
import { useUserStore } from "@/store/modules/user"
import { usePermissionStore } from "@/store/modules/permission"
import { QueryForm, QueryFormItem } from "@/components/QueryForm"

//data
const _allRoutes = router
  .getRoutes()
  .filter((route) => route.children?.length)
  .filter((route) => asyncRoutes.find((item) => item.path === route.path))
const createDialogRef = ref<InstanceType<typeof CreateDialog> | null>(null)
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)
const tableRef = ref<InstanceType<typeof Table> | null>(null)
const queryFormRef = ref<any>(null)
const allFunctions = ref<FunctionVo[]>([])

// 查询过滤器
const roleListFilters = ref({
  name: "",
  description: "",
  createdBy: ""
})

//compute
const selectedRow = computed<RoleVO>(() => {
  return tableRef.value?.selectedRow || {}
})

const isSelected = computed(() => Object.keys(selectedRow.value).length > 0)

const leveledFunctions = computed(() => {
  const sort = (a: FunctionVo, b: FunctionVo) => {
    return parseInt(a.sort || "0") - parseInt(b.sort || "0")
  }
  const temp: TreeProp[] = []
  const grandParents = allFunctions.value.filter((item) => !item.parent).sort(sort)
  for (const grandParent of grandParents) {
    const parents = allFunctions.value.filter((item) => item.parent === grandParent.id)
    const parentTemp: TreeProp[] = []
    for (const parent of parents) {
      const children = allFunctions.value.filter((item) => item.parent === parent.id).sort(sort)
      parentTemp.push({
        ...parent,
        children
      })
    }
    temp.push({
      ...grandParent,
      children: parentTemp.sort(sort)
    })
  }
  return temp
})

/**
 * 查询函数 - 传递给 QueryForm
 */
const queryRoles = async (params: any) => {
  const res = await api.roles.searchRoles({
    page: params.page,
    size: params.size,
    sortBy: params.sortBy,
    sortDir: params.sortDir,
    ...params.filters
  })

  const pageResult = res.data || {}

  return {
    data: pageResult.content || [],
    total: pageResult.totalElements || 0,
    page: pageResult.currentPage,
    size: pageResult.pageSize
  }
}

const handleResetClick = () => {
  roleListFilters.value = {
    name: "",
    description: "",
    createdBy: ""
  }
}

const createBtnClick = () => {
  createDialogRef.value?.show()
}

const editBtnClick = () => {
  editDialogRef.value?.show()
}

const deleteBtnClick = async () => {
  const isConfirmed = await ElMessageBox.confirm("Are you sure to delete?", "Confirm Delete", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning"
  })
    .then(() => true)
    .catch(() => false)
  if (!isConfirmed) return
  const loading = ElLoading.service({
    text: "Deleting..."
  })
  try {
    if (!selectedRow.value?.id) throw new Error("No selected row")
    await api.roles.deleteRole(selectedRow.value)
    // 刷新列表
    await queryFormRef.value?.refresh()
  } catch (e) {
    console.log(e)
  } finally {
    loading.close()
  }
}

const getFunctionList = async () => {
  const loading = showLoading("Loading...")
  try {
    const { data } = await api.functions.getFunction()
    allFunctions.value = data
  } catch (e) {
    console.log(e)
  } finally {
    loading.close()
  }
}

const afterCreate = async (_data: RoleVO) => {
  await queryFormRef.value?.refresh()
}

const afterUpdate = async (_data: RoleVO) => {
  await queryFormRef.value?.refresh()
}

const _updateUserInfoAndPermission = async () => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  await userStore.getInfo()
  const permission = userStore.userInfo?.permissions
  if (!permission) return
  permissionStore.setRoutesByFunctions(permission)
}

onMounted(() => {
  getFunctionList()
})
</script>
<style scoped></style>
<template>
  <div class="app-container">
    <!-- 查詢表單 -->
    <QueryForm
      ref="queryFormRef"
      v-model="roleListFilters"
      :grid-cols="3"
      :query-fn="queryRoles"
      :query-on-mounted="true"
      :query-on-activated="true"
      :bind-url="true"
      :default-page-size="20"
      :default-sort-by="'createdTime'"
      :default-sort-dir="'desc'"
      @reset="handleResetClick"
    >
      <QueryFormItem label="Name" :col-span="1">
        <el-input v-model="roleListFilters.name" placeholder=" " clearable />
      </QueryFormItem>
      <QueryFormItem label="Description" :col-span="1">
        <el-input v-model="roleListFilters.description" placeholder=" " clearable />
      </QueryFormItem>
      <QueryFormItem label="Created By" :col-span="1">
        <el-input v-model="roleListFilters.createdBy" placeholder=" " clearable />
      </QueryFormItem>
    </QueryForm>

    <!-- 表格組件 -->
    <Table
      v-if="queryFormRef"
      ref="tableRef"
      :data="queryFormRef.data"
      :loading="queryFormRef.loading"
      :total="queryFormRef.total"
      :current-page="queryFormRef.currentPage"
      :page-size="queryFormRef.size"
      @page-change="queryFormRef.onPageChange"
      @sort-change="queryFormRef.onSortChange"
    >
      <el-form>
        <el-form-item>
          <el-space>
            <el-button icon="Plus" type="primary" @click="createBtnClick">Create</el-button>
            <el-button icon="Edit" type="warning" :disabled="!isSelected" @click="editBtnClick">Edit </el-button>
            <el-button icon="Delete" type="danger" ml-auto :disabled="!isSelected" @click="deleteBtnClick"
              >Delete
            </el-button>
          </el-space>
        </el-form-item>
      </el-form>
    </Table>
    <CreateDialog ref="createDialogRef" :all-functions="leveledFunctions" @create="afterCreate" />
    <EditDialog ref="editDialogRef" :all-functions="leveledFunctions" :data="selectedRow" @update="afterUpdate" />
  </div>
</template>
