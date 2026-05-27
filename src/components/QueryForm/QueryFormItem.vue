<script setup lang="ts">
import { computed, inject, ref, onMounted, onUnmounted, nextTick, watchEffect } from "vue"
import { QUERY_FORM_MODEL_KEY } from "./context"

const isDefaultEmptyValue = (value: unknown) => {
  if (value === "" || value === null || value === undefined) return true
  if (Array.isArray(value)) return value.length === 0
  return false
}

const props = withDefaults(
  defineProps<{
    label?: string
    colSpan?: number
    field?: string
    emptyRule?: (value: unknown) => boolean
  }>(),
  {
    colSpan: 1
  }
)

const colStyle = computed(() => ({
  gridColumn: `span ${props.colSpan} / span ${props.colSpan}`
}))

const formModel = inject(QUERY_FORM_MODEL_KEY, null)

const wrapperRef = ref<HTMLElement>()
const isFloating = ref(false)
let inputElement: HTMLInputElement | HTMLTextAreaElement | null = null
let focusInListener: ((event: FocusEvent) => void) | null = null
let focusOutListener: ((event: FocusEvent) => void) | null = null

const getFieldValue = () => {
  if (!formModel?.value || !props.field) return undefined
  return formModel.value[props.field]
}

const hasFieldValue = () => {
  if (!props.field) return false
  const fieldValue = getFieldValue()
  if (props.emptyRule) {
    return !props.emptyRule(fieldValue)
  }
  return !isDefaultEmptyValue(fieldValue)
}

const updateFloatingState = () => {
  const wrapper = wrapperRef.value
  if (!wrapper) return

  const activeElement = document.activeElement
  const hasFocus = Boolean(activeElement && wrapper.contains(activeElement))
  const hasInputValue = Boolean(inputElement && inputElement.value !== "")
  const hasValue = props.field ? hasFieldValue() : hasInputValue
  isFloating.value = hasFocus || hasValue
}

onMounted(() => {
  nextTick(() => {
    if (!wrapperRef.value) return

    inputElement = wrapperRef.value.querySelector("input, textarea")
    focusInListener = () => updateFloatingState()
    focusOutListener = () => updateFloatingState()

    wrapperRef.value.addEventListener("focusin", focusInListener)
    wrapperRef.value.addEventListener("focusout", focusOutListener)

    if (inputElement) {
      inputElement.addEventListener("input", updateFloatingState)
    }

    // 初始化状态
    updateFloatingState()
  })
})

watchEffect(() => {
  if (!props.field || !formModel?.value) return
  if (props.emptyRule) {
    props.emptyRule(getFieldValue())
  } else {
    isDefaultEmptyValue(getFieldValue())
  }
  updateFloatingState()
})

onUnmounted(() => {
  if (wrapperRef.value && focusInListener) {
    wrapperRef.value.removeEventListener("focusin", focusInListener)
  }
  if (wrapperRef.value && focusOutListener) {
    wrapperRef.value.removeEventListener("focusout", focusOutListener)
  }
  if (inputElement) {
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
