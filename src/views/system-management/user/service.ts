import { reactive } from "vue"
import { Role } from "../role/type"
import { api } from "@/api/client"
import { UserSearchQuery, UserVo } from "@/api/generated/Api"

class Data {
  role: Role[]

  user: UserVo[]
  page: number
  size: number
  totalElements: number
  sortBy: string
  sortDir: "asc" | "desc"
  filters: Omit<UserSearchQuery, "page" | "size" | "sortBy" | "sortDir" | "normalizedSortDir" | "validSortDir">
  constructor() {
    this.role = []

    this.user = []
    this.page = 0
    this.size = 20
    this.totalElements = 0
    this.sortBy = "createdTime"
    this.sortDir = "desc"
    this.filters = {
      name: "",
      email: "",
      phone: "",
      createdBy: ""
    }
  }
}
function createService() {
  const data = reactive<Data>(new Data())
  async function initialize() {
    const res1 = await api.roles.getRole()
    data.role = res1.data.data || []
  }
  async function queryUser(payload?: Partial<UserSearchQuery>) {
    if (payload?.page !== undefined) data.page = payload.page
    if (payload?.size !== undefined) data.size = payload.size
    if (payload?.sortBy !== undefined) data.sortBy = payload.sortBy
    if (payload?.sortDir !== undefined && (payload.sortDir === "asc" || payload.sortDir === "desc")) {
      data.sortDir = payload.sortDir
    }
    if (payload?.name !== undefined) data.filters.name = payload.name
    if (payload?.email !== undefined) data.filters.email = payload.email
    if (payload?.phone !== undefined) data.filters.phone = payload.phone
    if (payload?.disabled !== undefined) data.filters.disabled = payload.disabled
    if (payload?.createdBy !== undefined) data.filters.createdBy = payload.createdBy

    const res = await api.users.searchUsers({
      page: data.page,
      size: data.size,
      sortBy: data.sortBy,
      sortDir: data.sortDir,
      ...data.filters
    })
    const pageResult = res.data.data || {}
    data.user = pageResult.content || []
    data.totalElements = pageResult.totalElements || 0
    data.page = pageResult.currentPage ?? data.page
    data.size = pageResult.pageSize ?? data.size
  }
  async function createUser(userVO: UserVo) {
    const res = await api.users.saveUser(userVO)
    if (res.data.code !== 200) throw new Error(res.data.message)
    data.user.unshift(userVO)
  }
  async function updateUser(userVO: UserVo) {
    const res = await api.users.saveUser(userVO)
    if (res.data.code !== 200) throw new Error(res.data.message)
    const index = data.user.findIndex((item) => item.id === userVO.id)
    data.user.splice(index, 1, userVO)
  }
  async function saveUser(userVO: UserVo) {
    const res = await api.users.saveUser(userVO)
    if (res.data.code !== 200) throw new Error(res.data.message)
    await queryUser()
  }

  async function deleteUser(_userVO: UserVo) {
    console.warn("deleteUser functionality is deprecated. Please update your API calls.")
    throw new Error("此功能已停用，请更新您的 API 调用。")
  }
  return {
    data,
    initialize,
    queryUser,
    createUser,
    updateUser,
    saveUser,
    deleteUser
  }
}
const service = createService()
export default service
