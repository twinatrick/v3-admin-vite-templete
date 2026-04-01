export type parameter = {
  key: string
  value: string
  parameterId: string
}

export type parameterKey = {
  key: string
  name: string
  note: string
}

export interface parameterMap extends parameterKey {
  values: Array<parameter>
}
