<script lang="ts" setup>
import { ElSelect } from "element-plus"
import { uniq } from "lodash-es"
import { PropType, ref, computed, useSlots } from "vue"
const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<string>>,
    default: () => []
  }
})
const filterStr = ref("")
const _val = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value)
})
const emit = defineEmits<{
  (event: "update:modelValue", value: Array<any>): void
}>()
const getFilter = (query: string) => {
  filterStr.value = query
  const temp = slots.default ? slots.default() : []
  const tempList: Array<any> = Array.isArray(temp[0].children) ? temp[0].children : []
  const filteredList = tempList.filter((option: any) => {
    return option.props.value?.includes(filterStr.value)
  })
  return filteredList
}
const slots = useSlots()
const filteredList = computed(() => {
  const temp = slots.default ? slots.default() : []
  const tempList: Array<any> = Array.isArray(temp[0].children) ? temp[0].children : []
  const filteredList = tempList.filter((option: any) => {
    return option.props.value?.includes(filterStr.value)
  })
  return filteredList
})
const selectFilterAll = () => {
  const temp = [...props.modelValue, ...filteredList.value.map((item: any) => item.props.value)]
  emit("update:modelValue", uniq(temp))
}
</script>

<template>
  <el-select multiple filterable clearable v-model="_val" :filter-method="getFilter">
    <template #header>
      <el-button type="primary" @click="selectFilterAll" size="small">Select All</el-button>
    </template>
    <el-option v-for="item in filteredList" :key="item.props.value" :value="item.props.value" />
  </el-select>
</template>
