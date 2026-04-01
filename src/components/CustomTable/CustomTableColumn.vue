<script setup lang="ts">
import { useAttrs, useSlots } from "vue"

defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
const attr = useAttrs()
const slot = useSlots()
const StaticClass = ["w-100%!"]
</script>
<template>
  <el-table-column>
    <template #header>
      <slot name="title" />
    </template>
    <el-table-column v-bind="attr" v-if="visible" show-overflow-tooltip>
      <template #header>
        <component
          v-for="(component, index) in slot.header?.()"
          :key="index"
          :is="component"
          :class="`${component.props?.className ?? ''} ${StaticClass.join(' ')}`"
        />
      </template>
      <template #default="scope">
        <slot v-bind="scope">
          {{ scope.row[scope.column.property] }}
        </slot>
      </template>
    </el-table-column>
  </el-table-column>
</template>
