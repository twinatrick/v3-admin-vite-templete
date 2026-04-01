import { request } from "@/utils/service"
import { Role, Function, RoleVO } from "./type"
export function queryRoleList() {
  return request<ApiResponseData<Array<Role>>>({
    url: "role/get",
    method: "post"
  })
}
export function updateRole(data: RoleVO) {
  return request<ApiResponseData<RoleVO>>({
    url: "roles/update",
    method: "post",
    data
  })
}
export function editRole(data: RoleVO) {
  return request<ApiResponseData<RoleVO>>({
    url: "/role/update",
    method: "post",
    data: {
      key: data.key,
      name: data.name,
      description: data.description
    }
  })
}

export async function createRole(role: RoleVO) {
  const res = await addRole({
    name: role.name,
    description: role.description
  })
  if (res.code === 0) {
    if (res.data.key == null) {
      return res
    }
    return await roleBindFunction(res.data.key, role.functionKeys)
  }
}
export async function addRole(role: Role) {
  return request<ApiResponseData<Role>>({
    url: "/role/add",
    method: "post",
    data: role
  })
}
export async function roleBindFunction(roleId: string, functionIds: string[] | undefined) {
  return request<ApiResponseData<Role>>({
    url: `/role/roleBindFunction`,
    method: "post",
    data: {
      role: roleId,
      functionList: functionIds
    }
  })
}
export function roleUnbindFunction(roleId: string, functionIds: string[] | []) {
  return request<ApiResponseData<Role>>({
    url: `/role/roleUnbindFunction`,
    method: "post",
    data: {
      role: roleId,
      functionList: functionIds
    }
  })
}
export function deleteRole(roleId: string) {
  return request<ApiResponseData<Array<any>>>({
    url: `roles/delete/${roleId}`,
    method: "get"
  })
}

export function getFunctions() {
  return request<ApiResponseData<Function[]>>({
    url: "function/get",
    method: "get"
  })
}

export function updateFunctionOrder(data: Function[]) {
  return request<ApiResponseData<Array<Function>>>({
    url: "roles/updateFunctionOrder",
    method: "post",
    data,
    timeout: 0
  })
}
