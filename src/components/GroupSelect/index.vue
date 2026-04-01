<script setup lang="ts">
import { computed, useSlots } from "vue"
import MultiSelect from "@/components/MultiSelect/index.vue"
import InputWithTag from "@/components/InputWithTag/el-input-with-tag.vue"
const slots = useSlots()
const defaultSlot = computed(() => {
  const temp = slots.default ? slots.default() : []
  return temp.filter((x) => {
    const type = x.type as any
    return (
      type.name === "ElSelect" ||
      type.name === "ElInput" ||
      type.name === "MultiSelect" ||
      type.name === "ElInputWithTag"
    )
  })
})
const getAllOptionsProps = (children: any[]) => {
  const temp = new Array<{
    label: string
    value: string
    disabled: boolean
  }>()
  for (const child of children) {
    const hasChild = Boolean(child.children)
    if (hasChild) {
      temp.push(...getAllOptionsProps(child.children))
    } else if (child.props) {
      temp.push({
        label: child.props.label,
        value: child.props.value,
        disabled: child.props.disabled
      })
    }
  }
  return temp
}
</script>
<style lang="scss">
.group-select {
  .el-input {
    &:not(:first-child) .el-input__wrapper {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left-width: 0;
    }
    &:not(:last-child) .el-input__wrapper {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &::before {
      top: 0;
      left: 0;
      position: absolute;
      content: var(--label, "");
      color: #606266;
      transform: translateY(-50%);
      line-height: 14px;
      margin-left: 11px;
      z-index: 1;
      background-color: var(--el-fill-color-blank);
      font-size: 14px;
    }
  }
  .el-select {
    width: 100%;
    .el-select__wrapper {
      width: 100%;
      height: 100%;
      display: flex;
    }
    &:not(:first-child) .el-select__wrapper {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left-width: 0;
    }

    &:not(:last-child) .el-select__wrapper {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &::before {
      top: 0;
      left: 0;
      position: absolute;
      content: var(--label, "");
      color: #606266;
      transform: translateY(-50%);
      line-height: 14px;
      margin-left: 11px;
      z-index: 1;
      background-color: var(--el-fill-color-blank);
      font-size: 14px;
    }
  }
}
html.dark,
html.dark-blue {
  .group-select {
    .el-select,
    .el-input {
      &::before {
        color: #c0c4cc;
        background-color: var(--el-bg-color-overlay);
      }
    }
  }
}
</style>
<template>
  <div class="flex group-select">
    <template v-for="(child, index) in defaultSlot" :key="index">
      <el-input
        v-if="(child.type as any).name === 'ElInput'"
        v-bind="child.props"
        placeholder=""
        :style="{ '--label': `'${child.props?.placeholder || ''}'` }"
      />
      <el-select
        v-else-if="(child.type as any).name === 'ElSelect'"
        v-bind="child.props"
        placeholder=""
        :style="{ '--label': `'${child.props?.placeholder || ''}'` }"
        filterable
      >
        <template v-if="child.children">
          <el-option
            v-for="(option, index_i) in getAllOptionsProps((child.children as any).default())"
            :key="index_i"
            v-bind="option"
          />
        </template>
      </el-select>
      <multi-select
        v-else-if="(child.type as any).name === 'MultiSelect'"
        v-bind="child.props"
        placeholder=""
        :style="{ '--label': `'${child.props?.placeholder || ''}'` }"
      >
        <template v-if="child.children">
          <el-option
            v-for="(option, index_i) in getAllOptionsProps((child.children as any).default())"
            :key="index_i"
            v-bind="option"
          />
        </template>
      </multi-select>
      <input-with-tag
        v-else-if="(child.type as any).name === 'ElInputWithTag'"
        v-bind="child.props"
        placeholder=""
        :style="{ '--label': `'${child.props?.placeholder || ''}'` }"
      />
    </template>
  </div>
</template>
