<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { useCompanyCache } from "@/hooks/useCompanyCache"

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    clearable?: boolean
  }>(),
  {
    modelValue: "",
    placeholder: "請選擇公司",
    clearable: true
  }
)

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void
}>()

const { loadCompanyCache, getCompanyOptions } = useCompanyCache()

const searchKeyword = ref("")
const innerValue = ref(props.modelValue)

const options = computed(() => getCompanyOptions(searchKeyword.value))

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
  loadCompanyCache()
})
</script>

<template>
  <el-select
    v-model="innerValue"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    @change="handleChange"
    @visible-change="loadCompanyCache"
    @clear="handleChange('')"
    @filter-method="handleFilter"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>
