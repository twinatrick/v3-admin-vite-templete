import { reactive } from "vue"
import { api } from "@/api/client"
import { UserJobLinkVo } from "@/api/generated/Api"
import { UserJobLink } from "./type"

class Data {
  list: UserJobLink[]
  totalElements: number
  page: number
  size: number
  sortBy: string
  sortDir: "asc" | "desc"
  private cachedAll: UserJobLink[]

  constructor() {
    this.list = []
    this.totalElements = 0
    this.page = 0
    this.size = 20
    this.sortBy = "createdTime"
    this.sortDir = "desc"
    this.cachedAll = []
  }
}

function createService() {
  const data = reactive<Data>(new Data())

  async function fetchAll() {
    const res = await api.userJobLinkController.getAllUserJobLinks()
    data.cachedAll = (res.data || []).map(mapVo)
    return data.cachedAll
  }

  async function queryUserJobLink(params?: {
    page?: number
    size?: number
    sortBy?: string
    sortDir?: "asc" | "desc"
    filters?: { userEmail?: string; jobTitle?: string; companyName?: string }
  }) {
    if (data.cachedAll.length === 0 || params?.filters) {
      await fetchAll()
    }
    let filtered = [...data.cachedAll]
    const filters = params?.filters || {}
    if (filters.userEmail) {
      const q = filters.userEmail.toLowerCase()
      filtered = filtered.filter((l) => l.userEmail?.toLowerCase().includes(q))
    }
    if (filters.jobTitle) {
      const q = filters.jobTitle.toLowerCase()
      filtered = filtered.filter((l) => l.jobTitle?.toLowerCase().includes(q))
    }
    if (filters.companyName) {
      const q = filters.companyName.toLowerCase()
      filtered = filtered.filter((l) => l.companyName?.toLowerCase().includes(q))
    }
    const sortBy = params?.sortBy || data.sortBy
    const sortDir = params?.sortDir || data.sortDir
    filtered.sort((a, b) => {
      const aVal = String((a as any)[sortBy] || "")
      const bVal = String((b as any)[sortBy] || "")
      const cmp = aVal.localeCompare(bVal)
      return sortDir === "desc" ? -cmp : cmp
    })
    const page = params?.page ?? data.page
    const size = params?.size ?? data.size
    const total = filtered.length
    const start = page * size
    const paged = filtered.slice(start, start + size)
    data.list = paged
    data.totalElements = total
    data.page = page
    data.size = size
    return { data: data.list, total: data.totalElements, page: data.page, size: data.size }
  }

  async function saveUserJobLink(payload: { id?: string; userId?: string; jobPostingId: string; userNotes?: string }) {
    let res
    if (payload.id) {
      res = await api.userJobLinkController.updateUserJobLink(payload as any)
      if (res.code !== 200) throw new Error(res.message || "Update user job link failed")
    } else {
      res = await api.userJobLinkController.addUserJobLink(payload as any)
      if (res.code !== 200) throw new Error(res.message || "Create user job link failed")
    }
    data.cachedAll = []
  }

  async function deleteUserJobLink(id: string) {
    const res = await api.userJobLinkController.deleteUserJobLink(id)
    if (res.code !== 200) throw new Error(res.message || "Delete user job link failed")
    data.cachedAll = []
  }

  return { data, queryUserJobLink, saveUserJobLink, deleteUserJobLink }
}

function mapVo(vo: UserJobLinkVo): UserJobLink {
  return {
    id: vo.id,
    userId: vo.userId,
    userEmail: vo.userEmail,
    jobPostingId: vo.jobPostingId,
    jobTitle: vo.jobTitle,
    companyName: vo.companyName,
    userNotes: vo.userNotes,
    geminiFeedback: vo.geminiFeedback,
    createdBy: vo.createdBy,
    updatedBy: vo.updatedBy,
    createdTime: vo.createdTime,
    updatedTime: vo.updatedTime
  }
}

const service = createService()
export default service
