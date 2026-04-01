<script setup lang="ts">
// @ts-nocheck
import { PickerResponse, PickerResponseDocument } from "../types"
import { ref } from "vue"
//data
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
  }
})
const emit = defineEmits<{
  (e: "picked", data: PickerResponseDocument[] | undefined): void
  (e: "cancel"): void
}>()
let picker = null
const loading = ref(false)
//functions
const getAccessToken = async () => {
  if (prop.accessTokenAsync !== undefined) {
    return await prop.accessTokenAsync()
  } else return prop.accessToken
}
const createPicker = () => {
  loading.value = true
  getAccessToken()
    .then((accessToken) => {
      picker = new google.picker.PickerBuilder()
        //.addView(google.picker.ViewId.DOCS)
        .addView(
          new google.picker.DocsView(google.picker.ViewId.SPREADSHEETS).setIncludeFolders(true).setOwnedByMe(true)
        )
        // .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
        .setOAuthToken(accessToken)
        .setDeveloperKey(prop.apiKey)
        .setAppId(prop.appId)
        .setCallback(pickerCallback)
        .build()
    })
    .finally(() => {
      loading.value = false
    })

  function pickerCallback(data) {
    const response = setResponse(data)
    if (response.action == google.picker.Action.PICKED) {
      emit("picked", response.docs)
    } else if (response.action == google.picker.Action.CANCEL) {
      emit("cancel")
    }
  }
}
const show = () => {
  if (picker === null) {
    console.warn("picker not initialized")
    return
  }

  picker.setVisible(true)
  setZIndex(prop.zIndex)
}
const setZIndex = (val: number) => {
  const setProperty = (el) => {
    el.style.setProperty("--picker-z-index", val)
  }
  const dialogs = document.querySelectorAll(".picker-dialog")
  dialogs.forEach(setProperty)
  const bg = document.querySelectorAll(".picker-dialog-bg")
  bg.forEach(setProperty)
}
const setResponse = (data: any) => {
  const result: PickerResponse = {}
  const { ACTION, DOCUMENTS, PARENTS } = google.picker.Response
  if (data[ACTION] != undefined) result.action = data[ACTION]
  if (data[DOCUMENTS] != undefined) result.docs = setDocument(data[DOCUMENTS])
  if (data[PARENTS] != undefined) result.parents = data[PARENTS]
  return result
}
const setDocument = (doc: any) => {
  const {
    DESCRIPTION,
    EMBEDDABLE_URL,
    ICON_URL,
    ID,
    IS_NEW,
    LAST_EDITED_UTC,
    MIME_TYPE,
    NAME,
    NUM_CHILDREN,
    PARENT_ID,
    SERVICE_ID,
    TYPE,
    URL
  } = google.picker.Document
  const result: PickerResponseDocument[] = []
  doc.forEach((item: any) => {
    const document: PickerResponseDocument = {}
    if (item[DESCRIPTION] != undefined) document.description = item[DESCRIPTION]
    if (item[EMBEDDABLE_URL] != undefined) document.embedUrl = item[EMBEDDABLE_URL]
    if (item[ICON_URL] != undefined) document.iconUrl = item[ICON_URL]
    if (item[ID] != undefined) document.id = item[ID]
    if (item[IS_NEW] != undefined) document.isNew = item[IS_NEW]
    if (item[LAST_EDITED_UTC] != undefined) document.lastEditedUtc = item[LAST_EDITED_UTC]
    if (item[MIME_TYPE] != undefined) document.mimeType = item[MIME_TYPE]
    if (item[NAME] != undefined) document.name = item[NAME]
    if (item[NUM_CHILDREN] != undefined) document.childrenCount = item[NUM_CHILDREN]
    if (item[PARENT_ID] != undefined) document.parentId = item[PARENT_ID]
    if (item[SERVICE_ID] != undefined) document.serviceId = item[SERVICE_ID]
    if (item[TYPE] != undefined) document.type = item[TYPE]
    if (item[URL] != undefined) document.url = item[URL]
    result.push(document)
  })

  return result
}
//init
window.gapi.load("picker", () => {
  console.log("picker loaded")
  createPicker()
})
// watch(
//   () => prop.zIndex,
//   (val) => {
//     setZIndex(val)
//   }
// )
</script>
<style>
:root {
  --picker-z-index: 1000;
}
.picker-dialog-bg {
  z-index: var(--picker-z-index) !important;
}
.picker-dialog {
  z-index: calc(var(--picker-z-index) + 1) !important;
}
</style>
<template>
  <slot :show="show" :loading="loading">
    <button @click="show">picker</button>
  </slot>
</template>
