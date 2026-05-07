import { SkillVo, SkillLevelVo } from "@/api/generated/Api"
import { skillCreateRules, skillEditRules, skillLevelCreateRules, skillLevelEditRules } from "./rules"

export class SkillFormData {
  private _data: SkillVo = {}

  static CreateRules = skillCreateRules
  static EditRules = skillEditRules

  constructor(vo?: SkillVo) {
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

  set data(value: SkillVo) {
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

export class SkillLevelFormData {
  private _data: SkillLevelVo = {}

  static CreateRules = skillLevelCreateRules
  static EditRules = skillLevelEditRules

  constructor(vo?: SkillLevelVo) {
    this.reset()
    if (vo) this._data = vo
  }

  reset() {
    this._data = {
      id: "",
      skillId: "",
      levelValue: undefined,
      title: "",
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

  set data(value: SkillLevelVo) {
    this.reset()
    this._data = { ...value }
  }

  get id() {
    return this._data.id
  }

  set id(value) {
    this._data.id = value
  }

  get skillId() {
    return this._data.skillId
  }

  set skillId(value) {
    this._data.skillId = value
  }

  get levelValue() {
    return this._data.levelValue
  }

  set levelValue(value) {
    this._data.levelValue = value
  }

  get title() {
    return this._data.title
  }

  set title(value) {
    this._data.title = value
  }

  get description() {
    return this._data.description
  }

  set description(value) {
    this._data.description = value
  }
}
