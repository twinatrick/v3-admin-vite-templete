<script lang="ts">
import { dayjs, ElDatePicker } from "element-plus"
import { computed, defineComponent, onMounted, PropType, ref, watch } from "vue"
import { Location } from "@element-plus/icons-vue"
import { DateObject, DatePickerWithTimezoneValueModelType, TimezoneOption, console } from "./type"

export default defineComponent({
  extends: ElDatePicker,
  props: {
    modelValue: {
      type: [String, Date, Array] as PropType<DatePickerWithTimezoneValueModelType>
    },
    timezone: {
      type: String,
      default: ""
    },
    timezoneOptions: {
      type: Object as PropType<TimezoneOption>,
      default: () => {
        return {
          width: "125px",
          show: true
        }
      }
    },
    mode: {
      type: String as PropType<"picker" | "text">,
      default: "picker"
    }
  },
  components: {
    ElDatePicker,
    Location
  },
  emits: ["update:modelValue", "update:timezone"],
  setup(props, { emit }) {
    const id = Math.random().toString(36).substring(2)
    const data = ref<DateObject>()
    const isDateRange = computed(() => {
      return props.type.includes("range")
    })
    const displayValue = computed<Date | [Date, Date] | undefined>({
      get() {
        if (!data.value) return undefined
        if (isDateRange.value) {
          return data.value.getDisplayRangeValue() as [Date, Date]
        }
        return data.value.getDisplayValue()
      },
      set(val) {
        console.group(`[${id}] displayValue set`)
        console.log("val", val)
        if (!val) {
          data.value = undefined
        } else if (val instanceof Date) {
          data.value = DateObject.componentToDate(val, props.timezone)
        } else {
          data.value = DateObject.componentToDateRange(val as Date[], props.timezone)
        }

        console.groupEnd(`[${id}] displayValue set`)
        onChange()
      }
    })
    const displayValueForText = computed(() => {
      function format(date: Date) {
        return dayjs(date).format(props.format)
      }
      if (!displayValue.value) return "-"
      if (isDateRange.value) {
        return (displayValue.value as [Date, Date]).map(format).join(" ~ ")
      }
      return format(displayValue.value as Date)
    })
    const style = computed(() => ({
      "--timezone-field-width": props.timezoneOptions.width
    }))
    const onChange = () => {
      console.group(`[${id}] onChange`)

      console.log("data.value", data.value)
      if (!data.value) emit("update:modelValue", undefined)
      else {
        if (isDateRange.value) {
          const result = data.value.getDateRange(true)
          emit("update:modelValue", result)
          console.log("emit update:modelValue", result)
        } else {
          const result = data.value.getDate()
          emit("update:modelValue", result)
          console.log("emit update:modelValue", result)
        }
        if (!props.timezone) {
          const result = data.value.getTimezone()
          emit("update:timezone", result)
          console.log("emit update:timezone", result)
        }
      }

      console.groupEnd(`[${id}] onChange`)
    }
    const validTimezone = (val?: string) => {
      if (!val) return false
      const rule = /^([+-])(\d{2}):(\d{2})$/
      return rule.test(val)
    }
    const onModelValueChange = (val?: DatePickerWithTimezoneValueModelType, timezone?: string) => {
      console.group(`[${id} ]onModelValueChange`)

      console.log("init", {
        val,
        timezone
      })
      if (!val) data.value = undefined
      else {
        switch (true) {
          case val instanceof Array: {
            const [start, end] = val as [Date, Date] | [string, string]
            data.value = DateObject.modelValueToDateTimeRange([new Date(start), new Date(end)], timezone)
            break
          }
          case val instanceof Date:
          case typeof val === "string":
            data.value = DateObject.modelValueToDateObj(new Date(val as string | number | Date), timezone)
            break
          default:
            data.value = undefined
        }
      }
      console.groupEnd(`[${id} ]onModelValueChange`)
    }
    watch(
      () => props.modelValue,
      (val) => {
        onModelValueChange(val, props.timezone)
      }
    )
    watch(
      () => props.timezone,
      (val) => {
        if (!validTimezone(val)) return
        onModelValueChange(props.modelValue, val)
      }
    )
    onMounted(() => {
      onModelValueChange(props.modelValue, props.timezone)
    })
    return {
      displayValue,
      displayValueForText,
      style,
      data
    }
  }
})
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
  <div class="el-date-picker-with-timezone">
    <div v-if="mode === 'picker'" class="dpwt__wrapper" :style="style">
      <el-date-picker v-bind="$props" v-model="displayValue" :value-on-clear="undefined" />
      <el-input v-model="$props.timezone" disabled class="timezone-field" v-if="timezoneOptions.show">
        <template #prepend>
          <el-tooltip content="Timezone" :show-after="200">
            <el-icon>
              <slot name="timezone-icon">
                <Location />
              </slot>
            </el-icon>
          </el-tooltip>
        </template>
      </el-input>
    </div>
    <div v-else>
      {{ displayValueForText }}
    </div>
  </div>
</template>
