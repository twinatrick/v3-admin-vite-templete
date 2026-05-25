import { ProjectVo } from "@/api/generated/Api"
import { projectCreateRules, projectEditRules } from "./rules"

export class ProjectFormData {
  private _data: ProjectVo = {}

  static CreateRules = projectCreateRules
  static EditRules = projectEditRules

  constructor(vo?: ProjectVo) {
    this.reset()
    if (vo) this._data = vo
  }

  reset() {
    this._data = {
      id: "",
      name: "",
      description: "",
      createdBy: "",
      updatedBy: "",
      createdTime: "",
      updatedTime: ""
    }
  }

  get data() {
    return this._data
  }

  set data(value: ProjectVo) {
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
}

// Project-Skill 綁定的介面
export interface ProjectSkillBinding {
  skillId: string
  skillName: string
  skillLevelId: string
  levelTitle: string
  levelValue: number
}
