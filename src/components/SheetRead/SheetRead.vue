<script setup lang="ts">
import { ref } from "vue"
import { getMerge, getSheetBySheetId, getSheetDataBySheetId } from "@/api/DataBaseRefreshing"
import * as Type from "@/api/DataBaseRefreshing/type"
import { TableColumnCtx } from "element-plus"

const loading = ref<boolean>(false)
const data = ref<any[]>([])
const tabs = ref<Array<string>>([])
const nowTab = ref<string>("")
const size = ref<number>(0)
const display = ref<boolean>(false)
const mergeList = ref<Array<Type.Merge>>([])
const prop = defineProps({
  height: {
    type: String,
    default: "300px"
  },
  sheetId: {
    type: String,
    default: ""
  },
  columnWidth: {
    type: String,
    default: "150px"
  }
})
const ready = ref<boolean>(false)
async function getFirstSheet(sheetId: string) {
  let flag = false
  ready.value = false
  if (prop.sheetId === "") {
    flag = true
    if (sheetId == "") {
      return
    }
  }
  loading.value = true
  try {
    const res = await getSheetBySheetId(flag ? sheetId : prop.sheetId)
    tabs.value = res.data.tabName
    setData(res.data.sheet, res.data.merge)
    console.log(res.data)
    // mergeList.value = mergeListSeting(res.data.merge)
    // data.value = setDataTable(res.data.sheet)
    ready.value = true
    display.value = true
  } catch (e) {
    console.error(e)
  }
  loading.value = false
}

async function changeTab(index: number) {
  loading.value = true
  try {
    nowTab.value = tabs.value[index]
    setData(
      (await getSheetDataBySheetId(prop.sheetId, nowTab.value)).data,
      (await getMerge(prop.sheetId, nowTab.value)).data
    )
  } catch (e) {
    console.error(e)
  }
  loading.value = false
}
function setData(returnData: any, merges: Array<Type.Merge>) {
  data.value = setDataTable(returnData)
  mergeList.value = mergeListSeting(merges)
}

function setDataTable(dataList: Array<Array<string>>) {
  const newData: Array<{ [key: string]: string }> = []
  size.value = 0
  dataList.forEach((data) => {
    const obj: { [key: string]: string } = {}
    data.forEach((item, index) => {
      obj[`${index + 1}`] = item // Use backticks to dynamically set keys
    })
    if (size.value < data.length) {
      size.value = data.length
    }
    newData.push(obj)
  })
  return newData // Return the new data
}

interface SpanMethodProps {
  row: any
  column: TableColumnCtx<any>
  rowIndex: number
  columnIndex: number
}

function mergeFunction(data: SpanMethodProps) {
  return findInMerge(data.rowIndex, data.columnIndex, mergeList.value)
}

function findInMerge(rowIndex: number, columnIndex: number, mergeList: Array<Type.Merge>) {
  const span = { rowspan: 1, colspan: 1 }
  const flag = false
  mergeList.forEach((item) => {
    if (flag) return
    if (
      rowIndex >= item.startRowIndex &&
      rowIndex <= item.endRowIndex &&
      columnIndex >= item.startColumnIndex &&
      columnIndex <= item.endColumnIndex
    ) {
      if (rowIndex === item.startRowIndex && columnIndex === item.startColumnIndex) {
        span.rowspan = item.endRowIndex - item.startRowIndex + 1
        span.colspan = item.endColumnIndex - item.startColumnIndex + 1
      } else {
        span.rowspan = 0
        span.colspan = 0
      }
    }
  })
  return span
}

function mergeListSeting(list: Array<Type.Merge>) {
  const mergeList: Array<Type.Merge> = []
  list.forEach((item) => {
    mergeList.push({
      startRowIndex: item.startRowIndex.valueOf(),
      endRowIndex: item.endRowIndex.valueOf() - 1,
      startColumnIndex: item.startColumnIndex.valueOf() + 1,
      endColumnIndex: item.endColumnIndex.valueOf()
    })
  })
  return mergeList
}

function numberToAlphabetString(number: number) {
  if (number < 1) return ""

  let result = ""
  number -= 1

  if (number < 26) {
    result = String.fromCharCode(65 + number)
  } else {
    number -= 26
    const firstChar = String.fromCharCode(65 + Math.floor(number / 26))
    const secondChar = String.fromCharCode(65 + (number % 26))
    result = firstChar + secondChar
  }

  return result
}

function displaySheet() {
  display.value = true
}

function hideSheet() {
  display.value = false
}
function isReady() {
  return ready.value
}

function reset() {
  data.value = []
  tabs.value = []
  size.value = 0
  display.value = false
}
defineExpose({
  getFirstSheet,
  displaySheet,
  hideSheet,
  reset,
  isReady
})
</script>

<template>
  <el-card v-show="display">
    <el-table
      :data="data"
      scrollbar-always-on
      show-overflow-tooltip
      border
      :height="prop.height"
      v-loading="loading"
      :span-method="mergeFunction"
    >
      <template #default>
        <el-table-column type="index" fixed class-name="first" :resizable="false" :index="(index) => index" />
        <el-table-column
          v-for="column in size"
          :key="column"
          :prop="column.toString()"
          :label="numberToAlphabetString(column)"
          header-cell-class-name="hidden-header"
          :width="columnWidth"
        />
      </template>
    </el-table>

    <el-menu default-active="0" class="el-menu-demo" mode="horizontal">
      <el-menu-item v-for="(tab, index) in tabs" :index="index.toString()" :key="tab" @click="changeTab(index)">
        {{ tab }}
      </el-menu-item>
    </el-menu>
  </el-card>
</template>

<style lang="scss">
.sheer-read {
  .el-table {
    width: 100% !important;
  }

  .hidden-header {
    display: none;
  }

  .form-item {
    width: calc(100% / 3);
  }
}

.first {
  background-color: var(--el-fill-color-light) !important;
}
</style>
