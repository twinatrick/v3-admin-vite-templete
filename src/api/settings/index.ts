import { request } from "@/utils/service"

export function getSettingList(query: string) {
  return request<ApiResponseData<any>>({
    url: "parameters/query",
    method: "get",
    params: {
      keyword: query
    }
  })
}

export function getInitOptions(nameList: Array<string>) {
  return request<ApiResponseData<any>>({
    url: "/options/patameters",
    method: "post",
    data: nameList
  })
}

export function getCycleOptions(carrier: string, model: string) {
  return request<ApiResponseData<any>>({
    url: `/options/cycleName/${carrier}/${model}`,
    method: "get"
  })
}

export function getCycleNames(carrier: string, model: string) {
  return request<ApiResponseData<any>>({
    url: `options/cycleName/${carrier}/${model}`,
    method: "get"
  })
}

export function getCarrierCycles(carrier: string) {
  return request<ApiResponseData<any>>({
    url: `options/cycleName/${carrier}`,
    method: "get"
  })
}

export function getCycleSw(cycles: Array<string>) {
  return request<ApiResponseData<any>>({
    url: `options/testCycle/sw`,
    method: "post",
    data: cycles
  })
}

export function getCycleNamesByMutiCarrier(carrier: Array<string>, model: string) {
  return request<ApiResponseData<any>>({
    url: `options/cycleName`,
    method: "post",
    data: { carrier: carrier, model: model }
  })
}

export function getGeneralCycleNamesByMutiCarrier(carrier: Array<string>, model: string) {
  return request<ApiResponseData<any>>({
    url: `options/general/cycleName`,
    method: "post",
    data: { carrier: carrier, model: model }
  })
}

export function getGeneralCycleNames(carrier: string, model: string) {
  return request<ApiResponseData<any>>({
    url: `options/general/cycleName/${carrier}/${model}`,
    method: "get"
  })
}

export function getGeneralCycleNamesByMutiCarrierWithFilter(carrier: Array<string>, model: string) {
  return request<ApiResponseData<any>>({
    url: `options/general/cycleNameWithFilter`,
    method: "post",
    data: { carrier: carrier, model: model }
  })
}

export function getGeneralCycleNamesWithFilter(carrier: string, model: string) {
  return request<ApiResponseData<any>>({
    url: `options/general/cycleNameWithFilter/${carrier}/${model}`,
    method: "get"
  })
}

export function getcolumnConfigs(carrier: string) {
  return request<ApiResponseData<any>>({
    url: `options/columnConfig/${carrier}`,
    method: "get"
  })
}

export function updateSetting(data: { key: string; values: Array<String>; note: string }) {
  return request<ApiResponseData<any>>({
    url: "parameters/update",
    method: "post",
    data
  })
}

export function create(data: { name: string; values: Array<string>; note: string }) {
  return request<ApiResponseData<any>>({
    url: "parameters/create",
    method: "post",
    data
  })
}

export function remove(key: string) {
  return request<ApiResponseData<any>>({
    url: "parameters/delete",
    method: "get",
    params: { key }
  })
}
