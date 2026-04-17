export interface ListItem {
  key?: string
  sendTo?: string
  title?: string
  createTime?: Date
  content?: string
  carrier?: string
  onClick?: () => void
}
