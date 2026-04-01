import { type Directive } from "vue"
import { useUserStoreHook } from "@/store/modules/user"
/**
 * <pre>
 * 檢查是否有該功能的權限，去userInfo.permissions找是否有`${routerName}:${bindingValue}`
 * ex: v-permission="View" -> `EWorking:View` -> page: EWorking(curruntPage), func: View
 * ex: v-permission="user:read" -> `user:read` -> page: user, func: read
 * </pre>
 */
export const permission: Directive = {
  mounted(el, binding) {
    const { value, modifiers } = binding
    const { hasPermission } = useUserStoreHook()
    if (!hasPermission(value)) {
      if (modifiers.disabled === true) {
        if (el.className.includes("el-button")) el.className += " is-disabled"
      } else {
        el.parentNode?.removeChild(el)
      }
    }
  }
}
