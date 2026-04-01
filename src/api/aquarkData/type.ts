export type CriteriaAPIFilter = {
  columnName?: string
  type?: number
  string?: string
  doubleValue?: number
  date?: Date
  booleanValue?: boolean
  large?: boolean
  small?: boolean
  like?: boolean
  equal?: boolean
}
export type AquarkDataRaw = {
  key?: string
  station_id?: string
  CSQ?: string
  trans_time?: Date
  rain_d?: number
  moisture?: number
  temperature?: number
  echo?: number
  waterSpeedAquark?: number
  v1?: number
  v2?: number
  v3?: number
  v4?: number
  v5?: number
  v6?: number
  v7?: number
  isPeak?: boolean
}
export type AverageAquark = {
  date?: string
  rain_d?: number
  moisture?: number
  temperature?: number
  echo?: number
  waterSpeedAquark?: number
  v1?: number
  v2?: number
  v3?: number
  v4?: number
  v5?: number
  v6?: number
  v7?: number
}
