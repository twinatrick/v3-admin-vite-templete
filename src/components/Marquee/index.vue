<template>
  <div class="marquee">
    <div ref="marqueeContent" class="marquee-content" :color="props.color">
      {{ text }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { waitUntil } from "@/utils"
import { ref, onUnmounted, watch } from "vue"
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  speed: {
    type: Number,
    default: 1
  },
  color: {
    type: String,
    default: "#000000"
  }
})
const marqueeContent = ref<InstanceType<typeof HTMLDivElement>>()
let animationId: number | null = null

const startMarquee = async () => {
  await waitUntil(() => Boolean(marqueeContent.value))
  const marqueeWidth = marqueeContent.value?.offsetWidth
  const containerWidth = (marqueeContent.value?.parentNode as HTMLElement)?.offsetWidth
  let position = marqueeWidth

  const animate = () => {
    if (position != undefined && marqueeWidth != undefined && containerWidth != undefined && marqueeContent.value) {
      position -= props.speed
      if (position < -marqueeWidth) {
        position = containerWidth + marqueeWidth
      }
      marqueeContent.value.style.transform = `translateX(${position}px)`
      animationId = requestAnimationFrame(animate)
    }
  }

  animate()
}
watch(
  () => props.text,
  () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    startMarquee()
  }
)

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>
<style>
.marquee {
  overflow: hidden;
  white-space: nowrap;
}

.marquee-content {
  display: inline-block;
  animation: marquee infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
