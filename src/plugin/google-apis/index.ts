import { App, reactive, ref } from "vue"
//type
type scriptType = {
  name: string
  url: string
  init: boolean
  onload: () => void
}
type optionType = {
  client_id?: string
  scope?: string
  callback?: () => void
}
// data
const client_id = ref<string>("")
const scope = ref<string>("")
const gapiScript = reactive<scriptType>({
  name: "gapi",
  url: "https://apis.google.com/js/api.js",
  init: false,
  onload: function () {
    this.init = true
    console.log("gapi loaded")
  }
})

// functions
function loadScript(scriptType: scriptType) {
  const script = document.createElement("script")
  script.src = scriptType.url
  script.type = "text/javascript"
  script.async = true
  script.defer = true
  script.onload = scriptType.onload

  document.head.appendChild(script)
}
//install
export default {
  install: function (app: App<Element>, options?: optionType) {
    if (options) {
      if (options.client_id) client_id.value = options.client_id
      if (options.scope) scope.value = options.scope
    }
    loadScript(gapiScript)
  }
}
//components
// @ts-ignore
import Picker from "./components/picker.vue"
import { PickerResponse, PickerResponseDocument } from "./types"
export { Picker }
export type { PickerResponse, PickerResponseDocument }
