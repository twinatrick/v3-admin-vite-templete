<script lang="ts" setup>
import { computed, onMounted, PropType, reactive, ref, useSlots, watch } from "vue"
import { TableColumnMap, TableData } from "./type"
import ElInputWithTag from "@/components/InputWithTag/el-input-with-tag.vue"
import MultiSelect from "@/components/MultiSelect/index.vue"
import { VxeTableEvents, VxeTableInstance } from "vxe-table"
import { debounce } from "lodash"
import { waitUntil } from "@/utils"

//date
const slot = useSlots() as ReturnType<typeof useSlots>
const table = ref<VxeTableInstance | null>(null)
const prop = defineProps({
  data: {
    type: Array<TableData>,
    required: true
  },
  tableColumnMap: {
    type: Array<TableColumnMap>,
    required: true
  },
  columnWidth: {
    type: String,
    default: "150"
  },
  checkable: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: false
  },
  filterable: {
    type: Boolean,
    default: true
  },
  exportable: {
    type: Boolean,
    default: true
  },
  keyReference: {
    type: String,
    default: "id"
  },
  editOption: {
    type: Object as PropType<{ [key: string]: any }>,
    default: () => {}
  },
  extraColumn: {
    type: Boolean,
    default: false
  },
  extraWidth: {
    type: String,
    default: "80"
  },
  extraLabel: {
    type: String,
    default: ""
  },
  extraHide: {
    type: Boolean,
    default: false
  },
  keepFilter: {
    type: Boolean,
    default: true
  },
  pageable: {
    type: Boolean,
    default: true
  },
  pageSize: {
    type: Number,
    default: 20
  },
  pageSizeList: {
    type: Array<number>,
    default: [20, 50, 100, 200]
  },
  editMode: {
    type: String,
    default: "row"
  },
  editTrigger: {
    type: String,
    default: "dblclick"
  },
  cellClassName: {
    type: [String, Function] as PropType<String | ((params: any) => string | undefined)>,
    default: () => ""
  },
  rowClassName: {
    type: [String, Function] as PropType<String | ((params: any) => string | undefined)>,
    default: () => ""
  }
})
const oldData = reactive<{ [key: string]: any }>({})
const standardData = ref<Array<any>>([])
const filteredData = ref<Array<any>>([])
const slicedData = ref<Array<any>>([])
const editData = ref<Array<any>>([])
const editOutputData = ref<Array<any>>([])
const searchItem = reactive<any>({})
const sortItem = reactive<any>({})
const selectItem = computed(() => {
  const tempItem: { [key: string]: any } = {}
  prop.tableColumnMap.forEach((tableColumn) => {
    if (
      tableColumn.type === "select" &&
      (searchItem[tableColumn.name] == undefined || searchItem[tableColumn.name].length == 0)
    ) {
      const tempList: string[] = []
      filteredData.value.forEach((filterData) => {
        // tempList.push(filterData[tableColumn.name])

        if (filterData[tableColumn.name] || filterData[tableColumn.name] == "") {
          tempList.push(filterData[tableColumn.name])
        }
      })
      tempItem[tableColumn.name] = new Set(tempList)
    } else {
      if (selectItem.value) tempItem[tableColumn.name] = selectItem.value[tableColumn.name]
    }
  })
  return tempItem
})
const selectedNum = computed(() => {
  return standardData.value.filter((item) => item.checkField).length
})
const pageObject = reactive({
  currentPage: 1,
  pageSize: prop.pageSize,
  pageSizeList: prop.pageSizeList,
  total: filteredData.value.length,
  maxPageCount: 7,
  layout: "total, prev, pager, next, jumper, sizes"
})
const extraFixed = ref<boolean>(true)
//founction
// 將原始資料轉成標準資料
const originToStandard = () => {
  const tempList: any[] = []
  prop.data.forEach((tempData: TableData) => {
    if (
      oldData[tempData.data[prop.keyReference]] &&
      JSON.stringify(tempData) === oldData[tempData.data[prop.keyReference]]
    ) {
      tempList.push(
        standardData.value.find((standardData) => standardData[prop.keyReference] === tempData.data[prop.keyReference])
      )
    } else {
      tempList.push(turnToStandard(tempData))
    }
  })
  // tempList.forEach((tempData) => {
  //   const copyData: { [key: string]: any } = {}
  //   Object.assign(copyData, tempData)
  //   prop.tableColumnMap.forEach((tableColumn) => {
  //     if (tableColumn.formatter != undefined) {
  //       tempData[tableColumn.name] = tableColumn.formatter(tempData[tableColumn.name], copyData)
  //     }
  //   })
  // })
  const tempOldData: { [key: string]: any } = {}
  prop.data.forEach((tempData: TableData) => {
    tempOldData[tempData.data[prop.keyReference]] = JSON.stringify(tempData)
  })
  oldData.value = tempOldData
  standardData.value = tempList
  filteredData.value = tempList
  pageObject.total = tempList.length
}
// 單一資料攤平並format
const turnToStandard = (tempData: TableData) => {
  const { data } = tempData
  const splitData: { [key: string]: any } = {}
  Object.assign(splitData, data)
  return splitData
}
// 初始化Filter、Sort條件
const getInitSearchItem = () => {
  prop.tableColumnMap.forEach((tableColumn) => {
    if (tableColumn.type === "string") {
      searchItem[tableColumn.name] = ref<Array<string>>([])
    } else if (tableColumn.type === "select") {
      searchItem[tableColumn.name] = ref<Array<string>>([])
    } else if (tableColumn.type === "date") {
      searchItem[tableColumn.name] = null
    } else if (tableColumn.type === "number") {
      searchItem[tableColumn.name] = ref<Array<string>>(["", ""])
    } else {
      searchItem[tableColumn.name] = ref<Array<string>>([])
    }
    sortItem[tableColumn.name] = null
  })
}
// 根據Filter查詢
const startSearch = () => {
  const filter = (standardData: any) => {
    let resultMatch = true
    prop.tableColumnMap.forEach((tableColumn) => {
      if (tableColumn.type === "string" && searchItem[tableColumn.name] && searchItem[tableColumn.name].length != 0) {
        let tempMatch = false
        searchItem[tableColumn.name].forEach((filterStr: string) => {
          tempMatch =
            tempMatch || String(standardData[tableColumn.name]).toLowerCase().includes(filterStr.toLowerCase())
        })
        resultMatch = resultMatch && tempMatch
      } else if (tableColumn.type === "number") {
        if (searchItem[tableColumn.name]?.[0] != "" && searchItem[tableColumn.name]?.[1] == "") {
          resultMatch = resultMatch && Number(standardData[tableColumn.name]) >= Number(searchItem[tableColumn.name][0])
        } else if (searchItem[tableColumn.name][0] == "" && searchItem[tableColumn.name][1] != "") {
          resultMatch = resultMatch && Number(standardData[tableColumn.name]) <= Number(searchItem[tableColumn.name][1])
        } else if (searchItem[tableColumn.name][0] != "" && searchItem[tableColumn.name][1] != "") {
          resultMatch =
            resultMatch &&
            Number(standardData[tableColumn.name]) >= Number(searchItem[tableColumn.name][0]) &&
            Number(standardData[tableColumn.name]) <= Number(searchItem[tableColumn.name][1])
        }
      } else if (
        tableColumn.type === "select" &&
        searchItem[tableColumn.name] &&
        searchItem[tableColumn.name].length != 0
      ) {
        let tempMatch = false
        searchItem[tableColumn.name].forEach((filterStr: string) => {
          tempMatch = tempMatch || standardData[tableColumn.name] === filterStr
        })
        resultMatch = resultMatch && tempMatch
      } else if (tableColumn.type === "date" && searchItem[tableColumn.name] && searchItem[tableColumn.name] !== null) {
        const originData = prop.data.find(
          (item: any) => item.data[prop.keyReference] === standardData[prop.keyReference]
        )
        if (originData) {
          const endDate = new Date(searchItem[tableColumn.name][1])
          endDate.setDate(endDate.getDate() + 1)
          resultMatch =
            resultMatch &&
            originData.data[tableColumn.name] !== null &&
            new Date(originData.data[tableColumn.name]) >= new Date(searchItem[tableColumn.name][0]) &&
            new Date(originData.data[tableColumn.name]) < endDate
        }
      }
    })
    return resultMatch
  }
  filteredData.value = standardData.value.filter(filter)
  pageObject.total = filteredData.value.length
  if (prop.pageable) {
    slicedData.value = dataSort(filteredData.value).slice(
      (pageObject.currentPage - 1) * pageObject.pageSize,
      pageObject.currentPage * pageObject.pageSize
    )
  } else {
    slicedData.value = dataSort(filteredData.value)
  }
  slicedData.value.forEach((data, index) => {
    data.index = index + (pageObject.currentPage - 1) * pageObject.pageSize + 1 + "."
  })
}
const saveBtnClick = () => {
  const editOutputData: { [key: string]: any }[] = []
  editData.value.forEach((data) => {
    const tempData: { [key: string]: any } = {
      ...prop.data.find((item) => item.data[prop.keyReference] === data.key)?.data,
      ...data
    }
    editOutputData.push(tempData)
  })
  emit("editOutput", editOutputData)
}
const resetDataBtnClick = () => {
  editData.value = []
  originToStandard()
  startSearch()
}
const resetFilterBtnClick = () => {
  getInitSearchItem()
  startSearch()
}
const handleCurrentChange = (val: number) => {
  pageObject.currentPage = val
  slicedData.value = dataSort(filteredData.value).slice(
    (pageObject.currentPage - 1) * pageObject.pageSize,
    pageObject.currentPage * pageObject.pageSize
  )
  slicedData.value.forEach((data, index) => {
    data.index = index + (pageObject.currentPage - 1) * pageObject.pageSize + 1 + "."
  })
}
const handlePageSizeChange = (val: number) => {
  pageObject.pageSize = val
  pageObject.currentPage = 1
  slicedData.value = dataSort(filteredData.value).slice(
    (pageObject.currentPage - 1) * pageObject.pageSize,
    pageObject.currentPage * pageObject.pageSize
  )
  slicedData.value.forEach((data, index) => {
    data.index = index + (pageObject.currentPage - 1) * pageObject.pageSize + 1 + "."
  })
}
const oneDataChange = (key: string, name: string, data: any) => {
  const oldData = prop.data.find((item) => item.data[prop.keyReference] === key)
  if (oldData && oldData.data[name] !== data) {
    if (editData.value.find((item) => item.key === key)) {
      const oldEditData = editData.value.find((item) => item.key === key)
      oldEditData[name] = data
    } else {
      const newData: { [key: string]: any } = { key: key }
      newData[name] = data
      editData.value.push(newData)
    }
  } else if (oldData && oldData.data[name] == data) {
    if (editData.value.find((item) => item.key === key)) {
      const oldEditData = editData.value.find((item) => item.key === key)
      delete oldEditData[name]
      if (Object.keys(oldEditData).length === 1) {
        editData.value = editData.value.filter((item) => item.key !== key)
      }
    }
  }
  const dataInStandard = standardData.value.find((item) => item[prop.keyReference] === key)
  if (!dataInStandard) return

  const tableColumn = prop.tableColumnMap.find((tableColumn) => tableColumn.name == name)

  dataInStandard[name] = tableColumn?.formatter ? tableColumn.formatter(data, dataInStandard) : data
}
//排序功能
const sortColumn = (field: string, sort: string | null) => {
  for (const key in sortItem) {
    if (Object.prototype.hasOwnProperty.call(sortItem, key)) {
      if (key === field) {
        sortItem[key] = sort
      } else {
        sortItem[key] = null
      }
    }
  }
  if (prop.pageable) {
    slicedData.value = dataSort(filteredData.value).slice(
      (pageObject.currentPage - 1) * pageObject.pageSize,
      pageObject.currentPage * pageObject.pageSize
    )
  } else {
    slicedData.value = dataSort(filteredData.value)
  }
}
const dataSort = (data: any) => {
  const tempData = [...data]
  for (const key in sortItem) {
    if (Object.prototype.hasOwnProperty.call(sortItem, key)) {
      const tableColumn = prop.tableColumnMap.find((tableColumn) => tableColumn.name == key)
      if (tableColumn == undefined) continue
      if (sortItem[key] === "asc") {
        if (tableColumn.type === "number") {
          tempData.sort((a: any, b: any) => Number(b[key]) - Number(a[key]))
        } else {
          tempData.sort((a: any, b: any) => b[key].localeCompare(a[key]))
        }
      } else if (sortItem[key] === "desc") {
        if (tableColumn.type === "number") {
          tempData.sort((a: any, b: any) => Number(a[key]) - Number(b[key]))
        } else {
          tempData.sort((a: any, b: any) => a[key].localeCompare(b[key]))
        }
      }
    }
  }
  return tempData
}
const validateInput = (value: string | number, columnName: string, index: number) => {
  searchItem[columnName][index] = String(Number(value))
    // .replace(/[^0-9]/g, "")
    .replace(/[^\d]/g, "")
    .replace(/^0+/, "0")
}
const clearSelection = () => {
  standardData.value.forEach((item) => (item.checkField = false))
  emit("multi-selected", [])
}
const extraFixedChang = (value: boolean) => {
  extraFixed.value = value
}
const toggleRowSelection = async (row: any, selected: boolean) => {
  await waitUntil(() => Boolean(filteredData.value.length))
  filteredData.value.find((item) => item[prop.keyReference] === row.data[prop.keyReference]).checkField = selected
}
//emit
const onFocus = (scope: any) => {
  emit("onFocus", scope)
}
const handleSelectionChange: VxeTableEvents.CheckboxChange<any> = () => {
  const result: any[] = []
  filteredData.value
    .filter((item) => item.checkField)
    .forEach((selected) => {
      const originData = prop.data.find((item: any) => item.data[prop.keyReference] === selected[prop.keyReference])
      if (originData) {
        const { data } = originData
        const splitData: { [key: string]: any } = {}
        Object.assign(splitData, data)
        result.push(splitData)
      }
    })
  emit("multi-selected", result)
}
const handleAllSelectionChange: VxeTableEvents.CheckboxChange<any> = () => {
  // if (dataIsCheckedCount(slicedData.value) === pageObject.pageSize) {
  //   filteredData.value.forEach((item) => {
  //     item.checkField = true
  //   })
  // } else {
  //   filteredData.value.forEach((item) => {
  //     item.checkField = false
  //   })
  // }
  const result: any[] = []
  filteredData.value
    .filter((item) => item.checkField)
    .forEach((selected) => {
      const originData = prop.data.find((item: any) => item.data[prop.keyReference] === selected[prop.keyReference])
      if (originData) {
        const { data } = originData
        const splitData: { [key: string]: any } = {}
        Object.assign(splitData, data)
        result.push(splitData)
      }
    })
  emit("multi-selected", result)
}
const handleTrueSelectAll = (value: boolean) => {
  filteredData.value.forEach((item) => {
    item.checkField = value
  })
  table.value?.setAllCheckboxRow(value)
  emit("multi-selected", value ? filteredData.value : [])
}
const exportPage = () => {
  const data = filteredData.value.map((item) => {
    const tempData: { [key: string]: any } = {}
    prop.tableColumnMap.forEach((tableColumn) => {
      const partData = item[tableColumn.name] != null ? item[tableColumn.name] : ""
      tempData[tableColumn.name] = '"' + partData + '"'
    })
    return tempData
  })
  data.unshift(
    prop.tableColumnMap.reduce((acc, cur) => {
      acc[cur.name] = cur.value
      return acc
    }, {} as any)
  )
  const csvContent = ("data:text/csv;charset=utf-8," + data.map((row) => Object.values(row).join(",")).join("\n"))
    .replaceAll("+", "")
    .replaceAll("/", "")
    .replaceAll("?", "")
    .replaceAll("%", "")
    .replaceAll("#", "")
    .replaceAll("&", "")
    .replaceAll("=", "")
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", "export.csv")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
// const dataIsCheckedCount = (data: any) => {
//   let result = 0
//   data.forEach((item: any) => {
//     if (item.checkField) result++
//   })
//   return result
// }
const getEditData = () => {
  editOutputData.value = []
  editData.value.forEach((data) => {
    const tempData: { [key: string]: any } = {
      ...prop.data.find((item) => item.data[prop.keyReference] === data.key)?.data,
      ...data
    }
    editOutputData.value.push(tempData)
  })
  return editOutputData.value
}
const clickData = (val: any) => {
  const result: { [key: string]: any } = {}
  const originData = prop.data.find((item: any) => item.data[prop.keyReference] === val.row[prop.keyReference])
  if (originData) {
    const { data } = originData
    Object.assign(result, data)
  }
  emit("row-click", result)
}
const dbClickData = (val: any) => {
  if (prop.editable) return
  const result: { [key: string]: any } = {}
  const originData = prop.data.find((item: any) => item.data[prop.keyReference] === val.row[prop.keyReference])
  if (originData) {
    const { data } = originData
    Object.assign(result, data)
  }
  emit("row-dbclick", result)
}

const emit = defineEmits(["onFocus", "multi-selected", "editOutput", "row-click", "row-dbclick"])
defineExpose({
  getEditData,
  clearSelection,
  toggleRowSelection
})
//watch
watch(
  () => prop.data,
  () => {
    originToStandard()
    clearSelection()
    editData.value = []
    if (!prop.keepFilter) {
      getInitSearchItem()
    } else {
      if (Object.values(sortItem).every((value) => value === null)) {
        getInitSearchItem()
      }
      startSearch()
    }
  },
  { deep: true }
)
watch(
  () => searchItem,
  debounce(
    () => {
      startSearch()
    },
    250,
    {
      leading: true,
      trailing: false
    }
  ),
  { deep: true }
)
watch(
  () => prop.tableColumnMap,
  () => {
    getInitSearchItem()
  },
  { deep: true }
)
const recalculate = () => {
  function getElementOuterHeight(element: Element) {
    const style = window.getComputedStyle(element)
    const marginTop = parseFloat(style.marginTop)
    const marginBottom = parseFloat(style.marginBottom)
    return element.clientHeight + marginTop + marginBottom
  }
  function getElementInnerHeight(element: Element) {
    const style = window.getComputedStyle(element)
    const paddingTop = parseFloat(style.paddingTop)
    const paddingBottom = parseFloat(style.paddingBottom)
    return element.clientHeight - paddingTop - paddingBottom
  }
  const CLASS_NAME = "filter-table-v3"
  const cardBody = document.querySelector(`.${CLASS_NAME}>.el-card__body`)
  if (!cardBody) return

  const children = cardBody.querySelectorAll(`.${CLASS_NAME}>.el-card__body>:not(.table-container)`)

  let useHeight = 0
  for (let i = 0; i < children.length; i++) {
    const element = children.item(i)
    if (!element) continue
    useHeight += getElementOuterHeight(element)
  }
  const fullHeight = getElementInnerHeight(cardBody)
  const containerLength = fullHeight - useHeight

  const tableContainer = cardBody.querySelector(".table-container") as HTMLElement
  if (!tableContainer) return
  tableContainer.style.height = `${containerLength}px`
}
const setObserver = () => {
  const resizeObserver = new ResizeObserver(() => {
    debounce(() => {
      recalculate()
    }, 250)()
  })
  const cardBody = document.querySelector(".filter-table-v3>.el-card__body")
  if (!cardBody) return
  resizeObserver.observe(cardBody)
}
onMounted(() => {
  setObserver()
})
</script>
<template>
  <el-card class="filter-table-v3" :body-style="{ display: 'flex', flexDirection: 'column', height: '100%' }">
    <div class="flex flex-none" style="margin-bottom: 16px">
      <slot name="header" />
      <div style="margin-left: auto">
        <!-- <el-button v-if="exportable" icon="Download" type="success" @click="exportPage">Export Page</el-button> -->
        <el-button
          icon="Select"
          type="success"
          @click="saveBtnClick"
          v-show="prop.editable"
          :disabled="editData.length == 0"
          >Save
        </el-button>
        <el-button icon="Refresh" type="warning" @click="resetDataBtnClick" v-show="prop.editable"
          >Reset Data</el-button
        >
        <el-button icon="Refresh" type="danger" @click="resetFilterBtnClick" v-show="prop.filterable"
          >Reset Filter</el-button
        >
      </div>
    </div>
    <div class="table-container">
      <vxe-table
        ref="table"
        border
        height="auto"
        :data="slicedData"
        :edit-config="{
          trigger: prop.editTrigger as '' | 'click' | 'dblclick' | 'manual' | null,
          mode: prop.editMode,
          showIcon: false,
          showUpdateStatus: false
        }"
        :checkbox-config="{ checkField: 'checkField', highlight: true }"
        :column-config="{ resizable: true }"
        :scroll-x="{ scrollToLeftOnChange: false, enabled: false }"
        :scroll-y="{ enabled: false }"
        @edit-actived="onFocus"
        @checkbox-change="handleSelectionChange"
        @checkbox-all="handleAllSelectionChange"
        @cell-click="clickData"
        @cell-dblclick="dbClickData"
        :cell-class-name="typeof prop.cellClassName === 'function' ? prop.cellClassName : undefined"
        :row-class-name="typeof prop.rowClassName === 'function' ? prop.rowClassName : undefined"
        keep-source
        show-overflow
        class="flex-1 pd-8px"
      >
        <vxe-column field="index" width="50" fixed="left">
          <template #header>
            <el-dropdown trigger="click" placement="bottom-start">
              <el-button icon="More" link />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-if="checkable" @click="handleTrueSelectAll(true)"
                    >Select All(across pages)
                  </el-dropdown-item>
                  <el-dropdown-item v-if="checkable" @click="handleTrueSelectAll(false)"
                    >Cancel All(across pages)
                  </el-dropdown-item>
                  <el-dropdown-item v-if="exportable" @click="exportPage">Export Page</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </vxe-column>
        <vxe-column v-if="checkable" type="checkbox" width="63" class="custom-checkbox" fixed="left" />
        <template v-for="tableColumn in prop.tableColumnMap" :key="tableColumn.name">
          <vxe-colgroup v-if="tableColumn.type !== 'hide'" :title="tableColumn.value" :fixed="tableColumn.fixed">
            <template #header>
              <SvgIcon
                name="sort"
                class="sort-icon"
                @click="sortColumn(tableColumn.name, 'desc')"
                v-if="tableColumn.sortable && sortItem[tableColumn.name] == null"
              />
              <SvgIcon
                name="sort-up"
                class="sort-icon"
                @click="sortColumn(tableColumn.name, 'asc')"
                v-if="tableColumn.sortable && sortItem[tableColumn.name] == 'desc'"
              />
              <SvgIcon
                name="sort-down"
                class="sort-icon"
                @click="sortColumn(tableColumn.name, null)"
                v-if="tableColumn.sortable && sortItem[tableColumn.name] == 'asc'"
              />
              <el-icon v-if="tableColumn.isEditable" class="sort-icon"><Edit /></el-icon>
              <span>&nbsp;{{ tableColumn.value }}</span>
            </template>
            <vxe-column
              :field="tableColumn.name"
              :min-width="tableColumn.width || prop.columnWidth"
              header-class-name="filterHeader"
              :edit-render="{ enabled: tableColumn.isEditable ? tableColumn.isEditable : false }"
            >
              <template #header>
                <ElInputWithTag v-if="tableColumn.type === 'string'" v-model="searchItem[tableColumn.name]" clearable />
                <MultiSelect
                  v-if="tableColumn.type === 'select'"
                  v-model="searchItem[tableColumn.name]"
                  style="width: 100%"
                >
                  <el-option v-for="tempSelect in selectItem[tableColumn.name]" :key="tempSelect" :value="tempSelect" />
                </MultiSelect>
                <div v-if="searchItem && searchItem[tableColumn.name] && tableColumn.type === 'number'">
                  <el-input
                    v-model="searchItem[tableColumn.name][0]"
                    style="width: 43%"
                    @input="(val: string | number) => validateInput(val, tableColumn.name, 0)"
                  />
                  ~
                  <el-input
                    v-model="searchItem[tableColumn.name][1]"
                    style="width: 43%"
                    @input="(val: string | number) => validateInput(val, tableColumn.name, 1)"
                  />
                </div>
                <el-date-picker
                  v-if="tableColumn.type === 'date'"
                  v-model="searchItem[tableColumn.name]"
                  type="daterange"
                  range-separator="To"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                  style="width: 100% !important"
                />
              </template>
              <template #default="scope">
                <slot v-if="slot[tableColumn.name]?.().length" :name="tableColumn.name" v-bind="scope" />
                <div v-else>
                  {{ scope.row[tableColumn.name] }}
                </div>
              </template>
              <template #edit="scope">
                <slot
                  v-if="slot[tableColumn.name + '-edit']?.().length && prop.editable && tableColumn.isEditable"
                  :name="tableColumn.name + '-edit'"
                  v-bind="scope"
                  :oneDataChange="(prop: any, value: any) => oneDataChange(scope.row[keyReference], prop, value)"
                />
                <el-input
                  v-else-if="tableColumn.type == 'string'"
                  v-model="scope.row[tableColumn.name]"
                  @change="oneDataChange(scope.row[keyReference], tableColumn.name, scope.row[tableColumn.name])"
                />
                <el-select
                  v-else-if="tableColumn.type == 'select'"
                  v-model="scope.row[tableColumn.name]"
                  @change="oneDataChange(scope.row[keyReference], tableColumn.name, scope.row[tableColumn.name])"
                >
                  <el-option
                    v-for="(option, index) in prop.editOption[tableColumn.name]"
                    :key="index"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
                <el-input-number
                  class="w-100%!"
                  v-else-if="tableColumn.type === 'number'"
                  v-model="scope.row[tableColumn.name]"
                  @change="oneDataChange(scope.row[keyReference], tableColumn.name, scope.row[tableColumn.name])"
                />
                <el-date-picker
                  v-else-if="tableColumn.type === 'date'"
                  v-model="scope.row[tableColumn.name]"
                  type="date"
                  @change="oneDataChange(scope.row[keyReference], tableColumn.name, scope.row[tableColumn.name])"
                  style="width: 100%"
                />
              </template>
            </vxe-column>
          </vxe-colgroup>
          <vxe-column
            v-else
            :field="tableColumn.name"
            :min-width="tableColumn.width || prop.columnWidth"
            header-class-name="filterHeader"
            :fixed="tableColumn.fixed"
            :edit-render="{ enabled: tableColumn.isEditable ? tableColumn.isEditable : false }"
          >
            <template #header>
              <SvgIcon
                name="sort"
                class="sort-icon"
                @click="sortColumn(tableColumn.name, 'desc')"
                v-if="tableColumn.sortable && sortItem[tableColumn.name] == null"
              />
              <SvgIcon
                name="sort-up"
                class="sort-icon"
                @click="sortColumn(tableColumn.name, 'asc')"
                v-if="tableColumn.sortable && sortItem[tableColumn.name] == 'desc'"
              />
              <SvgIcon
                name="sort-down"
                class="sort-icon"
                @click="sortColumn(tableColumn.name, null)"
                v-if="tableColumn.sortable && sortItem[tableColumn.name] == 'asc'"
              />
              <el-icon v-if="tableColumn.isEditable" class="sort-icon"><Edit /></el-icon>
              <span>&nbsp;{{ tableColumn.value }}</span>
            </template>
            <template #default="scope">
              <slot v-if="slot[tableColumn.name]?.().length" :name="tableColumn.name" v-bind="scope" />
              <div v-else>
                {{ scope.row[tableColumn.name] }}
              </div>
            </template>
            <template #edit="scope">
              <slot
                v-if="slot[tableColumn.name + '-edit']?.().length && prop.editable && tableColumn.isEditable"
                :name="tableColumn.name + '-edit'"
                v-bind="scope"
                :oneDataChange="(prop: any, value: any) => oneDataChange(scope.row[keyReference], prop, value)"
              />
            </template>
          </vxe-column>
        </template>
        <vxe-column :width="extraWidth" :label="extraLabel" fixed="right" v-if="extraColumn && extraFixed">
          <template #header v-if="prop.extraHide">
            <SvgIcon class="extraFixed" name="pin" @click="extraFixedChang(false)" />
          </template>
          <template #default="scope">
            <slot name="extra" v-bind="scope" />
          </template>
        </vxe-column>
        <vxe-column :width="extraWidth" :label="extraLabel" v-if="extraColumn && !extraFixed">
          <template #header v-if="prop.extraHide">
            <SvgIcon class="extraFixed" name="pin-slash" @click="extraFixedChang(true)" />
          </template>
          <template #default="scope">
            <slot name="extra" v-bind="scope" />
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <div class="text-container mt-3! flex-content-center">
      <el-text
        v-if="pageable && checkable"
        style="position: absolute; left: 0; transform: translateX(-100%); transform-origin: right; padding-right: 20px"
        >Select {{ selectedNum }}</el-text
      >
      <el-pagination
        background
        v-show="pageable"
        :page-size="pageObject.pageSize"
        :page-sizes="pageObject.pageSizeList"
        :current-page="pageObject.currentPage"
        :total="pageObject.total"
        :pager-count="pageObject.maxPageCount"
        :layout="pageObject.layout"
        @update:current-page="handleCurrentChange"
        @update:page-size="handlePageSizeChange"
      />
    </div>

    <slot name="footer" />
  </el-card>
</template>
<style lang="scss">
:root {
  --vxe-table-row-selection-bg: #ffd084;
}
.dark {
  --vxe-table-row-selection-bg: #00248685;
}
.filter-table-v3 {
  // display: flex;
  // flex-direction: column;
  // height: 100%;
  // overflow: auto;
  .col--ellipsis .vxe-cell {
    max-height: fit-content !important;
  }
  .sort-icon {
    font-size: 18px;
  }
  .filterHeader {
    .vxe-cell {
      max-height: 100% !important;
      padding: 10px;
    }
  }
  .vxe-cell--title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .horizontal-tables {
    .el-select {
      width: 100%;
    }
  }
  .table-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .vxe-table--render-wrapper {
    flex: 1;
    height: 100%;
    .vxe-table--main-wrapper {
      height: 100%;
      .vxe-table--body-wrapper {
        height: 100%;
      }
    }
  }
  .vxe-cell--checkbox {
    font-size: 26px !important;
  }
  .vxe-checkbox--icon {
    font-weight: 300 !important;
  }
  .vxe-table--render-default {
    .vxe-body--row {
      &.row--checked {
        background-color: var(--vxe-table-row-selection-bg, inherit) !important;
      }
      &.row-hover {
        background-color: inherit !important;
      }
    }
  }
}
.title-underline {
  text-decoration: underline;
}
.text-container {
  display: flex;
  align-items: center;
  position: relative;
  width: fit-content;
  margin: auto;
}
</style>
