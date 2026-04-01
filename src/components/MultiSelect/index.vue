<script lang="ts">
import { defineComponent, VNode, h } from "vue"
import { ElSelect } from "element-plus"
import { Loading } from "@element-plus/icons-vue"

export default defineComponent({
  name: "MultiSelect",
  extends: ElSelect,
  props: {
    modelValue: {
      type: [String, Number, Array] as any,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    "update:modelValue": (_val: any[]) => true
  },
  computed: {
    _modelValue: {
      get() {
        return this.modelValue
      },
      set(val: any[]) {
        this.$emit("update:modelValue", val)
      }
    },
    checkBoxValue: {
      get() {
        return this.modelValue.length === this.options.length
      },
      set(val: boolean) {
        if (val) {
          this._modelValue = this.options.map((option: any) => option.value)
        } else {
          this._modelValue = []
        }
      }
    },
    checkBoxIndeterminate() {
      return !this.checkBoxValue && this.modelValue.length > 0
    },
    options() {
      if (!this.$slots.default) return []
      const defaultSlot = this.$slots.default()

      const options = new Array<{
        label: string
        value: string
        disabled: boolean
      }>()
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
          } else {
            if ((child.type as any).componentName !== "ElOption") continue
            temp.push({
              label: child.props.label,
              value: child.props.value,
              disabled: child.props.disabled
            })
          }
        }
        return temp
      }
      for (const vnode of defaultSlot) {
        if (vnode.children) {
          const temp = getAllOptionsProps(vnode.children as any[])
          options.push(...temp)
        } else if ((vnode.type as any).componentName === "ElOption") {
          options.push({
            label: vnode.props?.label,
            value: vnode.props?.value,
            disabled: vnode.props?.disabled
          })
        }
      }
      return options
    },
    suffixIcon(): VNode | string {
      return this.loading ? h(Loading, { class: "el-icon-loading" }) : "ArrowDown"
    }
  }
})
</script>
<template>
  <el-select
    v-bind="$props"
    v-model="_modelValue"
    multiple
    filterable
    collapse-tags
    collapse-tags-tooltip
    :loading="loading"
    :suffix-icon="suffixIcon"
  >
    <template #header>
      <el-checkbox v-model="checkBoxValue" :indeterminate="checkBoxIndeterminate">All</el-checkbox>
    </template>
    <el-option v-for="(option, index) in options" :key="index" v-bind="option" />
  </el-select>
</template>
