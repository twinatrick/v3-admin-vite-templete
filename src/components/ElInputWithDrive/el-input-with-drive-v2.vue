<script setup lang="ts">
import Picker from "./picker.vue"
import { computed, PropType } from "vue"
import { useUserStore } from "@/store/modules/user"
import { DocumentObject, PickerViewOption } from "./types/index"
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  apiKey: {
    type: String,
    default: () => {
      const key = import.meta.env.VITE_GOOGLE_API_KEY
      if (!key) {
        console.warn("Please set VITE_GOOGLE_API_KEY in .env file")
        return ""
      }
      return key as string
    }
  },
  appId: {
    type: String,
    default: () => {
      const id = import.meta.env.VITE_GOOGLE_APP_ID
      if (!id) {
        console.warn("Please set VITE_GOOGLE_APP_ID in .env file")
        return ""
      }
      return id as string
    }
  },
  placeholder: {
    type: String,
    default: "Select file on Google Drive or enter google sheet id"
  },
  viewOption: {
    type: Object as PropType<PickerViewOption>,
    default: () => {}
  }
})
const docsId = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit("update:modelValue", val)
  }
})
const emit = defineEmits<{
  (event: "update:modelValue", value: string): void
}>()
const accessToken = async function () {
  return await useUserStore().getAccessToken()
}
const handleDeleteFile = () => {
  docsId.value = ""
}
const handlePicked = (docs: DocumentObject[] | undefined) => {
  docsId.value = docs?.[0].id || ""
}
</script>

<template>
  <el-input v-model="docsId" @clear="handleDeleteFile" :placeholder="placeholder" clearable>
    <template #append>
      <Picker
        :app-id="appId"
        :access-token-async="accessToken"
        :api-key="apiKey"
        :z-index="5000"
        @picked="handlePicked"
        :view-option="viewOption"
      >
        <template #default="{ show, loading }">
          <el-button @click="show" v-loading="loading">
            <SvgIcon name="google-drive" mr-1 />
          </el-button>
        </template>
      </Picker>
    </template>
  </el-input>
</template>
