<script lang="ts" setup>
import { computed, onMounted, ref } from "vue"
import CreateDialog from "./create-dialog/index.vue"
import EditDialog from "./edit-dialog/index.vue"
import { UserVO } from "@/api/users/types/user"
import DeleteDialog from "./delete-dialog/index.vue"
import { showLoading } from "@/utils"
import service from "./service"
import DataTable from "./data-table/index.vue"
//data

//等待双極
const selectedRow = ref<UserVO>({})
const createDialogRef = ref<InstanceType<typeof CreateDialog> | null>(null)
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)
const deleteDialogRef = ref<InstanceType<typeof DeleteDialog> | null>(null)
//functions
const isSelected = computed(() => Object.values(selectedRow.value).length > 0)
const createBtnClick = () => {
  createDialogRef.value?.show()
}
const deleteBtnClick = () => {
  deleteDialogRef.value?.show(selectedRow.value)
}
const init = async () => {
  const loading = showLoading("Initializing...", "#user-page")
  try {
    await service.initialize()
  } catch (e) {
    console.error(e)
  } finally {
    loading.close()
  }
}

const onRowDbClick = (row: UserVO) => {
  // const row = scope.row as UserVO
  editDialogRef.value?.show(row)
}
const onRowSelect = (rows: UserVO) => {
  selectedRow.value = rows
}
//init
onMounted(() => {
  init()
})
</script>
<template>
  <div class="app-container" id="user-page">
    <data-table @row-dbclick="onRowDbClick" @row-click="onRowSelect">
      <template #header>
        <el-button icon="Plus" type="primary" @click="createBtnClick">Create</el-button>
        <el-button icon="Delete" type="danger" :disabled="!isSelected" @click="deleteBtnClick"> Delete </el-button>
      </template>
    </data-table>
    <CreateDialog ref="createDialogRef" @reload="init" />
    <EditDialog ref="editDialogRef" @reload="init" />
    <DeleteDialog ref="deleteDialogRef" />
  </div>
</template>
