# QueryForm 组件

可配置的查询表单组件，支持 Grid 布局、Float Label、URL 绑定等功能。

## 功能特性

- ✅ Grid 布局，支持自定义列数
- ✅ Float Label 浮动标签效果
- ✅ URL 参数绑定（可选）
- ✅ 自动类型转换（String/Number/Boolean/Array）
- ✅ Keep-alive 支持
- ✅ 按钮位置和宽度可配置

## Props

| 属性               | 类型                            | 默认值   | 说明                                    |
| ------------------ | ------------------------------- | -------- | --------------------------------------- |
| `v-model`          | `T extends Record<string, any>` | **必填** | 表单数据对象                            |
| `gridCols`         | `number`                        | `3`      | Grid 列数                               |
| `buttonWidth`      | `string`                        | `'auto'` | 按钮容器宽度                            |
| `queryOnMounted`   | `boolean`                       | `true`   | 在 onMounted 时触发查询                 |
| `queryOnActivated` | `boolean`                       | `true`   | 在 onActivated 时触发查询（keep-alive） |
| `bindUrl`          | `boolean`                       | `false`  | 是否将表单数据绑定到 URL                |

## Events

| 事件      | 参数                | 说明           |
| --------- | ------------------- | -------------- |
| `@search` | `(data: T) => void` | 触发查询时调用 |
| `@reset`  | `() => void`        | 触发重置时调用 |

## Expose

| 方法        | 说明                   |
| ----------- | ---------------------- |
| `syncUrl()` | 手动同步表单数据到 URL |

## 基础用法

```vue
<script setup lang="ts">
import { ref } from "vue"
import { QueryForm, QueryFormItem } from "@/components/QueryForm"

const filters = ref({
  name: "",
  status: "",
  category: ""
})

const handleSearch = (data) => {
  console.log("Search with:", data)
  // 执行查询逻辑
}

const handleReset = () => {
  filters.value = {
    name: "",
    status: "",
    category: ""
  }
  // 执行重置逻辑
}
</script>

<template>
  <QueryForm v-model="filters" :grid-cols="3" @search="handleSearch" @reset="handleReset">
    <QueryFormItem label="Name" :col-span="1">
      <el-input v-model="filters.name" placeholder=" " clearable />
    </QueryFormItem>
    <QueryFormItem label="Status" :col-span="1">
      <el-select v-model="filters.status" placeholder=" " clearable>
        <el-option label="Active" value="active" />
        <el-option label="Inactive" value="inactive" />
      </el-select>
    </QueryFormItem>
    <QueryFormItem label="Category" :col-span="1">
      <el-input v-model="filters.category" placeholder=" " clearable />
    </QueryFormItem>
  </QueryForm>
</template>
```

## 使用 URL 绑定

当 `bindUrl: true` 时，表单数据会自动同步到 URL 查询参数。

```vue
<script setup lang="ts">
import { ref } from "vue"
import { QueryForm, QueryFormItem } from "@/components/QueryForm"

const filters = ref({
  keyword: "",
  page: 1,
  size: 20
})

const handleSearch = (data) => {
  // URL 会自动更新为：?keyword=xxx&page=1&size=20
  fetchData(data)
}

const handleReset = () => {
  filters.value = {
    keyword: "",
    page: 1,
    size: 20
  }
  // URL 会自动更新为：?page=1&size=20（空值被过滤）
}
</script>

<template>
  <QueryForm v-model="filters" :bind-url="true" :query-on-mounted="true" @search="handleSearch" @reset="handleReset">
    <QueryFormItem label="Keyword" :col-span="2">
      <el-input v-model="filters.keyword" placeholder=" " clearable />
    </QueryFormItem>
  </QueryForm>
</template>
```

### URL 绑定特性

1. **自动解析 URL 参数**：页面加载时自动从 URL 读取参数并填充表单
2. **类型自动转换**：根据 formData 默认值类型自动转换
   - String: `"hello"`
   - Number: `123`
   - Boolean: `true/false`
   - Array: `["a", "b"]`
3. **保留非表单字段**：不会覆盖其他 URL 参数（如路由参数）
4. **过滤空值**：空字符串、null、undefined 不会写入 URL

## 自定义列数

使用 `col-span` 属性控制每个字段占据的列数：

```vue
<QueryForm :grid-cols="4">
  <!-- 占 2 列 -->
  <QueryFormItem label="Name" :col-span="2">
    <el-input v-model="filters.name" />
  </QueryFormItem>
  
  <!-- 占 1 列 -->
  <QueryFormItem label="Type" :col-span="1">
    <el-select v-model="filters.type" />
  </QueryFormItem>
  
  <!-- 占 1 列 -->
  <QueryFormItem label="Status" :col-span="1">
    <el-select v-model="filters.status" />
  </QueryFormItem>
  
  <!-- 占 4 列（整行） -->
  <QueryFormItem label="Description" :col-span="4">
    <el-input v-model="filters.description" type="textarea" />
  </QueryFormItem>
</QueryForm>
```

## Keep-alive 场景

组件内置了 keep-alive 支持，避免重复查询：

```vue
<!-- 在路由配置中启用 keep-alive -->
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
```

```vue
<!-- 在页面组件中 -->
<QueryForm v-model="filters" :query-on-mounted="true" <!-- 首次加载时查询 -->
  :query-on-activated="true"   <!-- 重新激活时查询 -->
  @search="handleSearch"
>
  <!-- ... -->
</QueryForm>
```

**行为说明**：

- 首次加载：只触发一次查询（避免 onMounted 和 onActivated 重复）
- 切换路由后返回：触发查询（数据刷新）

## 手动同步 URL

在某些场景下，你可能需要手动同步表单数据到 URL：

```vue
<script setup lang="ts">
import { ref } from "vue"
import { QueryForm, QueryFormItem } from "@/components/QueryForm"

const queryFormRef = ref<InstanceType<typeof QueryForm>>()

const filters = ref({ keyword: "" })

const handleManualSync = () => {
  // 手动同步到 URL
  queryFormRef.value?.syncUrl()
}
</script>

<template>
  <QueryForm ref="queryFormRef" v-model="filters" :bind-url="true">
    <!-- ... -->
  </QueryForm>

  <el-button @click="handleManualSync">手动同步 URL</el-button>
</template>
```

## 与 useRemoteTableQuery 配合使用

如果已经使用 `useRemoteTableQuery` 管理 URL，建议设置 `bindUrl: false`：

```vue
<script setup lang="ts">
import { ref } from "vue"
import { useRemoteTableQuery } from "@/hooks/useRemoteTableQuery"
import { QueryForm, QueryFormItem } from "@/components/QueryForm"

const filters = ref({
  name: "",
  status: ""
})

const queryState = useRemoteTableQuery({
  defaultFilters: filters.value
  // ... 其他配置
})

const handleSearch = () => {
  queryState.setFilters(filters.value)
  queryState.syncToRouteQuery()
  // 执行查询...
}
</script>

<template>
  <QueryForm v-model="filters" :bind-url="false" <!-- 由 queryState 管理 URL -->
    :query-on-mounted="false"
    <!-- 手动控制查询时机 -->
    @search="handleSearch" >
    <!-- ... -->
  </QueryForm>
</template>
```

## 样式定制

组件使用 CSS 变量，可以轻松自定义样式：

```vue
<style>
/* 自定义卡片边距 */
.query-form-card {
  margin-bottom: 20px;
}

/* 自定义 Grid 间距 */
.query-form-grid {
  gap: 20px;
}

/* 自定义按钮样式 */
.query-form-buttons {
  margin-top: 20px;
}
</style>
```

## 完整示例

```vue
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { QueryForm, QueryFormItem } from "@/components/QueryForm"
import { api } from "@/api/client"

interface Filters {
  keyword: string
  category: string
  status: string
  startDate: string
  endDate: string
}

const filters = ref<Filters>({
  keyword: "",
  category: "",
  status: "",
  startDate: "",
  endDate: ""
})

const tableData = ref([])
const loading = ref(false)

const handleSearch = async (data: Filters) => {
  loading.value = true
  try {
    const response = await api.search(data)
    tableData.value = response.data
  } finally {
    loading.value = false
  }
}

const handleReset = async () => {
  filters.value = {
    keyword: "",
    category: "",
    status: "",
    startDate: "",
    endDate: ""
  }
  await handleSearch(filters.value)
}
</script>

<template>
  <div class="page-container">
    <QueryForm
      v-model="filters"
      :grid-cols="4"
      :bind-url="true"
      :query-on-mounted="true"
      button-width="200px"
      @search="handleSearch"
      @reset="handleReset"
    >
      <QueryFormItem label="Keyword" :col-span="2">
        <el-input v-model="filters.keyword" placeholder=" " clearable />
      </QueryFormItem>

      <QueryFormItem label="Category" :col-span="1">
        <el-select v-model="filters.category" placeholder=" " clearable>
          <el-option label="Category A" value="a" />
          <el-option label="Category B" value="b" />
        </el-select>
      </QueryFormItem>

      <QueryFormItem label="Status" :col-span="1">
        <el-select v-model="filters.status" placeholder=" " clearable>
          <el-option label="Active" value="active" />
          <el-option label="Inactive" value="inactive" />
        </el-select>
      </QueryFormItem>

      <QueryFormItem label="Start Date" :col-span="2">
        <el-date-picker v-model="filters.startDate" type="date" placeholder=" " style="width: 100%" />
      </QueryFormItem>

      <QueryFormItem label="End Date" :col-span="2">
        <el-date-picker v-model="filters.endDate" type="date" placeholder=" " style="width: 100%" />
      </QueryFormItem>
    </QueryForm>

    <el-table :data="tableData" v-loading="loading">
      <!-- 表格列定义 -->
    </el-table>
  </div>
</template>
```
