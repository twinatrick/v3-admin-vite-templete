<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, onMounted, ref, shallowRef } from "vue"

const CACHE_TTL_MS = 5 * 60 * 1000

const _props = defineProps<{
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
}>()

const placeholder = computed(() => _props.placeholder ?? "請選擇")
const clearable = computed(() => _props.clearable ?? true)
const valueKey = computed(() => (_props.valueKey ?? "id") as keyof T)
const cacheTTL = computed(() => _props.cacheTTL ?? CACHE_TTL_MS)
const labelRender = computed(() => _props.labelRender)

const props = _props

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void
}>()

const cache = shallowRef<T[]>([])
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
  return Date.now() - cacheLoadedAt.value > cacheTTL.value
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
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    @change="handleChange"
    @visible-change="handleVisibleChange"
    @clear="handleChange('')"
    @filter-method="(kw: string) => (searchKeyword = kw)"
  >
    <el-option
      v-for="item in filteredOptions"
      :key="String(item[valueKey])"
      :label="labelRender(item)"
      :value="String(item[valueKey])"
    />
  </el-select>
</template>
