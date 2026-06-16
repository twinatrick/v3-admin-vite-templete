<script setup lang="ts">
import { ref, watch } from "vue"
import { api, request } from "@/api/client"
import { UserVo } from "@/api/generated/Api"
import { mockGetUserById } from "@/utils/mock-data"

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    clearable?: boolean
    labelMode?: "email" | "emailWithName"
    activeOnly?: boolean
  }>(),
  {
    modelValue: "",
    placeholder: "請選擇創建者",
    clearable: true,
    labelMode: "emailWithName",
    activeOnly: false
  }
)

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void
}>()

const loading = ref(false)
const options = ref<UserVo[]>([])
const selectedId = ref(props.modelValue)

function formatLabel(user: UserVo): string {
  const email = user.email || user.id || ""
  const name = user.name || ""
  if (props.labelMode === "email") return email
  return name ? `${email} (${name})` : email
}

async function remoteSearch(query: string) {
  if (!query) {
    options.value = []
    return
  }
  loading.value = true
  try {
    const res = await api.userController.searchUsers({
      name: query,
      page: 0,
      size: 20,
      ...(props.activeOnly ? { disabled: false } : {})
    })
    options.value = res.data?.content || []
  } catch {
    options.value = []
  } finally {
    loading.value = false
  }
}

async function resolveUser(id: string): Promise<UserVo | null> {
  try {
    const res = await request.get(`/api/users/${id}`)
    return res.data?.data || null
  } catch {
    return mockGetUserById(id)
  }
}

watch(
  () => props.modelValue,
  async (newVal) => {
    selectedId.value = newVal || ""
    if (newVal && !options.value.some((o) => o.id === newVal)) {
      const user = await resolveUser(newVal)
      if (user) {
        options.value = [user, ...options.value]
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
    <el-option v-for="item in options" :key="item.id!" :label="formatLabel(item)" :value="item.id!" />
  </el-select>
</template>
