<script lang="ts" setup>
import { ref, computed, onMounted } from "vue"
// import { ElMessage } from "element-plus"
import { Bell } from "@element-plus/icons-vue"
import NotifyList from "./NotifyList.vue"
import { type ListItem, querySysMsg } from "./data"
import { getAllTestCycleList } from "@/api/testRequest"
import { setSysMsgFilter } from "@/utils/cache/local-storage"
// import{ todoData } from "./data"
type TabName = "通知" | "消息" | "待办" | "Notify" | "Link"

interface DataItem {
  name: TabName
  type: "primary" | "success" | "warning" | "danger" | "info"
  list: ListItem[]
}
const data = ref<Array<DataItem>>([])
const checkList = ref<Array<any>>([])
const carrierList = ref<Array<any>>([])
const sysMsgList = ref<Array<ListItem>>([])
const filterSysMsgList = computed(() => {
  return sysMsgList.value.filter((sysMsg) => {
    const checkListWithSpace = checkList.value.concat("").concat(null)
    return checkListWithSpace.includes(sysMsg.carrier)
  })
})
const filterVisible = ref(false)
const getSysMsg = () => {
  querySysMsg().then((res) => {
    sysMsgList.value = res.data
    data.value = [
      {
        name: "Notify",
        type: "primary",
        list: res.data
      }
    ]
  })
}
const _getCarrierList = () => {
  getAllTestCycleList().then((res) => {
    carrierList.value = res.data.carrierList
  })
}
const filterToggle = () => {
  filterVisible.value = !filterVisible.value
}

/** 角标当前值 */
const badgeValue = computed(() => {
  return filterSysMsgList.value.length
})
/** 角标最大值 */
const badgeMax = 99
/** 面板宽度 */
const popoverWidth = 350
/** 当前 Tab */
const activeName = ref<TabName>("Notify")
onMounted(() => {
  // getSysMsg()
  // getCarrierList()
  // const sysMsgFilterList: any = getSysMsgFilter()
  // checkList.value = sysMsgFilterList ?? "[]"
})
</script>

<template>
  <div class="notify">
    <el-popover placement="bottom" :width="popoverWidth" trigger="click">
      <template #reference>
        <el-badge :value="badgeValue" :max="badgeMax" :hidden="badgeValue === 0">
          <el-tooltip effect="dark" content="Notify" placement="bottom">
            <el-icon :size="20">
              <Bell />
            </el-icon>
          </el-tooltip>
        </el-badge>
      </template>
      <template #default>
        <el-tabs v-model="activeName" class="demo-tabs" stretch>
          <el-tab-pane v-for="(item, index) in data" :name="item.name" :key="index">
            <template #label>
              {{ item.name }}
              <el-badge :value="filterSysMsgList.length" :max="badgeMax" :type="item.type" />
            </template>
            <el-scrollbar height="400px">
              <NotifyList :list="filterSysMsgList" />
            </el-scrollbar>
            <el-button style="width: 84%" class="resetButton" type="primary" icon="Refresh" @click="getSysMsg"
              >Refresh</el-button
            >
            <el-button style="width: 12%" class="resetButton" type="warning" icon="Operation" @click="filterToggle" />
            <el-card shadow="never" style="margin-top: 7px" v-show="filterVisible">
              <el-checkbox-group v-model="checkList">
                <el-checkbox
                  style="width: calc(33% - 30px)"
                  v-for="carrier in carrierList"
                  :key="carrier.key"
                  :label="carrier.value"
                  :value="carrier.value"
                  @change="setSysMsgFilter(checkList)"
                />
              </el-checkbox-group>
            </el-card>
          </el-tab-pane>
        </el-tabs>
        <!-- <div class="notify-history">
          <el-button link @click="handleHistory">查看{{ activeName }}历史</el-button>
        </div> -->
      </template>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.notify {
  margin-right: 10px;
  color: var(--el-text-color-regular);
}
.notify-history {
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid var(--el-border-color);
}
.resetButton {
  z-index: 999;
  position: relative;
}
</style>
