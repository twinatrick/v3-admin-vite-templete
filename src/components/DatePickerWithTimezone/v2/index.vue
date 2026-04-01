<script setup lang="ts">
import { computed, useAttrs } from "vue"
import { Location } from "@element-plus/icons-vue"
interface DateWithTimezoneProps {
  modelValue?: string | [string, string]
  timezone?: string
  onlyChangeTimezoneWhenEmpty?: boolean
  timezoneWidth?: string
}
const attr = useAttrs()
const props = withDefaults(defineProps<DateWithTimezoneProps>(), {
  onlyChangeTimezoneWhenEmpty: false,
  timezoneWidth: "200px"
})
const emit = defineEmits<{
  (event: "update:modelValue", value: string | [string, string]): void
  (event: "update:timezone", value: string): void
}>()
const style = computed(() => {
  return {
    "--timezone-field-width": props.timezoneWidth
  }
})
const _modelValue = computed<string | [string, string] | undefined>({
  get: () => {
    const tz = timezone.value || getCurrentTimezone()
    if (!props.modelValue) return undefined
    if (Array.isArray(props.modelValue)) {
      const start = props.modelValue[0]
      const end = props.modelValue[1]
      return [culLocalTime(start, tz), culLocalTime(end, tz)] as [string, string]
    } else {
      return culLocalTime(props.modelValue, tz) as string
    }
  },
  set: (val?: string | [string, string]) => {
    const tz = props.timezone || getCurrentTimezone()
    // console.log(val)
    if (!val) return
    let result
    if (Array.isArray(val)) {
      // const start = combineDateAndTimezone(val[0], tz)
      // const end = combineDateAndTimezone(val[1], tz)
      const start = culLocalTime(val[0], tz) + tz
      const end = culLocalTime(val[1], tz) + tz
      result = [start, end] as [string, string]
    } else {
      // result = combineDateAndTimezone(val, tz)
      result = culLocalTime(val, tz) + tz
    }
    // console.log(result)
    emit("update:modelValue", result)
  }
})
const timezone = computed({
  get: () => {
    if (validateTimezone(props.timezone)) {
      return props.timezone
    } else {
      return undefined
    }
  },
  set: (_) => {}
})
const onDateChange = () => {
  // console.log(Boolean(timezone.value))
  if (props.onlyChangeTimezoneWhenEmpty) {
    if (!timezone.value) {
      emit("update:timezone", getCurrentTimezone())
    }
  } else {
    emit("update:timezone", getCurrentTimezone())
  }
}
const getCurrentTimezone = () => {
  const date = new Date()
  const offset = date.getTimezoneOffset()
  const offsetHours = Math.floor(Math.abs(offset / 60))
  const offsetMinutes = Math.abs(offset % 60)
  const offsetSign = offset < 0 ? "+" : "-"
  return `${offsetSign}${offsetHours.toString().padStart(2, "0")}:${offsetMinutes.toString().padStart(2, "0")}`
}
const culLocalTime = (date: string, timezone: string) => {
  // date: 2024-07-02T12:00:00.000+08:00, timezone: +05:30 => 2024-07-02T09:30:00.000
  const dateObj = new Date(date)
  const offset = timezoneToOffset(timezone)
  const localOffset = dateObj.getTimezoneOffset()
  const diff = localOffset - offset
  dateObj.setMinutes(dateObj.getMinutes() + diff)
  const year = dateObj.getFullYear()
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0")
  const day = dateObj.getDate().toString().padStart(2, "0")
  const hour = dateObj.getHours().toString().padStart(2, "0")
  const minute = dateObj.getMinutes().toString().padStart(2, "0")
  const second = dateObj.getSeconds().toString().padStart(2, "0")
  const millisecond = dateObj.getMilliseconds().toString().padStart(3, "0")
  const result = `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}`
  // console.log("culLocalTime: ", result)
  return result
}
const _combineDateAndTimezone = (date: string, timezone: string) => {
  return `${date}${timezone}`
}
const timezoneToOffset = (timezone: string) => {
  const sign = timezone[0] === "-" ? 1 : -1
  const offsetHour = parseInt(timezone.slice(1, 3))
  const offsetMinutes = parseInt(timezone.slice(4, 6))
  return sign * (offsetHour * 60 + offsetMinutes)
}
const validateTimezone = (timezone?: string) => {
  if (!timezone) return false
  const reg = /^(\+|-)(0[0-9]|1[0-4]):[0-5][0-9]$/
  return reg.test(timezone)
}
</script>
<style lang="scss">
.el-date-picker-with-timezone {
  --timezone-field-width: 100px;
  width: 100%;
  .dpwt__wrapper {
    display: flex;
    > .el-date-editor {
      width: 100% !important;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      > .el-input__wrapper {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    > .timezone-field {
      width: var(--timezone-field-width) !important;
      > .el-input-group__prepend {
        padding: 0 10px;
        border-radius: 0;
        box-shadow: 0 0 0 0 var(--el-input-border-color) inset, 0 1px 0 0 var(--el-input-border-color) inset,
          0 -1px 0 0 var(--el-input-border-color) inset;
      }
    }
  }
}
</style>
<template>
  <div class="el-date-picker-with-timezone" :style="style">
    <div class="dpwt__wrapper">
      <el-date-picker v-model="_modelValue" v-bind="attr" @change="onDateChange" />
      <el-input v-model="timezone" disabled class="timezone-field">
        <template #prepend>
          <el-tooltip content="Timezone" :show-after="200">
            <el-icon><Location /></el-icon>
          </el-tooltip>
        </template>
      </el-input>
    </div>
  </div>
</template>
