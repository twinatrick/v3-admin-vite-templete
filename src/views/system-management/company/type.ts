import { CompanyVo } from "@/api/generated/Api"

export interface Company {
  id?: string
  name?: string
  websites?: string[]
  description?: string
  createdBy?: string
  updatedBy?: string
  createdTime?: string
  updatedTime?: string
}

export class CompanyFormData {
  private _data: CompanyVo = {}

  constructor(vo?: CompanyVo) {
    this.reset()
    if (vo) this._data = vo
  }

  reset() {
    this._data = {
      id: "",
      name: "",
      websites: [],
      description: ""
    }
  }

  get data() {
    return this._data
  }

  set data(value: CompanyVo) {
    this.reset()
    this._data = { ...value }
  }

  get id() {
    return this._data.id
  }
  set id(value: string | undefined) {
    this._data.id = value
  }
  get name() {
    return this._data.name
  }
  set name(value: string | undefined) {
    this._data.name = value
  }
  get websites() {
    return this._data.websites || []
  }
  set websites(value: string[] | undefined) {
    this._data.websites = value
  }
  get description() {
    return this._data.description
  }
  set description(value: string | undefined) {
    this._data.description = value
  }
}
