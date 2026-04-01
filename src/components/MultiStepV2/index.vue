<script setup lang="ts">
import { ref, useSlots, VNode, readonly, computed, watch } from "vue"
defineProps({
  showFooter: {
    type: Boolean,
    default: true
  }
})
//data
const slots = useSlots()
/**
 * <a href="https://stackoverflow.com/a/74050166">Solve issue by this</a>
 */
const pageSlots = computed(() => (slots.default ? slots.default() : []))
const currentStep = ref(0)
const currentPage = ref<VNode>(pageSlots.value[0])
//functions
const prev = () => {
  const prevStep = currentStep.value - 1
  if (prevStep < 0) return
  changePage(currentStep.value - 1)
}
const next = async () => {
  const nextStep = currentStep.value + 1
  if (nextStep > pageSlots.value.length - 1) return
  return await changePage(currentStep.value + 1)
}
const changePage = async (val: number) => {
  loading.value = true
  const shortestWait = new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 250)
  })
  currentStep.value = val
  currentPage.value = pageSlots.value[val]
  await shortestWait
  return val
}
const _wait = (t: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, t)
  })
const loading = ref(false)
const transitionIsReverse = ref(false)
watch(
  () => currentStep.value,
  (newVal: number, oldVal: number) => {
    transitionIsReverse.value = newVal <= oldVal
  }
)
//expose
defineExpose({
  prev,
  next,
  currentStep: readonly(currentStep),
  setCurrentStep: (val: number) => {
    currentStep.value = val
    currentPage.value = pageSlots.value[val]
  }
})
</script>
<style>
.multi-step-v2-enter-active,
.multi-step-v2-leave-active,
.multi-step-v2-reverse-enter-active,
.multi-step-v2-reverse-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}

.multi-step-v2-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.multi-step-v2-leave-to {
  opacity: 1;
  transform: translateX(-100%);
}
.multi-step-v2-reverse-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.multi-step-v2-reverse-leave-to {
  opacity: 1;
  transform: translateX(100%);
}
</style>
<template>
  <el-container>
    <el-header>
      <el-steps :active="currentStep" align-center finish-status="success">
        <slot name="step" />
      </el-steps>
    </el-header>
    <el-main class="p-0! position-relative overflow-hidden! h-100%! flex! flex-row flex-nowrap flex-justify-center">
      <transition-group
        :name="transitionIsReverse ? 'multi-step-v2-reverse' : 'multi-step-v2'"
        @after-leave="loading = false"
      >
        <component
          v-for="(component, index) in pageSlots"
          :is="component"
          class="h-100%! w-100%! p-5"
          :key="index"
          v-show="index === currentStep"
        />
      </transition-group>
    </el-main>
    <el-footer v-if="showFooter">
      <slot name="footer" :prev="prev" :next="next" :loading="loading">
        <div text-center>
          <el-button type="primary" @click="prev" :loading="loading"> Previous </el-button>
          <el-button type="primary" @click="next"> Next </el-button>
        </div>
      </slot>
    </el-footer>
  </el-container>
</template>
