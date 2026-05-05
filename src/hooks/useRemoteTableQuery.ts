import { reactive, ref, toRaw } from "vue"
import { LocationQuery, LocationQueryValue, useRoute, useRouter } from "vue-router"

type SortDir = "asc" | "desc"

type RemoteQueryCodec<FilterType extends Record<string, any>> = {
  parseFilters: (query: LocationQuery) => Partial<FilterType>
  serializeFilters: (filters: Record<string, any>) => Record<string, string>
  keys: string[]
}

type UseRemoteTableQueryOptions<FilterType extends Record<string, any>> = {
  defaultPageSize?: number
  defaultSortBy?: string
  defaultSortDir?: SortDir
  defaultFilters: FilterType
  codec: RemoteQueryCodec<FilterType>
}

const PAGE_KEY = "page"
const SIZE_KEY = "size"
const SORT_BY_KEY = "sortBy"
const SORT_DIR_KEY = "sortDir"

function toSingleValue(value?: LocationQueryValue | LocationQueryValue[] | null): string | undefined {
  if (Array.isArray(value)) {
    const first = value[0]
    return first ?? undefined
  }
  return value ?? undefined
}

function toNumber(value: string | undefined, fallback: number) {
  if (!value) return fallback
  const parsed = Number(value)
  if (Number.isNaN(parsed)) return fallback
  return parsed
}

export function useRemoteTableQuery<FilterType extends Record<string, any>>(
  options: UseRemoteTableQueryOptions<FilterType>
) {
  const route = useRoute()
  const router = useRouter()
  const page = ref(0)
  const size = ref(options.defaultPageSize ?? 20)
  const sortBy = ref(options.defaultSortBy ?? "createdTime")
  const sortDir = ref<SortDir>(options.defaultSortDir ?? "desc")
  const filters = reactive<FilterType>({ ...options.defaultFilters })

  const managedKeys = [PAGE_KEY, SIZE_KEY, SORT_BY_KEY, SORT_DIR_KEY, ...options.codec.keys]

  const initFromRouteQuery = () => {
    const query = route.query
    page.value = Math.max(0, toNumber(toSingleValue(query.page), 0))
    size.value = Math.max(1, toNumber(toSingleValue(query.size), options.defaultPageSize ?? 20))

    const routeSortBy = toSingleValue(query.sortBy)
    const routeSortDir = toSingleValue(query.sortDir)

    if (routeSortBy) {
      sortBy.value = routeSortBy
    }
    if (routeSortDir === "asc" || routeSortDir === "desc") {
      sortDir.value = routeSortDir
    }

    Object.assign(filters, options.defaultFilters, options.codec.parseFilters(query))
  }

  const syncToRouteQuery = async () => {
    const nextQuery: Record<string, any> = { ...route.query }
    managedKeys.forEach((key) => {
      delete nextQuery[key]
    })

    nextQuery.page = String(page.value)
    nextQuery.size = String(size.value)
    nextQuery.sortBy = sortBy.value
    nextQuery.sortDir = sortDir.value

    const serializedFilters = options.codec.serializeFilters(toRaw(filters))
    Object.assign(nextQuery, serializedFilters)

    await router.replace({
      query: nextQuery
    })
  }

  const setPageSize = (pageSize: number) => {
    size.value = Math.max(1, pageSize)
    page.value = 0
  }

  const setSort = (field?: string, direction?: SortDir) => {
    if (field) {
      sortBy.value = field
    }
    if (direction) {
      sortDir.value = direction
    }
    page.value = 0
  }

  const setFilters = (nextFilter: Partial<FilterType>, resetPage = true) => {
    Object.assign(filters, nextFilter)
    if (resetPage) {
      page.value = 0
    }
  }

  const buildApiQuery = () => {
    return {
      page: page.value,
      size: size.value,
      sortBy: sortBy.value,
      sortDir: sortDir.value,
      ...filters
    }
  }

  return {
    page,
    size,
    sortBy,
    sortDir,
    filters,
    initFromRouteQuery,
    syncToRouteQuery,
    setPageSize,
    setSort,
    setFilters,
    buildApiQuery
  }
}

export type { SortDir, RemoteQueryCodec }
