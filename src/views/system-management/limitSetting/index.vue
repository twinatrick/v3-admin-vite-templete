<script setup lang="ts">
import FilterTable from "@/components/FilterTable/v3.vue"
import { TableColumnMap } from "@/components/FilterTable/type"
import { computed, onMounted, ref } from "vue"
import * as api from "@/api/limitSetting"
import * as type from "@/api/limitSetting/type"
import { transQuery } from "@/commonFunction/dataTrans"
import AddDialog from "./component/addDialog.vue"
import EditDialog from "./component/editDialog.vue"
import { ElMessageBox } from "element-plus"
const tableData = ref<Array<type.AlertCheckLimitVo>>([])
const columnData = computed(() => {
  return transQuery(tableData.value)
})

const tableColumnConfig = ref<Array<TableColumnMap>>([])
const addDialogRef = ref<InstanceType<typeof AddDialog> | null>(null)
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)
const selectedRow = ref<type.AlertCheckLimitVo>({
  key: "",
  limitValue: 0,
  tableName: "",
  columnName: ""
})
const handleRowClick = (row: any) => {
  console.log(row)
  selectedRow.value = row
}
const handleAdd = () => {
  console.log("add")
  addDialogRef.value?.show()
}
const handleEdit = () => {
  console.log("edit")
  editDialogRef.value?.show()
}
const handleDelete = async () => {
  console.log("delete")
  const isConfirmed = await ElMessageBox.confirm("Are you sure to delete?", "Confirm delete", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning"
  })
    .then(() => true)
    .catch(() => false)
  if (isConfirmed) {
    const res = await api.deleteLimitSetting(selectedRow.value)
    if (res.code == 0) {
      ElMessageBox.alert("Success")
      reloadData()
    } else {
      ElMessageBox.alert("fail")
    }
  }
}
const reloadData = () => {
  api.getLimitSetting().then((res) => {
    tableData.value = res.data
  })
}

onMounted(() => {
  api.getLimitSetting().then((res) => {
    tableData.value = res.data
  })
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
  console.log("mounted")
})
</script>

<template>
  <div class="app-container">
    <!--  <el-card mb-5 p-5 table :body-style="{ padding: 0 } ">-->
    <!--    <h1>Limit Setting</h1>-->
    <!--  </el-card>-->
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
