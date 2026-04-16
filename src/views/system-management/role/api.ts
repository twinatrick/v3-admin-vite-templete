import { request } from "@/utils/service"
import { Role, Function, RoleVO } from "./type"

const mapRoleOutVo = (role?: RoleVO) => {
  if (!role) return {} as RoleVO
  return {
    ...role,
    key: role.key || (role as any).id,
    functionKeys: role.functionKeys || (role as any).functionIds
  }
}

export async function queryRoleList() {
  const res = await request<ApiResponseData<Array<RoleVO>>>({
    url: "/backend/role/get",
    method: "post"
  })
  return {
    ...res,
    data: res.data?.map(mapRoleOutVo) || []
  }
}
export async function updateRole(data: RoleVO) {
  const res = await request<ApiResponseData<RoleVO>>({
    url: "/backend/role/update",
    method: "post",
    data: {
      id: data.key,
      name: data.name,
      description: data.description,
      functionIds: data.functionKeys
    }
  })
  return {
    ...res,
    data: mapRoleOutVo(res.data)
  }
}
export async function editRole(data: RoleVO) {
  const res = await request<ApiResponseData<RoleVO>>({
    url: "/backend/role/update",
    method: "post",
    data: {
      id: data.key,
      name: data.name,
      description: data.description,
      functionIds: data.functionKeys
    }
  })
  return {
    ...res,
    data: mapRoleOutVo(res.data)
  }
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
  const res = await request<ApiResponseData<RoleVO>>({
    url: "/backend/role/add",
    method: "post",
    data: role
  })
  return {
    ...res,
    data: mapRoleOutVo(res.data)
  }
}
export async function roleBindFunction(roleId: string, functionIds: string[] | undefined) {
  return request<ApiResponseData<Role>>({
    url: `/backend/role/roleBindFunction`,
    method: "post",
    data: {
      role: roleId,
      functionList: functionIds
    }
  })
}
export function roleUnbindFunction(roleId: string, functionIds: string[] | []) {
  return request<ApiResponseData<Role>>({
    url: `/backend/role/roleUnbindFunction`,
    method: "post",
    data: {
      role: roleId,
      functionList: functionIds
    }
  })
}
export function deleteRole(roleId: string) {
  return request<ApiResponseData<Array<any>>>({
    url: "/backend/role/delete",
    method: "post",
    data: {
      id: roleId
    }
  })
}

export function getFunctions() {
  return request<ApiResponseData<Function[]>>({
    url: "/backend/function/get",
    method: "get"
  })
}

export function updateFunctionOrder(data: Function[]) {
  return request<ApiResponseData<Array<Function>>>({
    url: "/backend/function/saveAllFunction",
    method: "post",
    data: {
      saveMainFunction: data
    },
    timeout: 0
  })
}
