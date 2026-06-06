import { reactive } from "vue"
import { api } from "@/api/client"
import {
  MemberSkillBindings,
  ProjectSearchQuery,
  ProjectVo,
  SkillLevelBindingItem,
  SkillVo,
  UserVo
} from "@/api/generated/Api"
import { resolveErrorMessage } from "@/utils"

class Data {
  projects: ProjectVo[]
  page: number
  size: number
  totalElements: number
  sortBy: string
  sortDir: "asc" | "desc"
  filters: Omit<ProjectSearchQuery, "page" | "size" | "sortBy" | "sortDir" | "normalizedSortDir" | "validSortDir">
  allSkills: SkillVo[]
  allUsers: UserVo[]

  constructor() {
    this.projects = []
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
    this.allSkills = []
    this.allUsers = []
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
    if (payload?.createdBy !== undefined) data.filters.createdBy = payload.createdBy

    const res = await api.projects.searchProjects({
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
      // 更新
      const res = await api.projects.updateProject(projectVO)
      if (res.code !== 200) throw new Error(resolveErrorMessage(res, "更新項目失敗"))
      result = res.data
    } else {
      // 創建
      const res = await api.projects.addProject(projectVO)
      if (res.code !== 200) throw new Error(resolveErrorMessage(res, "創建項目失敗"))
      result = res.data
    }
    await queryProject()
    return result
  }

  async function deleteProject(projectVO: ProjectVo) {
    const res = await api.projects.deleteProject(projectVO)
    if (res.code !== 200) throw new Error(resolveErrorMessage(res, "刪除項目失敗"))
    await queryProject()
  }

  async function getAllSkills() {
    const res = await api.skills.searchSkills({
      page: 0,
      size: 1000,
      sortBy: "name",
      sortDir: "asc"
    })
    const pageResult = res.data || {}
    data.allSkills = pageResult.content || []
    return data.allSkills
  }

  async function getAllUsers() {
    const res = await api.users.getAllUser()
    data.allUsers = res.data || []
    return data.allUsers
  }

  async function getSkillLevels(skillId: string) {
    const res = await api.skills.getSkillLevels(skillId)
    return res.data || []
  }

  async function getProjectSkills(projectId: string) {
    const res = await api.projects.getProjectSkills(projectId)
    return res.data || []
  }

  async function rebindProjectSkills(projectId: string, bindings: SkillLevelBindingItem[]) {
    const res = await api.adminBindings.rebindProjectSkills({
      projectId,
      bindings
    })
    if (res.code !== 200) throw new Error(resolveErrorMessage(res, "更新專案技能綁定失敗"))
  }

  async function rebindProjectMemberSkills(projectId: string, members: MemberSkillBindings[]) {
    const res = await api.adminBindings.rebindProjectMemberSkills({
      projectId,
      members
    })
    if (res.code !== 200) throw new Error(resolveErrorMessage(res, "更新專案成員技能等級失敗"))
  }

  return {
    data,
    queryProject,
    saveProject,
    deleteProject,
    getAllSkills,
    getAllUsers,
    getSkillLevels,
    getProjectSkills,
    rebindProjectSkills,
    rebindProjectMemberSkills
  }
}

const service = createService()
export default service
