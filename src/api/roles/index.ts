import { request } from "@/utils/service"
import type * as Roles from "./type"

export function getRoles() {
  return request<Roles.RoleListResponseData>({
    url: "/backend/role/get",
    method: "post"
  })
}

export function getTags() {
  return request<Roles.RoleListResponseData>({
    url: "/backend/role/get",
    method: "post"
  })
}
export function getRoleFunctionList() {
  return request<ApiResponseData<Array<Roles.RoleFunctionList>>>({
    url: "/roles/getRoleFunctionList",
    method: "get"
  })
}
