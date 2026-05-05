<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from "vue"

const props = withDefaults(
  defineProps<{
    label?: string
    colSpan?: number
  }>(),
  {
    colSpan: 1
  }
)

const colStyle = computed(() => ({
  gridColumn: `span ${props.colSpan} / span ${props.colSpan}`
}))

const wrapperRef = ref<HTMLElement>()
const isFloating = ref(false)
let inputElement: HTMLInputElement | HTMLTextAreaElement | null = null

const updateFloatingState = () => {
  if (!inputElement) return

  // 检查是否聚焦或有值
  const hasFocus = document.activeElement === inputElement
  const hasValue = inputElement.value !== ""

  isFloating.value = hasFocus || hasValue
}

onMounted(() => {
  nextTick(() => {
    if (!wrapperRef.value) return

    inputElement = wrapperRef.value.querySelector("input, textarea")
    if (inputElement) {
      inputElement.addEventListener("focus", updateFloatingState)
      inputElement.addEventListener("blur", updateFloatingState)
      inputElement.addEventListener("input", updateFloatingState)

      // 初始化状态
      updateFloatingState()
    }
  })
})

onUnmounted(() => {
  if (inputElement) {
    inputElement.removeEventListener("focus", updateFloatingState)
    inputElement.removeEventListener("blur", updateFloatingState)
    inputElement.removeEventListener("input", updateFloatingState)
  }
})
</script>

<template>
  <div class="query-form-item" :style="colStyle">
    <div ref="wrapperRef" class="float-label-wrapper" :class="{ 'is-floating': isFloating }">
      <slot />
      <label v-if="props.label" class="float-label">{{ props.label }}</label>
    </div>
  </div>
</template>

<style scoped>
.query-form-item {
  position: relative;
}

.float-label-wrapper {
  position: relative;
  width: 100%;
}

.float-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--el-text-color-placeholder);
  font-size: 14px;
  pointer-events: none;
  transition: all 0.2s ease;
  background: var(--el-bg-color);
  padding: 0 6px;
  z-index: 2;
  line-height: 1;
}

/* 浮动状态 */
.float-label-wrapper.is-floating .float-label {
  top: 0;
  transform: translateY(-50%);
  font-size: 12px;
  color: var(--el-color-primary);
}

/* 输入框样式调整 */
.float-label-wrapper :deep(.el-input__wrapper) {
  padding-top: 4px;
  position: relative;
  z-index: 1;
}
</style>
