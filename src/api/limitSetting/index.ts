import { request } from "@/utils/service"
import type * as Type from "./type"

export function addLimitSetting(data: Type.AlertCheckLimitVo) {
  return request<ApiResponseData<Type.AlertCheckLimitVo>>({
    url: "/backend/alertCheckLimit/add",
    method: "post",
    data
  })
}

export function updateLimitSetting(data: Type.AlertCheckLimitVo) {
  return request<ApiResponseData<Type.AlertCheckLimitVo>>({
    url: "/backend/alertCheckLimit/update",
    method: "post",
    data
  })
}

export function deleteLimitSetting(data: Type.AlertCheckLimitVo) {
  return request<ApiResponseData<Type.AlertCheckLimitVo>>({
    url: "/backend/alertCheckLimit/delete",
    method: "post",
    data
  })
}

export function getLimitSetting() {
  return request<ApiResponseData<Type.AlertCheckLimitVo[]>>({
    url: "/backend/alertCheckLimit/get",
    method: "get"
    // params: query || {}
  })
}
