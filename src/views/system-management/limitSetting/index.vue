<script setup lang="ts">
import FilterTable from "@/components/FilterTable/v3.vue"
import { computed, onMounted, ref } from "vue"
import AddDialog from "./component/addDialog.vue"
import EditDialog from "./component/editDialog.vue"
import { ElMessageBox } from "element-plus"
import { AlertCheckLimitVo } from "@/api/generated/Api"
import { transQuery } from "@/commonFunction/dataTrans"
import { TableColumnMap } from "@/components/FilterTable/type"
import { api } from "@/api/client"

const tableData = ref<Array<AlertCheckLimitVo>>([])
const columnData = computed(() => {
  return transQuery(tableData.value)
})

const tableColumnConfig = ref<Array<TableColumnMap>>([])
const addDialogRef = ref<InstanceType<typeof AddDialog> | null>(null)
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)
const selectedRow = ref<AlertCheckLimitVo>({
  id: "",
  limitValue: 0,
  tableName: "",
  columnName: ""
})
const handleRowClick = (row: any) => {
  selectedRow.value = row
}
const handleAdd = () => {
  addDialogRef.value?.show()
}
const handleEdit = () => {
  editDialogRef.value?.show()
}
const handleDelete = async () => {
  const isConfirmed = await ElMessageBox.confirm("Are you sure to delete?", "Confirm delete", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning"
  })
    .then(() => true)
    .catch(() => false)
  if (isConfirmed) {
    const res = await api.alertLimits.deleteLimit(selectedRow.value)
    if (res.code == 0) {
      ElMessageBox.alert("Success")
      reloadData()
    } else {
      ElMessageBox.alert("fail")
    }
  }
}
const reloadData = async () => {
  const res = await api.alertLimits.getLimit()
  tableData.value = res.data
}

onMounted(async () => {
  await reloadData()
  tableColumnConfig.value = [
    {
      name: "tableName",
      value: "tableName",
      type: "string"
    },
    {
      name: "columnName",
      value: "columnName",
      type: "string"
    },
    {
      name: "limitValue",
      value: "limitValue",
      type: "number"
    }
  ]
})
</script>

<template>
  <div class="app-container">
    <FilterTable
      flex
      flex-col
      class="h-100%!"
      :data="columnData"
      :total="columnData.length"
      :tableColumnMap="tableColumnConfig"
      @rowClick="handleRowClick"
    >
      <template #header>
        <el-button type="primary" @click="handleAdd" round icon="document">Add</el-button>
        <el-button type="danger" @click="handleEdit" round icon="document">Edit</el-button>
        <el-button type="success" @click="handleDelete" round icon="document">Delete</el-button>
      </template>
    </FilterTable>
  </div>
  <AddDialog ref="addDialogRef" @confirm="reloadData" />
  <EditDialog ref="editDialogRef" :row="selectedRow" @confirm="reloadData" :row-data="selectedRow" />
</template>

<style scoped lang="scss"></style>
