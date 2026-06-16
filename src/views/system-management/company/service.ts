import { reactive } from "vue"
import { api } from "@/api/client"
import { CompanyVo } from "@/api/generated/Api"
import { Company } from "./type"

class Data {
  list: Company[]
  totalElements: number
  page: number
  size: number

  constructor() {
    this.list = []
    this.totalElements = 0
    this.page = 0
    this.size = 20
  }
}

function createService() {
  const data = reactive<Data>(new Data())

  async function queryCompany(params?: {
    page?: number
    size?: number
    sortBy?: string
    sortDir?: "asc" | "desc"
    filters?: { name?: string; createdBy?: string }
  }) {
    const page = params?.page ?? data.page
    const size = params?.size ?? data.size
    const sortBy = params?.sortBy || "createdTime"
    const sortDir = params?.sortDir || "desc"
    const filters = params?.filters || {}
    const res = await api.companyController.searchCompanies({
      page,
      size,
      sortBy,
      sortDir,
      name: filters.name || undefined,
      createdBy: filters.createdBy || undefined
    })
    data.list = (res.data?.content || []).map(mapVo)
    data.totalElements = res.data?.totalElements || 0
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
  }

  async function deleteCompany(id: string) {
    const res = await api.companyController.deleteCompany(id)
    if (res.code !== 200) throw new Error(res.message || "Delete company failed")
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
