import { UserVo } from "@/api/generated/Api"
import { userCreateRules, userEditRules } from "./rules"
export class UserVOFormData {
  private _data: UserVo = {}
  static CreateRules = userCreateRules
  static EditRules = userEditRules
  constructor(vo?: UserVo) {
    this.reset()
    if (vo) this._data = vo
  }
  reset() {
    this._data = {
      id: "",
      roleArr: [],
      email: "",
      name: "",
      password: "",
      disabled: false
    }
  }
  get data() {
    return this._data
  }
  set data(value: UserVo) {
    this.reset()
    this._data = { ...value }
  }
  set id(value: string) {
    this._data.id = value
  }
  get roles() {
    return this._data.roleArr
  }
  set roles(value) {
    this._data.roleArr = value
  }
  get email() {
    return this._data.email
  }
  set email(value) {
    this._data.email = value
  }
  get name() {
    return this._data.name
  }
  set name(value) {
    this._data.name = value
  }
  get password() {
    return this._data.password
  }
  set password(value) {
    this._data.password = value
  }
  get disabled() {
    return this._data.disabled
  }
  set disabled(value) {
    this._data.disabled = value
  }
}
