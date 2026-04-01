import { UserVO } from "@/api/users/types/user"
import { FormRules } from "element-plus"
export class UserVOFormData {
  private _data: UserVO = {}
  static Rules: FormRules = {
    email: {
      required: true,
      message: "Please input email"
    },
    roles: {
      required: true,
      message: "Please select role",
      validator(_r, value: string[]) {
        return value.length > 0
      }
    },
    // password: {
    //   required: true,
    //   message: "Please input password",
    //   trigger: "blur"
    // },
    name: {
      required: true,
      message: "Please input name",
      trigger: "blur"
    },
    disabled: {
      required: true,
      message: "Please select status",
      trigger: "change"
    }
  }
  constructor(vo?: UserVO) {
    this.reset()
    if (vo) this._data = vo
  }
  reset() {
    this._data = {
      id: "",
      ldap: "",
      roleArr: [],
      tags: [],
      location: "",
      email: "",
      supervisor: [],
      familyName: "",
      givenName: "",
      name: "",
      password: "",
      // status: 1 // 1: active, 0: inactive

      disabled: false
    }
  }
  get data() {
    return this._data
  }
  set data(value: UserVO) {
    this.reset()
    this._data = { ...value }
  }
  set id(value: string) {
    this._data.id = value
  }
  get ldap() {
    return this._data.ldap
  }
  set ldap(value) {
    this._data.ldap = value
  }
  get roles() {
    return this._data.roleArr
  }
  set roles(value) {
    this._data.roleArr = value
  }
  get tags() {
    return this._data.tags
  }
  set tags(value) {
    this._data.tags = value
  }
  get location() {
    return this._data.location
  }
  set location(value) {
    this._data.location = value
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
  get supervisor() {
    return this._data.supervisor
  }
  set supervisor(value) {
    this._data.supervisor = value
  }
  get familyName() {
    return this._data.familyName
  }
  set familyName(value) {
    this._data.familyName = value
  }
  get givenName() {
    return this._data.givenName
  }
  set givenName(value) {
    this._data.givenName = value
  }
  // get status() {
  //   return this._data.status
  // }
  // set status(value) {
  //   this._data.status = value
  // }
  get disabled() {
    return this._data.disabled
  }
  set disabled(value) {
    this._data.disabled = value
  }
}
