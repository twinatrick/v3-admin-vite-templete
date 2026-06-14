import { reactive } from "vue"
import { api } from "@/api/client"
import { JobPostingVo } from "@/api/generated/Api"
import { JobPosting } from "./type"

class Data {
  list: JobPosting[]
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
      const res = await api.jobPostingController.getAllJobPostings()
      data.list = (res.data || []).map(mapVo)
    } finally {
      data.loading = false
    }
  }

  async function create(payload: {
    companyId: string
    title: string
    url: string
    description?: string
    requirements?: string
    responsibilities?: string
    salaryRange?: string
    postedDate?: string
  }) {
    const res = await api.jobPostingController.addJobPosting(payload)
    if (res.code !== 200) throw new Error(res.message || "新增職缺失敗")
    await getAll()
    return res
  }

  async function update(payload: JobPostingVo) {
    const res = await api.jobPostingController.updateJobPosting(payload)
    if (res.code !== 200) throw new Error(res.message || "更新職缺失敗")
    await getAll()
    return res
  }

  async function remove(id: string) {
    const res = await api.jobPostingController.deleteJobPosting(id)
    if (res.code !== 200) throw new Error(res.message || "刪除職缺失敗")
    await getAll()
    return res
  }

  return {
    data,
    getAll,
    create,
    update,
    remove
  }
}

function mapVo(vo: JobPostingVo): JobPosting {
  return {
    id: vo.id,
    companyId: vo.companyId,
    companyName: vo.companyName,
    title: vo.title,
    url: vo.url,
    description: vo.description,
    requirements: vo.requirements,
    responsibilities: vo.responsibilities,
    salaryRange: vo.salaryRange,
    postedDate: vo.postedDate,
    geminiAnalysis: vo.geminiAnalysis,
    createdBy: vo.createdBy,
    updatedBy: vo.updatedBy,
    createdTime: vo.createdTime,
    updatedTime: vo.updatedTime
  }
}

const service = createService()
export default service
