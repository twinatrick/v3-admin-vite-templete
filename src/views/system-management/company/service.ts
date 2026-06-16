import { reactive } from "vue"
import { api } from "@/api/client"
import { CompanyVo } from "@/api/generated/Api"
import { Company } from "./type"

class Data {
  list: Company[]
  totalElements: number
  page: number
  size: number
  sortBy: string
  sortDir: "asc" | "desc"
  private cachedAll: Company[]

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
    const res = await api.companyController.getAllCompanies()
    data.cachedAll = (res.data || []).map(mapVo)
    return data.cachedAll
  }

  async function queryCompany(params?: {
    page?: number
    size?: number
    sortBy?: string
    sortDir?: "asc" | "desc"
    filters?: { name?: string; createdBy?: string }
  }) {
    if (data.cachedAll.length === 0 || params?.filters) {
      await fetchAll()
    }
    let filtered = [...data.cachedAll]
    const filters = params?.filters || {}
    if (filters.name) {
      const q = filters.name.toLowerCase()
      filtered = filtered.filter((c) => c.name?.toLowerCase().includes(q))
    }
    if (filters.createdBy) {
      filtered = filtered.filter((c) => c.createdBy === filters.createdBy)
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

  async function saveCompany(payload: { id?: string; name: string; websites: string[]; description?: string }) {
    if (payload.id) {
      const res = await api.companyController.updateCompany(payload as any)
      if (res.code !== 200) throw new Error(res.message || "Update company failed")
    } else {
      const res = await api.companyController.addCompany(payload as any)
      if (res.code !== 200) throw new Error(res.message || "Create company failed")
    }
    data.cachedAll = []
  }

  async function deleteCompany(id: string) {
    const res = await api.companyController.deleteCompany(id)
    if (res.code !== 200) throw new Error(res.message || "Delete company failed")
    data.cachedAll = []
  }

  async function scrape(companyId: string) {
    const res = await api.jobPostingController.scrapeJobs(companyId)
    return res
  }

  return { data, queryCompany, saveCompany, deleteCompany, scrape }
}

function mapVo(vo: CompanyVo): Company {
  return {
    id: vo.id,
    name: vo.name,
    websites: vo.websites,
    description: vo.description,
    createdBy: vo.createdBy,
    updatedBy: vo.updatedBy,
    createdTime: vo.createdTime,
    updatedTime: vo.updatedTime
  }
}

const service = createService()
export default service
