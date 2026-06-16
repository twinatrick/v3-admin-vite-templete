import { UserJobLinkVo } from "@/api/generated/Api"

export interface UserJobLink {
  id?: string
  userId?: string
  userEmail?: string
  jobPostingId?: string
  jobTitle?: string
  companyName?: string
  userNotes?: string
  geminiFeedback?: string
  createdBy?: string
  updatedBy?: string
  createdTime?: string
  updatedTime?: string
}

export class UserJobLinkFormData {
  private _data: UserJobLinkVo = {}

  constructor(vo?: UserJobLinkVo) {
    this.reset()
    if (vo) this._data = vo
  }

  reset() {
    this._data = {
      id: "",
      userId: "",
      jobPostingId: "",
      userNotes: ""
    }
  }

  get data() {
    return this._data
  }
  set data(value: UserJobLinkVo) {
    this.reset()
    this._data = { ...value }
  }

  get id() {
    return this._data.id
  }
  set id(value: string | undefined) {
    this._data.id = value
  }
  get userId() {
    return this._data.userId
  }
  set userId(value: string | undefined) {
    this._data.userId = value
  }
  get jobPostingId() {
    return this._data.jobPostingId
  }
  set jobPostingId(value: string | undefined) {
    this._data.jobPostingId = value
  }
  get userNotes() {
    return this._data.userNotes
  }
  set userNotes(value: string | undefined) {
    this._data.userNotes = value
  }
}
