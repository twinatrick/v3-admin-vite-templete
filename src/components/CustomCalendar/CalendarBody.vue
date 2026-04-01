<script setup lang="ts">
const prop = defineProps({
  date: {
    type: Date,
    required: true
  },
  range: {
    type: Array<Array<Date>>,
    required: true
  }
})
const _MonthOfStartEnd = (date: Date) => {
  const start = new Date(date)
  start.setDate(1)
  start.setDate(start.getDate() - start.getDay())
  const end = new Date(date)
  end.setMonth(date.getMonth() + 1)
  end.setDate(0)
  end.setDate(end.getDate() + (7 - end.getDay() - 1))
  const arr = []
  for (let i = start; i <= end; i.setDate(i.getDate() + 1)) {
    arr.push(new Date(i))
  }
  const arr2 = []
  while (arr.length >= 7) {
    arr2.push(arr.splice(0, 7))
  }
  return arr2
}
const _WeekOfStartEnd = (date: Date) => {
  const day = date.getDay()
  const start = new Date(date)
  const end = new Date(date)
  start.setDate(date.getDate() - day)
  end.setDate(date.getDate() + (7 - day - 1))
  return [start, end]
}
</script>
<style scoped></style>
<template>
  <el-table class="custom-calendar" :data="prop.range" border>
    <slot />
  </el-table>
</template>
