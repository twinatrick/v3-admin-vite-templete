<script setup lang="ts">
import { computed, PropType, useAttrs } from "vue"
import { Location } from "@element-plus/icons-vue"

type ModelValueType = Date | [Date, Date] | [string, string] | string
const attr = useAttrs()
const prop = defineProps({
  modelValue: {
    type: Object as PropType<ModelValueType | null>,
    default: null
  },
  timezone: {
    type: String,
    default: ""
  },
  timezoneWidth: {
    type: String,
    default: "125px"
  }
})
const emit = defineEmits<{
  (event: "update:timezone", value: string): void
  (event: "update:modelValue", value: ModelValueType): void
}>()
// const _datetime = computed({
//   get: () => {
//     const verifyType = (value: ModelValueType) => {
//       if (value === null) return "null"
//       if (value instanceof Date) return "date"
//       if (Array.isArray(value) && value.length == 2) {
//         if (value[0] instanceof Date && value[1] instanceof Date) {
//           return "dateRange"
//         } else if (value[0] instanceof String && value[1] instanceof String) {
//           return "stringRange"
//         }
//       }
//       return "undefined"
//     }
//     switch (verifyType(prop.modelValue)) {
//       case "date":
//         return setOffset(prop.modelValue as Date)
//       case "dateRange": {
//         const temp = prop.modelValue as [Date, Date]
//         return [setOffset(temp[0]), setOffset(temp[1])]
//       }
//       case "stringRange": {
//         const temp = prop.modelValue as [string, string]
//         return [setOffset(new Date(temp[0])), setOffset(new Date(temp[1]))]
//       }
//       default:
//         return null
//     }
//   },
//   set: (value: string | string[] | null) => {
//     emit("update:modelValue", value)
//   }
// })
const timezone = computed({
  get: () => prop.timezone,
  set: (value) => {
    emit("update:timezone", value)
  }
})
const style = computed(() => {
  return {
    "--timezone-field-width": prop.timezoneWidth
  }
})
// const setOffset = (rawDate: Date) => {
//   const date = new Date()
//   let offsetHour = date.getHours() - date.getUTCHours()
//   let offsetMin = date.getMinutes() - date.getUTCMinutes()
//   const data = timezone.value.split(":")
//   if (data.length != 2) return rawDate.toISOString()
//   offsetHour = parseInt(data[0]) - offsetHour
//   offsetMin = parseInt(data[1]) - offsetMin
//   const diff = 1000 * (offsetHour * 60 + (offsetHour < 0 ? -1 : 1) * offsetMin) * 60
//   if (Number.isNaN(diff)) return rawDate.toISOString()
//   return new Date(new Date(rawDate).getTime() + diff).toJSON().replaceAll("Z", "") + "+00:00"
// }
const _modelValue = computed({
  get: () => {
    let result
    if (Array.isArray(prop.modelValue)) {
      const array = prop.modelValue.map((x) => timeSetting(x as Date, timezone.value))
      result = array as ModelValueType
    } else {
      result = timeSetting(prop.modelValue as Date, timezone.value) as ModelValueType
    }
    return result as ModelValueType
  },
  set: (value: ModelValueType) => {
    emit("update:modelValue", value)
  }
})

const timeSetting = (input: Date | string, timezone: string) => {
  const date = new Date()
  let offsetHour = date.getHours() - date.getUTCHours()
  let offsetMin = date.getMinutes() - date.getUTCMinutes()
  if (!timezone) return input
  const data = timezone.split(":")
  if (data.length != 2) return input
  offsetHour = parseInt(data[0]) - offsetHour
  offsetMin = parseInt(data[1]) - offsetMin

  const diff = 1000 * (offsetHour * 60 + (offsetHour < 0 ? -1 : 1) * offsetMin) * 60
  if (input) {
    return new Date(new Date(input).getTime() + diff).toJSON().replaceAll("Z", "") + "+00:00"
  } else return input
}
const offsetMinuteToString = (offsetMinute: number) => {
  let offsetMinuteString
  if (offsetMinute == 0) {
    offsetMinuteString = "00"
  } else if (offsetMinute < 10) {
    offsetMinuteString = "0" + offsetMinute
  } else {
    offsetMinuteString = offsetMinute
  }
  return offsetMinuteString
}
const offsetHourToString = (offsetHour: number) => {
  let offsetHourString
  if (offsetHour == 0) {
    offsetHourString = "00"
  } else if (offsetHour > 10) {
    offsetHourString = offsetHour
  } else if (offsetHour > 0) {
    offsetHourString = "0" + offsetHour
  } else if (offsetHour > -10) {
    offsetHourString = "0" + offsetHour * -1
  } else {
    offsetHourString = offsetHour
  }
  return offsetHourString
}
const _offsetToString = (offsetHour: number, offsetMinute: number) => {
  const offsetMinuteString = offsetMinuteToString(offsetMinute)
  const offsetHourString = offsetHourToString(offsetHour)
  return (offsetHour >= 0 ? "+" : "-") + offsetHourString + ":" + offsetMinuteString
}
const getCurrentTimezone = () => {
  const digit2 = (x: number) => (x < 10 ? "0" + x : x)

  const date = new Date()
  const timezoneOffset = Math.abs(date.getTimezoneOffset())
  const isNegative = date.getTimezoneOffset() < 0
  const offsetHour = digit2(Math.floor(timezoneOffset / 60))
  const offsetMinute = digit2(timezoneOffset % 60)
  return (isNegative ? "+" : "-") + offsetHour + ":" + offsetMinute
  // const offsetHour = date.getHours() - date.getUTCHours()
  // const offsetMinute = date.getMinutes() - date.getUTCMinutes()
  // return offsetToString(offsetHour, offsetMinute)
}
const onChange = () => {
  timezone.value = getCurrentTimezone()
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
      <el-date-picker v-bind="attr" v-model="_modelValue" @change="onChange" />
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
