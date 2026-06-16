<script setup lang="ts">
import { ref, watch } from "vue"
import { api } from "@/api/client"
import { CompanyVo } from "@/api/generated/Api"
import { mockSearchCompanies } from "@/utils/mock-data"

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    clearable?: boolean
  }>(),
  {
    modelValue: "",
    placeholder: "請選擇公司",
    clearable: true
  }
)

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void
}>()

const loading = ref(false)
const options = ref<CompanyVo[]>([])
const selectedId = ref(props.modelValue)

async function remoteSearch(query: string) {
  if (!query) {
    options.value = []
    return
  }
  loading.value = true
  try {
    const res = await api.companyController.getAllCompanies()
    const filtered = (res.data || []).filter((c) => c.name && c.name.toLowerCase().includes(query.toLowerCase()))
    options.value = filtered.slice(0, 20)
  } catch {
    options.value = mockSearchCompanies(query).content
  } finally {
    loading.value = false
  }
}

async function resolveCompany(id: string): Promise<CompanyVo | null> {
  try {
    const res = await api.companyController.getCompanyById(id)
    return res.data || null
  } catch {
    return null
  }
}

watch(
  () => props.modelValue,
  async (newVal) => {
    selectedId.value = newVal || ""
    if (newVal && !options.value.some((o) => o.id === newVal)) {
      const company = await resolveCompany(newVal)
      if (company) {
        options.value = [company, ...options.value]
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
    <el-option v-for="item in options" :key="item.id!" :label="item.name || item.id!" :value="item.id!" />
  </el-select>
</template>
