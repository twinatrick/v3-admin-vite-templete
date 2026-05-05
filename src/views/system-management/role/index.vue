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
//data
const _allRoutes = router
  .getRoutes()
  .filter((route) => route.children?.length)
  .filter((route) => asyncRoutes.find((item) => item.path === route.path))
const createDialogRef = ref<InstanceType<typeof CreateDialog> | null>(null)
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)
const tableRef = ref<InstanceType<typeof Table> | null>(null)
const tableData = ref<RoleVO[]>([])
const allFunctions = ref<FunctionVo[]>([])
const tableLoading = ref(false)
const isDev = import.meta.env.DEV
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
  // const sortTemp: TreeProp[] = []
  // for (const grandRoute of leveledRoutes.value) {
  //   const grandParent = temp.find((item) => item.name === grandRoute.name)
  //   if (!grandParent) continue
  //   const parentTemp: TreeProp[] = []
  //   for (const parentRoute of grandRoute.children) {
  //     if (!grandParent.children) continue
  //     const parent = grandParent.children.find((item) => item.name === parentRoute)
  //     if (!parent) continue
  //     parentTemp.push(parent)
  //   }
  //   sortTemp.push({
  //     ...grandParent,
  //     children: parentTemp
  //   })
  // }
  // return sortTemp
})
const queryList = async () => {
  tableLoading.value = true
  try {
    const res = await api.roles.getRole()
    tableData.value = res.data.data || []
  } finally {
    tableLoading.value = false
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
    queryList()
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
  await queryList()
}
const afterUpdate = async (_data: RoleVO) => {
  await queryList()
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
  queryList()
  getFunctionList()
})
</script>
<style scoped></style>
<template>
  <div class="app-container">
    <Table ref="tableRef" :data="tableData" :loading="tableLoading">
      <el-form>
        <el-form-item>
          <el-space>
            <el-button icon="Plus" type="primary" @click="createBtnClick">Create</el-button>
            <el-button icon="Edit" type="warning" :disabled="!isSelected" @click="editBtnClick">Edit </el-button>
            <el-button v-show="isDev" icon="Plus" type="primary">Edit Function</el-button>
          </el-space>
          <el-button icon="Delete" type="danger" ml-auto :disabled="!isSelected" @click="deleteBtnClick"
            >Delete
          </el-button>
        </el-form-item>
      </el-form>
    </Table>
    <CreateDialog ref="createDialogRef" :all-functions="leveledFunctions" @create="afterCreate" />
    <EditDialog ref="editDialogRef" :all-functions="leveledFunctions" :data="selectedRow" @update="afterUpdate" />
  </div>
</template>
