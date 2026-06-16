import { UserVo, CompanyVo, JobPostingVo } from "@/api/generated/Api"

const mockUsers: UserVo[] = Array.from({ length: 50 }, (_, i) => ({
  id: `mock-user-${i + 1}`,
  name: `測試使用者 ${i + 1}`,
  email: `test${i + 1}@example.com`,
  phone: `09123456${String(i).padStart(2, "0")}`,
  disabled: i % 10 === 0
}))

const mockCompanies: CompanyVo[] = Array.from({ length: 30 }, (_, i) => ({
  id: `mock-company-${i + 1}`,
  name: `測試公司 ${i + 1}`,
  description: `這是一家測試公司 ${i + 1}`,
  websites: [`https://company${i + 1}.example.com`]
}))

const mockJobPostings: JobPostingVo[] = Array.from({ length: 40 }, (_, i) => ({
  id: `mock-job-${i + 1}`,
  companyId: `mock-company-${(i % 10) + 1}`,
  companyName: `測試公司 ${(i % 10) + 1}`,
  title: `測試職缺 ${i + 1}`,
  description: `這是測試職缺 ${i + 1} 的描述`
}))

function fuzzyMatch(text: string, keyword: string): boolean {
  return text.toLowerCase().includes(keyword.toLowerCase())
}

export function mockSearchUsers(keyword: string): { content: UserVo[] } {
  if (!keyword) return { content: [] }
  const filtered = mockUsers.filter((u) => fuzzyMatch(u.name || "", keyword) || fuzzyMatch(u.email || "", keyword))
  return { content: filtered.slice(0, 20) }
}

export function mockGetUserById(id: string): UserVo | null {
  return (
    mockUsers.find((u) => u.id === id) || {
      id,
      name: `使用者 ${id.slice(0, 8)}`,
      email: `${id}@example.com`,
      disabled: false
    }
  )
}

export function mockSearchCompanies(keyword: string): { content: CompanyVo[] } {
  if (!keyword) return { content: [] }
  const filtered = mockCompanies.filter((c) => fuzzyMatch(c.name || "", keyword))
  return { content: filtered.slice(0, 20) }
}

export function mockSearchJobPostings(keyword: string): { content: JobPostingVo[] } {
  if (!keyword) return { content: [] }
  const filtered = mockJobPostings.filter(
    (j) => fuzzyMatch(j.title || "", keyword) || fuzzyMatch(j.companyName || "", keyword)
  )
  return { content: filtered.slice(0, 20) }
}

export function mockGetJobPostingById(id: string): JobPostingVo | null {
  return (
    mockJobPostings.find((j) => j.id === id) || {
      id,
      title: `職缺 ${id.slice(0, 8)}`,
      companyName: "未知公司",
      description: ""
    }
  )
}
