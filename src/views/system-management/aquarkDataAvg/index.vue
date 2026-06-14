<script setup lang="ts">
import FilterTable from "@/components/FilterTable/v3.vue"
import { onMounted, ref } from "vue"
import { api } from "@/api/client"
import { transQuery } from "@/commonFunction/dataTrans"
import { TableColumnMap, TableData } from "@/components/FilterTable/type"

const startDate = ref<Date>(new Date())
const endDate = ref<Date>(new Date())

const tableData = ref<Array<TableData>>([])
const map = ref<Array<TableColumnMap>>([
  {
    name: "station_id",
    value: "站點",
    type: "string"
  },
  {
    name: "date",
    value: "日期",
    type: "string"
  },
  {
    name: "rain_d",
    value: "每小時平均雨量",
    type: "number"
  },
  {
    name: "moisture",
    value: "每天平均濕度",
    type: "number"
  },
  {
    name: "temperature",
    value: "每天平均溫度",
    type: "number"
  },
  {
    name: "echo",
    value: "每天平均水位空高 m",
    type: "number"
  },
  {
    name: "waterSpeedAquark",
    value: "每天平均表面流速 m/s ",
    type: "number"
  },
  {
    name: "v1",
    value: "每天平均鋰電池電壓 V",
    type: "number"
  },
  // {
  //   name: "v2",
  //   value: "v2",
  //   type: "number"
  // },
  // {
  //   name: "v3",
  //   value: "v3",
  //   type: "number"
  // },
  // {
  //   name: "v4",
  //   value: "v4",
  //   type: "number"
  // },
  {
    name: "v5",
    value: "每天平均太陽能板 1 電壓 V",
    type: "number"
  },
  {
    name: "v6",
    value: "每天平均太陽能板 1 電壓 V",
    type: "number"
  }
  // {
  //   name: "v7",
  //   value: "v7",
  //   type: "number"
  // }
])

const getAquarkData = async () => {
  startDate.value.setHours(0, 0, 0, 0)
  endDate.value.setHours(23, 59, 59, 999)
  const res = await api.aquarkDataController.getAverage({
    start: startDate.value.toISOString(),
    end: endDate.value.toISOString()
  })
  tableData.value = transQuery(res.data)
}
// const handleDataReload = async (dataList: any) => {
//   tableData.value = transQuery(dataList)
// }

onMounted(async () => {
  await getAquarkData()
})
</script>

<template>
  <div class="app-container">
    <el-card mb-5 p-5 table :body-style="{ padding: 0 }">
      <el-form label-width="100px" label-position="right" flex flex-wrap>
        <el-form-item label="Start Date" class="el-form-item-3">
          <el-date-picker v-model="startDate" type="date" clearable />
        </el-form-item>
        <el-form-item label="End Date" class="el-form-item-3">
          <el-date-picker v-model="endDate" type="date" clearable />
        </el-form-item>
        <el-form-item class="el-form-item-3">
          <el-button type="primary" @click="getAquarkData">Search</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <FilterTable :table-column-map="map" :data="tableData" flex flex-col class="h-100%!" />
  </div>
</template>

<style scoped lang="scss">
.el-form-item-3 {
  width: calc(100% / 3) !important;
}
</style>
