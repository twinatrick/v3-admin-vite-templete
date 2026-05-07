import { reactive } from "vue"
import { api } from "@/api/client"
import { SkillSearchQuery, SkillVo, SkillLevelVo } from "@/api/generated/Api"
import { resolveErrorMessage } from "@/utils"

class Data {
  skills: SkillVo[]
  page: number
  size: number
  totalElements: number
  sortBy: string
  sortDir: "asc" | "desc"
  filters: Omit<SkillSearchQuery, "page" | "size" | "sortBy" | "sortDir" | "normalizedSortDir" | "validSortDir">

  constructor() {
    this.skills = []
    this.page = 0
    this.size = 20
    this.totalElements = 0
    this.sortBy = "createdTime"
    this.sortDir = "desc"
    this.filters = {
      name: "",
      description: "",
      createdBy: ""
    }
  }
}

function createService() {
  const data = reactive<Data>(new Data())

  async function querySkill(payload?: Partial<SkillSearchQuery>) {
    if (payload?.page !== undefined) data.page = payload.page
    if (payload?.size !== undefined) data.size = payload.size
    if (payload?.sortBy !== undefined) data.sortBy = payload.sortBy
    if (payload?.sortDir !== undefined && (payload.sortDir === "asc" || payload.sortDir === "desc")) {
      data.sortDir = payload.sortDir
    }
    if (payload?.name !== undefined) data.filters.name = payload.name
    if (payload?.description !== undefined) data.filters.description = payload.description
    if (payload?.createdBy !== undefined) data.filters.createdBy = payload.createdBy

    const res = await api.skills.searchSkills({
      page: data.page,
      size: data.size,
      sortBy: data.sortBy,
      sortDir: data.sortDir,
      ...data.filters
    })

    const pageResult = res.data || {}
    data.skills = pageResult.content || []
    data.totalElements = pageResult.totalElements || 0
    data.page = pageResult.currentPage ?? data.page
    data.size = pageResult.pageSize ?? data.size
  }

  async function saveSkill(skillVO: SkillVo) {
    let result: SkillVo | undefined
    if (skillVO.id) {
      // 更新
      const res = await api.skills.updateSkill(skillVO)
      if (res.code !== 200) throw new Error(resolveErrorMessage(res, "更新技能失敗"))
      result = res.data
    } else {
      // 創建
      const res = await api.skills.addSkill(skillVO)
      if (res.code !== 200) throw new Error(resolveErrorMessage(res, "創建技能失敗"))
      result = res.data
    }
    await querySkill()
    return result
  }

  async function deleteSkill(skillVO: SkillVo) {
    const res = await api.skills.deleteSkill(skillVO)
    if (res.code !== 200) throw new Error(resolveErrorMessage(res, "刪除技能失敗"))
    await querySkill()
  }

  async function getSkillLevels(skillId: string) {
    const res = await api.skills.getSkillLevels(skillId)
    return res.data || []
  }

  async function saveSkillLevel(levelVO: SkillLevelVo) {
    if (levelVO.id) {
      // 更新
      const res = await api.skills.updateSkillLevel(levelVO)
      if (res.code !== 200) throw new Error(resolveErrorMessage(res, "更新技能等級失敗"))
    } else {
      // 創建
      const res = await api.skills.addSkillLevel(levelVO)
      if (res.code !== 200) throw new Error(resolveErrorMessage(res, "創建技能等級失敗"))
    }
  }

  async function deleteSkillLevel(levelVO: SkillLevelVo) {
    const res = await api.skills.deleteSkillLevel(levelVO)
    if (res.code !== 200) throw new Error(resolveErrorMessage(res, "刪除技能等級失敗"))
  }

  return {
    data,
    querySkill,
    saveSkill,
    deleteSkill,
    getSkillLevels,
    saveSkillLevel,
    deleteSkillLevel
  }
}

const service = createService()
export default service
