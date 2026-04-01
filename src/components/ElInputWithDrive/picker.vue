<script lang="ts" setup>
import { computed, onMounted, onUnmounted, PropType, ref } from "vue"
import { Action, DocsViewMode, DocumentObject, PickerViewOption, ResponseObject, ViewId } from "./types/index.js"
import { waitUntil } from "@/utils/index.js"

const prop = defineProps({
  apiKey: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: false
  },
  accessTokenAsync: {
    type: Function,
    required: false
  },
  appId: {
    type: String,
    required: true
  },
  zIndex: {
    type: Number,
    required: false,
    default: 1000
  },
  viewOption: {
    type: Object as PropType<PickerViewOption>,
    default: () => {}
  }
})
const loading = ref(false)
const pickerAPI = ref<typeof window.google.picker>()
const picker = ref<InstanceType<typeof google.picker.Picker>>()

const emit = defineEmits<{
  (e: "picked", data: DocumentObject[] | undefined): void
  (e: "cancel"): void
}>()

const _viewOption = computed<Required<PickerViewOption>>(() => {
  const defaultOption = {
    viewId: ViewId.SPREADSHEETS,
    enableDrives: false,
    includeFolders: true,
    mode: DocsViewMode.GRID,
    ownedByMe: true,
    parentId: "",
    selectFolderEnabled: false,
    starred: false
  }
  return { ...defaultOption, ...prop.viewOption }
})

const show = () => {
  if (!picker.value) {
    console.warn("picker not initialized")
    return
  }

  picker.value.setVisible(true)
  setZIndex(prop.zIndex)
}
const setZIndex = (val: number) => {
  const setProperty = (el: any) => {
    el.style.setProperty("--picker-z-index", String(val))
  }
  const dialogs = document.querySelectorAll(".picker-dialog")
  dialogs.forEach(setProperty)
  const bg = document.querySelectorAll(".picker-dialog-bg")
  bg.forEach(setProperty)
}
const getAccessToken = async () => {
  if (prop.accessTokenAsync !== undefined) {
    return await prop.accessTokenAsync()
  } else return prop.accessToken
}
const pickerCallBack = (response: ResponseObject) => {
  if (response.action == Action.PICKED) {
    emit("picked", response.docs)
  } else if (response.action == Action.CANCEL) {
    emit("cancel")
  }
}
const createDocsView = (option: Required<PickerViewOption>) => {
  return new pickerAPI.value!.DocsView(option.viewId)
    .setIncludeFolders(option.includeFolders)
    .setOwnedByMe(option.ownedByMe)
    .setParent(option.parentId)
    .setStarred(option.starred)
    .setEnableDrives(option.enableDrives)
    .setMode(option.mode)
    .setSelectFolderEnabled(option.selectFolderEnabled)
}
const createPicker = async () => {
  loading.value = true
  try {
    await waitUntil(() => pickerAPI.value !== undefined)
    if (!pickerAPI.value) return

    // 1. get access token
    const accessToken = await getAccessToken()

    // 2. create docs view for picker view mode
    const docsView = createDocsView(_viewOption.value)

    // 3. create picker by builder
    picker.value = new pickerAPI.value.PickerBuilder()
      .addView(docsView)
      .setOAuthToken(accessToken)
      .setDeveloperKey(prop.apiKey)
      .setAppId(prop.appId)
      .setCallback(pickerCallBack)
      .build()
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}
const initialize = () => {
  pickerAPI.value = window.google.picker
  createPicker()
}
onMounted(() => {
  window.gapi.load("picker", () => {
    initialize()
  })
})
onUnmounted(() => {
  picker.value?.dispose()
})
</script>
<style lang="scss">
:root {
  --picker-z-index: 1000;
}
.picker {
  &.picker-dialog-bg {
    z-index: var(--picker-z-index) !important;
  }
  &.picker-dialog {
    z-index: calc(var(--picker-z-index) + 1) !important;
  }
}
</style>
<template>
  <slot :show="show" :loading="loading">
    <button @click="show">picker</button>
  </slot>
</template>
