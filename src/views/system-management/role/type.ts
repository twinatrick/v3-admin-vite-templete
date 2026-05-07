import { RoleOutVo, FunctionVo } from "@/api/generated/Api"
import { roleCreateRules, roleEditRules } from "./rules"

export type { FunctionVo }

export type Role = RoleOutVo & {}

export type RoleVO = RoleOutVo & {
  functionKeys?: string[]
}

export type TreeProp = FunctionVo & {
  children?: TreeProp[]
}

export class RoleFormData {
  private _data: RoleVO = {}

  static CreateRules = roleCreateRules
  static EditRules = roleEditRules

  constructor(vo?: RoleVO) {
    this.reset()
    if (vo) this._data = vo
  }

  reset() {
    this._data = {
      id: "",
      name: "",
      description: "",
      functionKeys: [],
      createdBy: "",
      updatedBy: "",
      createdTime: "",
      updatedTime: ""
    }
  }

  get data() {
    return this._data
  }

  set data(value: RoleVO) {
    this.reset()
    this._data = { ...value }
  }

  get id() {
    return this._data.id
  }

  set id(value) {
    this._data.id = value
  }

  get name() {
    return this._data.name
  }

  set name(value) {
    this._data.name = value
  }

  get description() {
    return this._data.description
  }

  set description(value) {
    this._data.description = value
  }

  get functionKeys() {
    return this._data.functionKeys
  }

  set functionKeys(value) {
    this._data.functionKeys = value
  }
}

export const treeDefaultProps: Object = {
  children: "children",
  label: (data: TreeProp) => {
    return data.name
  }
}
