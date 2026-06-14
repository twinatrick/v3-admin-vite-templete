<script setup lang="ts">
import FilterTable from "@/components/FilterTable/v3.vue"
import { onMounted, ref } from "vue"
import SqlLikeApi from "@/views/system-management/aquarkData/sqlLikeApi.vue"
import { TableColumnMap, TableData } from "@/components/FilterTable/type"
import { CriteriaAPIFilter } from "@/api/generated/Api"
import { api } from "@/api/client"
import { transQuery } from "@/commonFunction/dataTrans"
import { colMap } from "./data"
const tableData = ref<Array<TableData>>([])
const map = ref<Array<TableColumnMap>>(colMap)
const columnList = ref<Array<string>>([])
const filterList = ref<Array<CriteriaAPIFilter>>([])
const getColumnList = async () => {
  const res = await api.aquarkDataController.getColumnNameList()
  columnList.value = res.data
}
const getAquarkData = async () => {
  const res = await api.aquarkDataController.getData(filterList.value)
  tableData.value = transQuery(res.data)
}
const handleDataReload = async (dataList: any) => {
  tableData.value = transQuery(dataList)
}

onMounted(async () => {
  await getColumnList()
  await getAquarkData()
})
</script>

<template>
  <div class="app-container">
    <el-card mb-5 p-5 table :body-style="{ padding: 0 }">
      <sql-like-api :column-list="columnList" @addFilter="handleDataReload" />
    </el-card>
    <FilterTable :table-column-map="map" :data="tableData" flex flex-col class="h-100%!" />
  </div>
</template>
