<script lang="ts">
import { waitUntil } from "@/utils"
import { ElTable } from "element-plus"
import Sortable from "sortablejs"

type SortableEndEvent = {
  to: HTMLElement
  from: HTMLElement
  item: HTMLElement
  clone: HTMLElement
  oldIndex: number
  newIndex: number
  oldDraggableIndex: number
  newDraggableIndex: number
  pullMode: boolean | "clone"
}

export default {
  extends: ElTable,
  components: {
    ElTable
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    rowKey: {
      type: String,
      required: true
    }
  },
  emits: ["update:data"],
  computed: {
    _data: {
      get() {
        return this.data
      },
      set(value: any) {
        this.$emit("update:data", value)
      }
    },
    otherSlots() {
      console.log(this.$slots)
      return Object.entries(this.$slots)
        .filter(([name]) => name !== "default")
        .reduce((acc, [name, slot]) => {
          acc[name] = slot
          return acc
        }, {} as Record<string, any>)
    }
  },
  data() {
    return {
      sortable: undefined as InstanceType<typeof Sortable> | undefined,
      // TODO: 1. selection
      selectedRow: [] as any[]
    }
  },
  methods: {
    async setDraggable() {
      await waitUntil(() => Boolean(this.$refs.table))
      const tableElement = (this.$refs.table as any).$el as HTMLElement
      const tbody = tableElement.querySelector(".el-table__body-wrapper tbody")
      const sortable = Sortable.create(tbody, {
        animation: 150,
        handle: ".drag-handler",
        onEnd: (event: SortableEndEvent) => {
          if (event.oldIndex === event.newIndex) return
          const tempData = Object.assign([], this._data)
          const temp = this._data[event.oldIndex]
          tempData.splice(event.oldIndex, 1)
          tempData.splice(event.newIndex, 0, temp)
          this._data = tempData
        }
      })
      this.sortable = sortable
    }
  },
  mounted() {
    this.setDraggable()
  }
}
</script>

<template>
  <el-table v-bind="$attrs" :row-key="rowKey" :data="_data" ref="table">
    <template #default>
      <el-table-column class-name="drag-handler" width="40px">
        <el-icon><Rank /></el-icon>
      </el-table-column>
      <slot name="default" />
    </template>
    <template v-for="(_, name) in otherSlots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </el-table>
</template>
