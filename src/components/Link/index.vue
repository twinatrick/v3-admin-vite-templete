<script lang="ts" setup>
import { computed, reactive, ref } from "vue"
import { Link } from "@element-plus/icons-vue"
import NotifyList from "./NotifyList.vue"
import { getNotifyList, type ListItem } from "./data"

type TabName = "Inform" | "Link"
const listData = ref<Array<any>>([])
const linkList = ref<ListItem[]>([])
const informList = ref<ListItem[]>([])
const data = ref<DataItem[]>([])
interface DataItem {
  name: TabName
  type: "primary" | "success" | "warning" | "danger" | "info"
  list: ListItem[]
}
const initialData = (type: number) => {
  return reactive({
    type: type,
    title: "",
    status: 1,
    startType: "Before",
    startTime: new Date(),
    endType: "After",
    endTime: new Date()
  })
}
const linkData = initialData(1)
const informData = initialData(2)

const processData = async (cardData: any, targetList: any) => {
  const res = await getNotifyList(cardData)
  listData.value = res.data
  targetList.value = listData.value.map((item) => ({
    type: item.data.type,
    icon: item.data.icon,
    title: item.data.title,
    startTime: item.data.startTime,
    content: item.data.content,
    status: item.data.status,
    onClick: () => {}
  }))
}

const _messageData = async () => {
  await processData(linkData, linkList)
  await processData(informData, informList)

  data.value = [
    {
      name: "Link",
      type: "danger",
      list: linkList.value
    },
    {
      name: "Inform",
      type: "primary",
      list: informList.value
    }
  ]
}

/** 角标当前值 */
const badgeValue = computed(() => {
  return data.value.reduce((sum, item) => sum + item.list.length, 0)
})
/** 角标最大值 */
const badgeMax = 99
/** 面板宽度 */
const popoverWidth = 350
/** 当前 Tab */
const activeName = ref<TabName>("Link")
// messageData()
</script>

<template>
  <div class="notify">
    <el-popover placement="bottom" :width="popoverWidth" trigger="click">
      <template #reference>
        <el-badge :value="badgeValue" :max="badgeMax" :hidden="badgeValue === 0">
          <el-tooltip effect="dark" content="Announcement" placement="bottom">
            <el-icon :size="20">
              <Link />
            </el-icon>
          </el-tooltip>
        </el-badge>
      </template>
      <template #default>
        <el-tabs v-model="activeName" class="demo-tabs" stretch>
          <el-tab-pane v-for="(item, index) in data" :name="item.name" :key="index">
            <template #label>
              {{ item.name }}
              <el-badge :value="item.list.length" :max="badgeMax" :type="item.type" />
            </template>
            <el-scrollbar height="400px">
              <NotifyList :list="item.list" />
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.notify {
  margin-right: 10px;
  color: var(--el-text-color-regular);
}
</style>
