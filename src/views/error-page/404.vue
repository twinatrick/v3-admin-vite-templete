<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

const goHome = () => {
  router.push("/")
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full">
    <div class="text-8xl font-bold text-yellow-400">404</div>
    <div class="text-2xl text-gray-500 mt-4">抱歉，您訪問的頁面不存在</div>
    <el-button type="primary" class="mt-6" @click="goHome">返回首頁</el-button>
  </div>
</template>
