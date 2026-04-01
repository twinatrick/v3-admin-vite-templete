<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getFunction, saveAllFunction } from "@/api/function"
import { AllowDropType } from "element-plus/es/components/tree/src/tree.type"
import { Delete, Edit } from "@element-plus/icons-vue"
import type Node from "element-plus/es/components/tree/src/model/node"
import CreateDialog from "./component/CreateDialog/index.vue"
import { ElTree } from "element-plus"
import { getUserInfoApi } from "@/api/users"
import { useRouter } from "vue-router"
import { TreeData, FunctionVo, treeDefaultProps } from "@/api/function/type"
import { waitUntil } from "@/utils"

//data
const router = useRouter()
const treeRef = ref<InstanceType<typeof ElTree> | null>(null)
const isloading = ref(true)
const tableData = ref<Array<FunctionVo>>([])
const treeData = ref<Array<TreeData>>([])
const createDialog = ref<InstanceType<typeof CreateDialog> | null>(null)
//functions
const loadingStart = async () => {
  isloading.value = true
}
const loadingEnd = async () => {
  isloading.value = false
}
const createBtnClick = () => {
  createDialog.value?.show()
}

//api
const queryData = async () => {
  try {
    await loadingStart()
    const res = await getFunction()
    tableData.value = res.data
    treeData.value = TransData(res.data)
    console.log(treeData.value)
    console.log(tableData.value)
  } finally {
    await loadingEnd()
  }
}

const SaveAll = async () => {
  tableData.value = []
  try {
    await loadingStart()
    tableData.value = TransDataReturn(treeData.value)
    const deleteData = tableData.value.filter((item) => {
      return item.disabled
    })
    const saveMainFunction = tableData.value.filter((item) => {
      return !item.disabled && !(item.type == 3 && item.parent == "" && item.newAdd)
    })
    const saveFunctionNewChild = tableData.value.filter((item) => {
      return !item.disabled && item.type == 3 && item.parent == "" && item.newAdd
    })
    const res = await saveAllFunction({
      deleteFunction: JSON.parse(JSON.stringify(deleteData)),
      saveMainFunction: JSON.parse(JSON.stringify(saveMainFunction)),
      saveFunctionNewChild: JSON.parse(JSON.stringify(saveFunctionNewChild))
    })
    treeData.value = TransData(res.data)
  } catch (e) {
    console.error(e)
  } finally {
    await loadingEnd()
  }
}

function TreeDataTransChild(tempData: TreeData[]) {
  tempData.forEach((item) => {
    tempData.forEach((child) => {
      if (child.parent === item.id) {
        child.parentTree = item
        item.children?.push(child)
      }
    })
  })
  return tempData
}

const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  return type !== "inner" && draggingNode.data.parent === dropNode.data.parent
}

function TransData(data: FunctionVo[]) {
  let tempData = [] as TreeData[]
  data.forEach((item) => {
    const treeItem: TreeData = {
      id: item.id,
      name: item.name,
      parent: item.parent || "",
      children: [],
      disabled: item.disabled || false,
      type: item.type,
      newAdd: item.newAdd || false,
      delete: item.delete || false,
      edit: item.edit || false,
      newName: item.newName || "",
      grandParentId: item.grandParentId || "",
      parentName: item.parentName || ""
    }
    tempData.push(treeItem)
  })
  console.log(tempData)
  tempData = TreeDataTransChild(tempData)
  tempData = filter(tempData)
  return tempData
}

function filter(tempData: TreeData[]) {
  tempData = tempData.filter((item) => {
    return item.parent === ""
  })
  return tempData
}

const append = (add: string, data: TreeData, node: any) => {
  const newChild = {
    edit: true,
    parent: data.id,
    children: [],
    name: add,
    parentTree: data,
    newAdd: true,
    type: data.type != undefined ? data.type + 1 : 0,
    grandParentId: data.parent,
    parentName: data.name
  } as TreeData
  if (data.children === undefined) {
    data.children = []
  }
  data.children.push(newChild)
  node.expanded = true
  event?.stopImmediatePropagation()
}
const editLeaf = (data: TreeData) => {
  if (data.edit) {
    if (data.newName !== "") {
      if (data.parentTree != undefined) {
        const map = new Map()
        data.parentTree.children?.forEach((item) => {
          map.set(item.name, 1)
        })
        if (map.get(data.newName) != undefined && !(data.newName == data.name)) {
          event?.stopImmediatePropagation()
          return
        }
      }
      data.name = data.newName
    } else if (data.newName == "" && data.name == "") {
      data.delete = true
      treeRef.value!.filter("")
    } else {
      event?.stopImmediatePropagation()
      return
    }
    data.newName = ""
  } else {
    data.newName = data.name
  }
  data.edit = !data.edit
  event?.stopImmediatePropagation()
}

function filterNode(_value: any, data: TreeData) {
  return !data.delete || false
}

//init
const initPage = async () => {
  await loadingStart()
  await queryData()
  await loadingEnd()
}

function TransDataReturn(Val: TreeData[]) {
  console.log(Val)
  let i = 0
  const result: FunctionVo[] = []
  Val.forEach((item) => {
    const functionVo: FunctionVo = {
      id: item.id,
      name: item.name || "",
      parent: item.parent || "",
      disabled: item.disabled,
      type: 1,
      newAdd: item.newAdd,
      delete: item.delete,
      edit: item.edit,
      newName: item.newName,
      grandParentId: item.grandParentId || "",
      parentName: item.parentName || "",
      sort: i
    }
    i++
    if (!(functionVo.delete && functionVo.newAdd)) {
      result.push(functionVo)
    }
    const tempMap = new Map()
    item.children?.forEach((child) => {
      const functionVo: FunctionVo = {
        id: child.id,
        name: child.name || "",
        parent: item.id || "",
        disabled: child.disabled,
        type: 2,
        newAdd: child.newAdd,
        delete: child.delete,
        edit: child.edit,
        newName: child.newName,
        grandParentId: child.grandParentId || "",
        parentName: item.name || "",
        sort: i
      }
      functionVo.parentName = item.name
      if (tempMap.get(functionVo.name) != undefined) functionVo.disabled = true
      else tempMap.set(functionVo.name, true)
      i++
      if (!(functionVo.delete && functionVo.newAdd)) {
        result.push(functionVo)
      }

      const tempMap2 = new Map()
      child.children?.forEach((grandChild) => {
        const functionVo: FunctionVo = {
          id: grandChild.id,
          name: grandChild.name || "",
          parent: child.id || "",
          disabled: grandChild.disabled,
          type: 3,
          newAdd: grandChild.newAdd,
          delete: grandChild.delete,
          edit: grandChild.edit,
          newName: grandChild.newName,
          grandParentId: item.id || "",
          parentName: child.name || "",
          sort: i
        }
        if (tempMap2.get(functionVo.name) != undefined) functionVo.disabled = true
        else tempMap2.set(functionVo.name, true)
        i++
        if (!(functionVo.delete && functionVo.newAdd)) {
          result.push(functionVo)
        }
      })
    })
  })
  console.log(result)
  return result
}

function DisableFromParentTree(data: TreeData) {
  if (data.parentTree == undefined) {
    return
  } else {
    data.parentTree.disabled = false
    DisableFromParentTree(data.parentTree)
  }
}

function statusChange(data: TreeData) {
  event?.stopPropagation()
  data.disabled = !data.disabled
  if (data.newAdd && data.disabled) {
    data.delete = true
  }
  if (data.disabled) {
    setChildDisable(data)
  } else {
    DisableFromParentTree(data)
  }
  treeRef.value!.filter("")
}

function setChildDisable(data: TreeData) {
  if (data.children === undefined) {
    return
  } else {
    data.children.forEach((item) => {
      if (item.newAdd) {
        item.delete = true
      }
      item.disabled = true
      if (item.type != 3) {
        setChildDisable(item)
      }
    })
  }
}

onMounted(async () => {
  const user = await getUserInfoApi()
  const useremail = user.data.email || ""
  if (useremail.includes("@google.com")) {
    await router.push({
      name: "Home:View"
    })
  }
  await initPage()
  await waitUntil(() => treeRef.value !== null)
})
</script>
<style lang="scss">
#func-tree {
  border-left: var(--el-border);
  border-right: var(--el-border);
  border-bottom: var(--el-border);
  border-radius: var(--el-border-radius-base);

  .el-tree-node {
    --el-tree-node-content-height: 40px;
    border-top: var(--el-border);
    box-sizing: border-box;

    .el-tree-node__content {
      .custom-tree-node {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
<template>
  <div class="app-container">
    <el-form>
      <el-form-item>
        <el-button icon="Plus" type="primary" :disabled="isloading" @click="createBtnClick">Create</el-button>
        <el-button icon="Refresh" type="info" :disabled="isloading" @click="queryData">Reload</el-button>
        <el-button icon="Refresh" type="info" :disabled="isloading" @click="SaveAll">Save</el-button>
      </el-form-item>
    </el-form>
    <el-tree
      v-loading="isloading"
      id="func-tree"
      ref="treeRef"
      style=""
      :data="treeData"
      node-key="id"
      :props="treeDefaultProps"
      draggable
      accordion
      :filter-node-method="filterNode"
      :allow-drop="allowDrop"
      :render-after-expand="false"
    >
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <span
            v-show="!data.edit"
            :style="
              (data.newAdd ? 'color: green;' : '') +
              (data.disabled ? 'color: red;' : '') +
              'font-size:20px;' +
              'padding-right:10px;'
            "
          >
            {{ node.label }}
          </span>
          <el-input
            v-show="data.edit"
            style="width: 30%"
            :placeholder="data.name"
            v-model="data.newName"
            class="pr-10px"
            clearable
          />
          <div class="w-200px flex flex-justify-end">
            <el-button
              plain
              type="success"
              icon="Plus"
              text
              circle
              v-show="data.type != 3"
              @click="append(data.newName, data, node)"
            />
            <el-button plain type="warning" icon="Edit" text circle @click="editLeaf(data)" />
            <el-button
              v-show="data.disabled"
              plain
              type="primary"
              :icon="Edit"
              text
              circle
              @click="statusChange(data)"
            />
            <el-button
              v-show="!data.disabled"
              plain
              type="danger"
              :icon="Delete"
              text
              circle
              @click="statusChange(data)"
            />
          </div>
        </div>
      </template>
    </el-tree>
    <CreateDialog ref="createDialog" :data="tableData" @confirm="queryData" />
  </div>
</template>
