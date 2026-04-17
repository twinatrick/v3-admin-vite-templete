import { reactive } from "vue"
import { Role } from "../role/type"
import { api } from "@/api/client"
import { UserVo } from "@/api/generated/Api"

class Data {
  role: Role[]

  user: UserVo[]
  constructor() {
    this.role = []

    this.user = []
  }
}
function createService() {
  const data = reactive<Data>(new Data())
  async function initialize() {
    const res1 = await api.roles.getRole()
    data.role = res1.data.data || []
    await queryUser()
  }
  async function queryUser() {
    const res = await api.users.getAllUser()
    data.user = res.data.data || []
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
    const index = data.user.findIndex((item) => item.id === userVO.id)
    if (index === -1) {
      data.user.unshift(userVO)
    } else {
      data.user.splice(index, 1, userVO)
    }
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
