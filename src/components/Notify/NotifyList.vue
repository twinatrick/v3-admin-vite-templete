<script lang="ts" setup>
import { reactive, ref } from "vue"
import { type ListItem } from "./data"

interface Props {
  list: ListItem[]
}

const props = defineProps<Props>()
const dialogData = reactive({
  title: "",
  content: ""
})
const visible = ref(false)
const style = (item: ListItem) => {
  return {
    cursor: item.onClick ? "pointer" : "default"
  }
}
const notifyClick = (item: any) => {
  dialogData.title = item.title
  dialogData.content = item.content
  visible.value = true
}
</script>

<template>
  <el-empty v-if="props.list.length === 0" />
  <el-card
    v-else
    v-for="(item, index) in props.list"
    :key="index"
    shadow="never"
    class="card-container"
    @click="notifyClick(item)"
    :style="{ ...style(item) }"
  >
    <template #header>
      <div class="card-header">
        <div>
          <span>
            <span class="card-title">{{ item.title }}</span>
            <!-- <el-tag v-if="item.extra" :type="item.status" effect="plain" size="small">{{ item.extra }}</el-tag> -->
          </span>
          <!-- <div class="card-time">{{ item.datetime }}</div> -->
        </div>
        <!-- <div v-if="item.avatar" class="card-avatar">
          <img :src="item.avatar" width="34" />
        </div> -->
      </div>
    </template>
    <div class="card-body">
      {{ item.content ?? "No Data" }}
    </div>
  </el-card>
  <el-dialog v-model="visible" :model="dialogData" width="30%" center :close-on-click-modal="false">
    <template #header>
      <h2 text-center>{{ dialogData.title }}</h2>
    </template>
    <span>{{ dialogData.content }}</span>
    <template #footer>
      <span class="dialog-footer" />
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.card-container {
  margin-bottom: 10px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card-title {
      font-weight: bold;
      margin-right: 10px;
    }
    .card-time {
      font-size: 12px;
      color: grey;
    }
    .card-avatar {
      display: flex;
      align-items: center;
    }
  }
  .card-body {
    font-size: 12px;
  }
}
</style>
