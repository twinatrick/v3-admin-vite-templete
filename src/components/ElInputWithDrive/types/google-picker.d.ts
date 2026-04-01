// import DocsUploadView from './classes/docs-upload-view'
// import DocsView from './classes/docs-view'
// import Picker from './classes/picker'
// import PickerBuilder from './classes/picker-builder'
// import ResourceId from './classes/resource-id'
// import ViewGroup from './classes/view-group'
// import { Action, DocsViewMode, ViewId } from './enums'

declare namespace gapi {
  export function load(api: string, callback: () => void): void
}
declare namespace google {
  namespace picker {
    export const DocsView: typeof import("./classes/docs-view").default
    export const DocsUploadView: typeof import("./classes/docs-upload-view").default
    export const Picker: typeof import("./classes/picker").default
    export const PickerBuilder: typeof import("./classes/picker-builder").default
    export const ResourceId: typeof import("./classes/resource-id").default
    export const ViewGroup: typeof import("./classes/view-group").default
    export const ViewId: import("./enums").ViewId
    export const DocsViewMode: import("./enums").DocsViewMode
    export const Action: import("./enums").Action
  }
}
