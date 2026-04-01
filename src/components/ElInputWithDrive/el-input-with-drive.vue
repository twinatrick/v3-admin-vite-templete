<script setup lang="ts">
import { Picker, PickerResponseDocument } from "@/plugin/google-apis"
import { computed } from "vue"
import { useUserStore } from "@/store/modules/user"
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
      return key
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
      return id
    }
  },
  placeholder: {
    type: String,
    default: "Select file on Google Drive or enter google sheet id"
  }
})
const sheetId = computed({
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
  sheetId.value = ""
}
const handlePicked = (docs: PickerResponseDocument[] | undefined) => {
  // console.log(docs)
  sheetId.value = docs?.[0].id || ""
}
</script>
<style scoped lang="scss"></style>
<template>
  <el-input v-model="sheetId" @clear="handleDeleteFile" :placeholder="placeholder" clearable>
    <template #append>
      <Picker
        :app-id="appId as string"
        :access-token-async="accessToken"
        :api-key="apiKey as string"
        :z-index="5000"
        @picked="handlePicked"
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
