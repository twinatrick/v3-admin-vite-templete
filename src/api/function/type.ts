export type Function = {
  id?: string
  parent?: string
  name?: string
  type?: number
  sort?: number
}
export type FunctionVo = {
  id?: string
  parent?: string
  name?: string
  type?: number
  sort?: number
  parentName?: string
  grandParentId?: string
  disabled?: boolean
  edit?: boolean
  newAdd?: boolean
  newName?: string
  delete?: boolean
}
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

export const treeDefaultProps: Object = {
  children: "children",
  label: (data: TreeData) => {
    return data.name
  }
}

export type FunctionTransVo = {
  deleteFunction: FunctionVo[]
  saveMainFunction: FunctionVo[]
  saveFunctionNewChild: FunctionVo[]
}
