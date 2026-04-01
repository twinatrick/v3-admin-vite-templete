<script setup lang="ts">
import { ref, useSlots, VNode, readonly } from "vue"
//data
const slots = useSlots()
const pageSlots = slots.default ? slots.default() : []
const currentStep = ref(0)
const currentPage = ref<VNode>(pageSlots[0])
//functions
const prev = () => {
  const prevStep = currentStep.value - 1
  if (prevStep < 0) return
  changePage(currentStep.value - 1)
}
const next = async () => {
  const nextStep = currentStep.value + 1
  if (nextStep > pageSlots.length - 1) return
  return await changePage(currentStep.value + 1)
}
const changePage = async (val: number) => {
  loading.value = true
  await wait(100)
  currentStep.value = val
  currentPage.value = pageSlots[val]
  return val
}
const wait = (t: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, t)
  })
const loading = ref(false)
//expose
defineExpose({
  prev,
  next,
  currentStep: readonly(currentStep),
  setCurrentStep: (val: number) => {
    currentStep.value = val
    currentPage.value = pageSlots[val]
  }
})
</script>
<style>
.translate-enter-active,
.translate-leave-active {
  transition: all 0.25s ease;
}

.translate-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.translate-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
<template>
  <el-container>
    <el-header>
      <el-steps :active="currentStep" align-center finish-status="success">
        <slot name="step" />
      </el-steps>
    </el-header>
    <el-main class="overflow-hidden! h-100%!">
      <transition name="translate" mode="out-in">
        <keep-alive>
          <suspense @resolve="loading = false">
            <component :is="currentPage" class="h-100%!" />
            <template #fallback> Loading.... </template>
          </suspense>
        </keep-alive>
        <!-- <keep-alive>
          <component :is="currentPage" />
        </keep-alive> -->
      </transition>
    </el-main>
    <el-footer>
      <slot name="footer" :prev="prev" :next="next" :loading="loading">
        <div text-center>
          <el-button type="primary" @click="prev" :loading="loading"> Previous </el-button>
          <el-button type="primary" @click="next"> Next </el-button>
        </div>
      </slot>
    </el-footer>
  </el-container>
</template>
