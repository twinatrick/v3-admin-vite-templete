import { CSSProperties } from "vue"

interface CustomTableOptionType {
  realPagination?: boolean
  table?: {
    height?: number | string
    maxHeight?: number | string
    stripe?: boolean
    border?: boolean
    size?: "large" | "small" | "default" | ""
    fit?: boolean
    showHeader?: boolean
    highlightCurrentRow?: boolean
    rowKey?: string | ((row: any) => any)
    rowStyle?: (data: { row: any; rowIndex: number }) => CSSProperties
  }
  pagination?: {
    pageSize?: number
    small?: boolean
    background?: boolean
    layout?: string
    hideOnSinglePage?: boolean
    disabled?: boolean
    maxPageCount?: number
  }
}

export type { CustomTableOptionType }
