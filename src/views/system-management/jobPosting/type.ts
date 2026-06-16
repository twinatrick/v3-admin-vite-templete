import { JobPostingVo } from "@/api/generated/Api"

export interface JobPosting {
  id?: string
  companyId?: string
  companyName?: string
  title?: string
  url?: string
  description?: string
  requirements?: string
  responsibilities?: string
  salaryRange?: string
  postedDate?: string
  geminiAnalysis?: string
  createdBy?: string
  updatedBy?: string
  createdTime?: string
  updatedTime?: string
}

export class JobPostingFormData {
  private _data: JobPostingVo = {}

  constructor(vo?: JobPostingVo) {
    this.reset()
    if (vo) this._data = vo
  }

  reset() {
    this._data = {
      id: "",
      companyId: "",
      title: "",
      url: "",
      description: "",
      requirements: "",
      responsibilities: "",
      salaryRange: "",
      postedDate: ""
    }
  }

  get data() {
    return this._data
  }
  set data(value: JobPostingVo) {
    this.reset()
    this._data = { ...value }
  }

  get id() {
    return this._data.id
  }
  set id(value: string | undefined) {
    this._data.id = value
  }
  get companyId() {
    return this._data.companyId
  }
  set companyId(value: string | undefined) {
    this._data.companyId = value
  }
  get title() {
    return this._data.title
  }
  set title(value: string | undefined) {
    this._data.title = value
  }
  get url() {
    return this._data.url
  }
  set url(value: string | undefined) {
    this._data.url = value
  }
  get description() {
    return this._data.description
  }
  set description(value: string | undefined) {
    this._data.description = value
  }
  get requirements() {
    return this._data.requirements
  }
  set requirements(value: string | undefined) {
    this._data.requirements = value
  }
  get responsibilities() {
    return this._data.responsibilities
  }
  set responsibilities(value: string | undefined) {
    this._data.responsibilities = value
  }
  get salaryRange() {
    return this._data.salaryRange
  }
  set salaryRange(value: string | undefined) {
    this._data.salaryRange = value
  }
  get postedDate() {
    return this._data.postedDate
  }
  set postedDate(value: string | undefined) {
    this._data.postedDate = value
  }
}
