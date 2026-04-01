export type Role = {
  key?: string
  name?: string
  function?: string
  status?: number
  description?: string
}
export type RoleVO = Role & {
  functionKeys?: string[]
}
export type Function = {
  id: string
  name: string
  parent: string
  sort?: number
}

export type TreeProp = Function & {
  children?: TreeProp[]
}

export const treeDefaultProps: Object = {
  children: "children",
  label: (data: TreeProp) => {
    return data.name
  }
}
