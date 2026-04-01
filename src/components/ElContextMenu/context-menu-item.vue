<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "ElContextMenuItem",
  props: {
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["click"]
})
</script>
<template>
  <slot />
</template>
