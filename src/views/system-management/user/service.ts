import { reactive } from "vue"
import { Role } from "../role/type"
import * as UserAPI from "@/api/users"
import { parameter } from "@/api/settings/types"
import { UserVO } from "@/api/users/types/user"
// import {getRoles} from "../../../api/roles";
import { queryRoleList } from "../role/api"
import { getAllUser } from "../../../api/users"
class Data {
  role: Role[]
  tag: Role[]
  location: parameter[]
  user: UserVO[]
  constructor() {
    this.role = []
    this.tag = []
    this.location = []
    this.user = []
  }
}
function createService() {
  const data = reactive<Data>(new Data())
  async function initialize() {
    // const res = await UserAPI.getInitData()
    //
    // const { role, tag, location } = res.data
    // data.role = role
    // data.tag = tag
    // data.location = location
    const res1 = await queryRoleList()
    data.role = res1.data
    await queryUser()
  }
  async function queryUser() {
    const res = await getAllUser()
    data.user = res.data
  }
  async function createUser(userVO: UserVO) {
    const res = await UserAPI.save(userVO)
    if (res.code !== 0) throw new Error(res.message)
    data.user.unshift(res.data)
  }
  async function updateUser(userVO: UserVO) {
    const res = await UserAPI.save(userVO)
    if (res.code !== 0) throw new Error(res.message)
    const index = data.user.findIndex((item) => item.id === userVO.id)
    data.user.splice(index, 1, res.data)
  }
  async function saveUser(userVO: UserVO) {
    const res = await UserAPI.save(userVO)
    if (res.code !== 0) throw new Error(res.message)
    const index = data.user.findIndex((item) => item.id === userVO.id)
    if (index === -1) {
      data.user.unshift(res.data)
    } else {
      data.user.splice(index, 1, res.data)
    }
  }
  async function deleteUser(userVO: UserVO) {
    const res = await UserAPI.deleteUser(userVO)
    if (res.code !== 0) throw new Error(res.message)
    const index = data.user.findIndex((item) => item.id === userVO.id)
    data.user.splice(index, 1)
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
