import { request } from "@/utils/service"
import { AquarkDataRaw, type AverageAquark, CriteriaAPIFilter } from "./type"

export function getColumnNameList() {
  return request<ApiResponseData<Array<string>>>({
    url: "/aquarkData/getColumnNameList",
    method: "GET"
  })
}
export function getDataList(data: CriteriaAPIFilter[]) {
  return request<ApiResponseData<Array<AquarkDataRaw>>>({
    url: "/aquarkData/getData",
    method: "POST",
    data: data
  })
}
export function getAverage(start: Date, end: Date) {
  return request<ApiResponseData<Array<AverageAquark>>>({
    url: "/aquarkData/getAverage",
    method: "post",
    data: { start, end }
  })
}
