import { reactive } from "vue"
import { api } from "@/api/client"
import { UserJobLinkVo } from "@/api/generated/Api"
import { UserJobLink } from "./type"

class Data {
  list: UserJobLink[]
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
      const res = await api.userJobLink.getAllUserJobLinks()
      data.list = (res.data || []).map(mapVo)
    } finally {
      data.loading = false
    }
  }

  async function create(payload: { userId?: string; jobPostingId: string; userNotes?: string }) {
    const res = await api.userJobLink.addUserJobLink(payload)
    if (res.code !== 200) throw new Error(res.message || "新增職缺連結失敗")
    await getAll()
    return res
  }

  async function remove(id: string) {
    const res = await api.userJobLink.deleteUserJobLink(id)
    if (res.code !== 200) throw new Error(res.message || "刪除職缺連結失敗")
    await getAll()
    return res
  }

  return {
    data,
    getAll,
    create,
    remove
  }
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
