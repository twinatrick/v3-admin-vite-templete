import { reactive } from "vue"
import { api } from "@/api/client"
import { CurrentUserSkillVo, SkillLevelVo, SkillSearchQuery, SkillVo } from "@/api/generated/Api"
import { resolveErrorMessage } from "@/utils"

class Data {
  skills: CurrentUserSkillVo[]
  page: number
  size: number
  totalElements: number
  sortBy: string
  sortDir: "asc" | "desc"
  filters: Omit<
    SkillSearchQuery,
    "page" | "size" | "sortBy" | "sortDir" | "normalizedSortDir" | "validSortDir" | "createdBy"
  >

  constructor() {
    this.skills = []
    this.page = 0
    this.size = 20
    this.totalElements = 0
    this.sortBy = "createdTime"
    this.sortDir = "desc"
    this.filters = {
      name: "",
      description: ""
    }
  }
}

function buildPersonalSkillRequest(skillVO: SkillVo, levelVO?: SkillLevelVo) {
  return {
    name: skillVO.name,
    description: skillVO.description,
    skillLevelId: levelVO?.id || skillVO.skillLevelId,
    skillLevelValue: levelVO?.levelValue,
    skillLevelTitle: levelVO?.title,
    skillLevelDescription: levelVO?.description
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

    const res = await api.skills.searchCurrentUserSkills({
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

  async function saveSkill(skillVO: SkillVo, levelVO?: SkillLevelVo) {
    let result: SkillVo | undefined
    const requestData = buildPersonalSkillRequest(skillVO, levelVO)

    if (skillVO.id) {
      const res = await api.skills.updatePersonalSkill({ skillId: skillVO.id }, requestData)
      if (res.code !== 200) throw new Error(resolveErrorMessage(res, "更新技能失敗"))
    } else {
      const res = await api.skills.addPersonalSkill(requestData)
      if (res.code !== 200) throw new Error(resolveErrorMessage(res, "創建技能失敗"))
      result = res.data
    }

    await querySkill()
    if (skillVO.id && !result) {
      const found = data.skills.find((s) => s.id === skillVO.id)
      result = found ? { id: found.id, name: found.name, description: found.description } : undefined
    }
    return result
  }

  async function deleteSkill(skillVO: { id?: string }) {
    if (!skillVO.id) throw new Error("Skill ID is required")
    const res = await api.skills.deletePersonalSkill({ skillId: skillVO.id })
    if (res.code !== 200) throw new Error(resolveErrorMessage(res, "刪除技能失敗"))
    await querySkill()
  }

  async function getSkillLevels(skillId: string) {
    const res = await api.skills.getSkillLevels(skillId)
    return res.data || []
  }

  return {
    data,
    querySkill,
    saveSkill,
    deleteSkill,
    getSkillLevels
  }
}

const service = createService()
export default service
