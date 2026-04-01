<script lang="ts">
// set component name when it's a composition api component
export default {
  name: "ElInputWithTag"
}
</script>
<script setup lang="ts">
import { ref, watch } from "vue"
import { CircleClose } from "@element-plus/icons-vue"
interface Props {
  modelValue?: Array<string>
  maxlength?: number
  max?: number
  tagType?: "primary" | "success" | "warning" | "danger" | "info"
  placeholder?: string
  clearable?: boolean
  allowEmpty?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  maxlength: undefined,
  max: 5,
  tagType: "info",
  placeholder: "Press enter to add tag",
  clearable: false,
  allowEmpty: false
})
const emit = defineEmits<{
  (event: "update:modelValue", value: Array<string>): void
}>()
const inputValue = ref("")
const tagArray = ref<Array<string>>([])

//functions
const closeTag = (index: number) => {
  tagArray.value.splice(index, 1)
  emit("update:modelValue", tagArray.value)
}
//events
const enterEvent = () => {
  if (tagArray.value.length >= props.max) return
  if (!props.allowEmpty && inputValue.value.trim() === "") return
  if (!tagArray.value.includes(inputValue.value)) {
    tagArray.value.push(inputValue.value)
  }
  inputValue.value = ""
  emit("update:modelValue", tagArray.value)
}
const clearEvent = () => {
  tagArray.value = []
  inputValue.value = ""
  emit("update:modelValue", tagArray.value)
}
const backspaceEvent = () => {
  if (inputValue.value.length === 0) {
    tagArray.value.pop()
    emit("update:modelValue", tagArray.value)
  }
}
const blurEvent = () => {
  inputValue.value = ""
}
watch(
  () => props.modelValue,
  (newVal) => {
    tagArray.value = newVal
  }
)
</script>
<style></style>
<template>
  <el-input
    show-word-limit
    :maxlength="props.maxlength"
    v-model="inputValue"
    :placeholder="props.placeholder"
    @keydown.backspace="backspaceEvent"
    @keyup.enter="enterEvent"
    @clear="clearEvent"
    @blur="blurEvent"
  >
    <template #prefix>
      <el-tag
        effect="plain"
        v-for="(string, index) in tagArray"
        :key="index"
        :type="props.tagType"
        closable
        @close="() => closeTag(index)"
      >
        {{ string }}
      </el-tag>
    </template>
    <template #suffix>
      <el-icon v-show="props.clearable" @click="clearEvent"><CircleClose /></el-icon>
    </template>
  </el-input>
</template>
