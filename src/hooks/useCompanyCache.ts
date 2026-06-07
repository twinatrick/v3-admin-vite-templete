import { ref } from "vue"
import { api } from "@/api/client"
import { CompanyVo } from "@/api/generated/Api"

type CompanySelectOption = {
  label: string
  value: string
  name: string
}

const CACHE_TTL_MS = 5 * 60 * 1000

const companyOptions = ref<CompanySelectOption[]>([])

let cacheLoadedAt = 0
let loadingPromise: Promise<void> | null = null

function shouldReloadCache() {
  if (companyOptions.value.length === 0) return true
  return Date.now() - cacheLoadedAt > CACHE_TTL_MS
}

async function loadCompanyCache(force = false) {
  if (!force && !shouldReloadCache()) return
  if (loadingPromise) return loadingPromise

  loadingPromise = (async () => {
    const res = await api.company.getAllCompanies()
    const companies: CompanyVo[] = res.data || []

    const nextOptions: CompanySelectOption[] = []

    companies.forEach((company) => {
      if (!company.id) return
      nextOptions.push({
        label: company.name || company.id,
        value: company.id,
        name: company.name || ""
      })
    })

    companyOptions.value = nextOptions
    cacheLoadedAt = Date.now()
  })().finally(() => {
    loadingPromise = null
  })

  return loadingPromise
}

function getCompanyName(id?: string) {
  if (!id) return ""
  return companyOptions.value.find((option) => option.value === id)?.name || id
}

function getCompanyOptions(keyword = "") {
  const normalizedKeyword = keyword.trim().toLowerCase()
  if (!normalizedKeyword) return companyOptions.value
  return companyOptions.value.filter((option) => option.label.toLowerCase().includes(normalizedKeyword))
}

export function useCompanyCache() {
  return {
    companyOptions,
    loadCompanyCache,
    getCompanyName,
    getCompanyOptions
  }
}
