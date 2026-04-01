<script setup lang="ts">
import { PropType, ref } from "vue"
import type Node from "element-plus/es/components/tree/src/model/node"
import * as Type from "../type"
import { ElTree } from "element-plus"
import { showLoading, waitUntil } from "@/utils"
import { AllowDropType } from "element-plus/es/components/tree/src/tree.type"
import { updateFunctionOrder } from "@/views/system-management/role/api"
const prop = defineProps({
  allFunctions: {
    type: Array as PropType<Type.TreeProp[]>,
    required: true
  }
})
const visible = ref(false)
const treeRef = ref<InstanceType<typeof ElTree> | null>(null)
const _allFunctions = ref<Type.TreeProp[]>([])
const emit = defineEmits(["update"])
const show = async () => {
  visible.value = true
  _allFunctions.value = prop.allFunctions
  await waitUntil(() => treeRef.value !== null)
}
const hide = () => {
  visible.value = false
}
const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  return type !== "inner" && draggingNode.data.parent === dropNode.data.parent
}
const handleConfirmClick = async () => {
  const loading = showLoading("Update function order...")
  try {
    const orderFunction = (f: Type.Function, order: number) => {
      return {
        id: f.id,
        name: f.name,
        parent: f.parent,
        sort: order
      }
    }
    const functions = new Array<Type.Function>()
    const grandParents = _allFunctions.value.filter((item) => !item.parent)
    const parent = grandParents.map((x) => x.children)
    const children = parent.map((x) => x?.map((y) => y.children))
    const orderGrandParent = grandParents.map(orderFunction)
    const orderParent = parent.map((x) => x!.map(orderFunction)).flat()
    const orderChildren = children.map((x) => x!.map((y) => y!.map(orderFunction))).flat(2)
    functions.push(...orderGrandParent, ...orderParent, ...orderChildren)
    const { data } = await updateFunctionOrder(functions)
    emit("update", data)
    hide()
  } catch (e) {
    console.error(e)
  } finally {
    loading.close()
  }
}
defineExpose({
  show,
  hide
})
</script>

<style scoped lang="scss"></style>

<template>
  <el-dialog v-model="visible" :close-on-click-modal="false">
    <template #header> <h1>Edit Function</h1> </template>
    <el-tree
      ref="treeRef"
      :data="_allFunctions"
      :props="Type.treeDefaultProps"
      node-key="id"
      draggable
      :allow-drop="allowDrop"
    />
    <template #footer>
      <el-button @click="hide">Cancel</el-button>
      <el-button type="primary" @click="handleConfirmClick">Confirm</el-button>
    </template>
  </el-dialog>
</template>
