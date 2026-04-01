interface CustomSchemaType {
  prop?: string
  label?: string
  fixed?: boolean | "left" | "right"
  width?: number
  minWidth?: number
  sortable?: boolean
  show?: boolean
  formatter?: (row: any, column: any, cellValue: any, index: number) => any
  header?: {
    show?: boolean
    icon?: string
    align?: "left" | "center" | "right"
    showOverflowTooltip?: boolean
  }
  row?: {
    align?: "left" | "center" | "right"
    showOverflowTooltip?: boolean
  }
  type?: "selection" | "index" | "expand" | "button" | "tag"
  button?: {
    text?: string
    type?: "primary" | "success" | "warning" | "danger" | "info" | "text"
    icon?: string
    size?: "default" | "small" | "large" | ""
    plain?: boolean
    round?: boolean
    circle?: boolean
    disabled?: boolean
    loading?: boolean
    loadingIcon?: string
    color?: string
    dark?: boolean
    click?: (row: any) => any
  }
  tag?: {
    hit?: boolean
    size?: "large" | "small" | "default"
    effect?: "dark" | "light" | "plain"
    round?: boolean
    data?: {
      [key: string]: {
        text?: string
        type?: "success" | "warning" | "danger" | "info"
        color?: string
      }
    }
  }
}
export type { CustomSchemaType }
