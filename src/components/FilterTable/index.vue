<script lang="ts" setup>
import CustomTable from "@/components/CustomTable/index.vue"
import CustomTableColumn from "@/components/CustomTable/CustomTableColumn.vue"
import ElInputWithTag from "@/components/InputWithTag/el-input-with-tag.vue"
import { TableData, TableColumnMap } from "@/components/FilterTable/type"
import { PropType, computed, onMounted, reactive, ref, useAttrs, useSlots, watch } from "vue"
import { ElMessageBox } from "element-plus"
import MultiSelect from "@/components/MultiSelect/index.vue"
import { waitUntil } from "@/utils"
//date
const slot = useSlots()
const attr = useAttrs()
const prop = defineProps({
  data: {
    type: Array<TableData>,
    required: true
  },
  tableColumnMap: {
    type: Array<TableColumnMap>,
    required: true
  },
  extraColumnMap: {
    type: Array<TableColumnMap>,
    default: []
  },
  columnWidth: {
    type: String,
    default: "150px"
  },
  resetIsShow: {
    type: Boolean,
    default: true
  },
  checkable: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: false
  },
  keyReference: {
    type: String,
    default: "key"
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
    default: "80px"
  },
  extraLabel: {
    type: String,
    default: ""
  },
  keepFilter: {
    type: Boolean,
    default: true
  },
  extraHide: {
    type: Boolean,
    default: false
  }
})
const standardData = ref<Array<any>>([])
const filteredData = ref<Array<any>>([])
const editData = ref<Array<any>>([])
const editOutputData = ref<Array<any>>([])
const selectItem = computed(() => {
  const tempItem: { [key: string]: any } = {}
  prop.tableColumnMap.forEach((tableColumn) => {
    if (
      tableColumn.type === "select" &&
      (searchItem[tableColumn.name] == undefined || searchItem[tableColumn.name].length == 0)
    ) {
      const tempList: string[] = []
      filteredData.value.forEach((filterData) => {
        tempList.push(filterData[tableColumn.name])
      })
      tempItem[tableColumn.name] = new Set(tempList)
    } else {
      if (selectItem.value) tempItem[tableColumn.name] = selectItem.value[tableColumn.name]
    }
  })
  return tempItem
})
const searchItem = reactive<any>({})
const sortItem = reactive<any>({})
const adjustExtraColumnMap = ref<Array<any>>([])
const table = ref<InstanceType<typeof CustomTable> | null>(null)
const extraFixed = ref<string | boolean>("right")

//founction
const resetFilterBtnClick = async () => {
  await getInitSearchItem()
  await startSearch()
}
const saveBtnClick = async () => {
  editOutputData.value = []
  editData.value.forEach((data) => {
    const tempData: { [key: string]: any } = {
      ...prop.data.find((item) => item.data[prop.keyReference] === data.key)?.data,
      ...data
    }
    editOutputData.value.push(tempData)
  })
  emit("editOutput", editOutputData.value)
}
const resetDataBtnClick = async () => {
  editData.value = []
  await originToStandard()
  await removeSomeExtraColumnMap()
  await getInitSearchItem()
  await ElMessageBox.alert("Reset Data Completed", {
    type: "success"
  })
}
const startSearch = async () => {
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
        if (searchItem[tableColumn.name][0] != "" && searchItem[tableColumn.name][1] == "") {
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
    adjustExtraColumnMap.value.forEach((extraColumnMap) => {
      if (searchItem[extraColumnMap.name].length != 0) {
        let tempMatch = false
        searchItem[extraColumnMap.name].forEach((filterStr: string) => {
          tempMatch = tempMatch || standardData[extraColumnMap.name].toLowerCase().includes(filterStr.toLowerCase())
        })
        resultMatch = resultMatch && tempMatch
      }
    })
    return resultMatch
  }
  filteredData.value = standardData.value.filter(filter)
}
const removeSomeExtraColumnMap = async () => {
  const duplicates = prop.extraColumnMap.filter((item1) =>
    prop.tableColumnMap.some((item2) => item1.name === item2.name)
  )
  adjustExtraColumnMap.value = prop.extraColumnMap.filter(
    (item) => !duplicates.some((duplicate) => duplicate.name === item.name)
  )
}
const getInitSearchItem = async () => {
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
  adjustExtraColumnMap.value.forEach((extraColumn) => {
    searchItem[extraColumn.name] = ref<Array<string>>([])
  })
}
const originToStandard = async () => {
  const tempList: any[] = []
  prop.data.forEach((tempData) => {
    const { data, extraList } = tempData
    const splitData: { [key: string]: any } = {}
    Object.assign(splitData, data)
    extraList?.forEach(async (extra) => {
      splitData[extra.columnName] = extra.columnValue
    })
    tempList.push(splitData)
  })
  tempList.forEach((tempData) => {
    const copyData: { [key: string]: any } = {}
    Object.assign(copyData, tempData)
    prop.tableColumnMap.forEach((tableColumn) => {
      if (tableColumn.formatter != undefined) {
        tempData[tableColumn.name] = tableColumn.formatter(tempData[tableColumn.name], copyData)
      }
    })
  })
  standardData.value = tempList
  filteredData.value = tempList
}
const checkColumnNotHide = (type: string | undefined) => {
  return type === "string" || type === "select" || type === "date" || type === "number"
}
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
const onFocus = (scope: any) => {
  emit("onFocus", scope)
}
const validateInput = (event: any, index: number) => {
  let value = event
  value = value.replace(/^0+/, "0")
  value = value.replace(/[^0-9]/g, "")
  searchItem["projectFriendlyName"][index] = value
}
const selectedData = (val: Array<any>) => {
  const result: any[] = []
  val.forEach((selected) => {
    const originData = prop.data.find((item: any) => item.data[prop.keyReference] === selected[prop.keyReference])
    if (originData) {
      const { data, extraList } = originData
      const splitData: { [key: string]: any } = {}
      Object.assign(splitData, data)
      extraList?.forEach(async (extra) => {
        splitData[extra.columnName] = extra.columnValue
      })
      result.push(splitData)
    }
  })
  emit("selected", result)
}
const multiSelectedData = (val: Array<any>) => {
  const result: any[] = []
  val.forEach((selected) => {
    const originData = prop.data.find((item: any) => item.data[prop.keyReference] === selected[prop.keyReference])
    if (originData) {
      const { data, extraList } = originData
      const splitData: { [key: string]: any } = {}
      Object.assign(splitData, data)
      extraList?.forEach(async (extra) => {
        splitData[extra.columnName] = extra.columnValue
      })
      result.push(splitData)
    }
  })
  emit("multi-selected", result)
}
const clickData = (val: any) => {
  const result: { [key: string]: any } = {}
  const originData = prop.data.find((item: any) => item.data[prop.keyReference] === val.row[prop.keyReference])
  if (originData) {
    const { data, extraList } = originData
    Object.assign(result, data)
    extraList?.forEach(async (extra) => {
      result[extra.columnName] = extra.columnValue
    })
  }
  emit("row-click", result)
}
const extraFixedChang = (value: string | boolean) => {
  extraFixed.value = value
}
const emit = defineEmits(["editOutput", "onFocus", "selected", "multi-selected", "row-click", "row-dbclick"])
//watch
watch(
  () => prop.data,
  async () => {
    await originToStandard()
    editData.value = []
    await removeSomeExtraColumnMap()
    if (!prop.keepFilter) {
      await getInitSearchItem()
    } else {
      await startSearch()
    }
  },
  { deep: true }
)
watch(
  () => searchItem,
  () => {
    startSearch()
  },
  { deep: true }
)
const originQuery = () => {
  getInitSearchItem()
}
const onlyEdit = () => {
  startSearch()
}
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
const rowDbClick = (scope: any) => {
  const result: { [key: string]: any } = {}
  const originData = prop.data.find((item: any) => item.data[prop.keyReference] === scope.row[prop.keyReference])
  if (originData) {
    const { data, extraList } = originData
    Object.assign(result, data)
    extraList?.forEach(async (extra) => {
      result[extra.columnName] = extra.columnValue
    })
  }
  emit("row-dbclick", result)
}
//排序功能
const sortColumn = (field: string, sort: string | null) => {
  if (sort == null) {
    table.value?.clearSort()
  } else {
    table.value?.sort(field, sort)
  }
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
defineExpose({
  originQuery,
  onlyEdit,
  getEditData,
  toggleRowSelection: async (row: any, selected: boolean) => {
    await waitUntil(() => Boolean(filteredData.value.length))
    table.value?.toggleRowSelection(
      filteredData.value.find((data) => data[prop.keyReference] == row.data[prop.keyReference]),
      selected
    )
  }
})
onMounted(async () => {
  await getInitSearchItem()
})
</script>
<template>
  <CustomTable
    ref="table"
    v-bind="attr"
    :data="filteredData"
    :total="filteredData.length"
    @selected="selectedData"
    @multi-selected="multiSelectedData"
    @row-click="clickData"
    @row-dbclick="rowDbClick"
  >
    <template #header>
      <div flex mb-20px>
        <slot name="header" />
        <!-- <el-button icon="Search" type="primary" ml-auto @click="startSearch">Search </el-button> -->
        <div style="margin-left: auto">
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
          <el-button icon="Refresh" type="danger" @click="resetFilterBtnClick" v-show="prop.resetIsShow"
            >Reset Filter</el-button
          >
        </div>
      </div>
    </template>
    <template #body>
      <el-table-column type="selection" v-if="checkable" fixed :show-overflow-tooltip="false" />
      <template v-for="tableColumn in prop.tableColumnMap" :key="tableColumn.name">
        <CustomTableColumn
          v-if="tableColumn.type !== 'hide'"
          :label="tableColumn.value"
          :prop="tableColumn.name"
          :fixed="tableColumn.fixed"
          :min-width="tableColumn.width || prop.columnWidth"
          visible
        >
          <template #title v-if="tableColumn.sortable">
            <el-icon
              class="sort-icon"
              @click="sortColumn(tableColumn.name, 'descending')"
              v-if="sortItem[tableColumn.name] == null"
              ><Sort
            /></el-icon>
            <el-icon
              class="sort-icon"
              @click="sortColumn(tableColumn.name, 'ascending')"
              v-if="sortItem[tableColumn.name] == 'descending'"
              ><SortUp
            /></el-icon>
            <el-icon
              class="sort-icon"
              @click="sortColumn(tableColumn.name, null)"
              v-if="sortItem[tableColumn.name] == 'ascending'"
              ><SortDown
            /></el-icon>
            <span style="margin-left: 5px">{{ tableColumn.value }}</span>
          </template>
          <template #header>
            <el-input-with-tag
              v-if="tableColumn.type === 'string'"
              v-model="searchItem[tableColumn.name]"
              placeholder="Fuzzy Search"
              allow-empty
            />
            <div v-if="searchItem && searchItem[tableColumn.name] && tableColumn.type === 'number'">
              <el-input
                v-model="searchItem[tableColumn.name][0]"
                style="width: 43%"
                @input="validateInput($event, 0)"
              />
              ~
              <el-input
                v-model="searchItem[tableColumn.name][1]"
                style="width: 43%"
                @input="validateInput($event, 1)"
              />
            </div>
            <!-- <el-select
              v-if="tableColumn.type === 'select'"
              v-model="searchItem[tableColumn.name]"
              placeholder="Select"
              multiple
              filterable
            >
              <el-option
                v-for="tempSelect in selectItem[tableColumn.name]"
                :key="tempSelect"
                :label="tempSelect"
                :value="tempSelect"
              />
            </el-select> -->
            <MultiSelect v-if="tableColumn.type === 'select'" v-model="searchItem[tableColumn.name]">
              <el-option v-for="tempSelect in selectItem[tableColumn.name]" :key="tempSelect" :value="tempSelect" />
            </MultiSelect>
            <el-date-picker
              v-if="tableColumn.type === 'date'"
              v-model="searchItem[tableColumn.name]"
              type="daterange"
              range-separator="To"
              start-placeholder="Start"
              end-placeholder="End"
            />
          </template>
          <template #default="scope">
            <slot v-if="slot[tableColumn.name]?.().length && !editable" :name="tableColumn.name" v-bind="scope" />
            <slot
              v-else-if="slot[tableColumn.name + '-edit']?.().length && editable && tableColumn.isEditable"
              :name="tableColumn.name + '-edit'"
              v-bind="scope"
              :oneDataChange="(prop:any, value:any) => oneDataChange(scope.row[keyReference], prop, value)"
              :onFocus="() => onFocus(scope)"
            />
            <div v-else-if="tableColumn.formatter || !(editable && tableColumn.isEditable)">
              {{ scope.row[tableColumn.name] }}
            </div>
            <el-input
              v-else-if="tableColumn.type === 'string'"
              v-model="scope.row[tableColumn.name]"
              @change="oneDataChange(scope.row[keyReference], tableColumn.name, scope.row[tableColumn.name])"
              @focus="onFocus(scope)"
            />
            <el-input-number
              class="w-100%!"
              v-else-if="tableColumn.type === 'number'"
              v-model="scope.row[tableColumn.name]"
              @change="oneDataChange(scope.row[keyReference], tableColumn.name, scope.row[tableColumn.name])"
              @focus="onFocus(scope)"
            />
            <el-select
              v-else-if="tableColumn.type === 'select'"
              v-model="scope.row[tableColumn.name]"
              @change="oneDataChange(scope.row[keyReference], tableColumn.name, scope.row[tableColumn.name])"
              @focus="onFocus(scope)"
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
            <el-date-picker
              v-else-if="tableColumn.type === 'date'"
              v-model="scope.row[tableColumn.name]"
              type="date"
              @change="oneDataChange(scope.row[keyReference], tableColumn.name, scope.row[tableColumn.name])"
              style="width: 100%"
              @focus="onFocus(scope)"
            />
          </template>
        </CustomTableColumn>
        <el-table-column
          v-else-if="tableColumn.type === 'hide'"
          :prop="tableColumn.name"
          :label="tableColumn.value"
          :fixed="tableColumn.fixed"
          :min-width="prop.columnWidth"
        >
          <template #default="scope">
            <slot v-if="slot[tableColumn.name]?.().length" :name="tableColumn.name" v-bind="scope" />
            <slot
              v-else-if="slot[tableColumn.name + '-edit']?.().length && editable && tableColumn.isEditable"
              :name="tableColumn.name + '-edit'"
              v-bind="scope"
              :oneDataChange="(prop:any, value:any) => oneDataChange(scope.row[keyReference], prop, value)"
              :onFocus="() => onFocus(scope)"
            />
          </template>
        </el-table-column>
      </template>
      <CustomTableColumn
        v-for="extraMapColumn in adjustExtraColumnMap"
        :key="extraMapColumn.name"
        :label="extraMapColumn.value"
        :prop="extraMapColumn.name"
        :min-width="extraMapColumn.width || prop.columnWidth"
        :visible="checkColumnNotHide(extraMapColumn.type)"
      >
        <template #header>
          <el-input-with-tag allow-empty v-model="searchItem[extraMapColumn.name]" placeholder="Fuzzy Search" />
        </template>
      </CustomTableColumn>
      <el-table-column :fixed="extraFixed" :width="extraWidth" :label="extraLabel" v-if="extraColumn">
        <template #header v-if="prop.extraHide">
          <SvgIcon class="extraFixed" name="pin" v-if="extraFixed == 'right'" @click="extraFixedChang(false)" />
          <SvgIcon
            class="extraFixed"
            name="pin-slash"
            v-else-if="extraFixed == false"
            @click="extraFixedChang('right')"
          />
        </template>
        <template #default="scope">
          <slot name="extra" v-bind="scope" />
        </template>
      </el-table-column>
    </template>
  </CustomTable>
</template>
<style lang="scss" scoped>
.extraFixed {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -15px 0 0 -15px;
}
</style>
