<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import CustomTable from "@/components/CustomTable/index.vue"
import { CustomTableOptionType } from "@/components/CustomTable/types/Option"
import { getSettingList } from "@/api/settings/index"
import EditDialog from "./components/EditDialog.vue"
import { parameterMap } from "@/api/settings/types"
import CreateDialog from "./components/CreateDialog.vue"
import DeleteDialog from "./components/DeleteDialog.vue"
const option: CustomTableOptionType = {
  realPagination: false,
  pagination: {
    layout: "total, prev, pager, next, jumper"
  },
  table: {
    highlightCurrentRow: true,
    height: "100%"
  }
}
//data
const query = ref("")
const createDialog = ref<InstanceType<typeof CreateDialog> | null>(null)
const editDialog = ref<InstanceType<typeof EditDialog> | null>(null)
const deleteDialog = ref<InstanceType<typeof DeleteDialog> | null>(null)
const currentRow = ref({})
const parameterList = ref<Array<parameterMap>>([])
const tableLoading = ref(false)
const isDev = import.meta.env.DEV
const isSelected = computed(() => Object.values(currentRow.value).length > 0)
//function
const tableData = computed(() => {
  const filter = (parameter: parameterMap) => {
    const nameIsMatch = parameter.name.toLowerCase().includes(query.value.toLowerCase())
    const valueIsMatch = parameter.values.some((value) => value.value.toLowerCase().includes(query.value.toLowerCase()))
    const noteIsMatch = parameter.note.toLowerCase().includes(query.value.toLowerCase())
    return nameIsMatch || valueIsMatch || noteIsMatch
  }
  return parameterList.value.filter(filter)
})
const getList = async () => {
  tableLoading.value = true
  const res = await getSettingList("")
  parameterList.value = res.data
  tableLoading.value = false
}
const handleRowSelect = (row: any) => {
  if (row.length === 0) currentRow.value = {}
  else currentRow.value = row[0]
}
const editBtnClick = () => {
  editDialog.value?.show()
}
const valueFormatter = (row: any) => {
  const result = []
  for (let i = 0; i < row.values.length; i++) {
    result.push(row.values[i].value)
  }
  return result.join(", ")
}
const handleCreateClick = () => {
  createDialog.value?.show()
}
const handleDeleteClick = () => {
  deleteDialog.value?.show()
}
//init
onMounted(async () => {
  await getList()
})
</script>
<template>
  <div class="app-container">
    <el-card mb-5 p-5 table :body-style="{ padding: 0 }">
      <el-form @submit.prevent>
        <el-form-item label="Search">
          <el-input
            v-model="query"
            placeholder="Please enter keyword to query something."
            clearable
            :disabled="tableLoading"
            :input-style="{ marginRight: '15px' }"
          />
        </el-form-item>
      </el-form>
    </el-card>
    <CustomTable
      flex
      flex-col
      class="h-100%"
      :data="tableData"
      :option="option"
      :total="tableData.length"
      @selected="handleRowSelect"
      v-loading="tableLoading"
    >
      <template #header>
        <el-form>
          <el-form-item>
            <el-button icon="Plus" type="primary" @click="handleCreateClick" v-show="isDev">Create</el-button>
            <el-button icon="Edit" type="warning" @click="editBtnClick" :disabled="!isSelected">Edit</el-button>
            <el-button icon="Delete" type="danger" @click="handleDeleteClick" :disabled="!isSelected" v-show="isDev"
              >Delete</el-button
            >
          </el-form-item>
        </el-form>
      </template>
      <template #body>
        <el-table-column prop="name" label="Key" width="200" />
        <el-table-column
          prop="values"
          label="Value"
          width="200"
          :formatter="valueFormatter"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="note" label="Description" />
      </template>
    </CustomTable>
    <CreateDialog ref="createDialog" @create="getList" />
    <EditDialog :data="currentRow" ref="editDialog" @update="getList" />
    <DeleteDialog :data="currentRow" ref="deleteDialog" @delete="getList" />
  </div>
</template>
