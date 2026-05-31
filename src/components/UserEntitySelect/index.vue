<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { useUserEmailCache } from "@/hooks/useUserEmailCache"

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    clearable?: boolean
    labelMode?: "email" | "emailWithName"
    activeOnly?: boolean
  }>(),
  {
    modelValue: "",
    placeholder: "請選擇創建者",
    clearable: true,
    labelMode: "emailWithName",
    activeOnly: false
  }
)

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void
}>()

const { loadUserEmailCache, getUserOptions } = useUserEmailCache()

const searchKeyword = ref("")
const innerValue = ref(props.modelValue)

const options = computed(() =>
  getUserOptions(searchKeyword.value, {
    labelMode: props.labelMode,
    activeOnly: props.activeOnly
  })
)

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
  loadUserEmailCache()
})
</script>

<template>
  <el-select
    v-model="innerValue"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    @change="handleChange"
    @visible-change="loadUserEmailCache"
    @clear="handleChange('')"
    @filter-method="handleFilter"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>
