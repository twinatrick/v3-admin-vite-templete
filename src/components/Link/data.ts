import { request } from "@/utils/service"

export interface ListItem {
  type?: number
  icon?: number
  title?: string
  startTime?: Date
  content?: string
  status?: number
  onClick?: () => void
}

export enum Icon {
  Sheet = "https://ssl.gstatic.com/docs/spreadsheets/favicon3.ico"
}

export function getNotifyList(data: any) {
  return request<ApiResponseData<any>>({
    url: "announcement/queryAnn",
    method: "post",
    data: data
  })
}
