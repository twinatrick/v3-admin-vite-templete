import { request } from "@/utils/service"
import type * as Roles from "./type"

export function getRoles() {
  return request<Roles.RoleListResponseData>({
    url: "users/roleList",
    method: "get"
  })
}

export function getTags() {
  return request<Roles.RoleListResponseData>({
    url: "users/tagList",
    method: "get"
  })
}
export function getRoleFunctionList() {
  return request<ApiResponseData<Array<Roles.RoleFunctionList>>>({
    url: "/roles/getRoleFunctionList",
    method: "get"
  })
}
