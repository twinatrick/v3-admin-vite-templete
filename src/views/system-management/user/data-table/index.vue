<script setup lang="ts">
import FilterTable from "@/components/FilterTable/v3.vue"
import service from "../service"
import { computed } from "vue"
import { TableColumnMap } from "@/components/FilterTable/type"
import { CustomTableOptionType } from "@/components/CustomTable/types/Option"
import { showLoading } from "@/utils"

const userList = computed(() => service.data.user)
const roleList = computed(() => service.data.role)
// const tagList = computed(() => service.data.tag)
const tableData = computed(() => {
  console.log(userList.value)
  return userList.value.map((data) => ({ data: { ...data } }))
})
const columnMap = computed(() => {
  const map: TableColumnMap[] = [
    {
      name: "email",
      value: "E-mail",
      type: "string",
      fixed: "left"
    },
    {
      name: "roleArr",
      value: "Roles",
      type: "string",
      formatter(value: string[]) {
        if (value.length === 0) return ""
        return value.map((v) => roleList.value.find((r) => r.id == v)?.name).join(",")
      }
    },
    {
      name: "disabled",
      value: "disabled",
      type: "select",
      formatter: (value: boolean) => {
        return value ? "Disable" : "Enable"
      }
    }
  ]
  return map
})
const options: CustomTableOptionType = {
  pagination: {
    layout: "total, prev, pager, next, jumper"
  },
  table: {
    highlightCurrentRow: true,
    height: "100%",
    border: true
  }
}
const handleRefreshClick = async () => {
  const loading = showLoading("Fetch data...", "#user-data-table")
  try {
    await service.initialize()
  } catch (e) {
    console.error(e)
  } finally {
    loading.close()
  }
}
</script>
<template>
  <filter-table :data="tableData" :table-column-map="columnMap" :option="options" class="h-100%" id="user-data-table">
    <template #header>
      <slot name="header" />
      <el-button icon="Refresh" circle @click="handleRefreshClick" />
    </template>
  </filter-table>
</template>
