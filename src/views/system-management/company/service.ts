import { reactive } from "vue"
import { api } from "@/api/client"
import { CompanyVo } from "@/api/generated/Api"
import { Company } from "./type"

class Data {
  list: Company[]
  loading: boolean

  constructor() {
    this.list = []
    this.loading = false
  }
}

function createService() {
  const data = reactive<Data>(new Data())

  async function getAll() {
    data.loading = true
    try {
      const res = await api.company.getAllCompanies()
      data.list = (res.data || []).map(mapVo)
    } finally {
      data.loading = false
    }
  }

  async function create(payload: { name: string; websites: string[]; description?: string }) {
    const res = await api.company.addCompany(payload)
    if (res.code !== 200) throw new Error(res.message || "新增公司失敗")
    await getAll()
    return res
  }

  async function update(payload: { id: string; name: string; websites: string[]; description?: string }) {
    const res = await api.company.updateCompany(payload)
    if (res.code !== 200) throw new Error(res.message || "更新公司失敗")
    await getAll()
    return res
  }

  async function remove(id: string) {
    const res = await api.company.deleteCompany(id)
    if (res.code !== 200) throw new Error(res.message || "刪除公司失敗")
    await getAll()
    return res
  }

  async function scrape(companyId: string) {
    const res = await api.jobPosting.scrapeJobs(companyId)
    return res
  }

  return {
    data,
    getAll,
    create,
    update,
    remove,
    scrape
  }
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
