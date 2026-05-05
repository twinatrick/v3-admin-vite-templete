<script lang="ts" setup>
import { PropType, ref, watch } from "vue"
import { CustomTableOptionType } from "./types/Option"
import { ElTable } from "element-plus"
type RowStatus = {
  warning: any[]
  error: any[]
  success: any[]
}
const prop = defineProps({
  data: {
    type: Array,
    required: true
  },
  option: {
    type: Object as PropType<CustomTableOptionType>,
    required: false
  },
  total: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    default: 100
  },
  currentPage: {
    type: Number,
    default: 1
  },
  loading: {
    type: Boolean,
    default: false
  },
  rowStatus: {
    type: Object as PropType<RowStatus>,
    default: () => ({
      warning: [],
      error: [],
      success: []
    })
  },
  cellClassName: {
    type: Function as PropType<(data: { row: any; column: any; rowIndex: number; columnIndex: number }) => string>,
    default: () => ""
  }
})
const emit = defineEmits<{
  (event: "selected", val: Array<any>): void
  (event: "multi-selected", val: Array<any>): void
  (event: "row-click", val: any): void
  (event: "row-dbclick", val: any): void
  (event: "row-contextmenu", val: any): void
  (event: "page-change", val: { page: number; size: number }): void
  (event: "sort-change", val: { sortBy: string; sortDir: "asc" | "desc" | null }): void
}>()
//data
const tableData = ref<Array<any>>()
const pageSize = ref<number>(prop.pageSize)
const total = ref<number>(prop.total)
const table = ref<InstanceType<typeof ElTable> | null>(null)
//watcher
watch(
  () => prop.data,
  () => {
    tableData.value = calCurrentData(prop.data)
  }
)
watch(
  () => prop.total,
  () => {
    total.value = prop.total
  }
)
watch(
  () => currentPage.value,
  () => (tableData.value = calCurrentData(prop.data))
)
watch(
  () => prop.currentPage,
  () => {
    currentPage.value = prop.currentPage
  }
)
watch(
  () => prop.pageSize,
  () => {
    pageSize.value = prop.pageSize
  }
)
//functions
const calCurrentData = (val: Array<any>) => {
  if (!prop.option?.pagination) return val
  //若為真分頁模式，則直接回傳資料
  if (prop.option?.realPagination == true) return val
  //use currentPage and pageSize to calculate current data
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return val.slice(start, end)
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  if (prop.option?.realPagination) {
    emit("page-change", {
      page: val - 1,
      size: pageSize.value
    })
  }
}
const handlePageSizeChange = (val: number) => {
  pageSize.value = val
  currentPage.value = 1
  if (prop.option?.realPagination) {
    emit("page-change", {
      page: 0,
      size: val
    })
  }
}
const handleSortChange = (payload: { prop: string; order: "ascending" | "descending" | null }) => {
  const sortDir = payload.order === "ascending" ? "asc" : payload.order === "descending" ? "desc" : null
  emit("sort-change", {
    sortBy: payload.prop,
    sortDir
  })
}
const handleSelectionChange = (val: Array<any>) => {
  emit("multi-selected", val)
  // if(prop.option?.table?.selectMode === 'multiple'){
  //     emit("selected", val)
  // }else {
  //     return
  //     table.value?.clearSelection()
  //     table.value?.toggleRowSelection(val[val.length-1], true)
  //     emit("selected", [val[val.length-1]])
  // }
  // console.log("multi")
  // if (val.length === 0) {
  //   //當選擇的資料為空時，不觸發事件
  //   table.value?.setCurrentRow(null)
  // }
  // else if (val.length === 1) {
  //   table.value?.setCurrentRow(val[0])
  // } else {
  //   table.value?.setCurrentRow(null)
  // }
}
const handleCurrentRowChange = (val: any) => {
  if (val === null) return
  emit("selected", [val])
  // if(prop.option?.table?.selectMode === 'multiple'){
  //     return;
  //     table.value?.toggleRowSelection(val, true)
  //     emit("selected", table.value?.getSelectionRows())
  // }else{
  //     table.value?.clearSelection()
  //     table.value?.toggleRowSelection(val, true)
  //     emit("selected", [val])
  // }
  // console.log("single")
  //當選擇的資料為空時，不觸發事件
  // if (val === null) return
  // // const otherRows: Array<any> = table.value
  // //   ?.getSelectionRows()
  // //   .filter((x: any) => JSON.stringify(x) !== JSON.stringify(val))
  // // otherRows.forEach((row) => table.value?.toggleRowSelection(row, false))
  // table.value?.toggleRowSelection(val, true)
  // // emit("selected", table.value?.getSelectionRows())
  // emit("selected", [val])
}
defineExpose({
  clearSelection: () => {
    table.value?.clearSelection()
  },
  toggleRowSelection: (row: any, selected: boolean) => {
    table.value?.toggleRowSelection(
      tableData.value?.find((data) => {
        return data.key == row.key
      }),
      selected
    )
  },
  sort: (prop: string, order: string) => {
    table.value?.sort(prop, order)
  },
  clearSort: () => {
    table.value?.clearSort()
  }
})
const rowClassName = (data: { row: any; rowIndex: number }) => {
  const temp = prop.option?.table?.rowKey
  if (!temp) return ""
  let rowKey: string
  if (typeof temp === "function") rowKey = temp(data.row) as string
  else rowKey = temp
  const match = (row: any) => row[rowKey] === data.row[rowKey]
  const isSuccess = () => Boolean(prop.rowStatus.success.find(match))
  const isWarning = () => Boolean(prop.rowStatus.warning.find(match))
  const isError = () => Boolean(prop.rowStatus.error.find(match))
  switch (true) {
    case isSuccess():
      return "success-row"
    case isWarning():
      return "warning-row"
    case isError():
      return "error-row"
    default:
      return ""
  }
}
//initialize
tableData.value = calCurrentData(prop.data)
</script>
<style lang="scss">
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-5);
}
.el-table .error-row {
  --el-table-tr-bg-color: var(--el-color-error-light-5);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-5);
}
.el-table-column--selection {
  padding: 0 !important;
  .cell {
    margin: 0 calc(calc(100% - 30px) / 2);
    height: 100% !important;
    padding: 0;
    .el-checkbox__inner {
      width: 30px;
      height: 30px;
      &:after {
        height: 14px;
        left: 11px;
        width: 6px;
        top: 3px;
      }
      &:before {
        height: 5px;
        top: 11px;
      }
    }
  }
}
</style>
<template>
  <el-card :body-style="{ display: 'flex', flexDirection: 'column', height: '100%' }">
    <slot name="header" />
    <el-table
      ref="table"
      show-overflow-tooltip
      :data="tableData"
      :height="prop.option?.table?.height"
      :maxHeight="prop.option?.table?.maxHeight"
      :stripe="prop.option?.table?.stripe"
      :border="prop.option?.table?.border"
      :fit="prop.option?.table?.fit"
      :size="prop.option?.table?.size"
      :show-header="prop.option?.table?.showHeader"
      :highlight-current-row="prop.option?.table?.highlightCurrentRow"
      :row-key="prop.option?.table?.rowKey"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentRowChange"
      :row-style="prop.option?.table?.rowStyle"
      :row-class-name="rowClassName"
      :cell-class-name="prop.cellClassName"
      @sort-change="handleSortChange"
      @row-dblclick="
        (row:any, column:any, event:any) =>
          emit('row-dbclick', {
            row,
            column,
            event
          })
      "
      @row-click="
        (row:any, column:any, event:any) =>
          emit('row-click', {
            row,
            column,
            event
          })
      "
      @row-contextmenu="
        (row:any, column:any, event:any) =>
          emit('row-contextmenu', {
            row,
            column,
            event
          })
      "
    >
      <slot name="body" />
      <template #append>
        <slot name="append" />
      </template>
    </el-table>
    <el-pagination
      background
      v-show="option?.pagination"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      :pager-count="option?.pagination?.maxPageCount"
      :layout="option?.pagination?.layout"
      :small="option?.pagination?.small"
      :page-sizes="option?.pagination?.pageSizes"
      @update:current-page="handleCurrentChange"
      @update:page-size="handlePageSizeChange"
      flex-justify-center
      mt-3
    />
  </el-card>
</template>
