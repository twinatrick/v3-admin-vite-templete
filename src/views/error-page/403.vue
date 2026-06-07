<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

const goHome = () => {
  router.push("/")
}
</script>

<template>
  <div class="error-page flex flex-col items-center justify-center h-full">
    <div class="text-8xl font-bold text-red-400">403</div>
    <div class="text-2xl text-gray-500 mt-4">抱歉，您沒有權限訪問此頁面</div>
    <el-button type="primary" class="mt-6" @click="goHome">返回首頁</el-button>
  </div>
</template>
