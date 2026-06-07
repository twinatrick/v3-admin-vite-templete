<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, onMounted, ref } from "vue"

const CACHE_TTL_MS = 5 * 60 * 1000

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    clearable?: boolean
    fetchFn: () => Promise<T[]>
    labelRender: (item: T) => string
    valueKey?: keyof T
    filterKeys?: (keyof T)[]
    cacheTTL?: number
    activeOnly?: boolean
    activeKey?: keyof T
  }>(),
  {
    modelValue: "",
    placeholder: "請選擇",
    clearable: true,
    valueKey: "id" as keyof T,
    cacheTTL: CACHE_TTL_MS,
    activeOnly: false,
    activeKey: "disabled" as keyof T
  }
)

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void
}>()

const cache = ref<T[]>([])
const cacheLoadedAt = ref(0)
const searchKeyword = ref("")
const innerValue = ref(props.modelValue)

const filteredOptions = computed(() => {
  let items = cache.value
  if (props.activeOnly) {
    items = items.filter((item) => !item[props.activeKey as keyof T])
  }
  if (!searchKeyword.value) return items
  const kw = searchKeyword.value.toLowerCase()
  return items.filter((item) => {
    if (props.filterKeys && props.filterKeys.length > 0) {
      return (props.filterKeys as (keyof T)[]).some((key) => {
        const v = item[key as keyof T]
        return v != null && String(v).toLowerCase().includes(kw)
      })
    }
    return props.labelRender(item).toLowerCase().includes(kw)
  })
})

function shouldReload() {
  if (cache.value.length === 0) return true
  return Date.now() - cacheLoadedAt.value > props.cacheTTL
}

async function load() {
  if (!shouldReload()) return
  try {
    const result = await props.fetchFn()
    cache.value = result || []
    cacheLoadedAt.value = Date.now()
  } catch {
    // ignore
  }
}

function handleChange(value: string) {
  innerValue.value = value
  emit("update:modelValue", value || "")
}

function handleVisibleChange(visible: boolean) {
  if (visible) {
    load()
  }
}

onMounted(() => {
  load()
})
</script>

<template>
  <el-select
    v-model="innerValue"
    :placeholder="props.placeholder"
    :clearable="props.clearable"
    filterable
    @change="handleChange"
    @visible-change="handleVisibleChange"
    @clear="handleChange('')"
    @filter-method="(kw: string) => (searchKeyword = kw)"
  >
    <el-option
      v-for="item in filteredOptions"
      :key="String(item[props.valueKey])"
      :label="props.labelRender(item)"
      :value="String(item[props.valueKey])"
    />
  </el-select>
</template>
