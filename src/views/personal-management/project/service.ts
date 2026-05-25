import { reactive } from "vue"
import { api } from "@/api/client"
import { CurrentUserSkillVo, ProjectSearchQuery, ProjectVo } from "@/api/generated/Api"
import { resolveErrorMessage } from "@/utils"

class Data {
  projects: ProjectVo[]
  page: number
  size: number
  totalElements: number
  sortBy: string
  sortDir: "asc" | "desc"
  filters: Omit<
    ProjectSearchQuery,
    "page" | "size" | "sortBy" | "sortDir" | "normalizedSortDir" | "validSortDir" | "createdBy"
  >
  allSkills: CurrentUserSkillVo[]

  constructor() {
    this.projects = []
    this.page = 0
    this.size = 20
    this.totalElements = 0
    this.sortBy = "createdTime"
    this.sortDir = "desc"
    this.filters = {
      name: "",
      description: ""
    }
    this.allSkills = []
  }
}

function createService() {
  const data = reactive<Data>(new Data())

  async function queryProject(payload?: Partial<ProjectSearchQuery>) {
    if (payload?.page !== undefined) data.page = payload.page
    if (payload?.size !== undefined) data.size = payload.size
    if (payload?.sortBy !== undefined) data.sortBy = payload.sortBy
    if (payload?.sortDir !== undefined && (payload.sortDir === "asc" || payload.sortDir === "desc")) {
      data.sortDir = payload.sortDir
    }
    if (payload?.name !== undefined) data.filters.name = payload.name
    if (payload?.description !== undefined) data.filters.description = payload.description

    const res = await api.projects.searchCurrentUserProjects({
      page: data.page,
      size: data.size,
      sortBy: data.sortBy,
      sortDir: data.sortDir,
      ...data.filters
    })

    const pageResult = res.data || {}
    data.projects = pageResult.content || []
    data.totalElements = pageResult.totalElements || 0
    data.page = pageResult.currentPage ?? data.page
    data.size = pageResult.pageSize ?? data.size
  }

  async function saveProject(projectVO: ProjectVo) {
    let result: ProjectVo | undefined
    if (projectVO.id) {
      const res = await api.projects.updatePersonalProject(projectVO.id, {
        name: projectVO.name,
        description: projectVO.description
      })
      if (res.code !== 200) throw new Error(resolveErrorMessage(res, "更新項目失敗"))
    } else {
      const res = await api.projects.addPersonalProject({
        name: projectVO.name,
        description: projectVO.description
      })
      if (res.code !== 200) throw new Error(resolveErrorMessage(res, "創建項目失敗"))
      result = res.data
    }

    await queryProject()
    if (projectVO.id && !result) {
      result = data.projects.find((p) => p.id === projectVO.id)
    }
    return result
  }

  async function deleteProject(projectVO: ProjectVo) {
    if (!projectVO.id) throw new Error("Project ID is required")
    const res = await api.projects.deletePersonalProject(projectVO.id)
    if (res.code !== 200) throw new Error(resolveErrorMessage(res, "刪除項目失敗"))
    await queryProject()
  }

  async function getAllSkills() {
    const res = await api.skills.searchCurrentUserSkills({
      page: 0,
      size: 1000,
      sortBy: "name",
      sortDir: "asc"
    })
    const pageResult = res.data || {}
    data.allSkills = pageResult.content || []
    return data.allSkills
  }

  async function getSkillLevels(skillId: string) {
    const res = await api.skills.getSkillLevels(skillId)
    return res.data || []
  }

  async function getProjectSkills(projectId: string) {
    const res = await api.projects.getPersonalProjectSkills(projectId)
    return res.data || []
  }

  async function bindSkillToProject(projectId: string, skillId: string, skillLevelId: string) {
    const res = await api.projects.bindPersonalProjectSkill(projectId, {
      skillId,
      skillLevelId
    })
    if (res.code !== 200) throw new Error(resolveErrorMessage(res, "綁定技能失敗"))
  }

  async function updateProjectSkillLevel(projectId: string, skillId: string, skillLevelId: string) {
    const res = await api.projects.updatePersonalProjectSkillLevel(projectId, skillId, {
      skillLevelId
    })
    if (res.code !== 200) throw new Error(resolveErrorMessage(res, "更新技能等級失敗"))
  }

  async function unbindSkillFromProject(projectId: string, skillId: string) {
    const res = await api.projects.unbindPersonalProjectSkill(projectId, skillId)
    if (res.code !== 200) throw new Error(resolveErrorMessage(res, "解除綁定失敗"))
  }

  return {
    data,
    queryProject,
    saveProject,
    deleteProject,
    getAllSkills,
    getSkillLevels,
    getProjectSkills,
    bindSkillToProject,
    updateProjectSkillLevel,
    unbindSkillFromProject
  }
}

const service = createService()
export default service
