interface PickerResponseDocument {
  description?: string
  embedUrl?: string
  iconUrl?: string
  id?: string
  isNew?: boolean
  lastEditedUtc?: string
  mimeType?: string
  name?: string
  childrenCount?: number
  parentId?: string
  serviceId?: string
  type?: string
  url?: string
}

interface PickerResponse {
  action?: string
  docs?: PickerResponseDocument[]
  parents?: string
}

export type { PickerResponseDocument, PickerResponse }
