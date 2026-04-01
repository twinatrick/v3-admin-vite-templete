<script setup lang="ts">
import { computed, PropType } from "vue"
import CheckboxFormItem from "@/components/CheckBoxFormItem/CheckboxFormItem.vue"

const prop = defineProps({
  checkboxVisible: {
    type: Boolean,
    default: false
  },
  checkboxValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    default: ""
  },
  type: {
    type: String as PropType<"text" | "textarea" | "select">,
    default: "text"
  },
  list: {
    type: Array as PropType<string[]>,
    default: () => [] as string[]
  },
  formProp: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: ""
  }
})
const _checkboxValue = computed({
  get: () => prop.checkboxValue,
  set: (val) => emit("update:checkboxValue", val)
})
const emit = defineEmits(["update:checkboxValue", "update:modelValue"])
const _modelValue = computed({
  get: () => prop.modelValue,
  set: (val) => emit("update:modelValue", val)
})
</script>
<template>
  <checkbox-form-item
    :label="label"
    :prop="formProp"
    v-model:checkbox-value="_checkboxValue"
    :checkbox-visible="checkboxVisible"
  >
    <el-input
      class="w-100%!"
      v-if="type == 'text' || type == 'textarea'"
      :type="type"
      v-model="_modelValue"
      :disabled="disabled"
    />
    <el-select class="w-100%!" v-else-if="type == 'select'" v-model="_modelValue" :disabled="disabled">
      <el-option v-for="item in list" :key="item" :label="item" :value="item" />
    </el-select>
  </checkbox-form-item>
</template>
