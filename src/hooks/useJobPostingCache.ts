import { ref } from "vue"
import { api } from "@/api/client"
import { JobPostingVo } from "@/api/generated/Api"

type JobPostingSelectOption = {
  label: string
  value: string
  title: string
  companyName: string
}

const CACHE_TTL_MS = 5 * 60 * 1000

const jobPostingOptions = ref<JobPostingSelectOption[]>([])

let cacheLoadedAt = 0
let loadingPromise: Promise<void> | null = null

function shouldReloadCache() {
  if (jobPostingOptions.value.length === 0) return true
  return Date.now() - cacheLoadedAt > CACHE_TTL_MS
}

async function loadJobPostingCache(force = false) {
  if (!force && !shouldReloadCache()) return
  if (loadingPromise) return loadingPromise

  loadingPromise = (async () => {
    const res = await api.jobPostingController.getAllJobPostings()
    const postings: JobPostingVo[] = res.data || []

    const nextOptions: JobPostingSelectOption[] = []

    postings.forEach((posting) => {
      if (!posting.id) return
      const title = posting.title || ""
      const companyName = posting.companyName || ""
      nextOptions.push({
        label: companyName ? `${title} - ${companyName}` : title || posting.id,
        value: posting.id,
        title,
        companyName
      })
    })

    jobPostingOptions.value = nextOptions
    cacheLoadedAt = Date.now()
  })().finally(() => {
    loadingPromise = null
  })

  return loadingPromise
}

function getJobPostingTitle(id?: string) {
  if (!id) return ""
  const option = jobPostingOptions.value.find((o) => o.value === id)
  return option?.label || id
}

function getJobPostingOptions(keyword = "") {
  const normalizedKeyword = keyword.trim().toLowerCase()
  if (!normalizedKeyword) return jobPostingOptions.value
  return jobPostingOptions.value.filter(
    (option) =>
      option.title.toLowerCase().includes(normalizedKeyword) ||
      option.companyName.toLowerCase().includes(normalizedKeyword) ||
      option.label.toLowerCase().includes(normalizedKeyword)
  )
}

export function useJobPostingCache() {
  return {
    jobPostingOptions,
    loadJobPostingCache,
    getJobPostingTitle,
    getJobPostingOptions
  }
}
