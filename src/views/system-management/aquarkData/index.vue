<script setup lang="ts">
import FilterTable from "@/components/FilterTable/v3.vue"
import { onMounted, ref } from "vue"
import { TableColumnMap, TableData } from "@/components/FilterTable/type"
import * as api from "@/api/aquarkData"
import * as type from "@/api/aquarkData/type"
import { transQuery } from "@/commonFunction/dataTrans"
import SqlLikeApi from "@/views/system-management/aquarkData/sqlLikeApi.vue"

const tableData = ref<Array<TableData>>([])
const map = ref<Array<TableColumnMap>>([
  {
    name: "station_id",
    value: "station_id",
    type: "string"
  },
  {
    name: "CSQ",
    value: "CSQ",
    type: "string"
  },
  {
    name: "trans_time",
    value: "trans_time",
    type: "date",
    sortable: true
  },
  {
    name: "rain_d",
    value: "rain_d",
    type: "number"
  },
  {
    name: "moisture",
    value: "moisture",
    type: "number"
  },
  {
    name: "temperature",
    value: "temperature",
    type: "number"
  },
  {
    name: "echo",
    value: "echo",
    type: "number"
  },
  {
    name: "waterSpeedAquark",
    value: "waterSpeedAquark",
    type: "number"
  },
  {
    name: "v1",
    value: "v1",
    type: "number"
  },
  {
    name: "v2",
    value: "v2",
    type: "number"
  },
  {
    name: "v3",
    value: "v3",
    type: "number"
  },
  {
    name: "v4",
    value: "v4",
    type: "number"
  },
  {
    name: "v5",
    value: "v5",
    type: "number"
  },
  {
    name: "v6",
    value: "v6",
    type: "number"
  },
  {
    name: "v7",
    value: "v7",
    type: "number"
  },
  {
    name: "peak",
    value: "是否尖峰",
    type: "select",
    formatter: (value: boolean) => {
      return value ? "尖峰" : "離峰"
    }
  }
])
const columnList = ref<Array<string>>([])
const filterList = ref<Array<type.CriteriaAPIFilter>>([])
const getColumnList = async () => {
  const res = await api.getColumnNameList()
  columnList.value = res.data
}
const getAquarkData = async () => {
  const res = await api.getDataList(filterList.value)
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

<style scoped lang="scss"></style>
