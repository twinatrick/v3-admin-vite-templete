import { request } from "@/utils/service"
import { Function, FunctionTransVo, FunctionVo } from "@/api/function/type"

export function getFunction() {
  return request<ApiResponseData<Function[]>>({
    url: "/backend/function/get",
    method: "get"
  })
}
export function createFunction(data: Function) {
  return request<ApiResponseData<Array<FunctionVo>>>({
    url: "/backend/function/add",
    method: "post",
    data: data
  })
}

export function saveFunction(data: Array<FunctionVo>) {
  return request<ApiResponseData<any>>({
    url: "/backend/function/saveAllFunction",
    method: "post",
    data,
    timeout: 0
  })
}

export function deleteFunction(data: Array<FunctionVo>) {
  return request<ApiResponseData<any>>({
    url: "/backend/function/delete",
    method: "post",
    data: data,
    timeout: 0
  })
}

export function saveFunctionNewChild(data: Array<FunctionVo>) {
  return request<ApiResponseData<Array<FunctionVo>>>({
    url: "/backend/function/saveAllFunction",
    method: "post",
    data: {
      saveFunctionNewChild: data
    },
    timeout: 0
  })
}

export function saveAllFunction(data: FunctionTransVo) {
  return request<ApiResponseData<Array<FunctionVo>>>({
    url: "/backend/function/saveAllFunction",
    method: "post",
    data: data,
    timeout: 0
  })
}
