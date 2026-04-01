<script setup lang="ts">
import { inject, ref, Ref } from "vue"

const prop = defineProps({
  currentMonth: {
    type: Number,
    required: true
  },
  current: {
    type: Date,
    required: true
  }
})
const selectedCell = inject<Ref<{ row: number; column: number }>>("selected-cell", ref({ row: -1, column: -1 }))
const staticClass = "cell-body"
const dynamicClass = (row: any, column: any, index: any) => {
  const isSelected = (row: any, column: any) => {
    const rowFlag = selectedCell.value.row === row
    const colFlag = selectedCell.value.column === column
    return rowFlag && colFlag
  }
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === prop.current?.getMonth()
  }
  const _isCurrent = (date: Date) => {
    if (!isCurrentMonth(date)) return false
    return date.getDate() === prop.current?.getDate()
  }
  const classList = []
  if (isSelected(index, column.property)) classList.push("is-selected")
  if (!isCurrentMonth(row[column.property])) classList.push("not-current")
  return classList.join(" ")
}
const bodyOnClick = (newRow: any, newColumn: any) => {
  const { row, column } = selectedCell.value
  if (row === newRow && column === newColumn) {
    selectedCell.value = { row: -1, column: -1 }
  } else {
    selectedCell.value = { row: newRow, column: newColumn }
  }
}
</script>
<style scoped lang="scss">
.cell-body {
  font-size: 16px;
  font-weight: 400;
  height: 100px;

  &.is-selected {
    background-color: var(--el-table-current-row-bg-color);
  }

  &.not-current {
    color: var(--el-text-color-placeholder);
  }
}
</style>
<template>
  <el-table-column>
    <template #header="{ column }">
      <div text-center>{{ column.label }}</div>
    </template>
    <template #default="{ row, column, $index }">
      <div
        :class="`${staticClass} ${dynamicClass(row, column, $index)}`"
        @click="() => bodyOnClick($index, column.property)"
      >
        <slot :row="row" :column="column">
          <div p-1 line-height-normal>{{ row[column.property].getDate() }}</div>
        </slot>
      </div>
    </template>
  </el-table-column>
</template>
