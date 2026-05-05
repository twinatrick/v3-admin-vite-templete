export type TreeData = {
  id?: string
  parent?: string
  name?: string
  type?: number
  sort?: number
  children?: TreeData[]
  parentTree?: TreeData
  disabled?: boolean
  edit?: boolean
  newAdd?: boolean
  newName?: string
  delete?: boolean
  grandParentId?: string
  parentName?: string
}
