<script setup lang="ts">
import { computed } from "vue"

const props = defineProps({
  checkboxValue: {
    type: Boolean,
    default: false
  },
  checkboxVisible: {
    type: Boolean,
    default: true
  },
  checkboxDisabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits<{
  (event: "update:checkboxValue", value: boolean): void
}>()
const checkboxValue = computed({
  get: () => props.checkboxValue,
  set: (val) => emit("update:checkboxValue", val)
})
</script>
<template>
  <el-form-item>
    <template #label="{ label }">
      <el-checkbox
        v-if="props.checkboxVisible"
        v-model="checkboxValue"
        :disabled="props.checkboxDisabled"
        class="mr-auto! ml-5"
        >{{ label }}
      </el-checkbox>
      <template v-else>
        {{ label }}
      </template>
    </template>
    <slot />
  </el-form-item>
</template>
