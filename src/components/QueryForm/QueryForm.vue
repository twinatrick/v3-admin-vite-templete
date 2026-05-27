<script setup lang="ts" generic="T extends Record<string, any>, R = any">
import { computed, onMounted, onActivated, provide, ref, toRef } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useRemoteTableQuery } from "@/hooks/useRemoteTableQuery"
import type { LocationQuery } from "vue-router"
import { QUERY_FORM_MODEL_KEY } from "./context"

interface QueryFnParams {
  page: number
  size: number
  sortBy: string
  sortDir: "asc" | "desc" | null
  filters: T
}

interface QueryFnResult {
  data: R[]
  total: number
  page?: number
  size?: number
}

const props = withDefaults(
  defineProps<{
    gridCols?: number
    buttonWidth?: string
    buttonColSpan?: number | "auto"
    queryOnMounted?: boolean
    queryOnActivated?: boolean
    bindUrl?: boolean
    queryFn?: (params: QueryFnParams) => Promise<QueryFnResult>
    defaultPageSize?: number
    defaultSortBy?: string
    defaultSortDir?: "asc" | "desc"
  }>(),
  {
    gridCols: 3,
    buttonWidth: "auto",
    buttonColSpan: "auto",
    queryOnMounted: true,
    queryOnActivated: true,
    bindUrl: false,
    defaultPageSize: 20,
    defaultSortBy: "createdTime",
    defaultSortDir: "desc"
  }
)

const emit = defineEmits<{
  search: [data: T]
  reset: []
  dataLoaded: [result: QueryFnResult]
}>()

const route = useRoute()
const router = useRouter()

// 使用 v-model 绑定表单数据
const formData = defineModel<T>({ required: true })
provide(QUERY_FORM_MODEL_KEY, toRef(formData) as any)

// 避免 keep-alive 元件初次载入时，onMounted 与 onActivated 同时触发两次查询
let isFirstActivated = true

// 查询结果状态
const queryData = ref<R[]>([])
const queryTotal = ref(0)
const queryLoading = ref(false)

// URL query 值转换辅助函数
const toQueryValue = (query: LocationQuery[string]) => {
  if (Array.isArray(query)) return query[0] || ""
  return query || ""
}

// 初始化 useRemoteTableQuery
const queryState = useRemoteTableQuery({
  defaultPageSize: props.defaultPageSize,
  defaultSortBy: props.defaultSortBy,
  defaultSortDir: props.defaultSortDir,
  defaultFilters: formData.value,
  codec: {
    keys: Object.keys(formData.value),
    parseFilters(query) {
      const result: any = {}
      for (const key in formData.value) {
        result[key] = toQueryValue(query[key])
      }
      return result
    },
    serializeFilters(filters) {
      const result: Record<string, string> = {}
      for (const key in filters) {
        const value = filters[key]
        if (value !== null && value !== undefined && value !== "") {
          result[key] = String(value)
        }
      }
      return result
    }
  }
})

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.gridCols}, minmax(0, 1fr))`
}))

const buttonStyle = computed(() => ({
  width: props.buttonWidth
}))

const buttonContainerStyle = computed(() => {
  if (props.buttonColSpan === "auto") {
    return { gridColumn: "1 / -1" }
  }
  return { gridColumn: `span ${props.buttonColSpan} / span ${props.buttonColSpan}` }
})

/**
 * 执行查询
 */
const executeQuery = async () => {
  if (!props.queryFn) {
    emit("search", formData.value)
    bindFormDataToUrl()
    return
  }

  queryLoading.value = true
  try {
    // 更新过滤器到 queryState
    queryState.setFilters(formData.value, false)

    // 同步到 URL
    if (props.bindUrl) {
      await queryState.syncToRouteQuery()
    }

    // 构建查询参数
    const params: QueryFnParams = {
      page: queryState.page.value,
      size: queryState.size.value,
      sortBy: queryState.sortBy.value,
      sortDir: queryState.sortDir.value,
      filters: formData.value
    }

    // 调用查询函数
    const result = await props.queryFn(params)

    // 更新结果
    queryData.value = result.data || []
    queryTotal.value = result.total || 0

    // 更新分页状态（如果返回）
    if (result.page !== undefined) {
      queryState.page.value = result.page
    }
    if (result.size !== undefined) {
      queryState.size.value = result.size
    }

    emit("dataLoaded", result)
  } finally {
    queryLoading.value = false
  }
}

const handleSearch = async () => {
  // 重置到第一页
  queryState.page.value = 0
  await executeQuery()
}

const handleReset = async () => {
  emit("reset")
  // 重置到第一页
  queryState.page.value = 0
  await executeQuery()
}

/**
 * 分页变化处理
 */
const handlePageChange = async (payload: { page: number; size: number }) => {
  if (queryState.size.value !== payload.size) {
    queryState.setPageSize(payload.size)
  }
  queryState.page.value = payload.page
  await executeQuery()
}

/**
 * 排序变化处理
 */
const handleSortChange = async (payload: { sortBy: string; sortDir: "asc" | "desc" | null }) => {
  if (!payload.sortDir) {
    queryState.setSort(props.defaultSortBy, props.defaultSortDir)
  } else {
    queryState.setSort(payload.sortBy, payload.sortDir)
  }
  await executeQuery()
}

/**
 * 将表单数据同步到 URL（兼容旧版本）
 */
const bindFormDataToUrl = () => {
  if (!props.bindUrl) return

  const query: Record<string, any> = {}

  // 保留非表单字段
  for (const key in route.query) {
    if (!(key in formData.value)) {
      query[key] = route.query[key]
    }
  }

  // 添加表单字段（过滤空值）
  for (const key in formData.value) {
    const value = formData.value[key]
    if (value !== null && value !== undefined && value !== "") {
      query[key] = value
    }
  }

  router
    .replace({
      path: route.path,
      query
    })
    .catch((err) => {
      if (err.name !== "NavigationDuplicated") throw err
    })
}

/**
 * 从 URL 解析参数到表单数据
 */
const parseQueryParamToFormData = () => {
  if (!props.bindUrl) return

  // 先让 queryState 从 URL 初始化
  queryState.initFromRouteQuery()

  // 然后同步 filters 到 formData
  Object.assign(formData.value, queryState.filters)
}

// 在 mounted 时先解析 URL，然后根据配置触发查询
onMounted(() => {
  parseQueryParamToFormData()
  if (props.queryOnMounted) {
    executeQuery()
  }
})

// 在 activated 时触发查询（keep-alive）
onActivated(() => {
  // 如果是第一次 mount，因为 onMounted 已经查过了，这边不重复查
  if (isFirstActivated) {
    isFirstActivated = false
    return
  }

  if (props.bindUrl) {
    parseQueryParamToFormData()
  }

  if (props.queryOnActivated) {
    executeQuery()
  }
})

// 暴露方法和状态供外部调用
defineExpose({
  // 查询结果
  data: queryData,
  total: queryTotal,
  loading: queryLoading,

  // 分页状态
  page: computed(() => queryState.page.value),
  size: computed(() => queryState.size.value),
  currentPage: computed(() => queryState.page.value + 1), // 1-based

  // 排序状态
  sortBy: computed(() => queryState.sortBy.value),
  sortDir: computed(() => queryState.sortDir.value),

  // 方法
  refresh: executeQuery,
  search: handleSearch,
  reset: handleReset,
  setPage: (page: number) => {
    queryState.page.value = page
    executeQuery()
  },
  setPageSize: (size: number) => {
    queryState.setPageSize(size)
    executeQuery()
  },
  setSort: (sortBy: string, sortDir: "asc" | "desc") => {
    queryState.setSort(sortBy, sortDir)
    executeQuery()
  },

  // 内部状态
  queryState,

  // 事件处理器（用于传递给 Table）
  onPageChange: handlePageChange,
  onSortChange: handleSortChange
})
</script>

<template>
  <el-card class="query-form-card">
    <el-form :model="formData" class="query-form-grid" :style="gridStyle" @submit.prevent="handleSearch">
      <slot />
      <div class="query-form-buttons" :style="buttonContainerStyle">
        <div class="button-wrapper" :style="buttonStyle">
          <el-button type="primary" icon="Search" @click="handleSearch"> Search </el-button>
          <el-button icon="Refresh" @click="handleReset"> Reset </el-button>
        </div>
      </div>
    </el-form>
  </el-card>
</template>

<style scoped>
.query-form-card {
  margin-bottom: 16px;
}

.query-form-card :deep(.el-card__body) {
  padding-bottom: 20px;
}

.query-form-grid {
  display: grid;
  gap: 16px;
  padding-bottom: 20px;
}

.query-form-grid :deep(.el-form-item) {
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
}

.query-form-grid :deep(.el-form-item__label) {
  text-align: left;
  margin-bottom: 8px;
  height: auto;
  line-height: normal;
}

.query-form-grid :deep(.el-form-item__content) {
  margin-left: 0 !important;
}

.query-form-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.button-wrapper {
  display: flex;
}
</style>
