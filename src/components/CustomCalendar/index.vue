<script setup lang="ts">
import { computed, provide, ref, watch } from "vue"
import CalendarCell from "./CalendarCell.vue"
import CalendarBody from "./CalendarBody.vue"
//type
type SelectedCellType = {
  row: number
  column: string
}
//data
const prop = defineProps({
  date: {
    type: Date,
    required: true
  }
})
const emit = defineEmits<{
  (event: "select", value: Date): void
}>()
const currentMonth = computed(() => {
  return prop.date.getMonth()
})
const selectedCell = ref<SelectedCellType>({
  row: -1,
  column: "-1"
})
const range = computed(() => {
  return MonthOfStartEnd(prop.date)
})
const MonthOfStartEnd = (date: Date) => {
  const start = new Date(date)
  console.log("start", start)
  start.setDate(1)
  console.log("start", start)
  start.setDate(start.getDate() - start.getDay())
  console.log("start", start)
  const end = new Date(date)
  console.log("end", end)
  end.setMonth(date.getMonth() + 1)
  console.log("end", end)
  end.setDate(0)
  console.log("end", end)
  end.setDate(end.getDate() + (7 - end.getDay() - 1))
  console.log("end", end)
  const arr = []
  for (let i = start; i <= end; i.setDate(i.getDate() + 1)) {
    arr.push(new Date(i))
  }
  console.log("arr", arr)
  const arr2 = []
  while (arr.length >= 7) {
    arr2.push(arr.splice(0, 7))
  }
  console.log("arr2", arr2)
  return arr2
}
const onSelectedChange = (newVal: SelectedCellType) => {
  let selectDate
  try {
    selectDate = range.value[newVal.row][newVal.column as any]
  } catch {
    selectDate = null
  }
  emit("select", selectDate as any)
}
provide("selected-cell", selectedCell)
watch(selectedCell, onSelectedChange, { deep: true })
</script>
<style lang="scss">
.custom-calendar {
  tbody {
    .el-table__cell {
      padding: 0;
      .cell {
        padding: 0;
      }
    }
  }
}
</style>
<template>
  <calendar-body :date="prop.date" :range="range">
    <calendar-cell label="Sun" prop="0" :current-month="currentMonth" :current="prop.date" />
    <calendar-cell label="Mon" prop="1" :current-month="currentMonth" :current="prop.date" />
    <calendar-cell label="Tue" prop="2" :current-month="currentMonth" :current="prop.date" />
    <calendar-cell label="Wed" prop="3" :current-month="currentMonth" :current="prop.date" />
    <calendar-cell label="Thu" prop="4" :current-month="currentMonth" :current="prop.date" />
    <calendar-cell label="Fri" prop="5" :current-month="currentMonth" :current="prop.date" />
    <calendar-cell label="Sat" prop="6" :current-month="currentMonth" :current="prop.date" />
  </calendar-body>
</template>
