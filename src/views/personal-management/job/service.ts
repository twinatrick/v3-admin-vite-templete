import { reactive } from "vue"
import { api } from "@/api/client"
import { useUserStoreHook } from "@/store/modules/user"
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

  async function getMyLinks() {
    const userStore = useUserStoreHook()
    const userId = userStore.userInfo?.id
    if (!userId) return
    data.loading = true
    try {
      const res = await api.userJobLinkController.getUserJobLinksByUserId(userId)
      data.list = (res.data || []).map(mapVo)
    } finally {
      data.loading = false
    }
  }

  async function create(payload: { jobPostingId: string; userNotes?: string }) {
    const userStore = useUserStoreHook()
    const res = await api.userJobLinkController.addUserJobLink({
      userId: userStore.userInfo?.id,
      jobPostingId: payload.jobPostingId,
      userNotes: payload.userNotes
    })
    if (res.code !== 200) throw new Error(res.message || "新增職缺連結失敗")
    await getMyLinks()
    return res
  }

  async function remove(id: string) {
    const res = await api.userJobLinkController.deleteUserJobLink(id)
    if (res.code !== 200) throw new Error(res.message || "刪除職缺連結失敗")
    await getMyLinks()
    return res
  }

  return {
    data,
    getMyLinks,
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
