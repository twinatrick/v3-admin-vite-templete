<script lang="ts" setup>
import { PropType, computed, reactive, ref, watch } from "vue"
import { TableData, TableColumnMap } from "@/components/FilterTable/type"
import { ElMessageBox } from "element-plus"
import ElInputWithTag from "@/components/InputWithTag/el-input-with-tag.vue"
import { VxeTableEvents, VxeTableInstance, VxeTablePropTypes } from "vxe-table"
import MultipleSelectWithSelectAll from "@/components/MultipleSelectWithSelectAll/index.vue"
//date
//表格
const table1 = ref<VxeTableInstance<any>>()
const table2 = ref<VxeTableInstance<any>>()
//外部資料
const prop = defineProps({
  data1: {
    type: Array<TableData>,
    required: true
  },
  data2: {
    type: Array<TableData>,
    required: true
  },
  tableColumnMap1: {
    type: Array<TableColumnMap>,
    required: true
  },
  tableColumnMap2: {
    type: Array<TableColumnMap>,
    required: true
  },
  columnWidth: {
    type: String,
    default: "100"
  },
  countAccording: {
    type: String,
    default: ""
  },
  countList: {
    type: Array<{
      key: string
      value: string
    }>,
    default: []
  },
  specList: {
    type: Array<{
      index: string
      value: string
    }>,
    default: []
  },
  editOption: {
    type: Object as PropType<{ [key: string]: any }>,
    default: () => {}
  }
})
//資料相關
const standardData1 = ref<Array<any>>([])
const standardData2 = ref<Array<any>>([])
const filteredData1 = ref<Array<any>>([])
const filteredData2 = ref<Array<any>>([])
const editData = ref<Array<any>>([])
// const editOutputData = ref<Array<any>>([])
const countViewList = ref<Array<number>>([])
const terminate = ref(false)
const selectNumber = ref(0)
const sortItem = reactive<any>({})
//篩選物件
const searchItem = reactive<{ data1: { [key: string]: any }; data2: { [key: string]: any } }>({
  data1: {},
  data2: {}
})
const selectItem = computed(() => {
  const tempItem: { data1: { [key: string]: any }; data2: { [key: string]: any } } = { data1: {}, data2: {} }
  prop.tableColumnMap1.forEach((tableColumn) => {
    if (
      tableColumn.type === "select" &&
      (searchItem.data1[tableColumn.name] == undefined || searchItem.data1[tableColumn.name].length == 0)
    ) {
      const tempList: string[] = []
      filteredData1.value.forEach((filterData) => {
        tempList.push(filterData[tableColumn.name])
      })
      tempItem.data1[tableColumn.name] = Array.from(new Set(tempList))
      if (tempItem.data1[tableColumn.name].size != 0 && tempItem.data1[tableColumn.name][0] == undefined)
        tempItem.data1[tableColumn.name][0] = ""
    } else {
      tempItem.data1[tableColumn.name] = selectItem.value?.data1[tableColumn.name]
    }
  })
  prop.tableColumnMap2.forEach((tableColumn) => {
    if (
      tableColumn.type === "select" &&
      (searchItem.data2[tableColumn.name] == undefined || searchItem.data2[tableColumn.name].length == 0)
    ) {
      const tempList: string[] = []
      filteredData2.value.forEach((filterData) => {
        tempList.push(filterData[tableColumn.name])
      })
      tempItem.data2[tableColumn.name] = new Set(tempList)
    } else {
      tempItem.data2[tableColumn.name] = selectItem.value?.data2[tableColumn.name]
    }
  })
  return tempItem
})
//左側表格寬度
const tableWidth = ref(100)

//function
const oneDataChange = (key: string, name: string, data: any) => {
  if (editData.value.find((item) => item.key === key)) {
    const oldData = editData.value.find((item) => item.key === key)
    oldData[name] = data
  } else {
    const newData: { [key: string]: any } = { key: key }
    newData[name] = data
    editData.value.push(newData)
  }
}
//按鈕觸發
const foldBtnClick = () => {
  tableWidth.value = tableWidth.value === 100 ? 50 : 100
}
const resetFilterBtnClick = async () => {
  await getInitSearchItem()
  await searchLeft()
}
const resetDataBtnClick = async () => {
  await originToStandard()
  await getInitSearchItem()
  await ElMessageBox.alert("Reset Data Completed", {
    type: "success"
  })
}
const saveBtnClick = async () => {
  // editOutputData.value = []
  // editData.value.forEach((data) => {
  //   const tempData: { [key: string]: any } = {
  //     ...prop.data1.find((item) => item.data.key === data.key)?.data,
  //     ...data
  //   }
  //   editOutputData.value.push(data)
  // })
  const editDataList = [...editData.value]
  editDataList.forEach((data) => {
    if (data.testCaseStatus == undefined) {
      data.testCaseStatus = "NO_CHANGE"
    }
    if (data.comment == undefined) {
      data.comment = "NO_CHANGE"
    }
    if (data.preferTestPlatform == undefined) {
      data.preferTestPlatform = "NO_CHANGE"
    }
    if (data.preferTestLab == undefined) {
      data.preferTestLab = "NO_CHANGE"
    }
    if (data.preferPriority == undefined) {
      data.preferPriority = "NO_CHANGE"
    }
  })
  editData.value = []
  emit("editOutput", editDataList)
}
const changeSpec = (spec: string) => {
  emit("changeSpec", spec)
}
//處理資料
const originToStandard = async () => {
  const tempList1: any[] = []
  prop.data1.forEach((tempData) => {
    const { data, extraList } = tempData
    const splitData: { [key: string]: any } = {}
    Object.assign(splitData, data)
    extraList?.forEach(async (extra) => {
      if (extra.columnName in splitData) {
        terminate.value = true
      }
      splitData[extra.columnName] = extra.columnValue
    })
    tempList1.push(splitData)
  })
  prop.tableColumnMap1.forEach((tableColumn) => {
    if (tableColumn.formatter != undefined) {
      tempList1.forEach((tempData) => {
        tempData[tableColumn.name] = tableColumn.formatter(tempData[tableColumn.name], tempData)
      })
    }
  })
  tempList1.forEach((data: any) => {
    data.checkField = false
  })
  standardData1.value = tempList1
  filteredData1.value = tempList1
  const tempList2: any[] = []
  prop.data2.forEach((tempData) => {
    const { data, extraList } = tempData
    const splitData: { [key: string]: any } = {}
    Object.assign(splitData, data)
    extraList?.forEach(async (extra) => {
      if (extra.columnName in splitData) {
        terminate.value = true
      }
      splitData[extra.columnName] = extra.columnValue
    })
    tempList2.push(splitData)
  })
  prop.tableColumnMap2.forEach((tableColumn) => {
    if (tableColumn.formatter != undefined) {
      tempList2.forEach((tempData) => {
        tempData[tableColumn.name] = tableColumn.formatter(tempData[tableColumn.name], tempData)
      })
    }
  })
  standardData2.value = tempList2
  filteredData2.value = tempList2
}
//篩選物件
const getInitSearchItem = async () => {
  await getInitLeftSearchItem()
  await getInitRightSearchItem()
  await searchLeft()
}
const getInitLeftSearchItem = async () => {
  prop.tableColumnMap1.forEach((tableColumn) => {
    if (tableColumn.type === "string") {
      searchItem.data1[tableColumn.name] = ref<Array<string>>([])
    } else if (tableColumn.type === "select") {
      searchItem.data1[tableColumn.name] = ref<Array<string>>([])
    } else if (tableColumn.type === "date") {
      searchItem.data1[tableColumn.name] = null
    }
    sortItem[tableColumn.name] = null
    table1.value?.sort(tableColumn.name, null)
  })
}
const getInitRightSearchItem = async () => {
  prop.tableColumnMap2.forEach((tableColumn) => {
    if (tableColumn.type === "string") {
      searchItem.data2[tableColumn.name] = ref<Array<string>>([])
    } else if (tableColumn.type === "select") {
      searchItem.data2[tableColumn.name] = ref<Array<string>>([])
    } else if (tableColumn.type === "date") {
      searchItem.data2[tableColumn.name] = null
    }
  })
}
const searchLeft = async () => {
  const filter = (standardData: any) => {
    let resultMatch = true
    prop.tableColumnMap1.forEach((tableColumn) => {
      if (
        tableColumn.type === "string" &&
        searchItem.data1[tableColumn.name] &&
        searchItem.data1[tableColumn.name].length != 0
      ) {
        let tempMatch = false
        searchItem.data1[tableColumn.name].forEach((filterStr: string) => {
          tempMatch = tempMatch || standardData[tableColumn.name].toLowerCase().includes(filterStr.toLowerCase())
        })
        resultMatch = resultMatch && tempMatch
      } else if (
        tableColumn.type === "select" &&
        searchItem.data1[tableColumn.name] &&
        searchItem.data1[tableColumn.name].length != 0
      ) {
        let tempMatch = false
        searchItem.data1[tableColumn.name].forEach((filterStr: string) => {
          tempMatch = tempMatch || standardData[tableColumn.name] === filterStr
        })
        resultMatch = resultMatch && tempMatch
      } else if (
        tableColumn.type === "date" &&
        searchItem.data1[tableColumn.name] &&
        searchItem.data1[tableColumn.name] !== null
      ) {
        resultMatch =
          resultMatch &&
          standardData[tableColumn.name] > searchItem.data1[tableColumn.name][0] &&
          standardData[tableColumn.name] < searchItem.data1[tableColumn.name][1]
      }
    })
    return resultMatch
  }
  filteredData1.value = standardData1.value.filter(filter)
  const resultList: Array<any> = []
  filteredData1.value.forEach((tempData, index) => {
    const sameIdData = standardData2.value.find(
      (tempData2) => tempData2["testCaseUniqueID"] == tempData["testCaseUniqueID"]
    )
    if (sameIdData) {
      resultList[index] = sameIdData
    } else {
      resultList[index] = {}
    }
  })
  filteredData2.value = resultList
}
const searchInner = async () => {
  const resultList: Array<any> = []
  const filter = (standardData: any) => {
    let resultMatch = true
    prop.tableColumnMap1.forEach((tableColumn) => {
      if (
        tableColumn.type === "string" &&
        searchItem.data1[tableColumn.name] &&
        searchItem.data1[tableColumn.name].length != 0
      ) {
        let tempMatch = false
        searchItem.data1[tableColumn.name].forEach((filterStr: string) => {
          tempMatch = tempMatch || standardData[tableColumn.name].toLowerCase().includes(filterStr.toLowerCase())
        })
        resultMatch = resultMatch && tempMatch
      } else if (
        tableColumn.type === "select" &&
        searchItem.data1[tableColumn.name] &&
        searchItem.data1[tableColumn.name].length != 0
      ) {
        let tempMatch = false
        searchItem.data1[tableColumn.name].forEach((filterStr: string) => {
          tempMatch = tempMatch || standardData[tableColumn.name] === filterStr
        })
        resultMatch = resultMatch && tempMatch
      } else if (
        tableColumn.type === "date" &&
        searchItem.data1[tableColumn.name] &&
        searchItem.data1[tableColumn.name] !== null
      ) {
        resultMatch =
          resultMatch &&
          standardData[tableColumn.name] > searchItem.data1[tableColumn.name][0] &&
          standardData[tableColumn.name] < searchItem.data1[tableColumn.name][1]
      }
    })
    return resultMatch
  }
  const filter2 = (standardData: any) => {
    let resultMatch = true
    prop.tableColumnMap2.forEach((tableColumn) => {
      if (
        tableColumn.type === "string" &&
        searchItem.data2[tableColumn.name] &&
        searchItem.data2[tableColumn.name].length != 0
      ) {
        let tempMatch = false
        searchItem.data2[tableColumn.name].forEach((filterStr: string) => {
          tempMatch = tempMatch || standardData[tableColumn.name]?.toLowerCase().includes(filterStr.toLowerCase())
        })
        resultMatch = resultMatch && tempMatch
      } else if (
        tableColumn.type === "select" &&
        searchItem.data2[tableColumn.name] &&
        searchItem.data2[tableColumn.name].length != 0
      ) {
        let tempMatch = false
        searchItem.data2[tableColumn.name].forEach((filterStr: string) => {
          tempMatch = tempMatch || standardData[tableColumn.name] === filterStr
        })
        resultMatch = resultMatch && tempMatch
      } else if (
        tableColumn.type === "date" &&
        searchItem.data2[tableColumn.name] &&
        searchItem.data2[tableColumn.name] !== null
      ) {
        resultMatch =
          resultMatch &&
          standardData[tableColumn.name] > searchItem.data2[tableColumn.name][0] &&
          standardData[tableColumn.name] < searchItem.data2[tableColumn.name][1]
      }
    })
    return resultMatch
  }
  const tempData1 = standardData1.value.filter(filter)
  const tempData2 = standardData2.value.filter(filter2)
  if (standardData2.value.length == 0) {
    const commonKeys = tempData1.map((item) => item.testCaseUniqueID)
    filteredData1.value = tempData1.filter((item) => commonKeys.includes(item.testCaseUniqueID))
    filteredData2.value = []
  } else {
    const commonKeys = tempData1
      .map((item) => item.testCaseUniqueID)
      .filter((uniqueID) => tempData2.some((item) => item.testCaseUniqueID === uniqueID))
    filteredData1.value = tempData1.filter((item) => commonKeys.includes(item.testCaseUniqueID))
    filteredData2.value = tempData2.filter((item) => commonKeys.includes(item.testCaseUniqueID))
    filteredData1.value.forEach((tempData, index) => {
      const sameIdData = standardData2.value.find(
        (tempData2) => tempData2["testCaseUniqueID"] == tempData["testCaseUniqueID"]
      )
      if (sameIdData) {
        resultList[index] = sameIdData
      } else {
        resultList[index] = {}
      }
    })
    filteredData2.value = resultList
  }
}
const rightIsEmpty = () => {
  const values = Object.values(searchItem.data2)
  const allIsEmpty = values.every((value) => value === null || value.length == 0)
  return allIsEmpty
}
const countType = async () => {
  for (let index = 0; index < prop.countList.length; index++) {
    const element = prop.countList[index]
    countViewList.value[index] = filteredData1.value.filter(
      (item) => prop.countAccording != "" && item[prop.countAccording] === element.value
    ).length
  }
}
//中央線條移動
const startResize = () => {
  document.addEventListener("mousemove", handleMouseMove)
  document.addEventListener("mouseup", handleMouseUp)
}
const handleMouseMove = (event: { clientX: number }) => {
  const totalWidth = document.documentElement.clientWidth ?? 0
  const eltableWidth = document.querySelector(".horizontal-tables")?.clientWidth ?? 0
  const leftWidth = document.querySelector(".sidebar-logo-container")?.clientWidth ?? 0
  const spaceWidth = (totalWidth - eltableWidth - leftWidth) / 2
  const newPosition = ((event.clientX - leftWidth - spaceWidth) / eltableWidth) * 100
  tableWidth.value = newPosition
}
const handleMouseUp = () => {
  document.removeEventListener("mousemove", handleMouseMove)
  document.removeEventListener("mouseup", handleMouseUp)
}
//外部取值
const getFilteredData = () => {
  const result: { data1: Array<any>; data2: Array<any> } = { data1: filteredData1.value, data2: filteredData2.value }
  return result
}
const resetSelected = () => {
  selectNumber.value = 0
}
const trueLeftQuery = () => {
  originToStandard()
  // getInitSearchItem()
  searchLeft()
  standardData1.value.forEach((data) => {
    data.checkField = false
  })
}
const onlyEdit = () => {
  originToStandard().then(() => {
    if (rightIsEmpty()) {
      searchLeft().then(() => countType())
    } else {
      searchInner().then(() => countType())
    }
  })
  standardData1.value.forEach((data) => {
    data.checkField = false
  })
}
defineExpose({
  getFilteredData,
  resetSelected,
  trueLeftQuery,
  onlyEdit,
  clearEditData: () => {
    editData.value = []
  }
})
//選取事件
const emit = defineEmits(["changeSpec", "multi-selected", "editOutput"])
const handleSelectionChange: VxeTableEvents.CheckboxChange<any> = () => {
  const $table = table1.value
  if ($table) {
    const records = $table.getCheckboxRecords()
    const data2List: any[] = []
    records.forEach((data) => {
      data2List.push(filteredData2.value.find((tempData) => tempData.testCaseUniqueID == data.testCaseUniqueID))
    })
    const result = { data1: records, data2: data2List }
    selectNumber.value = records.length
    emit("multi-selected", result)
  }
}
//滾動同步
const handleScroll = (tableRef: string) => {
  const table = tableRef === "table1" ? table1.value : table2.value
  const otherTable = tableRef === "table1" ? table2.value : table1.value
  const otherScrollLeft = otherTable?.getScroll().scrollLeft
  const scrollTop = table?.getScroll().scrollTop
  if (otherScrollLeft != undefined && scrollTop != undefined) otherTable?.scrollTo(otherScrollLeft, scrollTop)
}
const checkSpec = () => {
  return prop.specList.length != 0
}
//watch
//原資料變動重整資料重整篩選物件
// 左資料修改為由外部控制
// watch(
//   () => prop.data1,
//   () => {
//     originToStandard()
//       .then(() => {
//         if (terminate.value) {
//           terminate.value = false
//           standardData1.value = []
//           standardData2.value = []
//           ElMessage.error("Data Wrong!")
//         }
//       })
//       .then(() => getInitSearchItem())
//   },
//   { deep: true }
// )

watch(
  () => prop.data2,
  () => {
    originToStandard().then(() => getInitSearchItem())
  }
)
//左檢索
watch(
  () => searchItem,
  () => {
    if (rightIsEmpty()) {
      searchLeft().then(() => countType())
    } else {
      searchInner().then(() => countType())
    }
  },
  { deep: true }
)
//排序功能
const sortColumn = (field: string, sort: VxeTablePropTypes.SortOrder | undefined) => {
  table1.value?.sort(field, sort)
  for (const key in sortItem) {
    if (Object.prototype.hasOwnProperty.call(sortItem, key)) {
      if (key === field) {
        sortItem[key] = sort
      } else {
        sortItem[key] = null
      }
    }
  }
}
</script>
<template>
  <el-card :body-style="{ display: 'flex', flexDirection: 'column', height: '100%' }" style="height: 100%">
    <el-form>
      <el-form-item>
        <slot name="header" />
        <el-button icon="Search" type="primary" @click="foldBtnClick" style="margin-left: auto">Fold</el-button>
        <el-button icon="Select" type="success" @click="saveBtnClick" :disabled="editData.length == 0">Save </el-button>
        <el-button icon="Refresh" type="warning" @click="resetDataBtnClick">Reset Data</el-button>
        <el-button icon="Refresh" type="danger" @click="resetFilterBtnClick">Reset Filter</el-button>
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item>
        <el-form-item label="Selected">
          <el-input :value="selectNumber" disabled class="w-75px!" />
        </el-form-item>
        <el-form-item :label="item.value" v-for="(item, index) in countList" :key="index" ml-5>
          <el-input :value="countViewList[index]" disabled class="w-75px!" />
        </el-form-item>
      </el-form-item>
    </el-form>
    <div class="horizontal-tables" :class="{ 'horizontal-tables-spec': checkSpec() }">
      <vxe-table
        border
        round
        show-header-overflow
        class="mergeTable"
        ref="table1"
        height="100%"
        :scroll-x="{ enabled: true }"
        :scroll-y="{ enabled: true }"
        :data="filteredData1"
        :row-config="{ isHover: true }"
        :style="{ width: tableWidth - 1 + '%' }"
        :filter-config="{ showIcon: false }"
        :column-config="{ resizable: true }"
        :sort-config="{ showIcon: false }"
        :checkbox-config="{ checkField: 'checkField', highlight: true }"
        @checkbox-change="handleSelectionChange"
        @checkbox-all="handleSelectionChange"
        @scroll="handleScroll('table1')"
      >
        <vxe-column type="checkbox" width="60" class="custom-checkbox" fixed="left" />
        <vxe-colgroup
          v-for="tableColumn in prop.tableColumnMap1"
          :key="tableColumn.name"
          :title="tableColumn.value"
          :fixed="tableColumn.fixed"
        >
          <template #header>
            <el-icon
              class="sort-icon"
              @click="sortColumn(tableColumn.name, 'desc')"
              v-if="sortItem[tableColumn.name] == null"
              ><Sort
            /></el-icon>
            <el-icon
              class="sort-icon"
              @click="sortColumn(tableColumn.name, 'asc')"
              v-if="sortItem[tableColumn.name] == 'desc'"
              ><SortUp
            /></el-icon>
            <el-icon
              class="sort-icon"
              @click="sortColumn(tableColumn.name, null)"
              v-if="sortItem[tableColumn.name] == 'asc'"
              ><SortDown
            /></el-icon>
            <span>{{ tableColumn.value }}</span>
          </template>
          <vxe-column
            :field="tableColumn.name"
            :width="tableColumn.width || prop.columnWidth"
            sortable
            header-class-name="filterHeader"
          >
            <template #header>
              <el-input-with-tag
                v-if="tableColumn.type === 'string'"
                v-model="searchItem.data1[tableColumn.name]"
                clearable
              />
              <!-- <el-select
                v-if="tableColumn.type === 'select'"
                v-model="searchItem.data1[tableColumn.name]"
                multiple
                filterable
                clearable
              >
                <el-option
                  v-for="tempSelect in selectItem.data1[tableColumn.name]"
                  :key="tempSelect"
                  :value="tempSelect"
                />
              </el-select> -->
              <MultipleSelectWithSelectAll
                v-if="tableColumn.type === 'select'"
                v-model="searchItem.data1[tableColumn.name]"
              >
                <el-option
                  v-for="tempSelect in selectItem.data1[tableColumn.name]"
                  :key="tempSelect"
                  :value="tempSelect"
                />
              </MultipleSelectWithSelectAll>
              <el-date-picker
                v-if="tableColumn.type === 'date'"
                v-model="searchItem.data1[tableColumn.name]"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                style="width: 100% !important"
              />
            </template>
            <template #default="scope">
              <div v-if="tableColumn.formatter || !tableColumn.isEditable">
                {{ scope.row[tableColumn.name] }}
              </div>
              <el-input
                v-else-if="tableColumn.type === 'string'"
                v-model="scope.row[tableColumn.name]"
                @change="oneDataChange(scope.row.key, tableColumn.name, scope.row[tableColumn.name])"
              />
              <el-select
                v-else-if="tableColumn.type === 'select'"
                v-model="scope.row[tableColumn.name]"
                @change="oneDataChange(scope.row.key, tableColumn.name, scope.row[tableColumn.name])"
                @clear="oneDataChange(scope.row.key, tableColumn.name, '')"
                class="w-100%!"
                filterable
                clearable
              >
                <el-option
                  v-for="(option, index) in prop.editOption[tableColumn.name]"
                  :key="index"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </template>
          </vxe-column>
        </vxe-colgroup>
      </vxe-table>
      <div ref="divider" class="resize-handle" @mousedown="startResize" v-if="tableWidth != 100" />
      <vxe-table
        border
        round
        show-header-overflow
        class="mergeTable"
        ref="table2"
        height="100%"
        :scroll-x="{ enabled: true }"
        :scroll-y="{ enabled: true }"
        :data="filteredData2"
        :style="{ width: 100 - tableWidth + '%' }"
        :filter-config="{ showIcon: false }"
        :column-config="{ resizable: true }"
        @scroll="handleScroll('table2')"
      >
        <vxe-colgroup
          v-for="tableColumn in prop.tableColumnMap2"
          :key="tableColumn.name"
          :title="tableColumn.value"
          :fixed="tableColumn.fixed"
        >
          <vxe-column
            :field="tableColumn.name"
            :width="tableColumn.width || prop.columnWidth"
            header-class-name="filterHeader"
          >
            <template #header>
              <el-input-with-tag
                v-if="tableColumn.type === 'string'"
                v-model="searchItem.data2[tableColumn.name]"
                clearable
              />
              <!-- <el-select
                v-if="tableColumn.type === 'select'"
                v-model="searchItem.data2[tableColumn.name]"
                multiple
                filterable
                clearable
              >
                <el-option
                  v-for="tempSelect in selectItem.data2[tableColumn.name]"
                  :key="tempSelect"
                  :value="tempSelect"
                />
              </el-select> -->
              <MultipleSelectWithSelectAll
                v-if="tableColumn.type === 'select'"
                v-model="searchItem.data2[tableColumn.name]"
              >
                <el-option
                  v-for="tempSelect in selectItem.data2[tableColumn.name]"
                  :key="tempSelect"
                  :value="tempSelect"
                />
              </MultipleSelectWithSelectAll>
              <el-date-picker
                v-if="tableColumn.type === 'date'"
                v-model="searchItem.data2[tableColumn.name]"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                style="width: 100% !important"
              />
            </template>
          </vxe-column>
        </vxe-colgroup>
      </vxe-table>
    </div>
    <el-menu default-active="0" class="el-menu-demo" mode="horizontal">
      <el-menu-item v-for="spec in specList" :key="spec.index" :index="spec.index" @click="changeSpec(spec.value)">{{
        spec.value
      }}</el-menu-item>
    </el-menu>
  </el-card>
</template>
<style lang="scss">
.filterHeader {
  // vertical-align: top;
  .vxe-cell {
    max-height: 100% !important;
    padding: 10px;
  }
}
.vxe-cell--title {
  width: 100%;
}
.horizontal-tables {
  .el-select {
    width: 100%;
  }
}
.vxe-table--render-wrapper {
  height: 100%;
  .vxe-table--main-wrapper {
    height: 100%;
    .vxe-table--body-wrapper {
      height: calc(100% - 88px);
    }
  }
}
.vxe-cell--checkbox {
  font-size: 26px !important;
}
.vxe-checkbox--icon {
  font-weight: 300 !important;
}
.vxe-cell--title {
  /* .vxe-cell--checkbox {
    display: none;
  }
  .vxe-checkbox--icon {
    display: none;
  } */
}
</style>
<style scoped lang="scss">
.horizontal-tables {
  display: flex;
  height: calc(100% - 100px);
}
.horizontal-tables-spec {
  height: calc(100% - 165px) !important;
}
.resize-handle {
  cursor: ew-resize;
  width: 0.5%;
  height: 100%;
  background-color: #7979797a;
  position: relative;
  z-index: 1000;
}
.mergeTable {
  height: 100%;
}
.mergeTable ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*滾動條軌道*/
.mergeTable ::-webkit-scrollbar-track {
  background-color: inherit;
}
/*滾動條*/
.mergeTable ::-webkit-scrollbar-thumb {
  background-color: #e3e3e3;
  border-radius: 5px;
  box-shadow: inset 0 0 6px rgba(129, 129, 129, 0.3);
  opacity: 0.5;
}
.mergeTable ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*交會處*/
.mergeTable ::-webkit-scrollbar-corner {
  background-color: inherit;
}
.sort-icon {
  font-size: 16px;
}
</style>
