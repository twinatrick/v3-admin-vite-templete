import { DocsViewMode, ViewId } from "./enums"

export type PickerViewOption = {
  viewId?: ViewId
  enableDrives?: boolean
  includeFolders?: boolean
  mode?: DocsViewMode
  ownedByMe?: boolean
  parentId?: string
  selectFolderEnabled?: boolean
  starred?: boolean
}

export const defaultPickerViewOption: Required<PickerViewOption> = {
  viewId: ViewId.SPREADSHEETS,
  enableDrives: false,
  includeFolders: true,
  mode: DocsViewMode.GRID,
  ownedByMe: true,
  parentId: "",
  selectFolderEnabled: false,
  starred: false
}
