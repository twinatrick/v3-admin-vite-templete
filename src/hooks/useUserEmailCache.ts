import { ref } from "vue"
import { api } from "@/api/client"
import { UserVo } from "@/api/generated/Api"

type UserSelectLabelMode = "email" | "emailWithName"

type UserSelectOption = {
  label: string
  value: string
  email: string
  name: string
  disabled: boolean
}

const CACHE_TTL_MS = 5 * 60 * 1000

const userEmailMap = ref<Record<string, string>>({})
const userOptions = ref<UserSelectOption[]>([])

let cacheLoadedAt = 0
let loadingPromise: Promise<void> | null = null

function shouldReloadCache() {
  if (Object.keys(userEmailMap.value).length === 0) return true
  return Date.now() - cacheLoadedAt > CACHE_TTL_MS
}

async function loadUserEmailCache(force = false) {
  if (!force && !shouldReloadCache()) return
  if (loadingPromise) return loadingPromise

  loadingPromise = (async () => {
    const res = await api.userController.getAllUser()
    const users: UserVo[] = res.data || []

    const nextMap: Record<string, string> = {}
    const nextOptions: UserSelectOption[] = []

    users.forEach((user) => {
      if (!user.id) return
      const email = user.email || user.id
      const name = user.name || ""
      const disabled = Boolean(user.disabled)
      nextMap[user.id] = email
      nextOptions.push({
        label: name ? `${email} (${name})` : email,
        value: user.id,
        email,
        name,
        disabled
      })
    })

    userEmailMap.value = nextMap
    userOptions.value = nextOptions
    cacheLoadedAt = Date.now()
  })().finally(() => {
    loadingPromise = null
  })

  return loadingPromise
}

function getCreatorEmail(createdBy?: string) {
  if (!createdBy) return ""
  return userEmailMap.value[createdBy] || createdBy
}

function getUserOptions(
  keyword = "",
  config?: {
    labelMode?: UserSelectLabelMode
    activeOnly?: boolean
  }
) {
  const labelMode = config?.labelMode || "emailWithName"
  const activeOnly = Boolean(config?.activeOnly)
  const normalizedKeyword = keyword.trim().toLowerCase()
  const filteredByStatus = activeOnly ? userOptions.value.filter((option) => !option.disabled) : userOptions.value
  const normalizedOptions = filteredByStatus.map((option) => {
    return {
      ...option,
      label: labelMode === "email" ? option.email : option.name ? `${option.email} (${option.name})` : option.email
    }
  })

  if (!normalizedKeyword) return normalizedOptions
  return normalizedOptions.filter((option) => {
    return (
      option.label.toLowerCase().includes(normalizedKeyword) ||
      option.email.toLowerCase().includes(normalizedKeyword) ||
      option.name.toLowerCase().includes(normalizedKeyword)
    )
  })
}

export function useUserEmailCache() {
  return {
    userEmailMap,
    userOptions,
    loadUserEmailCache,
    getCreatorEmail,
    getUserOptions
  }
}
