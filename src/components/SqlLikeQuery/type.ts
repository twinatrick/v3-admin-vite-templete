import { VxeColumnPropTypes } from "vxe-table"

export type QueryInput = {
  tableName: string
  columnName: string
  operator: string
  condition: string
  displayName: string
  fieldName: string
  columnConfig: ColumnConfig | null
}

export type ColumnConfig = {
  key?: string
  mainKey?: string
  sequence?: number
  fieldName: string
  displayName: string
  filterType: string
  editable?: boolean
  sortable?: boolean
  fixed?: VxeColumnPropTypes.Fixed
  columnWidth?: string
  formatter?: string
  dbTableName: string
  dbTableColumn: string
}
