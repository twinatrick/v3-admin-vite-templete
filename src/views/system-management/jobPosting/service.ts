import { reactive } from "vue"
import { api } from "@/api/client"
import { JobPostingSearchQuery, JobPostingVo } from "@/api/generated/Api"
import { JobPosting } from "./type"

class Data {
  list: JobPosting[]
  page: number
  size: number
  totalElements: number
  sortBy: string
  sortDir: "asc" | "desc"
  filters: {
    title: string
    companyName: string
    salaryRange: string
    createdBy: string
  }

  constructor() {
    this.list = []
    this.page = 0
    this.size = 20
    this.totalElements = 0
    this.sortBy = "createdTime"
    this.sortDir = "desc"
    this.filters = {
      title: "",
      companyName: "",
      salaryRange: "",
      createdBy: ""
    }
  }
}

function createService() {
  const data = reactive<Data>(new Data())

  async function queryJobPosting(payload?: Partial<JobPostingSearchQuery>) {
    if (payload?.page !== undefined) data.page = payload.page
    if (payload?.size !== undefined) data.size = payload.size
    if (payload?.sortBy !== undefined) data.sortBy = payload.sortBy
    if (payload?.sortDir !== undefined && (payload.sortDir === "asc" || payload.sortDir === "desc")) {
      data.sortDir = payload.sortDir
    }
    if (payload?.title !== undefined) data.filters.title = payload.title
    if (payload?.companyName !== undefined) data.filters.companyName = payload.companyName
    if (payload?.salaryRange !== undefined) data.filters.salaryRange = payload.salaryRange
    if (payload?.createdBy !== undefined) data.filters.createdBy = payload.createdBy

    const res = await api.jobPostingController.searchJobPostings({
      page: data.page,
      size: data.size,
      sortBy: data.sortBy,
      sortDir: data.sortDir,
      ...data.filters,
      postedDateStart: payload?.postedDateStart,
      postedDateEnd: payload?.postedDateEnd
    })
    const pageResult = res.data || {}
    data.list = (pageResult.content || []).map(mapVo)
    data.totalElements = pageResult.totalElements || 0
    data.page = pageResult.currentPage ?? data.page
    data.size = pageResult.pageSize ?? data.size
    return {
      data: data.list,
      total: data.totalElements,
      page: data.page,
      size: data.size
    }
  }

  async function saveJobPosting(vo: JobPostingVo) {
    if (vo.id) {
      const res = await api.jobPostingController.updateJobPosting(vo)
      if (res.code !== 200) throw new Error(res.message || "Update job posting failed")
    } else {
      const res = await api.jobPostingController.addJobPosting(vo as any)
      if (res.code !== 200) throw new Error(res.message || "Create job posting failed")
    }
    await queryJobPosting()
  }

  async function deleteJobPosting(id: string) {
    const res = await api.jobPostingController.deleteJobPosting(id)
    if (res.code !== 200) throw new Error(res.message || "Delete job posting failed")
  }

  return { data, queryJobPosting, saveJobPosting, deleteJobPosting }
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
