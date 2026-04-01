<script lang="ts" setup>
import { ref, reactive } from "vue"
import { ElMessage } from "element-plus"
// import { OpenLoading } from "@/utils/index"

// Class
class HistoryRecordData {
  category: String
  reason: string
  constructor(data?: any) {
    this.category = data?.category ?? ""
    this.reason = data?.reason ?? ""
  }

  Set(data?: any) {
    this.category = data?.category ?? ""
    this.reason = data?.reason ?? ""
    return this
  }
}

// Variables
const show = ref<boolean>(false)

// Data
const data = reactive(new HistoryRecordData())

// Event

function Open(category: string) {
  show.value = true
  data.Set()
  data.category = category
}

function Close() {
  show.value = false
}

function Comfirm() {
  if (data.reason) emit("comfirm", data)
  else ElMessage.error("Please input reason.")
}

// Function

// Emit
const emit = defineEmits(["comfirm"])
// Expose
defineExpose({
  Open,
  Close
})
</script>

<style scoped lang="scss"></style>

<template>
  <el-dialog v-model="show" title="Histroy Record" width="30%" center :close-on-click-modal="false">
    <main>
      <h3>Reason :</h3>
      <el-input v-model="data.reason" :rows="3" type="textarea" />
    </main>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="Close">Cancel</el-button>
        <el-button type="success" @click="Comfirm"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>
