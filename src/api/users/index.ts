import { request } from "@/utils/service"
import type * as Type from "@/api/users/types/user"
import { UserVO } from "@/api/users/types/user"

export function getUserList(query?: Type.UserListQuery) {
  return request<ApiResponseData<Type.UserVO[]>>({
    url: "/backend/users/getAllUser",
    method: "get",
    params: query || {}
  })
}
export function getAllUser() {
  return request<ApiResponseData<Type.UserVO[]>>({
    url: "/backend/users/getAllUser",
    method: "get"
  })
}
export function getUserInfoApi() {
  return request<Type.UserInfoResponseData>({
    url: "/backend/users/infoVo",
    method: "get"
  })
}

export function checkAccessToken(accessToken: string) {
  return request<ApiResponseData<{ access_token: string }>>({
    url: "users/checkAT",
    method: "get",
    params: { access_token: accessToken }
  })
}

export function updateUser(data: Type.UserVO) {
  return request<ApiResponseData<Type.UserVO>>({
    url: "/backend/users/saveUser",
    method: "post",
    data
  })
}

export function deleteUser(data: Type.UserVO) {
  return request<ApiResponseData<Type.UserVO>>({
    url: "/backend/users/saveUser",
    method: "post",
    data: {
      ...data,
      disabled: true
    }
  })
}

export function save(data: UserVO) {
  return request<ApiResponseData<Type.UserVO>>({
    url: "/backend/users/saveUser",
    method: "post",
    data
  })
}
