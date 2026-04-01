import { TableData } from "@/components/FilterTable/type"

export function transQuery(array: any[]): TableData[] {
  if (array.length === 0) {
    // return [{ data: {}, extraList: [] }]
    return []
  }
  return array.map((item) => ({
    data: item,
    extraList: []
  }))
}
