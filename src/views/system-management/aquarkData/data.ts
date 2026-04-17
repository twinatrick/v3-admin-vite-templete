import { TableColumnMap } from "@/components/FilterTable/type"

export const colMap: TableColumnMap[] = [
  {
    name: "station_id",
    value: "station_id",
    type: "string"
  },
  {
    name: "CSQ",
    value: "CSQ",
    type: "string"
  },
  {
    name: "trans_time",
    value: "trans_time",
    type: "date",
    sortable: true
  },
  {
    name: "rain_d",
    value: "rain_d",
    type: "number"
  },
  {
    name: "moisture",
    value: "moisture",
    type: "number"
  },
  {
    name: "temperature",
    value: "temperature",
    type: "number"
  },
  {
    name: "echo",
    value: "echo",
    type: "number"
  },
  {
    name: "waterSpeedAquark",
    value: "waterSpeedAquark",
    type: "number"
  },
  {
    name: "v1",
    value: "v1",
    type: "number"
  },
  {
    name: "v2",
    value: "v2",
    type: "number"
  },
  {
    name: "v3",
    value: "v3",
    type: "number"
  },
  {
    name: "v4",
    value: "v4",
    type: "number"
  },
  {
    name: "v5",
    value: "v5",
    type: "number"
  },
  {
    name: "v6",
    value: "v6",
    type: "number"
  },
  {
    name: "v7",
    value: "v7",
    type: "number"
  },
  {
    name: "peak",
    value: "是否尖峰",
    type: "select",
    formatter: (value: boolean) => {
      return value ? "尖峰" : "離峰"
    }
  }
]
