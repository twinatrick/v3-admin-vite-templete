<script setup lang="ts">
import { CascaderValue, ElCascader } from "element-plus"
import { computed } from "vue"
import { useSlots } from "vue"
import { ref } from "vue"
import { ContextMenuOptionProps } from "./type"

type IndexedContextMenuOptionProps = {
  value: string | number
  label: string
  disabled: boolean
  onClick: (option: ContextMenuOptionProps) => void
  children: { [index: string | number]: IndexedContextMenuOptionProps }
}

const slots = useSlots()
const defaultSlot = computed(() => slots.default?.())

const options = computed<ContextMenuOptionProps[]>(() => {
  // nested slot
  function getOptions(slots: any) {
    if (!slots) return []

    const temp = new Array<ContextMenuOptionProps>()
    for (const slot of slots) {
      const isVFor = () => typeof slot.type === "symbol" && Symbol.keyFor(slot.type) === "v-fgt"
      const isMenuItem = () => slot.type.name === "ElContextMenuItem"
      if (isVFor()) {
        temp.push(...getOptions(slot.children))
      } else if (isMenuItem()) {
        temp.push({
          value: randomUUID(),
          label: slot.props.label,
          disabled: slot.props.disabled,
          onClick: slot.props.onClick || (() => {}),
          children: getOptions(slot.children?.default?.())
        })
      }
    }
    return temp
  }
  return getOptions(defaultSlot.value)
})
const indexedOptions = computed(() => {
  function indexOptions(options: ContextMenuOptionProps[]) {
    const indexed: { [index: string | number]: IndexedContextMenuOptionProps } = {}
    for (const option of options) {
      indexed[option.value] = {
        ...option,
        children: indexOptions(option.children)
      }
    }
    return indexed
  }
  return indexOptions(options.value)
})
const contextMenuParentRef = ref<HTMLDivElement>()
const cascaderRef = ref<InstanceType<typeof ElCascader>>()
const show = (inset?: { top?: string; left?: string; right?: string; bottom?: string }) => {
  setPosition(inset || parentPosition())
  cascaderRef.value?.togglePopperVisible(true)
}
const parentPosition = () => {
  if (!contextMenuParentRef.value) return
  const rect = contextMenuParentRef.value.getBoundingClientRect()
  return {
    top: `${rect.top + rect.height / 2}px`,
    left: `${rect.left + rect.width / 2}px`
  }
}
const setPosition = (inset?: { top?: string; left?: string; right?: string; bottom?: string }) => {
  const string = `${inset?.top || "auto"} ${inset?.right || "auto"} ${inset?.bottom || "auto"} ${inset?.left || "auto"}`
  cascaderRef.value?.contentRef?.style.setProperty("--el-context-menu-inset", string)
}
const onVisibleChange = () => {
  cascaderRef?.value?.cascaderPanelRef?.clearCheckedNodes()
}
const onChange = (value: CascaderValue) => {
  if (!value) return
  if (Array.isArray(value) && value.length > 0) {
    // find the option in the nested options
    let pointer = indexedOptions.value
    for (let i = 0; i < value.length; i++) {
      if (i === value.length - 1) {
        // execute the onClick function
        const option = pointer[value[i] as string | number]
        option.onClick({
          value: option.value,
          label: option.label,
          disabled: option.disabled,
          onClick: option.onClick,
          children: []
        })
        break
      }
      const v = value[i]
      pointer = pointer[v as string | number].children
    }
  }
}
function randomUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
defineExpose({
  show
})
</script>
<style lang="scss">
.el-context-menu {
  display: inline;
  .el-cascader {
    display: none;
  }
  --bg-color: var(--el-bg-color-overlay);
  li[role="menuitem"] {
    background-color: var(--bg-color);
  }
}
.el-context-menu-popper {
  inset: var(--el-context-menu-inset) !important;
  .el-popper__arrow {
    display: none !important;
  }
}
</style>
<template>
  <div class="el-context-menu" ref="contextMenuParentRef">
    <slot name="reference" />
    <el-cascader
      popper-class="el-context-menu-popper"
      ref="cascaderRef"
      :options="options"
      clearable
      @visible-change="onVisibleChange"
      @change="onChange"
    />
  </div>
</template>
