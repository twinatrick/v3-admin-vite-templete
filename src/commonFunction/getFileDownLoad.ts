import { request } from "@/utils/service"

export function DownloadFile(fileName: string) {
  return request<any>({
    url: `/resource/${fileName}`,
    method: "get",
    responseType: "blob"
  })
}

export async function getFile(fileName: string, saveName: string) {
  try {
    const data = await DownloadFile(fileName)
    console.log(data)
    const blob = new Blob([data])
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = saveName
    link.click()
    URL.revokeObjectURL(link.href)
  } catch (e) {
    console.log(e)
  }
}
