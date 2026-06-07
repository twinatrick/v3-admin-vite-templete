<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { useJobPostingCache } from "@/hooks/useJobPostingCache"

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    clearable?: boolean
  }>(),
  {
    modelValue: "",
    placeholder: "請選擇職缺",
    clearable: true
  }
)

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void
}>()

const { loadJobPostingCache, getJobPostingOptions } = useJobPostingCache()

const searchKeyword = ref("")
const innerValue = ref(props.modelValue)

const options = computed(() => getJobPostingOptions(searchKeyword.value))

watch(
  () => props.modelValue,
  (value) => {
    innerValue.value = value
  }
)

const handleChange = (value: string) => {
  emit("update:modelValue", value || "")
}

const handleFilter = (keyword: string) => {
  searchKeyword.value = keyword
}

onMounted(() => {
  loadJobPostingCache()
})
</script>

<template>
  <el-select
    v-model="innerValue"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    @change="handleChange"
    @visible-change="loadJobPostingCache"
    @clear="handleChange('')"
    @filter-method="handleFilter"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>
