<script setup lang="ts">
import { computed, onUnmounted, reactive, ref } from "vue"
import type { VADSMessage } from "@/utils/vads-processor"
import { ElMessage } from "element-plus"

// 重要：使用 Vite 的 ?url 導入，這會自動編譯 TS 並給予該檔案的 URL
// @ts-ignore
import vadsWorkletUrl from "@/utils/vads-processor?worker&url"

import { AudioRefs, AudioState, RecognizeResult } from "./type"

// --- 響應式狀態 ---
const state = reactive<AudioState>({
  isAutoMode: false,
  isProcessing: false,
  isRecording: false,
  isThinking: false,
  currentVolume: 0,
  threshold: 20,
  language: "zh-TW",
  format: "text"
})

// 辨識結果歷史紀錄
const results = ref<RecognizeResult[]>([])
let nextResultId = 1

// 語言選項
const languageOptions = [
  { label: "中文 (zh-TW)", value: "zh-TW" },
  { label: "英文 (en-US)", value: "en-US" },
  { label: "日文 (ja-JP)", value: "ja-JP" }
]

// 輸出格式選項
const formatOptions = [
  { label: "純文字", value: "text" },
  { label: "JSON 格式", value: "json" },
  { label: "羅馬拼音+片假名", value: "romaji_katakana" }
]

// 底層物件參考 (不使用 reactive 避免 Proxy 代理問題)
const audioRefs: AudioRefs = {
  context: null,
  stream: null,
  worklet: null,
  recorder: null,
  chunks: []
}
let silenceTimer: ReturnType<typeof setTimeout> | null = null

// --- 核心邏輯 ---

const toggleAutoMode = async () => {
  if (state.isAutoMode) {
    stopEverything()
    return
  }

  try {
    audioRefs.stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    audioRefs.context = new AudioContext()

    // 加載已編譯的 Worklet TS 文件
    await audioRefs.context.audioWorklet.addModule(vadsWorkletUrl)

    const source = audioRefs.context.createMediaStreamSource(audioRefs.stream)
    audioRefs.worklet = new AudioWorkletNode(audioRefs.context, "vads-processor")

    // 接收來自 Worklet 的音量數據
    audioRefs.worklet.port.onmessage = (event: MessageEvent<VADSMessage>) => {
      state.currentVolume = event.data.volume
      handleVolumeTrigger(state.currentVolume)
    }

    source.connect(audioRefs.worklet)
    // 注意：必須連接到 destination，某些瀏覽器才會持續驅動 Worklet
    audioRefs.worklet.connect(audioRefs.context.destination)

    state.isAutoMode = true
  } catch (err) {
    console.error("啟動失敗:", err)
    ElMessage.error("無法存取麥克風，請確認權限設定。")
  }
}

const handleVolumeTrigger = (vol: number) => {
  // 處理中或思考中先暫停觸發
  if (state.isProcessing) return

  if (vol > state.threshold) {
    if (!state.isRecording) startRecording()
    if (silenceTimer) {
      clearTimeout(silenceTimer)
      silenceTimer = null
    }
  } else {
    if (state.isRecording && !silenceTimer) {
      // 設定靜音一段時間後停止錄音 (例如 1.5 秒)
      silenceTimer = setTimeout(() => {
        stopRecording()
      }, 1500)
    }
  }
}

/**
 * 開始錄音
 */
const startRecording = () => {
  if (!audioRefs.stream || state.isProcessing || state.isRecording) return

  state.isRecording = true
  audioRefs.chunks = []

  // 建立 MediaRecorder
  audioRefs.recorder = new MediaRecorder(audioRefs.stream, {
    mimeType: "audio/webm;codecs=opus"
  })

  audioRefs.recorder.ondataavailable = (e: BlobEvent) => {
    if (e.data.size > 0) {
      audioRefs.chunks.push(e.data)
    }
  }

  audioRefs.recorder.onstop = async () => {
    const audioBlob = new Blob(audioRefs.chunks, { type: "audio/webm" })

    if (audioBlob.size < 1000) {
      console.warn("錄音過短，已略過。")
      state.isRecording = false
      return
    }

    await sendAudio(audioBlob)
  }

  audioRefs.recorder.start()
}

/**
 * 停止錄音
 */
const stopRecording = () => {
  if (audioRefs.recorder && audioRefs.recorder.state !== "inactive") {
    audioRefs.recorder.stop()
    state.isRecording = false

    if (silenceTimer) {
      clearTimeout(silenceTimer)
      silenceTimer = null
    }
  }
}

/**
 * 發送音訊給後端 API
 */
const sendAudio = async (blob: Blob) => {
  state.isProcessing = true
  state.isThinking = true

  // 建立新的紀錄項目，狀態為 pending
  const currentId = nextResultId++
  const resultItem: RecognizeResult = {
    id: currentId,
    timestamp: new Date().toLocaleTimeString(),
    text: "辨識中...",
    language: state.language,
    format: state.format,
    status: "pending"
  }
  results.value.unshift(resultItem) // 加到陣列最前面

  try {
    // 準備要發送的資料 (包含音檔、語言、格式)
    const formData = new FormData()
    formData.append("file", blob, "audio.webm")
    formData.append("language", state.language)
    formData.append("format", state.format)

    // TODO: 在此處呼叫您的後端 API
    // const res = await api.ask.recognize(formData);

    // 模擬 API 呼叫 (尚未實作後端時的佔位符)
    console.log("準備發送資料給後端:", {
      fileSize: blob.size,
      language: state.language,
      format: state.format
    })

    // 這裡暫時拋出錯誤，讓它走 error 狀態，待後端接上後修改
    throw new Error("API 尚未實作")

    // --- 假設後端回傳成功 ---
    // const targetItem = results.value.find(item => item.id === currentId);
    // if (targetItem) {
    //     targetItem.text = res.data.text; // 根據實際 API 回傳結構調整
    //     targetItem.status = 'success';
    // }
  } catch (error) {
    console.error("請求失敗:", error)
    const targetItem = results.value.find((item) => item.id === currentId)
    if (targetItem) {
      targetItem.text = "辨識失敗 (API 尚未準備好或發生錯誤)"
      targetItem.status = "error"
    }
  } finally {
    state.isThinking = false
    state.isProcessing = false
  }
}

const stopEverything = () => {
  audioRefs.stream?.getTracks().forEach((t) => t.stop())
  audioRefs.context?.close()
  state.isAutoMode = false
  state.isRecording = false
  state.currentVolume = 0
}

onUnmounted(stopEverything)

const nowRecording = computed(() => state.currentVolume > state.threshold)
const autoMode = computed(() => state.isAutoMode)
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto bg-gray-50 rounded-xl shadow-lg space-y-6 border">
    <!-- 頂部控制按鈕 -->
    <button
      @click="toggleAutoMode"
      :class="state.isAutoMode ? 'bg-red-500' : 'bg-green-600'"
      class="w-full py-3 text-white rounded-lg font-bold transition-all shadow hover:opacity-90"
    >
      {{ autoMode ? "關閉自動監聽" : "開啟自動監聽" }}
    </button>

    <!-- 參數設定區 -->
    <div class="bg-white p-4 rounded-lg shadow-sm border space-y-4">
      <h3 class="font-semibold text-gray-700 mb-2 border-b pb-2">參數設定</h3>
      <div class="flex gap-4">
        <div class="flex-1">
          <label class="block text-sm text-gray-600 mb-1">辨識語言</label>
          <el-select v-model="state.language" class="w-full" :disabled="state.isAutoMode">
            <el-option v-for="item in languageOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="flex-1">
          <label class="block text-sm text-gray-600 mb-1">輸出格式</label>
          <el-select v-model="state.format" class="w-full" :disabled="state.isAutoMode">
            <el-option v-for="item in formatOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <p class="text-xs text-amber-600" v-if="state.isAutoMode">* 監聽中無法更改參數設定</p>
    </div>

    <!-- 音量監測區 -->
    <div class="space-y-4 bg-white p-4 rounded-lg shadow-sm border">
      <div class="relative h-8 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="absolute h-full bg-blue-400 transition-all duration-75"
          :style="{ width: state.currentVolume + '%' }"
        />
        <div class="absolute h-full w-1 bg-red-600 shadow-sm" :style="{ left: state.threshold + '%' }" />
      </div>

      <div class="flex justify-between text-sm text-gray-600 font-medium">
        <span>錄音門檻設定: {{ state.threshold }}</span>
        <span :class="nowRecording ? 'text-red-500 animate-pulse font-bold' : ''">
          {{ nowRecording ? "● 正在錄音..." : "○ 等待聲音輸入" }}
        </span>
      </div>

      <input
        type="range"
        v-model.number="state.threshold"
        min="0"
        max="100"
        class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-red-500"
      />

      <p class="text-xs text-gray-400">說明：當藍色條（當前音量）超過紅線時，會自動觸發錄音。</p>
    </div>

    <!-- 狀態提示 -->
    <div v-if="state.isThinking" class="text-center text-blue-600 font-bold animate-pulse">AI 辨識中，請稍候...</div>

    <!-- 辨識結果歷史區 -->
    <div class="bg-white p-4 rounded-lg shadow-sm border h-80 flex flex-col">
      <h3 class="font-semibold text-gray-700 mb-2 border-b pb-2 flex justify-between">
        <span>辨識結果</span>
        <span class="text-xs font-normal text-gray-400">由新到舊排列</span>
      </h3>

      <div class="flex-1 overflow-y-auto space-y-3 pr-2">
        <div v-if="results.length === 0" class="text-center text-gray-400 mt-10">尚無辨識紀錄</div>

        <div
          v-for="res in results"
          :key="res.id"
          class="p-3 rounded-lg border text-sm"
          :class="{
            'bg-gray-50 border-gray-200': res.status === 'success',
            'bg-blue-50 border-blue-200': res.status === 'pending',
            'bg-red-50 border-red-200': res.status === 'error'
          }"
        >
          <div class="flex justify-between text-xs text-gray-500 mb-1">
            <span>[{{ res.language }}] {{ res.format }}</span>
            <span>{{ res.timestamp }}</span>
          </div>
          <div :class="res.status === 'error' ? 'text-red-600' : 'text-gray-800'">
            <span v-if="res.status === 'pending'" class="animate-pulse">...</span>
            {{ res.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 可依需求加上自定義樣式 */
</style>
