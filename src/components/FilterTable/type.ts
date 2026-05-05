export type TableData<T = { [key: string]: any }> = T

export type TableColumnMap = {
  name: string //對應到的欄位屬姓名
  value: string //顯示在螢幕上的字串
  type: "string" | "select" | "date" | "number" | "hide" //查詢類型
  isEditable?: boolean
  formatter?: any
  fixed?: "left" | "right" | ""
  sortable?: boolean
  width?: string
}
