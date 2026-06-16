<script setup lang="ts">
import { ref, watch } from "vue"
import { api, request } from "@/api/client"
import { JobPostingVo } from "@/api/generated/Api"
import { mockSearchJobPostings, mockGetJobPostingById } from "@/utils/mock-data"

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    clearable?: boolean
  }>(),
  {
    modelValue: "",
    placeholder: "請選擇職缺",
    clearable: true
  }
)

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void
}>()

const loading = ref(false)
const options = ref<JobPostingVo[]>([])
const selectedId = ref(props.modelValue)

async function remoteSearch(query: string) {
  if (!query) {
    options.value = []
    return
  }
  loading.value = true
  try {
    const res = await api.jobPostingController.searchJobPostings({
      title: query,
      page: 0,
      size: 20
    })
    options.value = res.data?.content || []
  } catch {
    options.value = mockSearchJobPostings(query).content
  } finally {
    loading.value = false
  }
}

async function resolveJob(id: string): Promise<JobPostingVo | null> {
  try {
    const res = await request.get(`/api/job-posting/get/${id}`)
    return res.data?.data || null
  } catch {
    return mockGetJobPostingById(id)
  }
}

watch(
  () => props.modelValue,
  async (newVal) => {
    selectedId.value = newVal || ""
    if (newVal && !options.value.some((o) => o.id === newVal)) {
      const job = await resolveJob(newVal)
      if (job) {
        options.value = [job, ...options.value]
      }
    }
  },
  { immediate: true }
)

function handleChange(value: string) {
  emit("update:modelValue", value || "")
}

function handleClear() {
  selectedId.value = ""
  emit("update:modelValue", "")
}
</script>

<template>
  <el-select
    v-model="selectedId"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    remote
    :remote-method="remoteSearch"
    :loading="loading"
    @change="handleChange"
    @clear="handleClear"
  >
    <el-option v-for="item in options" :key="item.id!" :label="item.title || item.id!" :value="item.id!" />
  </el-select>
</template>
