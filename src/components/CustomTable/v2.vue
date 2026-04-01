<script lang="ts">
import { ElTable } from "element-plus"
import { defineComponent } from "vue"
import { intersection, uniq, without } from "lodash-es"

const defaultPaginationProps = {
  background: true,
  layout: "total, prev, pager, next, jumper",
  hideOnSinglePage: true,
  pageSize: 100
}

export default defineComponent({
  extends: ElTable,
  props: {
    data: {
      type: Array,
      required: true
    },
    paginationProps: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // selectedRows: {} as { [x: number]: Array<any> },
      selectedRows: new Array<any>(),
      currentPage: 1,
      pageSize: this.$props.paginationProps.pageSize || defaultPaginationProps.pageSize
    }
  },
  emits: {
    select: null
  },
  computed: {
    normalizePaginationProps() {
      return {
        ...defaultPaginationProps,
        ...this.paginationProps
      }
    },
    tableData() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.data.slice(start, end)
    }
  },
  methods: {
    handleSelect(selection: any[]) {
      // selection is the selected rows in the current page
      // this.selectedRows is the selected rows in all pages
      const otherPageSelection = this.selectedRows.filter((row) => !this.tableData.includes(row))
      this.selectedRows = uniq([...otherPageSelection, ...selection])
      this.$emit("select", this.selectedRows)
    },
    handleSelectAll(selection: any[]) {
      const temp =
        selection.length === 0
          ? without(this.selectedRows, ...this.tableData)
          : uniq([...this.selectedRows, ...this.tableData])

      this.$emit("select", temp)
      this.selectedRows = temp
    },
    clearSelection() {
      this.selectedRows = []
      const tableRef = this.$refs.table as InstanceType<typeof ElTable>
      tableRef.clearSelection()
    }
  },
  watch: {
    tableData() {
      //solution: https://blog.csdn.net/weixin_43106777/article/details/129691051
      const tableRef = this.$refs.table as InstanceType<typeof ElTable>
      const selection = this.selectedRows
      if (selection.length === 0) return
      tableRef.clearSelection()
      const needSelect = intersection(selection, this.tableData)
      this.$nextTick(() => {
        needSelect.forEach((row) => {
          tableRef.toggleRowSelection(row, true)
        })
      })
    }
  },
  beforeUpdate() {
    // this.clearSelection()
  },
  expose: ["clearSelection"]
})
</script>
<style lang="scss">
.custom-table-v2 {
  .el-table-column--selection {
    padding: 0 !important;
    vertical-align: middle;
    line-height: normal;
    .cell {
      margin: 0 calc(calc(100% - 30px) / 2);
      height: 100% !important;
      padding: 0;
      .el-checkbox__inner {
        width: 30px;
        height: 30px;
        &:after {
          height: 14px;
          left: 11px;
          width: 6px;
          top: 3px;
        }
        &:before {
          height: 5px;
          top: 11px;
        }
      }
    }
  }
}
</style>
<template>
  <el-card class="custom-table-v2" body-class="flex flex-col h-100%">
    <div>
      <slot name="header" />
    </div>
    <el-table
      v-bind="$props"
      ref="table"
      :data="tableData"
      @select="handleSelect"
      @select-all="handleSelectAll"
      class="h-100%!"
    >
      <slot />
    </el-table>
    <el-pagination
      v-bind="normalizePaginationProps"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="data.length"
      class="flex-justify-center mt-3"
    />
  </el-card>
</template>
