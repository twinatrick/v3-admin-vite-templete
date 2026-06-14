<script setup lang="ts">
import { PropType, ref } from "vue"
import { CriteriaAPIFilter } from "@/api/generated/Api"
import { api } from "@/api/client"

const inputType = ref<number>(0)

const prop = defineProps({
  columnList: {
    type: Array as PropType<string[]>,
    default: () => []
  }
})
const input = ref<string>("")
const inputNumber = ref<number>(0)
const inputDate = ref<Date>(new Date())
// const emit = defineEmits(["addFilter"])
const column = ref<string>("")
const handleClick = () => {
  if (
    column.value === "" ||
    operator.value === "" ||
    (inputType.value === 0 && input.value === "") ||
    (inputType.value === 2 && inputDate.value === new Date()) ||
    (inputType.value === 3 && input.value === "")
  ) {
    return
  }
  if (query.value !== "") {
    query.value += "&&"
  }
  switch (inputType.value) {
    case 0:
      query.value +=
        "type=" + inputType.value + "&column=" + column.value + "&operator=" + operator.value + "&value=" + input.value
      break
    case 1:
      query.value +=
        "type=" +
        inputType.value +
        "&column=" +
        column.value +
        "&operator=" +
        operator.value +
        "&value=" +
        inputNumber.value
      break
    case 2:
      query.value +=
        "type=" +
        inputType.value +
        "&column=" +
        column.value +
        "&operator=" +
        operator.value +
        "&value=" +
        inputDate.value
      break
    case 3:
      query.value +=
        "type=" + inputType.value + "&column=" + column.value + "&operator=" + operator.value + "&value=" + input.value
      break
  }
}
const query = ref<string>("")
const operator = ref<string>("")

type showTemplate = {
  type?: number
  column?: string
  operator?: string
  value?: any
}
const emit = defineEmits(["addFilter"])
const queryStringTrans = async (query: string) => {
  const searchArr = [] as showTemplate[]
  query.split("&&").map((item) => {
    const param = item.split("&")
    const result: showTemplate = {}
    param.map((item) => {
      const [key, value] = item.split("=", 2)
      if (key === "type") {
        result.type = parseInt(value)
      } else if (key === "column") {
        result.column = value
      } else if (key === "operator") {
        result.operator = value
      } else if (key === "value") {
        if (result.type === 0) {
          result.value = value
        } else if (result.type === 1) {
          result.value = parseInt(value)
        } else if (result.type === 2) {
          result.value = new Date(value)
        } else if (result.type === 3) {
          result.value = value === "true"
        }
      }
    })
    searchArr.push(result)
  })
  const result = searchArr.map((item) => {
    return transShowTemplateToCriteriaAPIFilter(item)
  })
  const res = await api.aquarkDataController.getData(result)
  emit("addFilter", res.data)
}
const transShowTemplateToCriteriaAPIFilter = (showTemplate: showTemplate): CriteriaAPIFilter => {
  const result: CriteriaAPIFilter = {
    columnName: showTemplate.column,
    equal: false,
    large: false,
    like: false,
    small: false
  }
  if (showTemplate.type === 0) {
    result.string = showTemplate.value
  } else if (showTemplate.type === 1) {
    result.doubleValue = showTemplate.value
  } else if (showTemplate.type === 2) {
    result.date = showTemplate.value
  } else if (showTemplate.type === 3) {
    result.booleanValue = showTemplate.value
  }
  result.type = showTemplate.type

  const operator = showTemplate.operator
  if (operator == "like") result.like = true
  if (operator?.includes(">")) result.large = true
  if (operator?.includes("<")) result.small = true
  if (operator?.includes("=")) result.equal = true

  return result
}

const clear = () => {
  query.value = ""
}
</script>

<template>
  <el-form label-width="100px" label-position="right" flex flex-wrap>
    <el-form-item class="el-form-item-9-2" label="Type">
      <el-select v-model="inputType" placeholder="請選擇類型">
        <el-option label="String" :value="0" />
        <el-option label="number" :value="1" />
        <el-option label="Date" :value="2" />
        <el-option label="boolean" :value="3" />
      </el-select>
    </el-form-item>

    <el-form-item class="el-form-item-9-2" label="Column">
      <el-select v-model="column" placeholder="請選擇欄位">
        <el-option v-for="item in prop.columnList" :label="item" :value="item" :key="item" />
      </el-select>
    </el-form-item>

    <el-form-item class="el-form-item-9-2" label="operator">
      <el-select v-model="operator" v-if="inputType === 0">
        <el-option label="Like" value="like" />
        <el-option label="=" value="=" />
      </el-select>
      <el-select v-model="operator" v-if="inputType === 1">
        <el-option label=">" value=">" />
        <el-option label=">=" value=">=" />
        <el-option label="=" value="=" />
        <el-option label="<=" value="<=" />
        <el-option label="<" value="<" />
      </el-select>
      <el-select v-model="operator" v-if="inputType === 2">
        <el-option label=">" value=">" />
        <el-option label=">=" value=">=" />
        <el-option label="=" value="=" />
        <el-option label="<=" value="<=" />
        <el-option label="<" value="<" />
      </el-select>
      <el-select v-model="operator" v-if="inputType === 3">
        <el-option label="是" value="true" />
        <el-option label="否" value="false" />
      </el-select>
    </el-form-item>
    <el-form-item class="el-form-item-9-2" label="value">
      <el-input v-model="input" placeholder="請輸入值" v-if="inputType === 0" />
      <el-input type="number" v-model="inputNumber" placeholder="請輸入值" v-if="inputType === 1" />
      <el-date-picker v-model="inputDate" type="date" placeholder="請選擇日期" v-if="inputType === 2" />
      <el-select v-model="input" placeholder="請選擇值" v-if="inputType === 3">
        <el-option label="是" :value="true" />
        <el-option label="否" :value="false" />
      </el-select>
    </el-form-item>
    <el-form-item class="el-form-item-9-1">
      <el-button type="primary" @click="handleClick" round>Add</el-button>
    </el-form-item>
    <el-form-item class="form-item-1" label="QueryString" flex flex-wrap>
      <el-input v-model="query" placeholder="請輸入值" class="el-form-item-9-8" />
      <el-form-item class="el-form-item-9-1" label-width="20">
        <el-button type="primary" @click="queryStringTrans(query)" round> search</el-button>

        <el-button type="primary" @click="clear" round> clear</el-button>
      </el-form-item>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
.el-form-item-9-2 {
  width: calc(200% / 9) !important;
}
.el-form-item-9-8 {
  width: calc(800% / 9) !important;
}
.el-form-item-9-1 {
  width: calc(100% / 9) !important;
}
.form-item-1 {
  width: calc(100%) !important;
}
</style>
