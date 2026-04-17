import { RoleOutVo, FunctionVo } from "@/api/generated/Api"

export type { FunctionVo }

export type Role = RoleOutVo & {}

export type RoleVO = RoleOutVo & {
  functionKeys?: string[]
}

export type TreeProp = FunctionVo & {
  children?: TreeProp[]
}

export const treeDefaultProps: Object = {
  children: "children",
  label: (data: TreeProp) => {
    return data.name
  }
}
