<script lang="ts" setup>
import { onMounted, ref, watch } from "vue"
import { ColumnConfig, QueryInput } from "./type"
import { waitUntil } from "@/utils"

//data
const prop = defineProps({
  columnConfig: {
    type: Array<ColumnConfig>,
    default: () => []
  }
})
const expand = ref(false)
const searchStr = ref("")
const queryInputList = ref<Array<QueryInput>>([])
//function
const showExpand = () => {
  expand.value = true
}
const closeExpand = () => {
  expand.value = false
}
const addNewQueryInput = () => {
  queryInputList.value.push({
    fieldName: "",
    displayName: "",
    operator: "",
    condition: "",
    tableName: "",
    columnName: "",
    columnConfig: null
  })
}
const search = () => {
  emit("search", queryInputList.value)
  closeExpand()
}
const setEvent = async () => {
  await waitUntil(() => document.getElementById("searchInput") != null)
  const input = document.getElementById("searchInput")
  input?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      strToObject()
      emit("search", queryInputList.value)
      closeExpand()
    }
  })
}
const setOtherData = (index: number) => {
  const currentConfig = prop.columnConfig.find(
    (config) => config.displayName == queryInputList.value[index].displayName
  )
  if (currentConfig) {
    queryInputList.value[index].columnConfig = currentConfig
    queryInputList.value[index].fieldName = currentConfig.fieldName
    queryInputList.value[index].tableName = currentConfig.dbTableName
    queryInputList.value[index].columnName = currentConfig.dbTableColumn
  }
}
const operatorCheck = (index: number) => {
  if (queryInputList.value[index].columnConfig) {
    switch (queryInputList.value[index].columnConfig?.filterType) {
      case "string":
        return ["=", "!="]
      case "select":
        return ["=", "!="]
      case "number":
        return ["=", "!=", ">", ">=", "<", "<="]
      case "date":
        return ["=", "!=", ">", ">=", "<", "<="]
      default:
        return []
    }
  } else {
    return []
  }
}
const strToObject = () => {
  queryInputList.value = []
  const regex = /(?:-?[^\s"]+:[^\s"]+|-?[^\s"]+:"[^":]*"|-?"[^":]*":[^\s"]+|-?"[^":]*":"[^":]*")/g
  const matches = searchStr.value.match(regex)
  queryInputList.value = []
  matches?.forEach((match, index) => {
    matches[index] = match.replaceAll('"', "")
    let currentConfig = null
    if (matches[index].split(":")[0].indexOf("-") == 0) {
      currentConfig = prop.columnConfig.find((config) => config.displayName == matches[index].split(":")[0].slice(1))
    } else {
      currentConfig = prop.columnConfig.find((config) => config.displayName == matches[index].split(":")[0])
    }
    if (currentConfig) {
      queryInputList.value.push({
        fieldName: currentConfig ? currentConfig.fieldName : "",
        displayName: currentConfig ? currentConfig.displayName : "",
        operator: matches[index].split(":")[0].indexOf("-") == 0 ? "!=" : "=",
        condition: matches[index].split(":")[1],
        tableName: currentConfig ? currentConfig.dbTableName : "",
        columnName: currentConfig ? currentConfig.dbTableColumn : "",
        columnConfig: currentConfig ? currentConfig : null
      })
    }
  })
  objectToStr()
}
const objectToStr = () => {
  let str = ""
  queryInputList.value.forEach((queryInput) => {
    if (queryInput.columnConfig != null && queryInput.operator != "") {
      if (queryInput.condition.includes(" ") || queryInput.condition == "") {
        queryInput.condition = `"${queryInput.condition}"`
      }
      const displayNameStr = queryInput.displayName.includes(" ")
        ? `"${queryInput.displayName}"`
        : queryInput.displayName
      const conditionStr =
        queryInput.condition.includes(" ") || queryInput.condition == ""
          ? `"${queryInput.condition}"`
          : queryInput.condition
      str += `${queryInput.operator == "!=" ? "-" : ""}${displayNameStr}:${conditionStr} `
    }
  })
  searchStr.value = str.trim()
}
//api
//other
const emit = defineEmits(["search"])
onMounted(() => {
  setEvent()
})
watch(
  () => expand.value,
  () => {
    if (expand.value) {
      strToObject()
    } else {
      objectToStr()
    }
  }
)
</script>
<template>
  <el-input id="searchInput" v-model="searchStr" clearable>
    <template #prepend>
      <el-icon><Search /></el-icon>
    </template>
    <template #append>
      <el-button icon="CaretBottom" @click="showExpand" />
    </template>
  </el-input>
  <el-dialog v-model="expand" :modal="false" :close-on-click-modal="false">
    <template #header>
      <h2 text-center>Advanced search query builder</h2>
    </template>
    <el-row v-for="(queryInput, index) in queryInputList" :key="index">
      <el-col :span="6">
        <el-form-item class="w-90%">
          <el-select v-model="queryInput.displayName" @change="setOtherData(index)" filterable clearable>
            <el-option label="All" value="" />
            <el-option
              v-for="config in prop.columnConfig"
              :key="config.displayName"
              :label="config.displayName"
              :value="config.displayName"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item class="w-90%">
          <el-select v-model="queryInput.operator">
            <el-option v-for="oper in operatorCheck(index)" :key="oper" :label="oper" :value="oper" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item class="w-95%">
          <el-input v-model="queryInput.condition" />
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item>
          <el-button @click="queryInputList.splice(index, 1)" size="large" type="danger" icon="Close" plain />
        </el-form-item>
      </el-col>
      <el-divider />
    </el-row>
    <el-row>
      <el-button type="primary" @click="addNewQueryInput">Add</el-button>
      <el-divider />
    </el-row>
    <template #footer>
      <div text-left>
        <el-button icon="Promotion" type="primary" @click="search"> Search </el-button>
      </div>
    </template>
  </el-dialog>
</template>
