<script setup lang="ts">
import CustomTable from "@/components/CustomTable/index.vue"
import { ref } from "vue"
import { RoleVO } from "../type"
import { CustomTableOptionType } from "@/components/CustomTable/types/Option"
defineProps({
  data: {
    type: Array<RoleVO>,
    default: []
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const option: CustomTableOptionType = {
  table: {
    highlightCurrentRow: true,
    height: "100%",
    border: true
  }
}
const selectedRow = ref<RoleVO>({})
const handleSelected = (rows: Array<RoleVO>) => {
  if (rows.length === 0) selectedRow.value = {}
  else selectedRow.value = rows[0]
}
const functionCountFormatter = (row: RoleVO) => {
  return String(row.functionKeys?.length || 0)
}
defineExpose({
  selectedRow
})
</script>

<template>
  <CustomTable
    flex
    flex-col
    class="h-100%"
    :option="option"
    :data="data"
    :total="data.length"
    v-loading="loading"
    @selected="handleSelected"
  >
    <template #header>
      <slot />
    </template>
    <template #body>
      <el-table-column prop="name" label="Name" fixed="left" width="200px" align="right" />
      <el-table-column
        label="Function Count"
        :formatter="functionCountFormatter"
        width="150px"
        align="center"
        :show-overflow-tooltip="false"
      />
      <el-table-column prop="description" label="Description" :show-overflow-tooltip="false" />
    </template>
  </CustomTable>
</template>
