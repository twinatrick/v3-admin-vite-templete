<script lang="ts" setup>
import { reactive, ref } from "vue"
import { type ListItem, Icon } from "./data"
const dialogData = reactive({
  type: undefined,
  icon: undefined,
  title: "",
  startTime: undefined,
  content: "",
  status: undefined
})
const visible = ref(false)
interface Props {
  list: ListItem[]
}
const props = defineProps<Props>()
const style = (item: ListItem) => {
  return {
    cursor: item.onClick ? "pointer" : "default"
  }
}
const notifyClick = (item: any) => {
  if (item.type === 1) {
    window.open(item.content)
  } else {
    dialogData.title = item.title
    dialogData.content = item.content
    visible.value = true
  }
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
    :style="{ ...style(item) }"
    @click="notifyClick(item)"
  >
    <template #header>
      <div class="card-header">
        <div>
          <span>
            <span class="card-title">{{ item.title }}</span>
          </span>
          <div class="card-time">{{ item.startTime }}</div>
        </div>
        <div v-if="item.icon === 1" class="card-icon" />
        <div v-if="item.icon === 2" class="card-icon">
          <img :src="Icon.Sheet" width="34" />
        </div>
      </div>
    </template>
    <div class="card-body" v-if="item.type === 2">
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
    .card-icon {
      display: flex;
      align-items: center;
    }
  }
  .card-body {
    font-size: 12px;
  }
}
</style>
