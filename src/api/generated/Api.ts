/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AbstractJsonSchemaPropertyObject {
  title?: string
  readOnly?: boolean
}

export interface Item {
  type?: string
  properties?: Record<string, AbstractJsonSchemaPropertyObject>
  requiredProperties?: string[]
}

export interface JsonSchema {
  title?: string
  description?: string
  properties?: Record<string, AbstractJsonSchemaPropertyObject>
  requiredProperties?: string[]
  definitions?: Record<string, Item>
  type?: string
  $schema?: string
}

export interface RepresentationModelObject {
  _links?: Links
}

export interface EntityModelAquarkData {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  station_id?: string
  /** @format date-time */
  trans_time?: string
  /** @format float */
  rain_d?: number
  /** @format float */
  moisture?: number
  /** @format float */
  temperature?: number
  /** @format float */
  echo?: number
  /** @format float */
  waterSpeedAquark?: number
  /** @format float */
  v1?: number
  /** @format float */
  v2?: number
  /** @format float */
  v3?: number
  /** @format float */
  v4?: number
  /** @format float */
  v5?: number
  /** @format float */
  v6?: number
  /** @format float */
  v7?: number
  peak?: boolean
  csq?: string
  _links?: Links
}

export interface PageMetadata {
  /** @format int64 */
  size?: number
  /** @format int64 */
  totalElements?: number
  /** @format int64 */
  totalPages?: number
  /** @format int64 */
  number?: number
}

export interface PagedModelEntityModelAquarkData {
  _embedded?: {
    aquarkDatas?: EntityModelAquarkData[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface CollectionModelEntityModelAquarkData {
  _embedded?: {
    aquarkDatas?: EntityModelAquarkData[]
  }
  _links?: Links
}

export interface EntityModelSkill {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  name?: string
  description?: string
  _links?: Links
}

export interface PagedModelEntityModelSkill {
  _embedded?: {
    skills?: EntityModelSkill[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface CollectionModelEntityModelSkill {
  _embedded?: {
    skills?: EntityModelSkill[]
  }
  _links?: Links
}

export interface EntityModelUserRole {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  _links?: Links
}

export interface PagedModelEntityModelUserRole {
  _embedded?: {
    userRoles?: EntityModelUserRole[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface CollectionModelEntityModelUserRole {
  _embedded?: {
    userRoles?: EntityModelUserRole[]
  }
  _links?: Links
}

export interface User {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  name?: string
  email?: string
  phone?: string
  disabled?: boolean
  roleArr?: string[]
}

export interface Role {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  name?: string
  description?: string
}

export interface EntityModelProject {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  name?: string
  description?: string
  _links?: Links
}

export interface PagedModelEntityModelProject {
  _embedded?: {
    projects?: EntityModelProject[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface CollectionModelEntityModelProject {
  _embedded?: {
    projects?: EntityModelProject[]
  }
  _links?: Links
}

export interface EntityModelProjectSkill {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  _links?: Links
}

export interface PagedModelEntityModelProjectSkill {
  _embedded?: {
    projectSkills?: EntityModelProjectSkill[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface EntityModelSkillLevel {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  /** @format int32 */
  levelValue?: number
  title?: string
  description?: string
  _links?: Links
}

export interface CollectionModelObject {
  _embedded?: {
    objects?: object[]
  }
  _links?: Links
}

export interface CollectionModelEntityModelProjectSkill {
  _embedded?: {
    projectSkills?: EntityModelProjectSkill[]
  }
  _links?: Links
}

export interface EntityModelCompanyWebsite {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  url?: string
  _links?: Links
}

export interface PagedModelEntityModelCompanyWebsite {
  _embedded?: {
    companyWebsites?: EntityModelCompanyWebsite[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface EntityModelCompany {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  name?: string
  description?: string
  /** @format date */
  lastScrapedAt?: string
  _links?: Links
}

export interface EntityModelUserProject {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  _links?: Links
}

export interface PagedModelEntityModelUserProject {
  _embedded?: {
    userProjects?: EntityModelUserProject[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface CollectionModelEntityModelUserProject {
  _embedded?: {
    userProjects?: EntityModelUserProject[]
  }
  _links?: Links
}

export interface EntityModelJobPosting {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  title?: string
  url?: string
  description?: string
  requirements?: string
  responsibilities?: string
  salaryRange?: string
  /** @format date */
  postedDate?: string
  geminiAnalysis?: string
  _links?: Links
}

export interface PagedModelEntityModelJobPosting {
  _embedded?: {
    jobPostings?: EntityModelJobPosting[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface PagedModelEntityModelSkillLevel {
  _embedded?: {
    skillLevels?: EntityModelSkillLevel[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface CollectionModelEntityModelSkillLevel {
  _embedded?: {
    skillLevels?: EntityModelSkillLevel[]
  }
  _links?: Links
}

export interface EntityModelUser {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  name?: string
  email?: string
  phone?: string
  disabled?: boolean
  roleArr?: string[]
  _links?: Links
}

export interface PagedModelEntityModelUser {
  _embedded?: {
    users?: EntityModelUser[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface EntityModelRoleFunction {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  _links?: Links
}

export interface PagedModelEntityModelRoleFunction {
  _embedded?: {
    roleFunctions?: EntityModelRoleFunction[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface Function {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  name?: string
  parent?: string
  sort?: string
  /** @format int32 */
  type?: number
}

export interface PagedModelEntityModelCompany {
  _embedded?: {
    companies?: EntityModelCompany[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface CollectionModelCompanyWebsite {
  _embedded?: {
    companyWebsites?: CompanyWebsiteResponse[]
  }
  _links?: Links
}

export interface EntityModelAlertCheckLimit {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  tableName?: string
  columnName?: string
  /** @format double */
  limitValue?: number
  _links?: Links
}

export interface PagedModelEntityModelAlertCheckLimit {
  _embedded?: {
    alertCheckLimits?: EntityModelAlertCheckLimit[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface CollectionModelEntityModelAlertCheckLimit {
  _embedded?: {
    alertCheckLimits?: EntityModelAlertCheckLimit[]
  }
  _links?: Links
}

export interface EntityModelUserProjectSkill {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  _links?: Links
}

export interface PagedModelEntityModelUserProjectSkill {
  _embedded?: {
    userProjectSkills?: EntityModelUserProjectSkill[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface CollectionModelEntityModelUserProjectSkill {
  _embedded?: {
    userProjectSkills?: EntityModelUserProjectSkill[]
  }
  _links?: Links
}

export interface EntityModelUserSkill {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  _links?: Links
}

export interface PagedModelEntityModelUserSkill {
  _embedded?: {
    userSkills?: EntityModelUserSkill[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface CollectionModelEntityModelUserSkill {
  _embedded?: {
    userSkills?: EntityModelUserSkill[]
  }
  _links?: Links
}

export interface EntityModelFunction {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  name?: string
  parent?: string
  sort?: string
  /** @format int32 */
  type?: number
  _links?: Links
}

export interface PagedModelEntityModelFunction {
  _embedded?: {
    functions?: EntityModelFunction[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface CollectionModelEntityModelFunction {
  _embedded?: {
    functions?: EntityModelFunction[]
  }
  _links?: Links
}

export interface EntityModelUserJobLink {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  userNotes?: string
  geminiFeedback?: string
  _links?: Links
}

export interface PagedModelEntityModelUserJobLink {
  _embedded?: {
    userJobLinks?: EntityModelUserJobLink[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface EntityModelRole {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  name?: string
  description?: string
  _links?: Links
}

export interface PagedModelEntityModelRole {
  _embedded?: {
    roles?: EntityModelRole[]
  }
  _links?: Links
  page?: PageMetadata
}

export interface CollectionModelEntityModelRole {
  _embedded?: {
    roles?: EntityModelRole[]
  }
  _links?: Links
}

export interface AlertCheckLimitRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  tableName?: string
  columnName?: string
  /** @format double */
  limitValue?: number
}

export interface AquarkDataRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  station_id?: string
  /** @format date-time */
  trans_time?: string
  /** @format float */
  rain_d?: number
  /** @format float */
  moisture?: number
  /** @format float */
  temperature?: number
  /** @format float */
  echo?: number
  /** @format float */
  waterSpeedAquark?: number
  /** @format float */
  v1?: number
  /** @format float */
  v2?: number
  /** @format float */
  v3?: number
  /** @format float */
  v4?: number
  /** @format float */
  v5?: number
  /** @format float */
  v6?: number
  /** @format float */
  v7?: number
  peak?: boolean
  csq?: string
}

export interface CompanyRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  name?: string
  websites?: string[]
  description?: string
  /** @format date */
  lastScrapedAt?: string
}

export interface CompanyWebsiteRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  company?: string
  url?: string
}

export interface CompanyWebsiteResponse {
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  url?: string
}

export interface FunctionRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  name?: string
  parent?: string
  sort?: string
  /** @format int32 */
  type?: number
}

export interface JobPostingRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  company?: string
  title?: string
  url?: string
  description?: string
  requirements?: string
  responsibilities?: string
  salaryRange?: string
  /** @format date */
  postedDate?: string
  geminiAnalysis?: string
}

export interface ProjectSkillRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  skill?: string
  skillLevel?: string
}

export interface SkillRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  name?: string
  description?: string
}

export interface SkillLevelRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  /** @format int32 */
  levelValue?: number
  title?: string
  description?: string
}

export interface ProjectRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  name?: string
  description?: string
}

export interface RoleFunctionRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
}

export interface RoleRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  name?: string
  description?: string
}

export interface UserRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  name?: string
  email?: string
  phone?: string
  disabled?: boolean
  roleArr?: string[]
}

export interface UserJobLinkRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  user?: string
  jobPosting?: string
  userNotes?: string
  geminiFeedback?: string
}

export interface UserProjectSkillRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  skill?: string
  skillLevel?: string
}

export interface UserProjectRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  project?: string
}

export interface UserRoleRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
}

export interface UserSkillRequestBody {
  /** @format uuid */
  id?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  skill?: string
  skillLevel?: string
}

export interface PersonalProjectSkillLevelRequest {
  skillLevelId?: string
}

export interface ResponseTypeString {
  /** @format int32 */
  code?: number
  data?: string
  message?: string
  errorType?: string
}

export interface PersonalProjectRequest {
  name?: string
  description?: string
}

export interface JobPostingVo {
  id?: string
  companyId?: string
  companyName?: string
  title?: string
  url?: string
  description?: string
  requirements?: string
  responsibilities?: string
  salaryRange?: string
  /** @format date */
  postedDate?: string
  geminiAnalysis?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
}

export interface ResponseTypeJobPostingVo {
  /** @format int32 */
  code?: number
  data?: JobPostingVo
  message?: string
  errorType?: string
}

export interface UpdateCompanyRequest {
  /** @format uuid */
  id?: string
  name?: string
  websites?: string[]
  description?: string
}

export interface CompanyVo {
  id?: string
  name?: string
  websites?: string[]
  description?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
}

export interface ResponseTypeCompanyVo {
  /** @format int32 */
  code?: number
  data?: CompanyVo
  message?: string
  errorType?: string
}

export interface UserRoleRebindRequest {
  userId?: string
  roleIds: string[]
}

/** 使用者搜尋查詢參數 */
export interface UserSearchQuery {
  /**
   * 頁碼，從0開始
   * @format int32
   * @min 0
   * @example 0
   */
  page?: number
  /**
   * 每頁大小
   * @format int32
   * @min 1
   * @max 100
   * @example 20
   */
  size?: number
  /**
   * 排序欄位
   * @example "createdTime"
   */
  sortBy?: string
  /**
   * 排序方向：asc/desc
   * @example "desc"
   */
  sortDir?: string
  /**
   * 使用者名稱（模糊查詢）
   * @example "張三"
   */
  name?: string
  /**
   * 電子郵件（模糊查詢）
   * @example "user@example.com"
   */
  email?: string
  /**
   * 電話號碼（模糊查詢）
   * @example "0912345678"
   */
  phone?: string
  /**
   * 是否停用
   * @example false
   */
  disabled?: boolean
  /**
   * 創建者（精確查詢）
   * @example "admin"
   */
  createdBy?: string
  normalizedSortDir?: string
  validSortDir?: boolean
}

export interface FunctionVo {
  id?: string
  name?: string
  parent?: string
  sort?: string
  /** @format int32 */
  type?: number
  parentName?: string
  grandParentId?: string
  disabled?: boolean
  edit?: boolean
  newAdd?: boolean
  newName?: string
  delete?: boolean
}

/** 分頁結果 */
export interface PageResultUserVo {
  /** 資料列表 */
  content?: UserVo[]
  /**
   * 總記錄數
   * @format int64
   */
  totalElements?: number
  /**
   * 總頁數
   * @format int32
   */
  totalPages?: number
  /**
   * 當前頁碼（從0開始）
   * @format int32
   */
  currentPage?: number
  /**
   * 每頁大小
   * @format int32
   */
  pageSize?: number
  /** 是否有下一頁 */
  hasNext?: boolean
  /** 是否有上一頁 */
  hasPrevious?: boolean
  /** 是否為第一頁 */
  isFirst?: boolean
  /** 是否為最後一頁 */
  isLast?: boolean
}

export interface ResponseTypePageResultUserVo {
  /** @format int32 */
  code?: number
  /** 分頁結果 */
  data?: PageResultUserVo
  message?: string
  errorType?: string
}

export interface UserVo {
  id?: string
  name?: string
  email?: string
  password?: string
  phone?: string
  disabled?: boolean
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  roleArr?: string[]
  permissions?: FunctionVo[]
}

export interface UserSkillBindRequest {
  userId?: string
  skillId?: string
  skillLevelId?: string
}

export interface UserProjectBindRequest {
  userId?: string
  projectId?: string
}

export interface SkillBindingsRebindRequest {
  bindings: SkillLevelBindingItem[]
}

export interface SkillLevelBindingItem {
  skillId: string
  skillLevelId: string
}

export interface UserJobLinkVo {
  id?: string
  userId?: string
  userEmail?: string
  jobPostingId?: string
  jobTitle?: string
  companyName?: string
  userNotes?: string
  geminiFeedback?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
}

export interface ResponseTypeUserJobLinkVo {
  /** @format int32 */
  code?: number
  data?: UserJobLinkVo
  message?: string
  errorType?: string
}

export interface SkillVo {
  /** @format uuid */
  id?: string
  name?: string
  description?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  userIds?: string[]
  skillLevelId?: string
}

/** 技能搜尋查詢參數 */
export interface SkillSearchQuery {
  /**
   * 頁碼，從0開始
   * @format int32
   * @min 0
   * @example 0
   */
  page?: number
  /**
   * 每頁大小
   * @format int32
   * @min 1
   * @max 100
   * @example 20
   */
  size?: number
  /**
   * 排序欄位
   * @example "createdTime"
   */
  sortBy?: string
  /**
   * 排序方向：asc/desc
   * @example "desc"
   */
  sortDir?: string
  /**
   * 技能名稱（模糊查詢）
   * @example "Java"
   */
  name?: string
  /**
   * 技能描述（模糊查詢）
   * @example "程式語言"
   */
  description?: string
  /**
   * 創建者（精確查詢）
   * @example "admin"
   */
  createdBy?: string
  normalizedSortDir?: string
  validSortDir?: boolean
}

/** 分頁結果 */
export interface PageResultSkillVo {
  /** 資料列表 */
  content?: SkillVo[]
  /**
   * 總記錄數
   * @format int64
   */
  totalElements?: number
  /**
   * 總頁數
   * @format int32
   */
  totalPages?: number
  /**
   * 當前頁碼（從0開始）
   * @format int32
   */
  currentPage?: number
  /**
   * 每頁大小
   * @format int32
   */
  pageSize?: number
  /** 是否有下一頁 */
  hasNext?: boolean
  /** 是否有上一頁 */
  hasPrevious?: boolean
  /** 是否為第一頁 */
  isFirst?: boolean
  /** 是否為最後一頁 */
  isLast?: boolean
}

export interface ResponseTypePageResultSkillVo {
  /** @format int32 */
  code?: number
  /** 分頁結果 */
  data?: PageResultSkillVo
  message?: string
  errorType?: string
}

export interface PersonalSkillRequest {
  name?: string
  description?: string
  skillLevelId?: string
  /** @format int32 */
  skillLevelValue?: number
  skillLevelTitle?: string
  skillLevelDescription?: string
}

export interface PersonalSkillLevelRequest {
  skillLevelId?: string
}

export interface ResponseTypeSkillVo {
  /** @format int32 */
  code?: number
  data?: SkillVo
  message?: string
  errorType?: string
}

export interface SkillLevelVo {
  id?: string
  skillId?: string
  /** @format int32 */
  levelValue?: number
  title?: string
  description?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
}

/** 技能等級搜尋查詢參數 */
export interface SkillLevelSearchQuery {
  /**
   * 頁碼，從0開始
   * @format int32
   * @min 0
   * @example 0
   */
  page?: number
  /**
   * 每頁大小
   * @format int32
   * @min 1
   * @max 100
   * @example 20
   */
  size?: number
  /**
   * 排序欄位
   * @example "createdTime"
   */
  sortBy?: string
  /**
   * 排序方向：asc/desc
   * @example "desc"
   */
  sortDir?: string
  /**
   * 技能ID（精確查詢）
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  skillId?: string
  /**
   * 等級數值（精確查詢）
   * @format int32
   * @example 3
   */
  levelValue?: number
  /**
   * 等級標題（模糊查詢）
   * @example "高級"
   */
  title?: string
  /**
   * 等級描述（模糊查詢）
   * @example "精通"
   */
  description?: string
  /**
   * 創建者（精確查詢）
   * @example "admin"
   */
  createdBy?: string
  normalizedSortDir?: string
  validSortDir?: boolean
}

/** 分頁結果 */
export interface PageResultSkillLevelVo {
  /** 資料列表 */
  content?: SkillLevelVo[]
  /**
   * 總記錄數
   * @format int64
   */
  totalElements?: number
  /**
   * 總頁數
   * @format int32
   */
  totalPages?: number
  /**
   * 當前頁碼（從0開始）
   * @format int32
   */
  currentPage?: number
  /**
   * 每頁大小
   * @format int32
   */
  pageSize?: number
  /** 是否有下一頁 */
  hasNext?: boolean
  /** 是否有上一頁 */
  hasPrevious?: boolean
  /** 是否為第一頁 */
  isFirst?: boolean
  /** 是否為最後一頁 */
  isLast?: boolean
}

export interface ResponseTypePageResultSkillLevelVo {
  /** @format int32 */
  code?: number
  /** 分頁結果 */
  data?: PageResultSkillLevelVo
  message?: string
  errorType?: string
}

export interface ResponseTypeSkillLevelVo {
  /** @format int32 */
  code?: number
  data?: SkillLevelVo
  message?: string
  errorType?: string
}

/** 當前使用者技能資訊（含來源） */
export interface CurrentUserSkillVo {
  /**
   * 技能ID
   * @format uuid
   */
  id?: string
  /** 技能名稱 */
  name?: string
  /** 技能描述 */
  description?: string
  /** 創建者 */
  createdBy?: string
  /** 更新者 */
  updatedBy?: string
  /**
   * 創建時間
   * @format date-time
   */
  createdTime?: string
  /**
   * 更新時間
   * @format date-time
   */
  updatedTime?: string
  /** 來源類型：USER（直接綁定）或 PROJECT（專案技能）。管理者指派到使用者的技能屬於 USER 來源但視為唯讀（不可透過個人技能 API 修改內容）；可依權限進行綁定關聯。 */
  sourceType?: string
  /**
   * 專案ID（當 sourceType 為 PROJECT 時有值）
   * @format uuid
   */
  projectId?: string
  /** 專案名稱（當 sourceType 為 PROJECT 時有值） */
  projectName?: string
}

/** 分頁結果 */
export interface PageResultCurrentUserSkillVo {
  /** 資料列表 */
  content?: CurrentUserSkillVo[]
  /**
   * 總記錄數
   * @format int64
   */
  totalElements?: number
  /**
   * 總頁數
   * @format int32
   */
  totalPages?: number
  /**
   * 當前頁碼（從0開始）
   * @format int32
   */
  currentPage?: number
  /**
   * 每頁大小
   * @format int32
   */
  pageSize?: number
  /** 是否有下一頁 */
  hasNext?: boolean
  /** 是否有上一頁 */
  hasPrevious?: boolean
  /** 是否為第一頁 */
  isFirst?: boolean
  /** 是否為最後一頁 */
  isLast?: boolean
}

export interface ResponseTypePageResultCurrentUserSkillVo {
  /** @format int32 */
  code?: number
  /** 分頁結果 */
  data?: PageResultCurrentUserSkillVo
  message?: string
  errorType?: string
}

export interface PermissionVo {
  user?: string
  userList?: string[]
  function?: string
  functionList?: string[]
  role?: string
  roleList?: string[]
}

export interface ResponseTypeUserVo {
  /** @format int32 */
  code?: number
  data?: UserVo
  message?: string
  errorType?: string
}

export interface RoleOutVo {
  /** @format uuid */
  id?: string
  name?: string
  description?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  functionIds?: string[]
}

export interface ResponseTypeRoleOutVo {
  /** @format int32 */
  code?: number
  data?: RoleOutVo
  message?: string
  errorType?: string
}

/** 角色搜尋查詢參數 */
export interface RoleSearchQuery {
  /**
   * 頁碼，從0開始
   * @format int32
   * @min 0
   * @example 0
   */
  page?: number
  /**
   * 每頁大小
   * @format int32
   * @min 1
   * @max 100
   * @example 20
   */
  size?: number
  /**
   * 排序欄位
   * @example "createdTime"
   */
  sortBy?: string
  /**
   * 排序方向：asc/desc
   * @example "desc"
   */
  sortDir?: string
  /**
   * 角色名稱（模糊查詢）
   * @example "管理員"
   */
  name?: string
  /**
   * 角色描述（模糊查詢）
   * @example "系統管理"
   */
  description?: string
  /**
   * 創建者（精確查詢）
   * @example "admin"
   */
  createdBy?: string
  normalizedSortDir?: string
  validSortDir?: boolean
}

/** 分頁結果 */
export interface PageResultRoleOutVo {
  /** 資料列表 */
  content?: RoleOutVo[]
  /**
   * 總記錄數
   * @format int64
   */
  totalElements?: number
  /**
   * 總頁數
   * @format int32
   */
  totalPages?: number
  /**
   * 當前頁碼（從0開始）
   * @format int32
   */
  currentPage?: number
  /**
   * 每頁大小
   * @format int32
   */
  pageSize?: number
  /** 是否有下一頁 */
  hasNext?: boolean
  /** 是否有上一頁 */
  hasPrevious?: boolean
  /** 是否為第一頁 */
  isFirst?: boolean
  /** 是否為最後一頁 */
  isLast?: boolean
}

export interface ResponseTypePageResultRoleOutVo {
  /** @format int32 */
  code?: number
  /** 分頁結果 */
  data?: PageResultRoleOutVo
  message?: string
  errorType?: string
}

export interface ResponseTypeListRoleOutVo {
  /** @format int32 */
  code?: number
  data?: RoleOutVo[]
  message?: string
  errorType?: string
}

export interface ResponseTypeListUserVo {
  /** @format int32 */
  code?: number
  data?: UserVo[]
  message?: string
  errorType?: string
}

export interface ResponseTypeListFunctionVo {
  /** @format int32 */
  code?: number
  data?: FunctionVo[]
  message?: string
  errorType?: string
}

export interface ResponseTypeFunctionVo {
  /** @format int32 */
  code?: number
  data?: FunctionVo
  message?: string
  errorType?: string
}

export interface ProjectVo {
  /** @format uuid */
  id?: string
  name?: string
  description?: string
  createdBy?: string
  updatedBy?: string
  /** @format date-time */
  createdTime?: string
  /** @format date-time */
  updatedTime?: string
  userIds?: string[]
}

/** 專案搜尋查詢參數 */
export interface ProjectSearchQuery {
  /**
   * 頁碼，從0開始
   * @format int32
   * @min 0
   * @example 0
   */
  page?: number
  /**
   * 每頁大小
   * @format int32
   * @min 1
   * @max 100
   * @example 20
   */
  size?: number
  /**
   * 排序欄位
   * @example "createdTime"
   */
  sortBy?: string
  /**
   * 排序方向：asc/desc
   * @example "desc"
   */
  sortDir?: string
  /**
   * 專案名稱（模糊查詢）
   * @example "電商系統"
   */
  name?: string
  /**
   * 專案描述（模糊查詢）
   * @example "線上購物"
   */
  description?: string
  /**
   * 創建者（精確查詢）
   * @example "admin"
   */
  createdBy?: string
  normalizedSortDir?: string
  validSortDir?: boolean
}

/** 分頁結果 */
export interface PageResultProjectVo {
  /** 資料列表 */
  content?: ProjectVo[]
  /**
   * 總記錄數
   * @format int64
   */
  totalElements?: number
  /**
   * 總頁數
   * @format int32
   */
  totalPages?: number
  /**
   * 當前頁碼（從0開始）
   * @format int32
   */
  currentPage?: number
  /**
   * 每頁大小
   * @format int32
   */
  pageSize?: number
  /** 是否有下一頁 */
  hasNext?: boolean
  /** 是否有上一頁 */
  hasPrevious?: boolean
  /** 是否為第一頁 */
  isFirst?: boolean
  /** 是否為最後一頁 */
  isLast?: boolean
}

export interface ResponseTypePageResultProjectVo {
  /** @format int32 */
  code?: number
  /** 分頁結果 */
  data?: PageResultProjectVo
  message?: string
  errorType?: string
}

export interface PersonalProjectSkillBindRequest {
  skillId?: string
  skillLevelId?: string
}

export interface ResponseTypeProjectVo {
  /** @format int32 */
  code?: number
  data?: ProjectVo
  message?: string
  errorType?: string
}

export interface ProjectSkillBindRequest {
  projectId?: string
  skillId?: string
  skillLevelId?: string
}

export interface ResponseTypeListJobPostingVo {
  /** @format int32 */
  code?: number
  data?: JobPostingVo[]
  message?: string
  errorType?: string
}

export interface CreateJobPostingRequest {
  companyId: string
  title: string
  url: string
  description?: string
  requirements?: string
  responsibilities?: string
  salaryRange?: string
  /** @format date */
  postedDate?: string
}

/** 功能搜尋查詢參數 */
export interface FunctionSearchQuery {
  /**
   * 頁碼，從0開始
   * @format int32
   * @min 0
   * @example 0
   */
  page?: number
  /**
   * 每頁大小
   * @format int32
   * @min 1
   * @max 100
   * @example 20
   */
  size?: number
  /**
   * 排序欄位
   * @example "createdTime"
   */
  sortBy?: string
  /**
   * 排序方向：asc/desc
   * @example "desc"
   */
  sortDir?: string
  /**
   * 功能名稱（模糊查詢）
   * @example "使用者管理"
   */
  name?: string
  /**
   * 父功能ID（精確查詢）
   * @example "uuid"
   */
  parent?: string
  /**
   * 功能類型（精確查詢）
   * @format int32
   * @example 1
   */
  type?: number
  /**
   * 創建者（精確查詢）
   * @example "admin"
   */
  createdBy?: string
  normalizedSortDir?: string
  validSortDir?: boolean
}

/** 分頁結果 */
export interface PageResultFunctionVo {
  /** 資料列表 */
  content?: FunctionVo[]
  /**
   * 總記錄數
   * @format int64
   */
  totalElements?: number
  /**
   * 總頁數
   * @format int32
   */
  totalPages?: number
  /**
   * 當前頁碼（從0開始）
   * @format int32
   */
  currentPage?: number
  /**
   * 每頁大小
   * @format int32
   */
  pageSize?: number
  /** 是否有下一頁 */
  hasNext?: boolean
  /** 是否有上一頁 */
  hasPrevious?: boolean
  /** 是否為第一頁 */
  isFirst?: boolean
  /** 是否為最後一頁 */
  isLast?: boolean
}

export interface ResponseTypePageResultFunctionVo {
  /** @format int32 */
  code?: number
  /** 分頁結果 */
  data?: PageResultFunctionVo
  message?: string
  errorType?: string
}

export interface FunctionTransVo {
  deleteFunction?: FunctionVo[]
  saveMainFunction?: FunctionVo[]
  saveFunctionNewChild?: FunctionVo[]
}

export interface ResponseTypeObject {
  /** @format int32 */
  code?: number
  data?: object
  message?: string
  errorType?: string
}

export interface CreateCompanyRequest {
  name: string
  websites: string[]
  description?: string
}

export interface SuperUserRequest {
  key?: string
  email?: string
}

export interface SignupRequest {
  email?: string
  password?: string
}

export interface ResponseTypeToken {
  /** @format int32 */
  code?: number
  data?: Token
  message?: string
  errorType?: string
}

export interface Token {
  accessToken?: string
}

export interface LoginRequest {
  email?: string
  password?: string
}

export interface CriteriaAPIFilter {
  columnName?: string
  /** @format int32 */
  type?: number
  string?: string
  /** @format double */
  doubleValue?: number
  /** @format date-time */
  date?: string
  booleanValue?: boolean
  large?: boolean
  small?: boolean
  like?: boolean
  equal?: boolean
}

export interface AquarkDataRaw {
  id?: string
  station_id?: string
  obs_time?: string
  /** @format date-time */
  trans_time?: string
  /** @format float */
  rain_d?: number
  /** @format float */
  moisture?: number
  /** @format float */
  temperature?: number
  /** @format float */
  echo?: number
  /** @format float */
  waterSpeedAquark?: number
  /** @format float */
  v1?: number
  /** @format float */
  v2?: number
  /** @format float */
  v3?: number
  /** @format float */
  v4?: number
  /** @format float */
  v5?: number
  /** @format float */
  v6?: number
  /** @format float */
  v7?: number
  peak?: boolean
  csq?: string
}

export interface ResponseTypeListAquarkDataRaw {
  /** @format int32 */
  code?: number
  data?: AquarkDataRaw[]
  message?: string
  errorType?: string
}

export interface TimeRange {
  /** @format date-time */
  start?: string
  /** @format date-time */
  end?: string
}

export interface AverageAquark {
  station_id?: string
  /** @format date-time */
  trans_time?: string
  date?: string
  dateHour?: string
  /** @format float */
  rain_d?: number
  /** @format float */
  moisture?: number
  /** @format float */
  temperature?: number
  /** @format float */
  echo?: number
  /** @format float */
  waterSpeedAquark?: number
  /** @format float */
  v1?: number
  /** @format float */
  v2?: number
  /** @format float */
  v3?: number
  /** @format float */
  v4?: number
  /** @format float */
  v5?: number
  /** @format float */
  v6?: number
  /** @format float */
  v7?: number
}

export interface ResponseTypeListAverageAquark {
  /** @format int32 */
  code?: number
  data?: AverageAquark[]
  message?: string
  errorType?: string
}

export interface AlertCheckLimitVo {
  /** @format uuid */
  id?: string
  tableName?: string
  columnName?: string
  /** @format double */
  limitValue?: number
}

export interface ResponseTypeAlertCheckLimitVo {
  /** @format int32 */
  code?: number
  data?: AlertCheckLimitVo
  message?: string
  errorType?: string
}

/** 告警檢查限制搜尋查詢參數 */
export interface AlertCheckLimitSearchQuery {
  /**
   * 頁碼，從0開始
   * @format int32
   * @min 0
   * @example 0
   */
  page?: number
  /**
   * 每頁大小
   * @format int32
   * @min 1
   * @max 100
   * @example 20
   */
  size?: number
  /**
   * 排序欄位
   * @example "createdTime"
   */
  sortBy?: string
  /**
   * 排序方向：asc/desc
   * @example "desc"
   */
  sortDir?: string
  /**
   * 表名（模糊查詢）
   * @example "user"
   */
  tableName?: string
  /**
   * 欄位名（模糊查詢）
   * @example "age"
   */
  columnName?: string
  /**
   * 限制值最小值（範圍查詢）
   * @format double
   * @example 0
   */
  limitValueMin?: number
  /**
   * 限制值最大值（範圍查詢）
   * @format double
   * @example 100
   */
  limitValueMax?: number
  /**
   * 創建者（精確查詢）
   * @example "admin"
   */
  createdBy?: string
  normalizedSortDir?: string
  validSortDir?: boolean
}

/** 分頁結果 */
export interface PageResultAlertCheckLimitVo {
  /** 資料列表 */
  content?: AlertCheckLimitVo[]
  /**
   * 總記錄數
   * @format int64
   */
  totalElements?: number
  /**
   * 總頁數
   * @format int32
   */
  totalPages?: number
  /**
   * 當前頁碼（從0開始）
   * @format int32
   */
  currentPage?: number
  /**
   * 每頁大小
   * @format int32
   */
  pageSize?: number
  /** 是否有下一頁 */
  hasNext?: boolean
  /** 是否有上一頁 */
  hasPrevious?: boolean
  /** 是否為第一頁 */
  isFirst?: boolean
  /** 是否為最後一頁 */
  isLast?: boolean
}

export interface ResponseTypePageResultAlertCheckLimitVo {
  /** @format int32 */
  code?: number
  /** 分頁結果 */
  data?: PageResultAlertCheckLimitVo
  message?: string
  errorType?: string
}

export interface UserSkillRebindRequest {
  userId: string
  bindings: SkillLevelBindingItem[]
}

export interface UserProjectRebindRequest {
  userId: string
  projectIds: string[]
}

export interface ProjectSkillRebindRequest {
  projectId: string
  bindings: SkillLevelBindingItem[]
}

export interface MemberSkillBindings {
  userId: string
  skills?: SkillLevelBindingItem[]
}

export interface ProjectMemberSkillsRebindRequest {
  projectId: string
  members: MemberSkillBindings[]
}

export interface ResponseTypeListUserJobLinkVo {
  /** @format int32 */
  code?: number
  data?: UserJobLinkVo[]
  message?: string
  errorType?: string
}

export interface ResponseTypeListSkillLevelVo {
  /** @format int32 */
  code?: number
  data?: SkillLevelVo[]
  message?: string
  errorType?: string
}

export interface ResponseTypeListSkillVo {
  /** @format int32 */
  code?: number
  data?: SkillVo[]
  message?: string
  errorType?: string
}

export interface ResponseTypeListCurrentUserSkillVo {
  /** @format int32 */
  code?: number
  data?: CurrentUserSkillVo[]
  message?: string
  errorType?: string
}

/** 專案綁定的技能與詳細等級資訊 */
export interface ProjectSkillVo {
  /**
   * 專案ID
   * @format uuid
   */
  projectId?: string
  /**
   * 技能ID
   * @format uuid
   */
  skillId?: string
  /** 技能名稱 */
  skillName?: string
  /** 技能描述 */
  skillDescription?: string
  /**
   * 技能等級ID
   * @format uuid
   */
  skillLevelId?: string
  /**
   * 技能等級數值
   * @format int32
   */
  levelValue?: number
  /** 技能等級標題 */
  levelTitle?: string
  /** 技能等級描述 */
  levelDescription?: string
}

export interface ResponseTypeListProjectSkillVo {
  /** @format int32 */
  code?: number
  data?: ProjectSkillVo[]
  message?: string
  errorType?: string
}

export interface MemberSkillLevelVo {
  skillId?: string
  skillName?: string
  skillLevelId?: string
  levelTitle?: string
  /** @format int32 */
  levelValue?: number
}

export interface ProjectMemberSkillVo {
  userId?: string
  userEmail?: string
  skills?: MemberSkillLevelVo[]
}

export interface ResponseTypeListProjectMemberSkillVo {
  /** @format int32 */
  code?: number
  data?: ProjectMemberSkillVo[]
  message?: string
  errorType?: string
}

export interface ResponseTypeListProjectVo {
  /** @format int32 */
  code?: number
  data?: ProjectVo[]
  message?: string
  errorType?: string
}

export interface ResponseTypeListCompanyVo {
  /** @format int32 */
  code?: number
  data?: CompanyVo[]
  message?: string
  errorType?: string
}

export interface ResponseTypeListString {
  /** @format int32 */
  code?: number
  data?: string[]
  message?: string
  errorType?: string
}

export interface ResponseTypeListAlertCheckLimitVo {
  /** @format int32 */
  code?: number
  data?: AlertCheckLimitVo[]
  message?: string
  errorType?: string
}

export interface Link {
  href?: string
  hreflang?: string
  title?: string
  type?: string
  deprecation?: string
  profile?: string
  name?: string
  templated?: boolean
}

export type Links = Record<string, Link>

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios"
import axios from "axios"

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain"
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"]
  private secure?: boolean
  private format?: ResponseType

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:8000"
    })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] = property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<ApiResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body)
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {})
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path
    })
  }
}

/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://localhost:8000
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http
  }

  alertCheckLimitEntityController = {
    /**
     * @description get-alertchecklimit
     *
     * @tags alert-check-limit-entity-controller
     * @name GetCollectionResourceAlertchecklimitGet
     * @request GET:/alertCheckLimits
     * @response `200` `PagedModelEntityModelAlertCheckLimit` OK
     */
    "getCollectionResource-alertchecklimit-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelAlertCheckLimit, any>({
        path: `/alertCheckLimits`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-alertchecklimit
     *
     * @tags alert-check-limit-entity-controller
     * @name PostCollectionResourceAlertchecklimitPost
     * @request POST:/alertCheckLimits
     * @response `201` `EntityModelAlertCheckLimit` Created
     */
    "postCollectionResource-alertchecklimit-post": (data: AlertCheckLimitRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelAlertCheckLimit, any>({
        path: `/alertCheckLimits`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-alertchecklimit
     *
     * @tags alert-check-limit-entity-controller
     * @name GetItemResourceAlertchecklimitGet
     * @request GET:/alertCheckLimits/{id}
     * @response `200` `EntityModelAlertCheckLimit` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-alertchecklimit-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelAlertCheckLimit, any>({
        path: `/alertCheckLimits/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-alertchecklimit
     *
     * @tags alert-check-limit-entity-controller
     * @name PutItemResourceAlertchecklimitPut
     * @request PUT:/alertCheckLimits/{id}
     * @response `200` `EntityModelAlertCheckLimit` OK
     * @response `201` `EntityModelAlertCheckLimit` Created
     * @response `204` `any` No Content
     */
    "putItemResource-alertchecklimit-put": (id: string, data: AlertCheckLimitRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelAlertCheckLimit, any>({
        path: `/alertCheckLimits/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-alertchecklimit
     *
     * @tags alert-check-limit-entity-controller
     * @name DeleteItemResourceAlertchecklimitDelete
     * @request DELETE:/alertCheckLimits/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-alertchecklimit-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/alertCheckLimits/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-alertchecklimit
     *
     * @tags alert-check-limit-entity-controller
     * @name PatchItemResourceAlertchecklimitPatch
     * @request PATCH:/alertCheckLimits/{id}
     * @response `200` `EntityModelAlertCheckLimit` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-alertchecklimit-patch": (
      id: string,
      data: AlertCheckLimitRequestBody,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelAlertCheckLimit, any>({
        path: `/alertCheckLimits/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  alertCheckLimitSearchController = {
    /**
     * No description
     *
     * @tags alert-check-limit-search-controller
     * @name ExecuteSearchAlertchecklimitGet
     * @request GET:/alertCheckLimits/search/findAlertCheckLimitByTableNameAndColumnName
     * @response `200` `CollectionModelEntityModelAlertCheckLimit` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-alertchecklimit-get": (
      query?: {
        tableName?: string
        columnName?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelAlertCheckLimit, any>({
        path: `/alertCheckLimits/search/findAlertCheckLimitByTableNameAndColumnName`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      })
  }
  aquarkDataEntityController = {
    /**
     * @description get-aquarkdata
     *
     * @tags aquark-data-entity-controller
     * @name GetCollectionResourceAquarkdataGet
     * @request GET:/aquarkDatas
     * @response `200` `PagedModelEntityModelAquarkData` OK
     */
    "getCollectionResource-aquarkdata-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelAquarkData, any>({
        path: `/aquarkDatas`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-aquarkdata
     *
     * @tags aquark-data-entity-controller
     * @name PostCollectionResourceAquarkdataPost
     * @request POST:/aquarkDatas
     * @response `201` `EntityModelAquarkData` Created
     */
    "postCollectionResource-aquarkdata-post": (data: AquarkDataRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelAquarkData, any>({
        path: `/aquarkDatas`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-aquarkdata
     *
     * @tags aquark-data-entity-controller
     * @name GetItemResourceAquarkdataGet
     * @request GET:/aquarkDatas/{id}
     * @response `200` `EntityModelAquarkData` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-aquarkdata-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelAquarkData, any>({
        path: `/aquarkDatas/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-aquarkdata
     *
     * @tags aquark-data-entity-controller
     * @name PutItemResourceAquarkdataPut
     * @request PUT:/aquarkDatas/{id}
     * @response `200` `EntityModelAquarkData` OK
     * @response `201` `EntityModelAquarkData` Created
     * @response `204` `any` No Content
     */
    "putItemResource-aquarkdata-put": (id: string, data: AquarkDataRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelAquarkData, any>({
        path: `/aquarkDatas/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-aquarkdata
     *
     * @tags aquark-data-entity-controller
     * @name DeleteItemResourceAquarkdataDelete
     * @request DELETE:/aquarkDatas/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-aquarkdata-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/aquarkDatas/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-aquarkdata
     *
     * @tags aquark-data-entity-controller
     * @name PatchItemResourceAquarkdataPatch
     * @request PATCH:/aquarkDatas/{id}
     * @response `200` `EntityModelAquarkData` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-aquarkdata-patch": (id: string, data: AquarkDataRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelAquarkData, any>({
        path: `/aquarkDatas/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  aquarkDataSearchController = {
    /**
     * No description
     *
     * @tags aquark-data-search-controller
     * @name ExecuteSearchAquarkdataGet
     * @request GET:/aquarkDatas/search/findAquarkDataByStation_idAndTrans_time
     * @response `200` `CollectionModelEntityModelAquarkData` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-aquarkdata-get": (
      query?: {
        station_id?: string
        /** @format date-time */
        trans_time?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelAquarkData, any>({
        path: `/aquarkDatas/search/findAquarkDataByStation_idAndTrans_time`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags aquark-data-search-controller
     * @name ExecuteSearchAquarkdataGet1
     * @request GET:/aquarkDatas/search/getAquarkDataQueryAllColumn
     * @response `200` `CollectionModelEntityModelAquarkData` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-aquarkdata-get_1": (params: RequestParams = {}) =>
      this.http.request<CollectionModelEntityModelAquarkData, any>({
        path: `/aquarkDatas/search/getAquarkDataQueryAllColumn`,
        method: "GET",
        format: "json",
        ...params
      })
  }
  companyEntityController = {
    /**
     * @description get-company
     *
     * @tags company-entity-controller
     * @name GetCollectionResourceCompanyGet
     * @request GET:/companies
     * @response `200` `PagedModelEntityModelCompany` OK
     */
    "getCollectionResource-company-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelCompany, any>({
        path: `/companies`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-company
     *
     * @tags company-entity-controller
     * @name PostCollectionResourceCompanyPost
     * @request POST:/companies
     * @response `201` `EntityModelCompany` Created
     */
    "postCollectionResource-company-post": (data: CompanyRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelCompany, any>({
        path: `/companies`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-company
     *
     * @tags company-entity-controller
     * @name GetItemResourceCompanyGet
     * @request GET:/companies/{id}
     * @response `200` `EntityModelCompany` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-company-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelCompany, any>({
        path: `/companies/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-company
     *
     * @tags company-entity-controller
     * @name PutItemResourceCompanyPut
     * @request PUT:/companies/{id}
     * @response `200` `EntityModelCompany` OK
     * @response `201` `EntityModelCompany` Created
     * @response `204` `any` No Content
     */
    "putItemResource-company-put": (id: string, data: CompanyRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelCompany, any>({
        path: `/companies/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-company
     *
     * @tags company-entity-controller
     * @name DeleteItemResourceCompanyDelete
     * @request DELETE:/companies/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-company-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/companies/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-company
     *
     * @tags company-entity-controller
     * @name PatchItemResourceCompanyPatch
     * @request PATCH:/companies/{id}
     * @response `200` `EntityModelCompany` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-company-patch": (id: string, data: CompanyRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelCompany, any>({
        path: `/companies/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  companyPropertyReferenceController = {
    /**
     * @description get-companywebsite-by-company-Id
     *
     * @tags company-property-reference-controller
     * @name FollowPropertyReferenceCompanyGet
     * @request GET:/companies/{id}/websites
     * @response `200` `CollectionModelCompanyWebsite` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-company-get": (id: string, params: RequestParams = {}) =>
      this.http.request<CollectionModelCompanyWebsite, any>({
        path: `/companies/${id}/websites`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-companywebsite-by-company-Id
     *
     * @tags company-property-reference-controller
     * @name CreatePropertyReferenceCompanyPut
     * @request PUT:/companies/{id}/websites
     * @response `200` `CollectionModelCompanyWebsite` OK
     * @response `201` `CollectionModelCompanyWebsite` Created
     * @response `204` `any` No Content
     */
    "createPropertyReference-company-put": (id: string, data: CollectionModelObject, params: RequestParams = {}) =>
      this.http.request<CollectionModelCompanyWebsite, any>({
        path: `/companies/${id}/websites`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-companywebsite-by-company-Id
     *
     * @tags company-property-reference-controller
     * @name DeletePropertyReferenceCompanyDelete
     * @request DELETE:/companies/{id}/websites
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReference-company-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/companies/${id}/websites`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-companywebsite-by-company-Id
     *
     * @tags company-property-reference-controller
     * @name CreatePropertyReferenceCompanyPatch
     * @request PATCH:/companies/{id}/websites
     * @response `200` `CollectionModelCompanyWebsite` OK
     * @response `204` `any` No Content
     */
    "createPropertyReference-company-patch": (id: string, data: CollectionModelObject, params: RequestParams = {}) =>
      this.http.request<CollectionModelCompanyWebsite, any>({
        path: `/companies/${id}/websites`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-companywebsite-by-company-Id
     *
     * @tags company-property-reference-controller
     * @name FollowPropertyReferenceCompanyGet1
     * @request GET:/companies/{id}/websites/{propertyId}
     * @response `200` `CollectionModelCompanyWebsite` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-company-get_1": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<CollectionModelCompanyWebsite, any>({
        path: `/companies/${id}/websites/${propertyId}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description delete-companywebsite-by-company-Id
     *
     * @tags company-property-reference-controller
     * @name DeletePropertyReferenceIdCompanyDelete
     * @request DELETE:/companies/{id}/websites/{propertyId}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReferenceId-company-delete": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/companies/${id}/websites/${propertyId}`,
        method: "DELETE",
        ...params
      })
  }
  companyWebsiteEntityController = {
    /**
     * @description get-companywebsite
     *
     * @tags company-website-entity-controller
     * @name GetCollectionResourceCompanywebsiteGet
     * @request GET:/companyWebsites
     * @response `200` `PagedModelEntityModelCompanyWebsite` OK
     */
    "getCollectionResource-companywebsite-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelCompanyWebsite, any>({
        path: `/companyWebsites`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-companywebsite
     *
     * @tags company-website-entity-controller
     * @name PostCollectionResourceCompanywebsitePost
     * @request POST:/companyWebsites
     * @response `201` `EntityModelCompanyWebsite` Created
     */
    "postCollectionResource-companywebsite-post": (data: CompanyWebsiteRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelCompanyWebsite, any>({
        path: `/companyWebsites`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-companywebsite
     *
     * @tags company-website-entity-controller
     * @name GetItemResourceCompanywebsiteGet
     * @request GET:/companyWebsites/{id}
     * @response `200` `EntityModelCompanyWebsite` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-companywebsite-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelCompanyWebsite, any>({
        path: `/companyWebsites/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-companywebsite
     *
     * @tags company-website-entity-controller
     * @name PutItemResourceCompanywebsitePut
     * @request PUT:/companyWebsites/{id}
     * @response `200` `EntityModelCompanyWebsite` OK
     * @response `201` `EntityModelCompanyWebsite` Created
     * @response `204` `any` No Content
     */
    "putItemResource-companywebsite-put": (id: string, data: CompanyWebsiteRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelCompanyWebsite, any>({
        path: `/companyWebsites/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-companywebsite
     *
     * @tags company-website-entity-controller
     * @name DeleteItemResourceCompanywebsiteDelete
     * @request DELETE:/companyWebsites/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-companywebsite-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/companyWebsites/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-companywebsite
     *
     * @tags company-website-entity-controller
     * @name PatchItemResourceCompanywebsitePatch
     * @request PATCH:/companyWebsites/{id}
     * @response `200` `EntityModelCompanyWebsite` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-companywebsite-patch": (
      id: string,
      data: CompanyWebsiteRequestBody,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelCompanyWebsite, any>({
        path: `/companyWebsites/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  companyWebsitePropertyReferenceController = {
    /**
     * @description get-company-by-companywebsite-Id
     *
     * @tags company-website-property-reference-controller
     * @name FollowPropertyReferenceCompanywebsiteGet
     * @request GET:/companyWebsites/{id}/company
     * @response `200` `EntityModelCompany` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-companywebsite-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelCompany, any>({
        path: `/companyWebsites/${id}/company`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-company-by-companywebsite-Id
     *
     * @tags company-website-property-reference-controller
     * @name CreatePropertyReferenceCompanywebsitePut
     * @request PUT:/companyWebsites/{id}/company
     * @response `200` `EntityModelCompany` OK
     * @response `201` `EntityModelCompany` Created
     * @response `204` `any` No Content
     */
    "createPropertyReference-companywebsite-put": (
      id: string,
      data: CollectionModelObject,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelCompany, any>({
        path: `/companyWebsites/${id}/company`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-company-by-companywebsite-Id
     *
     * @tags company-website-property-reference-controller
     * @name DeletePropertyReferenceCompanywebsiteDelete
     * @request DELETE:/companyWebsites/{id}/company
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReference-companywebsite-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/companyWebsites/${id}/company`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-company-by-companywebsite-Id
     *
     * @tags company-website-property-reference-controller
     * @name CreatePropertyReferenceCompanywebsitePatch
     * @request PATCH:/companyWebsites/{id}/company
     * @response `200` `EntityModelCompany` OK
     * @response `204` `any` No Content
     */
    "createPropertyReference-companywebsite-patch": (
      id: string,
      data: CollectionModelObject,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelCompany, any>({
        path: `/companyWebsites/${id}/company`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-company-by-companywebsite-Id
     *
     * @tags company-website-property-reference-controller
     * @name FollowPropertyReferenceCompanywebsiteGet1
     * @request GET:/companyWebsites/{id}/company/{propertyId}
     * @response `200` `EntityModelCompany` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-companywebsite-get_1": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<EntityModelCompany, any>({
        path: `/companyWebsites/${id}/company/${propertyId}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description delete-company-by-companywebsite-Id
     *
     * @tags company-website-property-reference-controller
     * @name DeletePropertyReferenceIdCompanywebsiteDelete
     * @request DELETE:/companyWebsites/{id}/company/{propertyId}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReferenceId-companywebsite-delete": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/companyWebsites/${id}/company/${propertyId}`,
        method: "DELETE",
        ...params
      })
  }
  functionEntityController = {
    /**
     * @description get-function
     *
     * @tags function-entity-controller
     * @name GetCollectionResourceFunctionGet
     * @request GET:/functions
     * @response `200` `PagedModelEntityModelFunction` OK
     */
    "getCollectionResource-function-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelFunction, any>({
        path: `/functions`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-function
     *
     * @tags function-entity-controller
     * @name PostCollectionResourceFunctionPost
     * @request POST:/functions
     * @response `201` `EntityModelFunction` Created
     */
    "postCollectionResource-function-post": (data: FunctionRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelFunction, any>({
        path: `/functions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-function
     *
     * @tags function-entity-controller
     * @name GetItemResourceFunctionGet
     * @request GET:/functions/{id}
     * @response `200` `EntityModelFunction` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-function-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelFunction, any>({
        path: `/functions/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-function
     *
     * @tags function-entity-controller
     * @name PutItemResourceFunctionPut
     * @request PUT:/functions/{id}
     * @response `200` `EntityModelFunction` OK
     * @response `201` `EntityModelFunction` Created
     * @response `204` `any` No Content
     */
    "putItemResource-function-put": (id: string, data: FunctionRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelFunction, any>({
        path: `/functions/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-function
     *
     * @tags function-entity-controller
     * @name DeleteItemResourceFunctionDelete
     * @request DELETE:/functions/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-function-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/functions/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-function
     *
     * @tags function-entity-controller
     * @name PatchItemResourceFunctionPatch
     * @request PATCH:/functions/{id}
     * @response `200` `EntityModelFunction` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-function-patch": (id: string, data: FunctionRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelFunction, any>({
        path: `/functions/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  functionSearchController = {
    /**
     * No description
     *
     * @tags function-search-controller
     * @name ExecuteSearchFunctionGet
     * @request GET:/functions/search/findAllByGrandParentId
     * @response `200` `CollectionModelEntityModelFunction` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-function-get": (
      query?: {
        grandParentId?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelFunction, any>({
        path: `/functions/search/findAllByGrandParentId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags function-search-controller
     * @name ExecuteSearchFunctionGet1
     * @request GET:/functions/search/findFunctionByName
     * @response `200` `EntityModelFunction` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-function-get_1": (
      query?: {
        name?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelFunction, any>({
        path: `/functions/search/findFunctionByName`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags function-search-controller
     * @name ExecuteSearchFunctionGet2
     * @request GET:/functions/search/findFunctionByNameAndParent
     * @response `200` `CollectionModelEntityModelFunction` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-function-get_2": (
      query?: {
        name?: string
        parent?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelFunction, any>({
        path: `/functions/search/findFunctionByNameAndParent`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags function-search-controller
     * @name ExecuteSearchFunctionGet3
     * @request GET:/functions/search/getParent
     * @response `200` `CollectionModelEntityModelFunction` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-function-get_3": (
      query?: {
        parent?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelFunction, any>({
        path: `/functions/search/getParent`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      })
  }
  jobPostingEntityController = {
    /**
     * @description get-jobposting
     *
     * @tags job-posting-entity-controller
     * @name GetCollectionResourceJobpostingGet
     * @request GET:/jobPostings
     * @response `200` `PagedModelEntityModelJobPosting` OK
     */
    "getCollectionResource-jobposting-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelJobPosting, any>({
        path: `/jobPostings`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-jobposting
     *
     * @tags job-posting-entity-controller
     * @name PostCollectionResourceJobpostingPost
     * @request POST:/jobPostings
     * @response `201` `EntityModelJobPosting` Created
     */
    "postCollectionResource-jobposting-post": (data: JobPostingRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelJobPosting, any>({
        path: `/jobPostings`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-jobposting
     *
     * @tags job-posting-entity-controller
     * @name GetItemResourceJobpostingGet
     * @request GET:/jobPostings/{id}
     * @response `200` `EntityModelJobPosting` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-jobposting-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelJobPosting, any>({
        path: `/jobPostings/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-jobposting
     *
     * @tags job-posting-entity-controller
     * @name PutItemResourceJobpostingPut
     * @request PUT:/jobPostings/{id}
     * @response `200` `EntityModelJobPosting` OK
     * @response `201` `EntityModelJobPosting` Created
     * @response `204` `any` No Content
     */
    "putItemResource-jobposting-put": (id: string, data: JobPostingRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelJobPosting, any>({
        path: `/jobPostings/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-jobposting
     *
     * @tags job-posting-entity-controller
     * @name DeleteItemResourceJobpostingDelete
     * @request DELETE:/jobPostings/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-jobposting-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/jobPostings/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-jobposting
     *
     * @tags job-posting-entity-controller
     * @name PatchItemResourceJobpostingPatch
     * @request PATCH:/jobPostings/{id}
     * @response `200` `EntityModelJobPosting` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-jobposting-patch": (id: string, data: JobPostingRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelJobPosting, any>({
        path: `/jobPostings/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  jobPostingPropertyReferenceController = {
    /**
     * @description get-company-by-jobposting-Id
     *
     * @tags job-posting-property-reference-controller
     * @name FollowPropertyReferenceJobpostingGet
     * @request GET:/jobPostings/{id}/company
     * @response `200` `EntityModelCompany` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-jobposting-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelCompany, any>({
        path: `/jobPostings/${id}/company`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-company-by-jobposting-Id
     *
     * @tags job-posting-property-reference-controller
     * @name CreatePropertyReferenceJobpostingPut
     * @request PUT:/jobPostings/{id}/company
     * @response `200` `EntityModelCompany` OK
     * @response `201` `EntityModelCompany` Created
     * @response `204` `any` No Content
     */
    "createPropertyReference-jobposting-put": (id: string, data: CollectionModelObject, params: RequestParams = {}) =>
      this.http.request<EntityModelCompany, any>({
        path: `/jobPostings/${id}/company`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-company-by-jobposting-Id
     *
     * @tags job-posting-property-reference-controller
     * @name DeletePropertyReferenceJobpostingDelete
     * @request DELETE:/jobPostings/{id}/company
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReference-jobposting-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/jobPostings/${id}/company`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-company-by-jobposting-Id
     *
     * @tags job-posting-property-reference-controller
     * @name CreatePropertyReferenceJobpostingPatch
     * @request PATCH:/jobPostings/{id}/company
     * @response `200` `EntityModelCompany` OK
     * @response `204` `any` No Content
     */
    "createPropertyReference-jobposting-patch": (id: string, data: CollectionModelObject, params: RequestParams = {}) =>
      this.http.request<EntityModelCompany, any>({
        path: `/jobPostings/${id}/company`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-company-by-jobposting-Id
     *
     * @tags job-posting-property-reference-controller
     * @name FollowPropertyReferenceJobpostingGet1
     * @request GET:/jobPostings/{id}/company/{propertyId}
     * @response `200` `EntityModelCompany` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-jobposting-get_1": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<EntityModelCompany, any>({
        path: `/jobPostings/${id}/company/${propertyId}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description delete-company-by-jobposting-Id
     *
     * @tags job-posting-property-reference-controller
     * @name DeletePropertyReferenceIdJobpostingDelete
     * @request DELETE:/jobPostings/{id}/company/{propertyId}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReferenceId-jobposting-delete": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/jobPostings/${id}/company/${propertyId}`,
        method: "DELETE",
        ...params
      })
  }
  profileController = {
    /**
     * No description
     *
     * @tags profile-controller
     * @name ListAllFormsOfMetadata
     * @request GET:/profile
     * @response `200` `RepresentationModelObject` OK
     */
    listAllFormsOfMetadata: (params: RequestParams = {}) =>
      this.http.request<RepresentationModelObject, any>({
        path: `/profile`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor
     * @request GET:/profile/alertCheckLimits
     * @response `200` `string` OK
     */
    descriptor: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/alertCheckLimits`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor1
     * @request GET:/profile/aquarkDatas
     * @response `200` `string` OK
     */
    descriptor_1: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/aquarkDatas`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor2
     * @request GET:/profile/companies
     * @response `200` `string` OK
     */
    descriptor_2: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/companies`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor3
     * @request GET:/profile/companyWebsites
     * @response `200` `string` OK
     */
    descriptor_3: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/companyWebsites`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor4
     * @request GET:/profile/functions
     * @response `200` `string` OK
     */
    descriptor_4: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/functions`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor5
     * @request GET:/profile/jobPostings
     * @response `200` `string` OK
     */
    descriptor_5: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/jobPostings`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor6
     * @request GET:/profile/projectSkills
     * @response `200` `string` OK
     */
    descriptor_6: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/projectSkills`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor7
     * @request GET:/profile/projects
     * @response `200` `string` OK
     */
    descriptor_7: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/projects`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor8
     * @request GET:/profile/roleFunctions
     * @response `200` `string` OK
     */
    descriptor_8: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/roleFunctions`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor9
     * @request GET:/profile/roles
     * @response `200` `string` OK
     */
    descriptor_9: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/roles`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor10
     * @request GET:/profile/skillLevels
     * @response `200` `string` OK
     */
    descriptor_10: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/skillLevels`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor11
     * @request GET:/profile/skills
     * @response `200` `string` OK
     */
    descriptor_11: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/skills`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor12
     * @request GET:/profile/userJobLinks
     * @response `200` `string` OK
     */
    descriptor_12: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/userJobLinks`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor13
     * @request GET:/profile/userProjectSkills
     * @response `200` `string` OK
     */
    descriptor_13: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/userProjectSkills`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor14
     * @request GET:/profile/userProjects
     * @response `200` `string` OK
     */
    descriptor_14: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/userProjects`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor15
     * @request GET:/profile/userRoles
     * @response `200` `string` OK
     */
    descriptor_15: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/userRoles`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor16
     * @request GET:/profile/userSkills
     * @response `200` `string` OK
     */
    descriptor_16: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/userSkills`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor17
     * @request GET:/profile/users
     * @response `200` `string` OK
     */
    descriptor_17: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/profile/users`,
        method: "GET",
        format: "json",
        ...params
      })
  }
  projectSkillEntityController = {
    /**
     * @description get-projectskill
     *
     * @tags project-skill-entity-controller
     * @name GetCollectionResourceProjectskillGet
     * @request GET:/projectSkills
     * @response `200` `PagedModelEntityModelProjectSkill` OK
     */
    "getCollectionResource-projectskill-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelProjectSkill, any>({
        path: `/projectSkills`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-projectskill
     *
     * @tags project-skill-entity-controller
     * @name PostCollectionResourceProjectskillPost
     * @request POST:/projectSkills
     * @response `201` `EntityModelProjectSkill` Created
     */
    "postCollectionResource-projectskill-post": (data: ProjectSkillRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelProjectSkill, any>({
        path: `/projectSkills`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-projectskill
     *
     * @tags project-skill-entity-controller
     * @name GetItemResourceProjectskillGet
     * @request GET:/projectSkills/{id}
     * @response `200` `EntityModelProjectSkill` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-projectskill-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelProjectSkill, any>({
        path: `/projectSkills/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-projectskill
     *
     * @tags project-skill-entity-controller
     * @name PutItemResourceProjectskillPut
     * @request PUT:/projectSkills/{id}
     * @response `200` `EntityModelProjectSkill` OK
     * @response `201` `EntityModelProjectSkill` Created
     * @response `204` `any` No Content
     */
    "putItemResource-projectskill-put": (id: string, data: ProjectSkillRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelProjectSkill, any>({
        path: `/projectSkills/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-projectskill
     *
     * @tags project-skill-entity-controller
     * @name DeleteItemResourceProjectskillDelete
     * @request DELETE:/projectSkills/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-projectskill-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/projectSkills/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-projectskill
     *
     * @tags project-skill-entity-controller
     * @name PatchItemResourceProjectskillPatch
     * @request PATCH:/projectSkills/{id}
     * @response `200` `EntityModelProjectSkill` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-projectskill-patch": (id: string, data: ProjectSkillRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelProjectSkill, any>({
        path: `/projectSkills/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  projectSkillSearchController = {
    /**
     * No description
     *
     * @tags project-skill-search-controller
     * @name ExecuteSearchProjectskillGet
     * @request GET:/projectSkills/search/deleteByProjectId
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-projectskill-get": (
      query?: {
        /** @format uuid */
        projectId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/projectSkills/search/deleteByProjectId`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags project-skill-search-controller
     * @name ExecuteSearchProjectskillGet1
     * @request GET:/projectSkills/search/deleteByProjectIdAndSkillId
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-projectskill-get_1": (
      query?: {
        /** @format uuid */
        projectId?: string
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/projectSkills/search/deleteByProjectIdAndSkillId`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags project-skill-search-controller
     * @name ExecuteSearchProjectskillGet2
     * @request GET:/projectSkills/search/deleteBySkillId
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-projectskill-get_2": (
      query?: {
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/projectSkills/search/deleteBySkillId`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags project-skill-search-controller
     * @name ExecuteSearchProjectskillGet3
     * @request GET:/projectSkills/search/existsByProjectIdAndSkillId
     * @response `200` `boolean` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-projectskill-get_3": (
      query?: {
        /** @format uuid */
        projectId?: string
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<boolean, any>({
        path: `/projectSkills/search/existsByProjectIdAndSkillId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags project-skill-search-controller
     * @name ExecuteSearchProjectskillGet4
     * @request GET:/projectSkills/search/existsBySkillId
     * @response `200` `boolean` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-projectskill-get_4": (
      query?: {
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<boolean, any>({
        path: `/projectSkills/search/existsBySkillId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags project-skill-search-controller
     * @name ExecuteSearchProjectskillGet5
     * @request GET:/projectSkills/search/existsBySkillLevelId
     * @response `200` `boolean` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-projectskill-get_5": (
      query?: {
        /** @format uuid */
        skillLevelId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<boolean, any>({
        path: `/projectSkills/search/existsBySkillLevelId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags project-skill-search-controller
     * @name ExecuteSearchProjectskillGet6
     * @request GET:/projectSkills/search/findByProjectId
     * @response `200` `CollectionModelEntityModelProjectSkill` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-projectskill-get_6": (
      query?: {
        /** @format uuid */
        projectId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelProjectSkill, any>({
        path: `/projectSkills/search/findByProjectId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags project-skill-search-controller
     * @name ExecuteSearchProjectskillGet7
     * @request GET:/projectSkills/search/findByProjectIdAndSkillId
     * @response `200` `EntityModelProjectSkill` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-projectskill-get_7": (
      query?: {
        /** @format uuid */
        projectId?: string
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelProjectSkill, any>({
        path: `/projectSkills/search/findByProjectIdAndSkillId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      })
  }
  projectSkillPropertyReferenceController = {
    /**
     * @description get-skill-by-projectskill-Id
     *
     * @tags project-skill-property-reference-controller
     * @name FollowPropertyReferenceProjectskillGet
     * @request GET:/projectSkills/{id}/skill
     * @response `200` `EntityModelSkill` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-projectskill-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelSkill, any>({
        path: `/projectSkills/${id}/skill`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-skill-by-projectskill-Id
     *
     * @tags project-skill-property-reference-controller
     * @name CreatePropertyReferenceProjectskillPut
     * @request PUT:/projectSkills/{id}/skill
     * @response `200` `EntityModelSkill` OK
     * @response `201` `EntityModelSkill` Created
     * @response `204` `any` No Content
     */
    "createPropertyReference-projectskill-put": (id: string, data: CollectionModelObject, params: RequestParams = {}) =>
      this.http.request<EntityModelSkill, any>({
        path: `/projectSkills/${id}/skill`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-skill-by-projectskill-Id
     *
     * @tags project-skill-property-reference-controller
     * @name DeletePropertyReferenceProjectskillDelete
     * @request DELETE:/projectSkills/{id}/skill
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReference-projectskill-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/projectSkills/${id}/skill`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-skill-by-projectskill-Id
     *
     * @tags project-skill-property-reference-controller
     * @name CreatePropertyReferenceProjectskillPatch
     * @request PATCH:/projectSkills/{id}/skill
     * @response `200` `EntityModelSkill` OK
     * @response `204` `any` No Content
     */
    "createPropertyReference-projectskill-patch": (
      id: string,
      data: CollectionModelObject,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelSkill, any>({
        path: `/projectSkills/${id}/skill`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-skill-by-projectskill-Id
     *
     * @tags project-skill-property-reference-controller
     * @name FollowPropertyReferenceProjectskillGet1
     * @request GET:/projectSkills/{id}/skill/{propertyId}
     * @response `200` `EntityModelSkill` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-projectskill-get_1": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<EntityModelSkill, any>({
        path: `/projectSkills/${id}/skill/${propertyId}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description delete-skill-by-projectskill-Id
     *
     * @tags project-skill-property-reference-controller
     * @name DeletePropertyReferenceIdProjectskillDelete
     * @request DELETE:/projectSkills/{id}/skill/{propertyId}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReferenceId-projectskill-delete": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/projectSkills/${id}/skill/${propertyId}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description get-skilllevel-by-projectskill-Id
     *
     * @tags project-skill-property-reference-controller
     * @name FollowPropertyReferenceProjectskillGet2
     * @request GET:/projectSkills/{id}/skillLevel
     * @response `200` `EntityModelSkillLevel` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-projectskill-get_2": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelSkillLevel, any>({
        path: `/projectSkills/${id}/skillLevel`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-skilllevel-by-projectskill-Id
     *
     * @tags project-skill-property-reference-controller
     * @name CreatePropertyReferenceProjectskillPut1
     * @request PUT:/projectSkills/{id}/skillLevel
     * @response `200` `EntityModelSkillLevel` OK
     * @response `201` `EntityModelSkillLevel` Created
     * @response `204` `any` No Content
     */
    "createPropertyReference-projectskill-put_1": (
      id: string,
      data: CollectionModelObject,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelSkillLevel, any>({
        path: `/projectSkills/${id}/skillLevel`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-skilllevel-by-projectskill-Id
     *
     * @tags project-skill-property-reference-controller
     * @name DeletePropertyReferenceProjectskillDelete1
     * @request DELETE:/projectSkills/{id}/skillLevel
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReference-projectskill-delete_1": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/projectSkills/${id}/skillLevel`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-skilllevel-by-projectskill-Id
     *
     * @tags project-skill-property-reference-controller
     * @name CreatePropertyReferenceProjectskillPatch1
     * @request PATCH:/projectSkills/{id}/skillLevel
     * @response `200` `EntityModelSkillLevel` OK
     * @response `204` `any` No Content
     */
    "createPropertyReference-projectskill-patch_1": (
      id: string,
      data: CollectionModelObject,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelSkillLevel, any>({
        path: `/projectSkills/${id}/skillLevel`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-skilllevel-by-projectskill-Id
     *
     * @tags project-skill-property-reference-controller
     * @name FollowPropertyReferenceProjectskillGet3
     * @request GET:/projectSkills/{id}/skillLevel/{propertyId}
     * @response `200` `EntityModelSkillLevel` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-projectskill-get_3": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<EntityModelSkillLevel, any>({
        path: `/projectSkills/${id}/skillLevel/${propertyId}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description delete-skilllevel-by-projectskill-Id
     *
     * @tags project-skill-property-reference-controller
     * @name DeletePropertyReferenceIdProjectskillDelete1
     * @request DELETE:/projectSkills/{id}/skillLevel/{propertyId}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReferenceId-projectskill-delete_1": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/projectSkills/${id}/skillLevel/${propertyId}`,
        method: "DELETE",
        ...params
      })
  }
  projectEntityController = {
    /**
     * @description get-project
     *
     * @tags project-entity-controller
     * @name GetCollectionResourceProjectGet
     * @request GET:/projects
     * @response `200` `PagedModelEntityModelProject` OK
     */
    "getCollectionResource-project-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelProject, any>({
        path: `/projects`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-project
     *
     * @tags project-entity-controller
     * @name PostCollectionResourceProjectPost
     * @request POST:/projects
     * @response `201` `EntityModelProject` Created
     */
    "postCollectionResource-project-post": (data: ProjectRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelProject, any>({
        path: `/projects`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-project
     *
     * @tags project-entity-controller
     * @name GetItemResourceProjectGet
     * @request GET:/projects/{id}
     * @response `200` `EntityModelProject` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-project-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelProject, any>({
        path: `/projects/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-project
     *
     * @tags project-entity-controller
     * @name PutItemResourceProjectPut
     * @request PUT:/projects/{id}
     * @response `200` `EntityModelProject` OK
     * @response `201` `EntityModelProject` Created
     * @response `204` `any` No Content
     */
    "putItemResource-project-put": (id: string, data: ProjectRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelProject, any>({
        path: `/projects/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-project
     *
     * @tags project-entity-controller
     * @name DeleteItemResourceProjectDelete
     * @request DELETE:/projects/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-project-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/projects/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-project
     *
     * @tags project-entity-controller
     * @name PatchItemResourceProjectPatch
     * @request PATCH:/projects/{id}
     * @response `200` `EntityModelProject` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-project-patch": (id: string, data: ProjectRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelProject, any>({
        path: `/projects/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  projectSearchController = {
    /**
     * No description
     *
     * @tags project-search-controller
     * @name ExecuteSearchProjectGet
     * @request GET:/projects/search/deleteByIdHard
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-project-get": (
      query?: {
        /** @format uuid */
        projectId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/projects/search/deleteByIdHard`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags project-search-controller
     * @name ExecuteSearchProjectGet1
     * @request GET:/projects/search/findByName
     * @response `200` `CollectionModelEntityModelProject` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-project-get_1": (
      query?: {
        name?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelProject, any>({
        path: `/projects/search/findByName`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      })
  }
  roleFunctionEntityController = {
    /**
     * @description get-rolefunction
     *
     * @tags role-function-entity-controller
     * @name GetCollectionResourceRolefunctionGet
     * @request GET:/roleFunctions
     * @response `200` `PagedModelEntityModelRoleFunction` OK
     */
    "getCollectionResource-rolefunction-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelRoleFunction, any>({
        path: `/roleFunctions`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-rolefunction
     *
     * @tags role-function-entity-controller
     * @name PostCollectionResourceRolefunctionPost
     * @request POST:/roleFunctions
     * @response `201` `EntityModelRoleFunction` Created
     */
    "postCollectionResource-rolefunction-post": (data: RoleFunctionRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelRoleFunction, any>({
        path: `/roleFunctions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-rolefunction
     *
     * @tags role-function-entity-controller
     * @name GetItemResourceRolefunctionGet
     * @request GET:/roleFunctions/{id}
     * @response `200` `EntityModelRoleFunction` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-rolefunction-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelRoleFunction, any>({
        path: `/roleFunctions/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-rolefunction
     *
     * @tags role-function-entity-controller
     * @name PutItemResourceRolefunctionPut
     * @request PUT:/roleFunctions/{id}
     * @response `200` `EntityModelRoleFunction` OK
     * @response `201` `EntityModelRoleFunction` Created
     * @response `204` `any` No Content
     */
    "putItemResource-rolefunction-put": (id: string, data: RoleFunctionRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelRoleFunction, any>({
        path: `/roleFunctions/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-rolefunction
     *
     * @tags role-function-entity-controller
     * @name DeleteItemResourceRolefunctionDelete
     * @request DELETE:/roleFunctions/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-rolefunction-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/roleFunctions/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-rolefunction
     *
     * @tags role-function-entity-controller
     * @name PatchItemResourceRolefunctionPatch
     * @request PATCH:/roleFunctions/{id}
     * @response `200` `EntityModelRoleFunction` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-rolefunction-patch": (id: string, data: RoleFunctionRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelRoleFunction, any>({
        path: `/roleFunctions/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  roleFunctionSearchController = {
    /**
     * No description
     *
     * @tags role-function-search-controller
     * @name ExecuteSearchRolefunctionGet
     * @request GET:/roleFunctions/search/deleteAllByFunctionIn
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-rolefunction-get": (
      query?: {
        function?: Function[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/roleFunctions/search/deleteAllByFunctionIn`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags role-function-search-controller
     * @name ExecuteSearchRolefunctionGet1
     * @request GET:/roleFunctions/search/deleteByFunction
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-rolefunction-get_1": (
      query?: {
        /** @format uuid */
        key?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/roleFunctions/search/deleteByFunction`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags role-function-search-controller
     * @name ExecuteSearchRolefunctionGet2
     * @request GET:/roleFunctions/search/deleteByFunctionAndRole
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-rolefunction-get_2": (
      query?: {
        function?: Function[]
        role?: Role[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/roleFunctions/search/deleteByFunctionAndRole`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags role-function-search-controller
     * @name ExecuteSearchRolefunctionGet3
     * @request GET:/roleFunctions/search/deleteByRoleKey
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-rolefunction-get_3": (
      query?: {
        /** @format uuid */
        key?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/roleFunctions/search/deleteByRoleKey`,
        method: "GET",
        query: query,
        ...params
      })
  }
  roleEntityController = {
    /**
     * @description get-role
     *
     * @tags role-entity-controller
     * @name GetCollectionResourceRoleGet
     * @request GET:/roles
     * @response `200` `PagedModelEntityModelRole` OK
     */
    "getCollectionResource-role-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelRole, any>({
        path: `/roles`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-role
     *
     * @tags role-entity-controller
     * @name PostCollectionResourceRolePost
     * @request POST:/roles
     * @response `201` `EntityModelRole` Created
     */
    "postCollectionResource-role-post": (data: RoleRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelRole, any>({
        path: `/roles`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-role
     *
     * @tags role-entity-controller
     * @name GetItemResourceRoleGet
     * @request GET:/roles/{id}
     * @response `200` `EntityModelRole` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-role-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelRole, any>({
        path: `/roles/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-role
     *
     * @tags role-entity-controller
     * @name PutItemResourceRolePut
     * @request PUT:/roles/{id}
     * @response `200` `EntityModelRole` OK
     * @response `201` `EntityModelRole` Created
     * @response `204` `any` No Content
     */
    "putItemResource-role-put": (id: string, data: RoleRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelRole, any>({
        path: `/roles/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-role
     *
     * @tags role-entity-controller
     * @name DeleteItemResourceRoleDelete
     * @request DELETE:/roles/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-role-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/roles/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-role
     *
     * @tags role-entity-controller
     * @name PatchItemResourceRolePatch
     * @request PATCH:/roles/{id}
     * @response `200` `EntityModelRole` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-role-patch": (id: string, data: RoleRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelRole, any>({
        path: `/roles/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  roleSearchController = {
    /**
     * No description
     *
     * @tags role-search-controller
     * @name ExecuteSearchRoleGet
     * @request GET:/roles/search/findRoleByIdIn
     * @response `200` `CollectionModelEntityModelRole` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-role-get": (
      query?: {
        ids?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelRole, any>({
        path: `/roles/search/findRoleByIdIn`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags role-search-controller
     * @name ExecuteSearchRoleGet1
     * @request GET:/roles/search/findRoleByName
     * @response `200` `EntityModelRole` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-role-get_1": (
      query?: {
        name?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelRole, any>({
        path: `/roles/search/findRoleByName`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      })
  }
  skillLevelEntityController = {
    /**
     * @description get-skilllevel
     *
     * @tags skill-level-entity-controller
     * @name GetCollectionResourceSkilllevelGet
     * @request GET:/skillLevels
     * @response `200` `PagedModelEntityModelSkillLevel` OK
     */
    "getCollectionResource-skilllevel-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelSkillLevel, any>({
        path: `/skillLevels`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-skilllevel
     *
     * @tags skill-level-entity-controller
     * @name PostCollectionResourceSkilllevelPost
     * @request POST:/skillLevels
     * @response `201` `EntityModelSkillLevel` Created
     */
    "postCollectionResource-skilllevel-post": (data: SkillLevelRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelSkillLevel, any>({
        path: `/skillLevels`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-skilllevel
     *
     * @tags skill-level-entity-controller
     * @name GetItemResourceSkilllevelGet
     * @request GET:/skillLevels/{id}
     * @response `200` `EntityModelSkillLevel` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-skilllevel-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelSkillLevel, any>({
        path: `/skillLevels/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-skilllevel
     *
     * @tags skill-level-entity-controller
     * @name PutItemResourceSkilllevelPut
     * @request PUT:/skillLevels/{id}
     * @response `200` `EntityModelSkillLevel` OK
     * @response `201` `EntityModelSkillLevel` Created
     * @response `204` `any` No Content
     */
    "putItemResource-skilllevel-put": (id: string, data: SkillLevelRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelSkillLevel, any>({
        path: `/skillLevels/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-skilllevel
     *
     * @tags skill-level-entity-controller
     * @name DeleteItemResourceSkilllevelDelete
     * @request DELETE:/skillLevels/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-skilllevel-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/skillLevels/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-skilllevel
     *
     * @tags skill-level-entity-controller
     * @name PatchItemResourceSkilllevelPatch
     * @request PATCH:/skillLevels/{id}
     * @response `200` `EntityModelSkillLevel` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-skilllevel-patch": (id: string, data: SkillLevelRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelSkillLevel, any>({
        path: `/skillLevels/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  skillLevelSearchController = {
    /**
     * No description
     *
     * @tags skill-level-search-controller
     * @name ExecuteSearchSkilllevelGet
     * @request GET:/skillLevels/search/deleteBySkillId
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-skilllevel-get": (
      query?: {
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/skillLevels/search/deleteBySkillId`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags skill-level-search-controller
     * @name ExecuteSearchSkilllevelGet1
     * @request GET:/skillLevels/search/existsBySkillIdAndLevelValue
     * @response `200` `boolean` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-skilllevel-get_1": (
      query?: {
        /** @format uuid */
        skillId?: string
        /** @format int32 */
        levelValue?: number
      },
      params: RequestParams = {}
    ) =>
      this.http.request<boolean, any>({
        path: `/skillLevels/search/existsBySkillIdAndLevelValue`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags skill-level-search-controller
     * @name ExecuteSearchSkilllevelGet2
     * @request GET:/skillLevels/search/findBySkillIdOrderByLevelValueAsc
     * @response `200` `CollectionModelEntityModelSkillLevel` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-skilllevel-get_2": (
      query?: {
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelSkillLevel, any>({
        path: `/skillLevels/search/findBySkillIdOrderByLevelValueAsc`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      })
  }
  skillEntityController = {
    /**
     * @description get-skill
     *
     * @tags skill-entity-controller
     * @name GetCollectionResourceSkillGet
     * @request GET:/skills
     * @response `200` `PagedModelEntityModelSkill` OK
     */
    "getCollectionResource-skill-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelSkill, any>({
        path: `/skills`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-skill
     *
     * @tags skill-entity-controller
     * @name PostCollectionResourceSkillPost
     * @request POST:/skills
     * @response `201` `EntityModelSkill` Created
     */
    "postCollectionResource-skill-post": (data: SkillRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelSkill, any>({
        path: `/skills`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-skill
     *
     * @tags skill-entity-controller
     * @name GetItemResourceSkillGet
     * @request GET:/skills/{id}
     * @response `200` `EntityModelSkill` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-skill-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelSkill, any>({
        path: `/skills/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-skill
     *
     * @tags skill-entity-controller
     * @name PutItemResourceSkillPut
     * @request PUT:/skills/{id}
     * @response `200` `EntityModelSkill` OK
     * @response `201` `EntityModelSkill` Created
     * @response `204` `any` No Content
     */
    "putItemResource-skill-put": (id: string, data: SkillRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelSkill, any>({
        path: `/skills/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-skill
     *
     * @tags skill-entity-controller
     * @name DeleteItemResourceSkillDelete
     * @request DELETE:/skills/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-skill-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/skills/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-skill
     *
     * @tags skill-entity-controller
     * @name PatchItemResourceSkillPatch
     * @request PATCH:/skills/{id}
     * @response `200` `EntityModelSkill` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-skill-patch": (id: string, data: SkillRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelSkill, any>({
        path: `/skills/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  skillSearchController = {
    /**
     * No description
     *
     * @tags skill-search-controller
     * @name ExecuteSearchSkillGet
     * @request GET:/skills/search/deleteByIdHard
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-skill-get": (
      query?: {
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/skills/search/deleteByIdHard`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags skill-search-controller
     * @name ExecuteSearchSkillGet1
     * @request GET:/skills/search/findByName
     * @response `200` `CollectionModelEntityModelSkill` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-skill-get_1": (
      query?: {
        name?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelSkill, any>({
        path: `/skills/search/findByName`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      })
  }
  userJobLinkEntityController = {
    /**
     * @description get-userjoblink
     *
     * @tags user-job-link-entity-controller
     * @name GetCollectionResourceUserjoblinkGet
     * @request GET:/userJobLinks
     * @response `200` `PagedModelEntityModelUserJobLink` OK
     */
    "getCollectionResource-userjoblink-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelUserJobLink, any>({
        path: `/userJobLinks`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-userjoblink
     *
     * @tags user-job-link-entity-controller
     * @name PostCollectionResourceUserjoblinkPost
     * @request POST:/userJobLinks
     * @response `201` `EntityModelUserJobLink` Created
     */
    "postCollectionResource-userjoblink-post": (data: UserJobLinkRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelUserJobLink, any>({
        path: `/userJobLinks`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-userjoblink
     *
     * @tags user-job-link-entity-controller
     * @name GetItemResourceUserjoblinkGet
     * @request GET:/userJobLinks/{id}
     * @response `200` `EntityModelUserJobLink` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-userjoblink-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelUserJobLink, any>({
        path: `/userJobLinks/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-userjoblink
     *
     * @tags user-job-link-entity-controller
     * @name PutItemResourceUserjoblinkPut
     * @request PUT:/userJobLinks/{id}
     * @response `200` `EntityModelUserJobLink` OK
     * @response `201` `EntityModelUserJobLink` Created
     * @response `204` `any` No Content
     */
    "putItemResource-userjoblink-put": (id: string, data: UserJobLinkRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelUserJobLink, any>({
        path: `/userJobLinks/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-userjoblink
     *
     * @tags user-job-link-entity-controller
     * @name DeleteItemResourceUserjoblinkDelete
     * @request DELETE:/userJobLinks/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-userjoblink-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userJobLinks/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-userjoblink
     *
     * @tags user-job-link-entity-controller
     * @name PatchItemResourceUserjoblinkPatch
     * @request PATCH:/userJobLinks/{id}
     * @response `200` `EntityModelUserJobLink` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-userjoblink-patch": (id: string, data: UserJobLinkRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelUserJobLink, any>({
        path: `/userJobLinks/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  userJobLinkPropertyReferenceController = {
    /**
     * @description get-jobposting-by-userjoblink-Id
     *
     * @tags user-job-link-property-reference-controller
     * @name FollowPropertyReferenceUserjoblinkGet
     * @request GET:/userJobLinks/{id}/jobPosting
     * @response `200` `EntityModelJobPosting` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-userjoblink-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelJobPosting, any>({
        path: `/userJobLinks/${id}/jobPosting`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-jobposting-by-userjoblink-Id
     *
     * @tags user-job-link-property-reference-controller
     * @name CreatePropertyReferenceUserjoblinkPut
     * @request PUT:/userJobLinks/{id}/jobPosting
     * @response `200` `EntityModelJobPosting` OK
     * @response `201` `EntityModelJobPosting` Created
     * @response `204` `any` No Content
     */
    "createPropertyReference-userjoblink-put": (id: string, data: CollectionModelObject, params: RequestParams = {}) =>
      this.http.request<EntityModelJobPosting, any>({
        path: `/userJobLinks/${id}/jobPosting`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-jobposting-by-userjoblink-Id
     *
     * @tags user-job-link-property-reference-controller
     * @name DeletePropertyReferenceUserjoblinkDelete
     * @request DELETE:/userJobLinks/{id}/jobPosting
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReference-userjoblink-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userJobLinks/${id}/jobPosting`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-jobposting-by-userjoblink-Id
     *
     * @tags user-job-link-property-reference-controller
     * @name CreatePropertyReferenceUserjoblinkPatch
     * @request PATCH:/userJobLinks/{id}/jobPosting
     * @response `200` `EntityModelJobPosting` OK
     * @response `204` `any` No Content
     */
    "createPropertyReference-userjoblink-patch": (
      id: string,
      data: CollectionModelObject,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelJobPosting, any>({
        path: `/userJobLinks/${id}/jobPosting`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-jobposting-by-userjoblink-Id
     *
     * @tags user-job-link-property-reference-controller
     * @name FollowPropertyReferenceUserjoblinkGet1
     * @request GET:/userJobLinks/{id}/jobPosting/{propertyId}
     * @response `200` `EntityModelJobPosting` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-userjoblink-get_1": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<EntityModelJobPosting, any>({
        path: `/userJobLinks/${id}/jobPosting/${propertyId}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description delete-jobposting-by-userjoblink-Id
     *
     * @tags user-job-link-property-reference-controller
     * @name DeletePropertyReferenceIdUserjoblinkDelete
     * @request DELETE:/userJobLinks/{id}/jobPosting/{propertyId}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReferenceId-userjoblink-delete": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userJobLinks/${id}/jobPosting/${propertyId}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description get-user-by-userjoblink-Id
     *
     * @tags user-job-link-property-reference-controller
     * @name FollowPropertyReferenceUserjoblinkGet2
     * @request GET:/userJobLinks/{id}/user
     * @response `200` `EntityModelUser` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-userjoblink-get_2": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelUser, any>({
        path: `/userJobLinks/${id}/user`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-user-by-userjoblink-Id
     *
     * @tags user-job-link-property-reference-controller
     * @name CreatePropertyReferenceUserjoblinkPut1
     * @request PUT:/userJobLinks/{id}/user
     * @response `200` `EntityModelUser` OK
     * @response `201` `EntityModelUser` Created
     * @response `204` `any` No Content
     */
    "createPropertyReference-userjoblink-put_1": (
      id: string,
      data: CollectionModelObject,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelUser, any>({
        path: `/userJobLinks/${id}/user`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-user-by-userjoblink-Id
     *
     * @tags user-job-link-property-reference-controller
     * @name DeletePropertyReferenceUserjoblinkDelete1
     * @request DELETE:/userJobLinks/{id}/user
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReference-userjoblink-delete_1": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userJobLinks/${id}/user`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-user-by-userjoblink-Id
     *
     * @tags user-job-link-property-reference-controller
     * @name CreatePropertyReferenceUserjoblinkPatch1
     * @request PATCH:/userJobLinks/{id}/user
     * @response `200` `EntityModelUser` OK
     * @response `204` `any` No Content
     */
    "createPropertyReference-userjoblink-patch_1": (
      id: string,
      data: CollectionModelObject,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelUser, any>({
        path: `/userJobLinks/${id}/user`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-user-by-userjoblink-Id
     *
     * @tags user-job-link-property-reference-controller
     * @name FollowPropertyReferenceUserjoblinkGet3
     * @request GET:/userJobLinks/{id}/user/{propertyId}
     * @response `200` `EntityModelUser` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-userjoblink-get_3": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<EntityModelUser, any>({
        path: `/userJobLinks/${id}/user/${propertyId}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description delete-user-by-userjoblink-Id
     *
     * @tags user-job-link-property-reference-controller
     * @name DeletePropertyReferenceIdUserjoblinkDelete1
     * @request DELETE:/userJobLinks/{id}/user/{propertyId}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReferenceId-userjoblink-delete_1": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userJobLinks/${id}/user/${propertyId}`,
        method: "DELETE",
        ...params
      })
  }
  userProjectSkillEntityController = {
    /**
     * @description get-userprojectskill
     *
     * @tags user-project-skill-entity-controller
     * @name GetCollectionResourceUserprojectskillGet
     * @request GET:/userProjectSkills
     * @response `200` `PagedModelEntityModelUserProjectSkill` OK
     */
    "getCollectionResource-userprojectskill-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelUserProjectSkill, any>({
        path: `/userProjectSkills`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-userprojectskill
     *
     * @tags user-project-skill-entity-controller
     * @name PostCollectionResourceUserprojectskillPost
     * @request POST:/userProjectSkills
     * @response `201` `EntityModelUserProjectSkill` Created
     */
    "postCollectionResource-userprojectskill-post": (data: UserProjectSkillRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelUserProjectSkill, any>({
        path: `/userProjectSkills`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-userprojectskill
     *
     * @tags user-project-skill-entity-controller
     * @name GetItemResourceUserprojectskillGet
     * @request GET:/userProjectSkills/{id}
     * @response `200` `EntityModelUserProjectSkill` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-userprojectskill-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelUserProjectSkill, any>({
        path: `/userProjectSkills/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-userprojectskill
     *
     * @tags user-project-skill-entity-controller
     * @name PutItemResourceUserprojectskillPut
     * @request PUT:/userProjectSkills/{id}
     * @response `200` `EntityModelUserProjectSkill` OK
     * @response `201` `EntityModelUserProjectSkill` Created
     * @response `204` `any` No Content
     */
    "putItemResource-userprojectskill-put": (
      id: string,
      data: UserProjectSkillRequestBody,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelUserProjectSkill, any>({
        path: `/userProjectSkills/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-userprojectskill
     *
     * @tags user-project-skill-entity-controller
     * @name DeleteItemResourceUserprojectskillDelete
     * @request DELETE:/userProjectSkills/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-userprojectskill-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userProjectSkills/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-userprojectskill
     *
     * @tags user-project-skill-entity-controller
     * @name PatchItemResourceUserprojectskillPatch
     * @request PATCH:/userProjectSkills/{id}
     * @response `200` `EntityModelUserProjectSkill` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-userprojectskill-patch": (
      id: string,
      data: UserProjectSkillRequestBody,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelUserProjectSkill, any>({
        path: `/userProjectSkills/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  userProjectSkillSearchController = {
    /**
     * No description
     *
     * @tags user-project-skill-search-controller
     * @name ExecuteSearchUserprojectskillGet
     * @request GET:/userProjectSkills/search/deleteByProjectId
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userprojectskill-get": (
      query?: {
        /** @format uuid */
        projectId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/userProjectSkills/search/deleteByProjectId`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags user-project-skill-search-controller
     * @name ExecuteSearchUserprojectskillGet1
     * @request GET:/userProjectSkills/search/deleteBySkillId
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userprojectskill-get_1": (
      query?: {
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/userProjectSkills/search/deleteBySkillId`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags user-project-skill-search-controller
     * @name ExecuteSearchUserprojectskillGet2
     * @request GET:/userProjectSkills/search/deleteByUserIdAndProjectId
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userprojectskill-get_2": (
      query?: {
        /** @format uuid */
        userId?: string
        /** @format uuid */
        projectId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/userProjectSkills/search/deleteByUserIdAndProjectId`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags user-project-skill-search-controller
     * @name ExecuteSearchUserprojectskillGet3
     * @request GET:/userProjectSkills/search/deleteByUserIdAndProjectIdAndSkillId
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userprojectskill-get_3": (
      query?: {
        /** @format uuid */
        userId?: string
        /** @format uuid */
        projectId?: string
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/userProjectSkills/search/deleteByUserIdAndProjectIdAndSkillId`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags user-project-skill-search-controller
     * @name ExecuteSearchUserprojectskillGet4
     * @request GET:/userProjectSkills/search/existsBySkillId
     * @response `200` `boolean` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userprojectskill-get_4": (
      query?: {
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<boolean, any>({
        path: `/userProjectSkills/search/existsBySkillId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags user-project-skill-search-controller
     * @name ExecuteSearchUserprojectskillGet5
     * @request GET:/userProjectSkills/search/existsBySkillLevelId
     * @response `200` `boolean` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userprojectskill-get_5": (
      query?: {
        /** @format uuid */
        skillLevelId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<boolean, any>({
        path: `/userProjectSkills/search/existsBySkillLevelId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags user-project-skill-search-controller
     * @name ExecuteSearchUserprojectskillGet6
     * @request GET:/userProjectSkills/search/existsByUserIdAndProjectId
     * @response `200` `boolean` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userprojectskill-get_6": (
      query?: {
        /** @format uuid */
        userId?: string
        /** @format uuid */
        projectId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<boolean, any>({
        path: `/userProjectSkills/search/existsByUserIdAndProjectId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags user-project-skill-search-controller
     * @name ExecuteSearchUserprojectskillGet7
     * @request GET:/userProjectSkills/search/existsByUserIdAndProjectIdAndSkillId
     * @response `200` `boolean` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userprojectskill-get_7": (
      query?: {
        /** @format uuid */
        userId?: string
        /** @format uuid */
        projectId?: string
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<boolean, any>({
        path: `/userProjectSkills/search/existsByUserIdAndProjectIdAndSkillId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags user-project-skill-search-controller
     * @name ExecuteSearchUserprojectskillGet8
     * @request GET:/userProjectSkills/search/findByProjectId
     * @response `200` `CollectionModelEntityModelUserProjectSkill` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userprojectskill-get_8": (
      query?: {
        /** @format uuid */
        projectId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelUserProjectSkill, any>({
        path: `/userProjectSkills/search/findByProjectId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags user-project-skill-search-controller
     * @name ExecuteSearchUserprojectskillGet9
     * @request GET:/userProjectSkills/search/findByUserId
     * @response `200` `CollectionModelEntityModelUserProjectSkill` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userprojectskill-get_9": (
      query?: {
        /** @format uuid */
        userId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelUserProjectSkill, any>({
        path: `/userProjectSkills/search/findByUserId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags user-project-skill-search-controller
     * @name ExecuteSearchUserprojectskillGet10
     * @request GET:/userProjectSkills/search/findByUserIdAndProjectId
     * @response `200` `CollectionModelEntityModelUserProjectSkill` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userprojectskill-get_10": (
      query?: {
        /** @format uuid */
        userId?: string
        /** @format uuid */
        projectId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelUserProjectSkill, any>({
        path: `/userProjectSkills/search/findByUserIdAndProjectId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags user-project-skill-search-controller
     * @name ExecuteSearchUserprojectskillGet11
     * @request GET:/userProjectSkills/search/findByUserIdAndProjectIdAndSkillId
     * @response `200` `EntityModelUserProjectSkill` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userprojectskill-get_11": (
      query?: {
        /** @format uuid */
        userId?: string
        /** @format uuid */
        projectId?: string
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelUserProjectSkill, any>({
        path: `/userProjectSkills/search/findByUserIdAndProjectIdAndSkillId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      })
  }
  userProjectSkillPropertyReferenceController = {
    /**
     * @description get-skill-by-userprojectskill-Id
     *
     * @tags user-project-skill-property-reference-controller
     * @name FollowPropertyReferenceUserprojectskillGet
     * @request GET:/userProjectSkills/{id}/skill
     * @response `200` `EntityModelSkill` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-userprojectskill-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelSkill, any>({
        path: `/userProjectSkills/${id}/skill`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-skill-by-userprojectskill-Id
     *
     * @tags user-project-skill-property-reference-controller
     * @name CreatePropertyReferenceUserprojectskillPut
     * @request PUT:/userProjectSkills/{id}/skill
     * @response `200` `EntityModelSkill` OK
     * @response `201` `EntityModelSkill` Created
     * @response `204` `any` No Content
     */
    "createPropertyReference-userprojectskill-put": (
      id: string,
      data: CollectionModelObject,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelSkill, any>({
        path: `/userProjectSkills/${id}/skill`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-skill-by-userprojectskill-Id
     *
     * @tags user-project-skill-property-reference-controller
     * @name DeletePropertyReferenceUserprojectskillDelete
     * @request DELETE:/userProjectSkills/{id}/skill
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReference-userprojectskill-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userProjectSkills/${id}/skill`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-skill-by-userprojectskill-Id
     *
     * @tags user-project-skill-property-reference-controller
     * @name CreatePropertyReferenceUserprojectskillPatch
     * @request PATCH:/userProjectSkills/{id}/skill
     * @response `200` `EntityModelSkill` OK
     * @response `204` `any` No Content
     */
    "createPropertyReference-userprojectskill-patch": (
      id: string,
      data: CollectionModelObject,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelSkill, any>({
        path: `/userProjectSkills/${id}/skill`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-skill-by-userprojectskill-Id
     *
     * @tags user-project-skill-property-reference-controller
     * @name FollowPropertyReferenceUserprojectskillGet1
     * @request GET:/userProjectSkills/{id}/skill/{propertyId}
     * @response `200` `EntityModelSkill` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-userprojectskill-get_1": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<EntityModelSkill, any>({
        path: `/userProjectSkills/${id}/skill/${propertyId}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description delete-skill-by-userprojectskill-Id
     *
     * @tags user-project-skill-property-reference-controller
     * @name DeletePropertyReferenceIdUserprojectskillDelete
     * @request DELETE:/userProjectSkills/{id}/skill/{propertyId}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReferenceId-userprojectskill-delete": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userProjectSkills/${id}/skill/${propertyId}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description get-skilllevel-by-userprojectskill-Id
     *
     * @tags user-project-skill-property-reference-controller
     * @name FollowPropertyReferenceUserprojectskillGet2
     * @request GET:/userProjectSkills/{id}/skillLevel
     * @response `200` `EntityModelSkillLevel` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-userprojectskill-get_2": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelSkillLevel, any>({
        path: `/userProjectSkills/${id}/skillLevel`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-skilllevel-by-userprojectskill-Id
     *
     * @tags user-project-skill-property-reference-controller
     * @name CreatePropertyReferenceUserprojectskillPut1
     * @request PUT:/userProjectSkills/{id}/skillLevel
     * @response `200` `EntityModelSkillLevel` OK
     * @response `201` `EntityModelSkillLevel` Created
     * @response `204` `any` No Content
     */
    "createPropertyReference-userprojectskill-put_1": (
      id: string,
      data: CollectionModelObject,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelSkillLevel, any>({
        path: `/userProjectSkills/${id}/skillLevel`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-skilllevel-by-userprojectskill-Id
     *
     * @tags user-project-skill-property-reference-controller
     * @name DeletePropertyReferenceUserprojectskillDelete1
     * @request DELETE:/userProjectSkills/{id}/skillLevel
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReference-userprojectskill-delete_1": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userProjectSkills/${id}/skillLevel`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-skilllevel-by-userprojectskill-Id
     *
     * @tags user-project-skill-property-reference-controller
     * @name CreatePropertyReferenceUserprojectskillPatch1
     * @request PATCH:/userProjectSkills/{id}/skillLevel
     * @response `200` `EntityModelSkillLevel` OK
     * @response `204` `any` No Content
     */
    "createPropertyReference-userprojectskill-patch_1": (
      id: string,
      data: CollectionModelObject,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelSkillLevel, any>({
        path: `/userProjectSkills/${id}/skillLevel`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-skilllevel-by-userprojectskill-Id
     *
     * @tags user-project-skill-property-reference-controller
     * @name FollowPropertyReferenceUserprojectskillGet3
     * @request GET:/userProjectSkills/{id}/skillLevel/{propertyId}
     * @response `200` `EntityModelSkillLevel` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-userprojectskill-get_3": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<EntityModelSkillLevel, any>({
        path: `/userProjectSkills/${id}/skillLevel/${propertyId}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description delete-skilllevel-by-userprojectskill-Id
     *
     * @tags user-project-skill-property-reference-controller
     * @name DeletePropertyReferenceIdUserprojectskillDelete1
     * @request DELETE:/userProjectSkills/{id}/skillLevel/{propertyId}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReferenceId-userprojectskill-delete_1": (
      id: string,
      propertyId: string,
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/userProjectSkills/${id}/skillLevel/${propertyId}`,
        method: "DELETE",
        ...params
      })
  }
  userProjectEntityController = {
    /**
     * @description get-userproject
     *
     * @tags user-project-entity-controller
     * @name GetCollectionResourceUserprojectGet
     * @request GET:/userProjects
     * @response `200` `PagedModelEntityModelUserProject` OK
     */
    "getCollectionResource-userproject-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelUserProject, any>({
        path: `/userProjects`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-userproject
     *
     * @tags user-project-entity-controller
     * @name PostCollectionResourceUserprojectPost
     * @request POST:/userProjects
     * @response `201` `EntityModelUserProject` Created
     */
    "postCollectionResource-userproject-post": (data: UserProjectRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelUserProject, any>({
        path: `/userProjects`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-userproject
     *
     * @tags user-project-entity-controller
     * @name GetItemResourceUserprojectGet
     * @request GET:/userProjects/{id}
     * @response `200` `EntityModelUserProject` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-userproject-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelUserProject, any>({
        path: `/userProjects/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-userproject
     *
     * @tags user-project-entity-controller
     * @name PutItemResourceUserprojectPut
     * @request PUT:/userProjects/{id}
     * @response `200` `EntityModelUserProject` OK
     * @response `201` `EntityModelUserProject` Created
     * @response `204` `any` No Content
     */
    "putItemResource-userproject-put": (id: string, data: UserProjectRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelUserProject, any>({
        path: `/userProjects/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-userproject
     *
     * @tags user-project-entity-controller
     * @name DeleteItemResourceUserprojectDelete
     * @request DELETE:/userProjects/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-userproject-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userProjects/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-userproject
     *
     * @tags user-project-entity-controller
     * @name PatchItemResourceUserprojectPatch
     * @request PATCH:/userProjects/{id}
     * @response `200` `EntityModelUserProject` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-userproject-patch": (id: string, data: UserProjectRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelUserProject, any>({
        path: `/userProjects/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  userProjectSearchController = {
    /**
     * No description
     *
     * @tags user-project-search-controller
     * @name ExecuteSearchUserprojectGet
     * @request GET:/userProjects/search/deleteByProjectId
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userproject-get": (
      query?: {
        /** @format uuid */
        projectId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/userProjects/search/deleteByProjectId`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags user-project-search-controller
     * @name ExecuteSearchUserprojectGet1
     * @request GET:/userProjects/search/deleteByUserIdAndProjectId
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userproject-get_1": (
      query?: {
        /** @format uuid */
        userId?: string
        /** @format uuid */
        projectId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/userProjects/search/deleteByUserIdAndProjectId`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags user-project-search-controller
     * @name ExecuteSearchUserprojectGet2
     * @request GET:/userProjects/search/existsByProjectId
     * @response `200` `boolean` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userproject-get_2": (
      query?: {
        /** @format uuid */
        projectId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<boolean, any>({
        path: `/userProjects/search/existsByProjectId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags user-project-search-controller
     * @name ExecuteSearchUserprojectGet3
     * @request GET:/userProjects/search/existsByUserIdAndProjectId
     * @response `200` `boolean` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userproject-get_3": (
      query?: {
        /** @format uuid */
        userId?: string
        /** @format uuid */
        projectId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<boolean, any>({
        path: `/userProjects/search/existsByUserIdAndProjectId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags user-project-search-controller
     * @name ExecuteSearchUserprojectGet4
     * @request GET:/userProjects/search/findByProjectId
     * @response `200` `CollectionModelEntityModelUserProject` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userproject-get_4": (
      query?: {
        /** @format uuid */
        projectId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelUserProject, any>({
        path: `/userProjects/search/findByProjectId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags user-project-search-controller
     * @name ExecuteSearchUserprojectGet5
     * @request GET:/userProjects/search/findByUserId
     * @response `200` `CollectionModelEntityModelUserProject` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userproject-get_5": (
      query?: {
        /** @format uuid */
        userId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelUserProject, any>({
        path: `/userProjects/search/findByUserId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      })
  }
  userProjectPropertyReferenceController = {
    /**
     * @description get-project-by-userproject-Id
     *
     * @tags user-project-property-reference-controller
     * @name FollowPropertyReferenceUserprojectGet
     * @request GET:/userProjects/{id}/project
     * @response `200` `EntityModelProject` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-userproject-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelProject, any>({
        path: `/userProjects/${id}/project`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-project-by-userproject-Id
     *
     * @tags user-project-property-reference-controller
     * @name CreatePropertyReferenceUserprojectPut
     * @request PUT:/userProjects/{id}/project
     * @response `200` `EntityModelProject` OK
     * @response `201` `EntityModelProject` Created
     * @response `204` `any` No Content
     */
    "createPropertyReference-userproject-put": (id: string, data: CollectionModelObject, params: RequestParams = {}) =>
      this.http.request<EntityModelProject, any>({
        path: `/userProjects/${id}/project`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-project-by-userproject-Id
     *
     * @tags user-project-property-reference-controller
     * @name DeletePropertyReferenceUserprojectDelete
     * @request DELETE:/userProjects/{id}/project
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReference-userproject-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userProjects/${id}/project`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-project-by-userproject-Id
     *
     * @tags user-project-property-reference-controller
     * @name CreatePropertyReferenceUserprojectPatch
     * @request PATCH:/userProjects/{id}/project
     * @response `200` `EntityModelProject` OK
     * @response `204` `any` No Content
     */
    "createPropertyReference-userproject-patch": (
      id: string,
      data: CollectionModelObject,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelProject, any>({
        path: `/userProjects/${id}/project`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-project-by-userproject-Id
     *
     * @tags user-project-property-reference-controller
     * @name FollowPropertyReferenceUserprojectGet1
     * @request GET:/userProjects/{id}/project/{propertyId}
     * @response `200` `EntityModelProject` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-userproject-get_1": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<EntityModelProject, any>({
        path: `/userProjects/${id}/project/${propertyId}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description delete-project-by-userproject-Id
     *
     * @tags user-project-property-reference-controller
     * @name DeletePropertyReferenceIdUserprojectDelete
     * @request DELETE:/userProjects/{id}/project/{propertyId}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReferenceId-userproject-delete": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userProjects/${id}/project/${propertyId}`,
        method: "DELETE",
        ...params
      })
  }
  userRoleEntityController = {
    /**
     * @description get-userrole
     *
     * @tags user-role-entity-controller
     * @name GetCollectionResourceUserroleGet
     * @request GET:/userRoles
     * @response `200` `PagedModelEntityModelUserRole` OK
     */
    "getCollectionResource-userrole-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelUserRole, any>({
        path: `/userRoles`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-userrole
     *
     * @tags user-role-entity-controller
     * @name PostCollectionResourceUserrolePost
     * @request POST:/userRoles
     * @response `201` `EntityModelUserRole` Created
     */
    "postCollectionResource-userrole-post": (data: UserRoleRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelUserRole, any>({
        path: `/userRoles`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-userrole
     *
     * @tags user-role-entity-controller
     * @name GetItemResourceUserroleGet
     * @request GET:/userRoles/{id}
     * @response `200` `EntityModelUserRole` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-userrole-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelUserRole, any>({
        path: `/userRoles/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-userrole
     *
     * @tags user-role-entity-controller
     * @name PutItemResourceUserrolePut
     * @request PUT:/userRoles/{id}
     * @response `200` `EntityModelUserRole` OK
     * @response `201` `EntityModelUserRole` Created
     * @response `204` `any` No Content
     */
    "putItemResource-userrole-put": (id: string, data: UserRoleRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelUserRole, any>({
        path: `/userRoles/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-userrole
     *
     * @tags user-role-entity-controller
     * @name DeleteItemResourceUserroleDelete
     * @request DELETE:/userRoles/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-userrole-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userRoles/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-userrole
     *
     * @tags user-role-entity-controller
     * @name PatchItemResourceUserrolePatch
     * @request PATCH:/userRoles/{id}
     * @response `200` `EntityModelUserRole` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-userrole-patch": (id: string, data: UserRoleRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelUserRole, any>({
        path: `/userRoles/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  userRoleSearchController = {
    /**
     * No description
     *
     * @tags user-role-search-controller
     * @name ExecuteSearchUserroleGet
     * @request GET:/userRoles/search/deleteAllByUserInAndRoleIn
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userrole-get": (
      query?: {
        userKey?: User[]
        roleKey?: Role[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/userRoles/search/deleteAllByUserInAndRoleIn`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags user-role-search-controller
     * @name ExecuteSearchUserroleGet1
     * @request GET:/userRoles/search/deleteByUserId
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userrole-get_1": (
      query?: {
        /** @format uuid */
        userId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/userRoles/search/deleteByUserId`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags user-role-search-controller
     * @name ExecuteSearchUserroleGet2
     * @request GET:/userRoles/search/deleteByUserIdAndRoleId
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userrole-get_2": (
      query?: {
        /** @format uuid */
        userId?: string
        /** @format uuid */
        roleId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/userRoles/search/deleteByUserIdAndRoleId`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags user-role-search-controller
     * @name ExecuteSearchUserroleGet3
     * @request GET:/userRoles/search/findByUserId
     * @response `200` `CollectionModelEntityModelUserRole` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userrole-get_3": (
      query?: {
        /** @format uuid */
        userId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelUserRole, any>({
        path: `/userRoles/search/findByUserId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      })
  }
  userSkillEntityController = {
    /**
     * @description get-userskill
     *
     * @tags user-skill-entity-controller
     * @name GetCollectionResourceUserskillGet
     * @request GET:/userSkills
     * @response `200` `PagedModelEntityModelUserSkill` OK
     */
    "getCollectionResource-userskill-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelUserSkill, any>({
        path: `/userSkills`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-userskill
     *
     * @tags user-skill-entity-controller
     * @name PostCollectionResourceUserskillPost
     * @request POST:/userSkills
     * @response `201` `EntityModelUserSkill` Created
     */
    "postCollectionResource-userskill-post": (data: UserSkillRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelUserSkill, any>({
        path: `/userSkills`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-userskill
     *
     * @tags user-skill-entity-controller
     * @name GetItemResourceUserskillGet
     * @request GET:/userSkills/{id}
     * @response `200` `EntityModelUserSkill` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-userskill-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelUserSkill, any>({
        path: `/userSkills/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-userskill
     *
     * @tags user-skill-entity-controller
     * @name PutItemResourceUserskillPut
     * @request PUT:/userSkills/{id}
     * @response `200` `EntityModelUserSkill` OK
     * @response `201` `EntityModelUserSkill` Created
     * @response `204` `any` No Content
     */
    "putItemResource-userskill-put": (id: string, data: UserSkillRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelUserSkill, any>({
        path: `/userSkills/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-userskill
     *
     * @tags user-skill-entity-controller
     * @name DeleteItemResourceUserskillDelete
     * @request DELETE:/userSkills/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-userskill-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userSkills/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-userskill
     *
     * @tags user-skill-entity-controller
     * @name PatchItemResourceUserskillPatch
     * @request PATCH:/userSkills/{id}
     * @response `200` `EntityModelUserSkill` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-userskill-patch": (id: string, data: UserSkillRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelUserSkill, any>({
        path: `/userSkills/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  userSkillSearchController = {
    /**
     * No description
     *
     * @tags user-skill-search-controller
     * @name ExecuteSearchUserskillGet
     * @request GET:/userSkills/search/deleteBySkillId
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userskill-get": (
      query?: {
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/userSkills/search/deleteBySkillId`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags user-skill-search-controller
     * @name ExecuteSearchUserskillGet1
     * @request GET:/userSkills/search/deleteByUserIdAndSkillId
     * @response `200` `any` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userskill-get_1": (
      query?: {
        /** @format uuid */
        userId?: string
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<any, any>({
        path: `/userSkills/search/deleteByUserIdAndSkillId`,
        method: "GET",
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags user-skill-search-controller
     * @name ExecuteSearchUserskillGet2
     * @request GET:/userSkills/search/existsBySkillId
     * @response `200` `boolean` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userskill-get_2": (
      query?: {
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<boolean, any>({
        path: `/userSkills/search/existsBySkillId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags user-skill-search-controller
     * @name ExecuteSearchUserskillGet3
     * @request GET:/userSkills/search/existsBySkillLevelId
     * @response `200` `boolean` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userskill-get_3": (
      query?: {
        /** @format uuid */
        skillLevelId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<boolean, any>({
        path: `/userSkills/search/existsBySkillLevelId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags user-skill-search-controller
     * @name ExecuteSearchUserskillGet4
     * @request GET:/userSkills/search/existsByUserIdAndSkillId
     * @response `200` `boolean` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userskill-get_4": (
      query?: {
        /** @format uuid */
        userId?: string
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<boolean, any>({
        path: `/userSkills/search/existsByUserIdAndSkillId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags user-skill-search-controller
     * @name ExecuteSearchUserskillGet5
     * @request GET:/userSkills/search/findBySkillId
     * @response `200` `CollectionModelEntityModelUserSkill` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userskill-get_5": (
      query?: {
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelUserSkill, any>({
        path: `/userSkills/search/findBySkillId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags user-skill-search-controller
     * @name ExecuteSearchUserskillGet6
     * @request GET:/userSkills/search/findByUserId
     * @response `200` `CollectionModelEntityModelUserSkill` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userskill-get_6": (
      query?: {
        /** @format uuid */
        userId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelUserSkill, any>({
        path: `/userSkills/search/findByUserId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags user-skill-search-controller
     * @name ExecuteSearchUserskillGet7
     * @request GET:/userSkills/search/findByUserIdAndSkillId
     * @response `200` `CollectionModelEntityModelUserSkill` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-userskill-get_7": (
      query?: {
        /** @format uuid */
        userId?: string
        /** @format uuid */
        skillId?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<CollectionModelEntityModelUserSkill, any>({
        path: `/userSkills/search/findByUserIdAndSkillId`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      })
  }
  userSkillPropertyReferenceController = {
    /**
     * @description get-skill-by-userskill-Id
     *
     * @tags user-skill-property-reference-controller
     * @name FollowPropertyReferenceUserskillGet
     * @request GET:/userSkills/{id}/skill
     * @response `200` `EntityModelSkill` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-userskill-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelSkill, any>({
        path: `/userSkills/${id}/skill`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-skill-by-userskill-Id
     *
     * @tags user-skill-property-reference-controller
     * @name CreatePropertyReferenceUserskillPut
     * @request PUT:/userSkills/{id}/skill
     * @response `200` `EntityModelSkill` OK
     * @response `201` `EntityModelSkill` Created
     * @response `204` `any` No Content
     */
    "createPropertyReference-userskill-put": (id: string, data: CollectionModelObject, params: RequestParams = {}) =>
      this.http.request<EntityModelSkill, any>({
        path: `/userSkills/${id}/skill`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-skill-by-userskill-Id
     *
     * @tags user-skill-property-reference-controller
     * @name DeletePropertyReferenceUserskillDelete
     * @request DELETE:/userSkills/{id}/skill
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReference-userskill-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userSkills/${id}/skill`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-skill-by-userskill-Id
     *
     * @tags user-skill-property-reference-controller
     * @name CreatePropertyReferenceUserskillPatch
     * @request PATCH:/userSkills/{id}/skill
     * @response `200` `EntityModelSkill` OK
     * @response `204` `any` No Content
     */
    "createPropertyReference-userskill-patch": (id: string, data: CollectionModelObject, params: RequestParams = {}) =>
      this.http.request<EntityModelSkill, any>({
        path: `/userSkills/${id}/skill`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-skill-by-userskill-Id
     *
     * @tags user-skill-property-reference-controller
     * @name FollowPropertyReferenceUserskillGet1
     * @request GET:/userSkills/{id}/skill/{propertyId}
     * @response `200` `EntityModelSkill` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-userskill-get_1": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<EntityModelSkill, any>({
        path: `/userSkills/${id}/skill/${propertyId}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description delete-skill-by-userskill-Id
     *
     * @tags user-skill-property-reference-controller
     * @name DeletePropertyReferenceIdUserskillDelete
     * @request DELETE:/userSkills/{id}/skill/{propertyId}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReferenceId-userskill-delete": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userSkills/${id}/skill/${propertyId}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description get-skilllevel-by-userskill-Id
     *
     * @tags user-skill-property-reference-controller
     * @name FollowPropertyReferenceUserskillGet2
     * @request GET:/userSkills/{id}/skillLevel
     * @response `200` `EntityModelSkillLevel` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-userskill-get_2": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelSkillLevel, any>({
        path: `/userSkills/${id}/skillLevel`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-skilllevel-by-userskill-Id
     *
     * @tags user-skill-property-reference-controller
     * @name CreatePropertyReferenceUserskillPut1
     * @request PUT:/userSkills/{id}/skillLevel
     * @response `200` `EntityModelSkillLevel` OK
     * @response `201` `EntityModelSkillLevel` Created
     * @response `204` `any` No Content
     */
    "createPropertyReference-userskill-put_1": (id: string, data: CollectionModelObject, params: RequestParams = {}) =>
      this.http.request<EntityModelSkillLevel, any>({
        path: `/userSkills/${id}/skillLevel`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-skilllevel-by-userskill-Id
     *
     * @tags user-skill-property-reference-controller
     * @name DeletePropertyReferenceUserskillDelete1
     * @request DELETE:/userSkills/{id}/skillLevel
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReference-userskill-delete_1": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userSkills/${id}/skillLevel`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-skilllevel-by-userskill-Id
     *
     * @tags user-skill-property-reference-controller
     * @name CreatePropertyReferenceUserskillPatch1
     * @request PATCH:/userSkills/{id}/skillLevel
     * @response `200` `EntityModelSkillLevel` OK
     * @response `204` `any` No Content
     */
    "createPropertyReference-userskill-patch_1": (
      id: string,
      data: CollectionModelObject,
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelSkillLevel, any>({
        path: `/userSkills/${id}/skillLevel`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-skilllevel-by-userskill-Id
     *
     * @tags user-skill-property-reference-controller
     * @name FollowPropertyReferenceUserskillGet3
     * @request GET:/userSkills/{id}/skillLevel/{propertyId}
     * @response `200` `EntityModelSkillLevel` OK
     * @response `404` `any` Not Found
     */
    "followPropertyReference-userskill-get_3": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<EntityModelSkillLevel, any>({
        path: `/userSkills/${id}/skillLevel/${propertyId}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description delete-skilllevel-by-userskill-Id
     *
     * @tags user-skill-property-reference-controller
     * @name DeletePropertyReferenceIdUserskillDelete1
     * @request DELETE:/userSkills/{id}/skillLevel/{propertyId}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deletePropertyReferenceId-userskill-delete_1": (id: string, propertyId: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/userSkills/${id}/skillLevel/${propertyId}`,
        method: "DELETE",
        ...params
      })
  }
  userEntityController = {
    /**
     * @description get-user
     *
     * @tags user-entity-controller
     * @name GetCollectionResourceUserGet
     * @request GET:/users
     * @response `200` `PagedModelEntityModelUser` OK
     */
    "getCollectionResource-user-get": (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      },
      params: RequestParams = {}
    ) =>
      this.http.request<PagedModelEntityModelUser, any>({
        path: `/users`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description create-user
     *
     * @tags user-entity-controller
     * @name PostCollectionResourceUserPost
     * @request POST:/users
     * @response `201` `EntityModelUser` Created
     */
    "postCollectionResource-user-post": (data: UserRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelUser, any>({
        path: `/users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description get-user
     *
     * @tags user-entity-controller
     * @name GetItemResourceUserGet
     * @request GET:/users/{id}
     * @response `200` `EntityModelUser` OK
     * @response `404` `any` Not Found
     */
    "getItemResource-user-get": (id: string, params: RequestParams = {}) =>
      this.http.request<EntityModelUser, any>({
        path: `/users/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description update-user
     *
     * @tags user-entity-controller
     * @name PutItemResourceUserPut
     * @request PUT:/users/{id}
     * @response `200` `EntityModelUser` OK
     * @response `201` `EntityModelUser` Created
     * @response `204` `any` No Content
     */
    "putItemResource-user-put": (id: string, data: UserRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelUser, any>({
        path: `/users/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description delete-user
     *
     * @tags user-entity-controller
     * @name DeleteItemResourceUserDelete
     * @request DELETE:/users/{id}
     * @response `204` `any` No Content
     * @response `404` `any` Not Found
     */
    "deleteItemResource-user-delete": (id: string, params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/users/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * @description patch-user
     *
     * @tags user-entity-controller
     * @name PatchItemResourceUserPatch
     * @request PATCH:/users/{id}
     * @response `200` `EntityModelUser` OK
     * @response `204` `any` No Content
     */
    "patchItemResource-user-patch": (id: string, data: UserRequestBody, params: RequestParams = {}) =>
      this.http.request<EntityModelUser, any>({
        path: `/users/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  userSearchController = {
    /**
     * No description
     *
     * @tags user-search-controller
     * @name ExecuteSearchUserGet
     * @request GET:/users/search/findByEmail
     * @response `200` `EntityModelUser` OK
     * @response `404` `any` Not Found
     */
    "executeSearch-user-get": (
      query?: {
        email?: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<EntityModelUser, any>({
        path: `/users/search/findByEmail`,
        method: "GET",
        query: query,
        format: "json",
        ...params
      })
  }
  projects = {
    /**
     * @description 更新個人可操作專案中某技能的等級綁定。僅接受既有等級 ID。
     *
     * @tags Projects
     * @name UpdatePersonalProjectSkillLevel
     * @summary Update personal project skill level
     * @request PUT:/project/personal/{projectId}/skill/{skillId}/level
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    updatePersonalProjectSkillLevel: (
      projectId: string,
      skillId: string,
      data: PersonalProjectSkillLevelRequest,
      params: RequestParams = {}
    ) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/project/personal/${projectId}/skill/${skillId}/level`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 修改個人專案，僅限擁有者
     *
     * @tags Projects
     * @name UpdatePersonalProject
     * @summary Update personal project
     * @request PUT:/project/personal/update/{projectId}
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    updatePersonalProject: (projectId: string, data: PersonalProjectRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/project/personal/update/${projectId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Updates an existing project.
     *
     * @tags Projects
     * @name UpdateProject
     * @summary Update project
     * @request POST:/project/update
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    updateProject: (data: ProjectVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/project/update`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 搜尋專案並回傳分頁結果，支援多種查詢條件與排序
     *
     * @tags Projects
     * @name SearchProjects
     * @summary Search projects with pagination
     * @request POST:/project/search
     * @response `200` `ResponseTypePageResultProjectVo` OK
     * @response `500` `ResponseTypePageResultProjectVo` Server error
     */
    searchProjects: (data: ProjectSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultProjectVo, ResponseTypePageResultProjectVo>({
        path: `/project/search`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 綁定技能到可操作的個人專案。管理員指定專案雖不可修改主資料，但可修改綁定關係。每個專案技能綁定只能選擇一個等級。
     *
     * @tags Projects
     * @name BindPersonalProjectSkill
     * @summary Bind personal project skill
     * @request POST:/project/personal/{projectId}/skill/bind
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    bindPersonalProjectSkill: (projectId: string, data: PersonalProjectSkillBindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/project/personal/${projectId}/skill/bind`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 新增個人專案，自動綁定當前使用者
     *
     * @tags Projects
     * @name AddPersonalProject
     * @summary Add personal project
     * @request POST:/project/personal/add
     * @response `200` `ResponseTypeProjectVo` OK
     * @response `400` `ResponseTypeProjectVo` Invalid input
     * @response `500` `ResponseTypeProjectVo` Server error
     */
    addPersonalProject: (data: PersonalProjectRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeProjectVo, ResponseTypeProjectVo>({
        path: `/project/personal/add`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Deletes a project.
     *
     * @tags Projects
     * @name DeleteProject
     * @summary Delete project
     * @request POST:/project/delete
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteProject: (data: ProjectVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/project/delete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 搜尋當前使用者的專案並回傳分頁結果，支援多種查詢條件與排序
     *
     * @tags Projects
     * @name SearchCurrentUserProjects
     * @summary Search current user projects with pagination
     * @request POST:/project/current/search
     * @response `200` `ResponseTypePageResultProjectVo` OK
     * @response `500` `ResponseTypePageResultProjectVo` Server error
     */
    searchCurrentUserProjects: (data: ProjectSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultProjectVo, ResponseTypePageResultProjectVo>({
        path: `/project/current/search`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Binds a skill level to a project. This operation manages binding relation only and does not modify skill content. Admin-assigned skills can still be bound by authorized users.
     *
     * @tags Projects
     * @name BindProjectSkill
     * @summary Bind project skill
     * @request POST:/project/bindSkill
     * @deprecated
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    bindProjectSkill: (data: ProjectSkillBindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/project/bindSkill`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Creates a new project.
     *
     * @tags Projects
     * @name AddProject
     * @summary Add project
     * @request POST:/project/add
     * @response `200` `ResponseTypeProjectVo` OK
     * @response `400` `ResponseTypeProjectVo` Invalid input
     * @response `500` `ResponseTypeProjectVo` Server error
     */
    addProject: (data: ProjectVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeProjectVo, ResponseTypeProjectVo>({
        path: `/project/add`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 獲取指定專案綁定的所有技能與等級詳細資訊
     *
     * @tags Projects
     * @name GetProjectSkills
     * @summary Get project skills
     * @request GET:/project/{projectId}/skills
     * @response `200` `ResponseTypeListProjectSkillVo` OK
     * @response `500` `ResponseTypeListProjectSkillVo` Server error
     */
    getProjectSkills: (projectId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListProjectSkillVo, ResponseTypeListProjectSkillVo>({
        path: `/project/${projectId}/skills`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description 取得專案所有成員在此專案中的技能等級綁定，供編輯專案時回填既有資料
     *
     * @tags Projects
     * @name GetProjectMemberSkills
     * @summary Get project member skills
     * @request GET:/project/{projectId}/member-skills
     * @response `200` `ResponseTypeListProjectMemberSkillVo` OK
     * @response `500` `ResponseTypeListProjectMemberSkillVo` Server error
     */
    getProjectMemberSkills: (projectId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListProjectMemberSkillVo, ResponseTypeListProjectMemberSkillVo>({
        path: `/project/${projectId}/member-skills`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description 獲取個人專屬的專案綁定的所有技能與等級詳細資訊，會驗證當前使用者權限
     *
     * @tags Projects
     * @name GetPersonalProjectSkills
     * @summary Get personal project skills
     * @request GET:/project/personal/{projectId}/skills
     * @response `200` `ResponseTypeListProjectSkillVo` OK
     * @response `500` `ResponseTypeListProjectSkillVo` Server error
     */
    getPersonalProjectSkills: (projectId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListProjectSkillVo, ResponseTypeListProjectSkillVo>({
        path: `/project/personal/${projectId}/skills`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description Returns all projects.
     *
     * @tags Projects
     * @name GetProject
     * @summary Get projects
     * @request GET:/project/get
     * @response `200` `ResponseTypeListProjectVo` OK
     * @response `500` `ResponseTypeListProjectVo` Server error
     */
    getProject: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListProjectVo, ResponseTypeListProjectVo>({
        path: `/project/get`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description 回傳當前使用者所屬的所有專案
     *
     * @tags Projects
     * @name GetCurrentUserProjects
     * @summary Get current user projects
     * @request GET:/project/current
     * @response `200` `ResponseTypeListProjectVo` OK
     * @response `500` `ResponseTypeListProjectVo` Server error
     */
    getCurrentUserProjects: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListProjectVo, ResponseTypeListProjectVo>({
        path: `/project/current`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description 解除個人可操作專案中的技能綁定。
     *
     * @tags Projects
     * @name UnbindPersonalProjectSkill
     * @summary Unbind personal project skill
     * @request DELETE:/project/personal/{projectId}/skill/{skillId}
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    unbindPersonalProjectSkill: (projectId: string, skillId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/project/personal/${projectId}/skill/${skillId}`,
        method: "DELETE",
        format: "json",
        ...params
      }),

    /**
     * @description 刪除個人專案，僅限擁有者
     *
     * @tags Projects
     * @name DeletePersonalProject
     * @summary Delete personal project
     * @request DELETE:/project/personal/delete/{projectId}
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deletePersonalProject: (projectId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/project/personal/delete/${projectId}`,
        method: "DELETE",
        format: "json",
        ...params
      })
  }
  jobPosting = {
    /**
     * @description 更新職缺資訊。
     *
     * @tags Job Posting
     * @name UpdateJobPosting
     * @summary 更新職缺
     * @request PUT:/job-posting/update
     * @response `200` `ResponseTypeJobPostingVo` OK
     * @response `400` `ResponseTypeJobPostingVo` Invalid input
     * @response `500` `ResponseTypeJobPostingVo` Server error
     */
    updateJobPosting: (data: JobPostingVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeJobPostingVo, ResponseTypeJobPostingVo>({
        path: `/job-posting/update`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 根據公司 ID 爬取該公司網站上的職缺並使用 Gemini 分析。
     *
     * @tags Job Posting
     * @name ScrapeJobs
     * @summary 爬取並分析職缺
     * @request POST:/job-posting/scrape/{companyId}
     * @response `200` `ResponseTypeListJobPostingVo` OK
     * @response `400` `ResponseTypeListJobPostingVo` Invalid input
     * @response `500` `ResponseTypeListJobPostingVo` Server error
     */
    scrapeJobs: (companyId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListJobPostingVo, ResponseTypeListJobPostingVo>({
        path: `/job-posting/scrape/${companyId}`,
        method: "POST",
        format: "json",
        ...params
      }),

    /**
     * @description 手動新增一筆職缺。
     *
     * @tags Job Posting
     * @name AddJobPosting
     * @summary 新增職缺
     * @request POST:/job-posting/add
     * @response `200` `ResponseTypeJobPostingVo` OK
     * @response `400` `ResponseTypeJobPostingVo` Invalid input
     * @response `500` `ResponseTypeJobPostingVo` Server error
     */
    addJobPosting: (data: CreateJobPostingRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeJobPostingVo, ResponseTypeJobPostingVo>({
        path: `/job-posting/add`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 返回所有職缺列表。
     *
     * @tags Job Posting
     * @name GetAllJobPostings
     * @summary 取得所有職缺
     * @request GET:/job-posting/get
     * @response `200` `ResponseTypeListJobPostingVo` OK
     * @response `500` `ResponseTypeListJobPostingVo` Server error
     */
    getAllJobPostings: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListJobPostingVo, ResponseTypeListJobPostingVo>({
        path: `/job-posting/get`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description 根據 ID 取得職缺資訊。
     *
     * @tags Job Posting
     * @name GetJobPostingById
     * @summary 取得職缺詳情
     * @request GET:/job-posting/get/{id}
     * @response `200` `ResponseTypeJobPostingVo` OK
     * @response `500` `ResponseTypeJobPostingVo` Server error
     */
    getJobPostingById: (id: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeJobPostingVo, ResponseTypeJobPostingVo>({
        path: `/job-posting/get/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description 根據公司 ID 取得該公司所有職缺。
     *
     * @tags Job Posting
     * @name GetJobPostingsByCompanyId
     * @summary 取得公司職缺
     * @request GET:/job-posting/company/{companyId}
     * @response `200` `ResponseTypeListJobPostingVo` OK
     * @response `500` `ResponseTypeListJobPostingVo` Server error
     */
    getJobPostingsByCompanyId: (companyId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListJobPostingVo, ResponseTypeListJobPostingVo>({
        path: `/job-posting/company/${companyId}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description 根據 ID 刪除職缺。
     *
     * @tags Job Posting
     * @name DeleteJobPosting
     * @summary 刪除職缺
     * @request DELETE:/job-posting/delete/{id}
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteJobPosting: (id: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/job-posting/delete/${id}`,
        method: "DELETE",
        format: "json",
        ...params
      })
  }
  company = {
    /**
     * @description 更新公司資訊。
     *
     * @tags Company
     * @name UpdateCompany
     * @summary 更新公司
     * @request PUT:/company/update
     * @response `200` `ResponseTypeCompanyVo` OK
     * @response `400` `ResponseTypeCompanyVo` Invalid input
     * @response `500` `ResponseTypeCompanyVo` Server error
     */
    updateCompany: (data: UpdateCompanyRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeCompanyVo, ResponseTypeCompanyVo>({
        path: `/company/update`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 建立一間新的公司。
     *
     * @tags Company
     * @name AddCompany
     * @summary 新增公司
     * @request POST:/company/add
     * @response `200` `ResponseTypeCompanyVo` OK
     * @response `400` `ResponseTypeCompanyVo` Invalid input
     * @response `500` `ResponseTypeCompanyVo` Server error
     */
    addCompany: (data: CreateCompanyRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeCompanyVo, ResponseTypeCompanyVo>({
        path: `/company/add`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 返回所有公司列表。
     *
     * @tags Company
     * @name GetAllCompanies
     * @summary 取得所有公司
     * @request GET:/company/get
     * @response `200` `ResponseTypeListCompanyVo` OK
     * @response `500` `ResponseTypeListCompanyVo` Server error
     */
    getAllCompanies: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListCompanyVo, ResponseTypeListCompanyVo>({
        path: `/company/get`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description 根據 ID 取得公司資訊。
     *
     * @tags Company
     * @name GetCompanyById
     * @summary 取得公司詳情
     * @request GET:/company/get/{id}
     * @response `200` `ResponseTypeCompanyVo` OK
     * @response `500` `ResponseTypeCompanyVo` Server error
     */
    getCompanyById: (id: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeCompanyVo, ResponseTypeCompanyVo>({
        path: `/company/get/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description 根據 ID 刪除公司。
     *
     * @tags Company
     * @name DeleteCompany
     * @summary 刪除公司
     * @request DELETE:/company/delete/{id}
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteCompany: (id: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/company/delete/${id}`,
        method: "DELETE",
        format: "json",
        ...params
      })
  }
  users = {
    /**
     * @description 完整覆蓋式綁定使用者角色。空清單清空所有角色，null 清單拋出異常。
     *
     * @tags Users
     * @name RebindUserRoles
     * @summary Rebind user roles
     * @request POST:/users/{userId}/roles/rebind
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    rebindUserRoles: (userId: string, data: UserRoleRebindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/users/${userId}/roles/rebind`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 搜尋使用者並回傳分頁結果，支援多種查詢條件與排序
     *
     * @tags Users
     * @name SearchUsers
     * @summary Search users with pagination
     * @request POST:/users/search
     * @response `200` `ResponseTypePageResultUserVo` OK
     * @response `500` `ResponseTypePageResultUserVo` Server error
     */
    searchUsers: (data: UserSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultUserVo, ResponseTypePageResultUserVo>({
        path: `/users/search`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Updates a user and their role assignments.
     *
     * @tags Users
     * @name SaveUser
     * @summary Save user with roles
     * @request POST:/users/saveUser
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    saveUser: (data: UserVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/users/saveUser`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Creates a new user account.
     *
     * @tags Users
     * @name CreateUser
     * @summary Create user
     * @request POST:/users/create
     * @response `200` `boolean` OK
     * @response `400` `boolean` Invalid input
     * @response `500` `boolean` Server error
     */
    createUser: (data: UserVo, params: RequestParams = {}) =>
      this.http.request<boolean, boolean>({
        path: `/users/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Binds a skill level to a user. This operation manages binding relation only and does not modify skill content. Admin-assigned skills can still be bound by authorized users.
     *
     * @tags Users
     * @name BindUserSkill
     * @summary Bind user skill
     * @request POST:/users/bindSkill
     * @deprecated
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    bindUserSkill: (data: UserSkillBindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/users/bindSkill`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Binds a user to a project.
     *
     * @tags Users
     * @name BindUserProject
     * @summary Bind user project
     * @request POST:/users/bindProject
     * @deprecated
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    bindUserProject: (data: UserProjectBindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/users/bindProject`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Returns current user profile and permissions.
     *
     * @tags Users
     * @name GetUserInfo
     * @summary Get current user info
     * @request GET:/users/infoVo
     * @response `200` `ResponseTypeUserVo` OK
     * @response `401` `ResponseTypeUserVo` Unauthorized
     * @response `500` `ResponseTypeUserVo` Server error
     */
    getUserInfo: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeUserVo, ResponseTypeUserVo>({
        path: `/users/infoVo`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description Returns all users with their roles and permissions.
     *
     * @tags Users
     * @name GetAllUser
     * @summary Get all users
     * @request GET:/users/getAllUser
     * @response `200` `ResponseTypeListUserVo` OK
     * @response `500` `ResponseTypeListUserVo` Server error
     */
    getAllUser: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListUserVo, ResponseTypeListUserVo>({
        path: `/users/getAllUser`,
        method: "GET",
        format: "json",
        ...params
      })
  }
  userBindings = {
    /**
     * @description Rebind all current-user skill-level bindings with diff strategy
     *
     * @tags User Bindings
     * @name RebindCurrentUserSkills
     * @summary Rebind current user skills
     * @request POST:/user/bindings/skill/rebind
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    rebindCurrentUserSkills: (data: SkillBindingsRebindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/user/bindings/skill/rebind`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Rebind project skills for a manageable project with diff strategy
     *
     * @tags User Bindings
     * @name RebindCurrentUserProjectSkills
     * @summary Rebind current user project skills
     * @request POST:/user/bindings/project/{projectId}/skill/rebind
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    rebindCurrentUserProjectSkills: (projectId: string, data: SkillBindingsRebindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/user/bindings/project/${projectId}/skill/rebind`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  userJobLink = {
    /**
     * @description 建立使用者與職缺的關聯。
     *
     * @tags User Job Link
     * @name AddUserJobLink
     * @summary 新增使用者職缺連結
     * @request POST:/user-job-link/add
     * @response `200` `ResponseTypeUserJobLinkVo` OK
     * @response `400` `ResponseTypeUserJobLinkVo` Invalid input
     * @response `500` `ResponseTypeUserJobLinkVo` Server error
     */
    addUserJobLink: (data: UserJobLinkVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeUserJobLinkVo, ResponseTypeUserJobLinkVo>({
        path: `/user-job-link/add`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 根據使用者 ID 取得該使用者所有職缺連結。
     *
     * @tags User Job Link
     * @name GetUserJobLinksByUserId
     * @summary 取得使用者所有職缺連結
     * @request GET:/user-job-link/user/{userId}
     * @response `200` `ResponseTypeListUserJobLinkVo` OK
     * @response `500` `ResponseTypeListUserJobLinkVo` Server error
     */
    getUserJobLinksByUserId: (userId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListUserJobLinkVo, ResponseTypeListUserJobLinkVo>({
        path: `/user-job-link/user/${userId}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description 根據職缺 ID 取得該職缺的所有使用者連結。
     *
     * @tags User Job Link
     * @name GetUserJobLinksByJobPostingId
     * @summary 取得職缺所有使用者連結
     * @request GET:/user-job-link/job-posting/{jobPostingId}
     * @response `200` `ResponseTypeListUserJobLinkVo` OK
     * @response `500` `ResponseTypeListUserJobLinkVo` Server error
     */
    getUserJobLinksByJobPostingId: (jobPostingId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListUserJobLinkVo, ResponseTypeListUserJobLinkVo>({
        path: `/user-job-link/job-posting/${jobPostingId}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description 返回所有使用者職缺連結列表。
     *
     * @tags User Job Link
     * @name GetAllUserJobLinks
     * @summary 取得所有連結
     * @request GET:/user-job-link/get
     * @response `200` `ResponseTypeListUserJobLinkVo` OK
     * @response `500` `ResponseTypeListUserJobLinkVo` Server error
     */
    getAllUserJobLinks: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListUserJobLinkVo, ResponseTypeListUserJobLinkVo>({
        path: `/user-job-link/get`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description 根據 ID 取得使用者職缺連結資訊。
     *
     * @tags User Job Link
     * @name GetUserJobLinkById
     * @summary 取得連結詳情
     * @request GET:/user-job-link/get/{id}
     * @response `200` `ResponseTypeUserJobLinkVo` OK
     * @response `500` `ResponseTypeUserJobLinkVo` Server error
     */
    getUserJobLinkById: (id: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeUserJobLinkVo, ResponseTypeUserJobLinkVo>({
        path: `/user-job-link/get/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description 根據 ID 刪除使用者職缺連結。
     *
     * @tags User Job Link
     * @name DeleteUserJobLink
     * @summary 刪除使用者職缺連結
     * @request DELETE:/user-job-link/delete/{id}
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteUserJobLink: (id: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/user-job-link/delete/${id}`,
        method: "DELETE",
        format: "json",
        ...params
      })
  }
  skills = {
    /**
     * @description Updates an existing skill.
     *
     * @tags Skills
     * @name UpdateSkill
     * @summary Update skill
     * @request POST:/skill/update
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    updateSkill: (data: SkillVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/skill/update`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 支援 name、description、createdBy 查詢條件，預設按 createdTime 降序排序
     *
     * @tags Skills
     * @name SearchSkills
     * @summary 搜尋技能（分頁）
     * @request POST:/skill/search
     * @response `200` `ResponseTypePageResultSkillVo` OK
     * @response `400` `ResponseTypePageResultSkillVo` Invalid input
     * @response `500` `ResponseTypePageResultSkillVo` Server error
     */
    searchSkills: (data: SkillSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultSkillVo, ResponseTypePageResultSkillVo>({
        path: `/skill/search`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 只有技能的擁有者可以修改技能主資料。管理者指派給使用者的技能視為唯讀，不可透過個人修改 API 變更 name/description 等內容。
     *
     * @tags Skills
     * @name UpdatePersonalSkill
     * @summary 修改個人技能
     * @request POST:/skill/personal/update
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    updatePersonalSkill: (
      query: {
        skillId: string
      },
      data: PersonalSkillRequest,
      params: RequestParams = {}
    ) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/skill/personal/update`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 更新 user-skill 關聯上的 skill level，不會修改技能主資料。
     *
     * @tags Skills
     * @name UpdatePersonalSkillLevel
     * @summary 修改個人技能綁定等級
     * @request POST:/skill/personal/update-level
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    updatePersonalSkillLevel: (
      query: {
        skillId: string
      },
      data: PersonalSkillLevelRequest,
      params: RequestParams = {}
    ) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/skill/personal/update-level`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 移除 user-skill 綁定。管理者指派技能雖不可修改主資料，仍可解除個人綁定。
     *
     * @tags Skills
     * @name DeletePersonalSkill
     * @summary 解除個人技能綁定
     * @request POST:/skill/personal/delete
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deletePersonalSkill: (
      query: {
        skillId: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/skill/personal/delete`,
        method: "POST",
        query: query,
        format: "json",
        ...params
      }),

    /**
     * @description 一般使用者新增技能，會自動綁定到當前登入使用者。若未提供 skillLevelId，可手動填寫等級值、標題與描述建立第一個技能等級。
     *
     * @tags Skills
     * @name AddPersonalSkill
     * @summary 新增個人技能
     * @request POST:/skill/personal/add
     * @response `200` `ResponseTypeSkillVo` OK
     * @response `400` `ResponseTypeSkillVo` Invalid input
     * @response `500` `ResponseTypeSkillVo` Server error
     */
    addPersonalSkill: (data: PersonalSkillRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeSkillVo, ResponseTypeSkillVo>({
        path: `/skill/personal/add`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Updates a skill level.
     *
     * @tags Skills
     * @name UpdateSkillLevel
     * @summary Update skill level
     * @request POST:/skill/level/update
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    updateSkillLevel: (data: SkillLevelVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/skill/level/update`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 支援 skillId、levelValue、title、description、createdBy 查詢條件，預設按 createdTime 降序排序
     *
     * @tags Skills
     * @name SearchSkillLevels
     * @summary 搜尋技能等級（分頁）
     * @request POST:/skill/level/search
     * @response `200` `ResponseTypePageResultSkillLevelVo` OK
     * @response `400` `ResponseTypePageResultSkillLevelVo` Invalid input
     * @response `500` `ResponseTypePageResultSkillLevelVo` Server error
     */
    searchSkillLevels: (data: SkillLevelSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultSkillLevelVo, ResponseTypePageResultSkillLevelVo>({
        path: `/skill/level/search`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Deletes a skill level.
     *
     * @tags Skills
     * @name DeleteSkillLevel
     * @summary Delete skill level
     * @request POST:/skill/level/delete
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteSkillLevel: (data: SkillLevelVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/skill/level/delete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Creates a level under a specific skill.
     *
     * @tags Skills
     * @name AddSkillLevel
     * @summary Add skill level
     * @request POST:/skill/level/add
     * @response `200` `ResponseTypeSkillLevelVo` OK
     * @response `400` `ResponseTypeSkillLevelVo` Invalid input
     * @response `500` `ResponseTypeSkillLevelVo` Server error
     */
    addSkillLevel: (data: SkillLevelVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeSkillLevelVo, ResponseTypeSkillLevelVo>({
        path: `/skill/level/add`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Deletes a skill.
     *
     * @tags Skills
     * @name DeleteSkill
     * @summary Delete skill
     * @request POST:/skill/delete
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteSkill: (data: SkillVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/skill/delete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 在合併後的技能列表中搜尋，支援 name、description、createdBy 查詢條件。管理者指派技能可查詢但不可透過個人 API 修改；可依權限進行綁定關聯。
     *
     * @tags Skills
     * @name SearchCurrentUserSkills
     * @summary 搜尋當前使用者技能（分頁）
     * @request POST:/skill/current/search
     * @response `200` `ResponseTypePageResultCurrentUserSkillVo` OK
     * @response `400` `ResponseTypePageResultCurrentUserSkillVo` Invalid input
     * @response `500` `ResponseTypePageResultCurrentUserSkillVo` Server error
     */
    searchCurrentUserSkills: (data: SkillSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultCurrentUserSkillVo, ResponseTypePageResultCurrentUserSkillVo>({
        path: `/skill/current/search`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Creates a new skill.
     *
     * @tags Skills
     * @name AddSkill
     * @summary Add skill
     * @request POST:/skill/add
     * @response `200` `ResponseTypeSkillVo` OK
     * @response `400` `ResponseTypeSkillVo` Invalid input
     * @response `500` `ResponseTypeSkillVo` Server error
     */
    addSkill: (data: SkillVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeSkillVo, ResponseTypeSkillVo>({
        path: `/skill/add`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Returns all levels for a skill.
     *
     * @tags Skills
     * @name GetSkillLevels
     * @summary Get skill levels
     * @request GET:/skill/level/get/{skillId}
     * @response `200` `ResponseTypeListSkillLevelVo` OK
     * @response `500` `ResponseTypeListSkillLevelVo` Server error
     */
    getSkillLevels: (skillId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListSkillLevelVo, ResponseTypeListSkillLevelVo>({
        path: `/skill/level/get/${skillId}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description Returns all skills.
     *
     * @tags Skills
     * @name GetSkill
     * @summary Get skills
     * @request GET:/skill/get
     * @response `200` `ResponseTypeListSkillVo` OK
     * @response `500` `ResponseTypeListSkillVo` Server error
     */
    getSkill: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListSkillVo, ResponseTypeListSkillVo>({
        path: `/skill/get`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description 合併 USER（直接綁定）和 PROJECT（專案技能）兩個來源，每筆標記 sourceType。管理者指派技能可查看但不可透過個人 API 修改；可依權限進行綁定關聯。
     *
     * @tags Skills
     * @name GetCurrentUserSkills
     * @summary 取得當前使用者技能
     * @request GET:/skill/current
     * @response `200` `ResponseTypeListCurrentUserSkillVo` OK
     * @response `500` `ResponseTypeListCurrentUserSkillVo` Server error
     */
    getCurrentUserSkills: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListCurrentUserSkillVo, ResponseTypeListCurrentUserSkillVo>({
        path: `/skill/current`,
        method: "GET",
        format: "json",
        ...params
      })
  }
  roles = {
    /**
     * @description Removes roles from a user.
     *
     * @tags Roles
     * @name UserUnbindRole
     * @summary Unbind user from roles
     * @request POST:/role/userUnbindRole
     * @response `200` `ResponseTypeUserVo` OK
     * @response `400` `ResponseTypeUserVo` Invalid input
     * @response `500` `ResponseTypeUserVo` Server error
     */
    userUnbindRole: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeUserVo, ResponseTypeUserVo>({
        path: `/role/userUnbindRole`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name UserBindRole
     * @request POST:/role/userBindRole
     * @deprecated
     * @response `200` `ResponseTypeUserVo` OK
     * @response `400` `ResponseTypeUserVo` Invalid input
     * @response `500` `ResponseTypeUserVo` Server error
     */
    userBindRole: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeUserVo, ResponseTypeUserVo>({
        path: `/role/userBindRole`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Deprecated: 請改用 /role/updateWithFunctions。此 API 只更新角色資料，不會同步 functionIds 權限綁定。
     *
     * @tags Roles
     * @name UpdateRole
     * @summary Update role
     * @request POST:/role/update
     * @deprecated
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    updateRole: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/role/update`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 更新角色資料並同步 functionIds 權限。functionIds = null 時保留既有權限不變；functionIds = [] 時清空該角色所有權限；functionIds 有值時，以該清單覆蓋該角色權限。
     *
     * @tags Roles
     * @name UpdateRoleWithFunctions
     * @summary Update role with functions
     * @request POST:/role/updateWithFunctions
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    updateRoleWithFunctions: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/role/updateWithFunctions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 搜尋角色並回傳分頁結果，支援多種查詢條件與排序
     *
     * @tags Roles
     * @name SearchRoles
     * @summary Search roles with pagination
     * @request POST:/role/search
     * @response `200` `ResponseTypePageResultRoleOutVo` OK
     * @response `500` `ResponseTypePageResultRoleOutVo` Server error
     */
    searchRoles: (data: RoleSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultRoleOutVo, ResponseTypePageResultRoleOutVo>({
        path: `/role/search`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Removes users from a role.
     *
     * @tags Roles
     * @name RoleUnbindUser
     * @summary Unbind role from users
     * @request POST:/role/roleUnbindUser
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    roleUnbindUser: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/role/roleUnbindUser`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Deprecated: 請改用 /role/updateWithFunctions，透過 functionIds 一次同步角色權限；若要清空權限請傳 functionIds = []。
     *
     * @tags Roles
     * @name RoleUnbindFunction
     * @summary Unbind role from functions
     * @request POST:/role/roleUnbindFunction
     * @deprecated
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    roleUnbindFunction: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/role/roleUnbindFunction`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Assigns users to a role.
     *
     * @tags Roles
     * @name RoleBindUser
     * @summary Bind role to users
     * @request POST:/role/roleBindUser
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    roleBindUser: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/role/roleBindUser`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Deprecated: 請改用 /role/updateWithFunctions，透過 functionIds 一次同步角色權限。
     *
     * @tags Roles
     * @name RoleBindFunction
     * @summary Bind role to functions
     * @request POST:/role/roleBindFunction
     * @deprecated
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    roleBindFunction: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/role/roleBindFunction`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Returns all roles.
     *
     * @tags Roles
     * @name GetRole
     * @summary Get roles
     * @request POST:/role/get
     * @response `200` `ResponseTypeListRoleOutVo` OK
     * @response `500` `ResponseTypeListRoleOutVo` Server error
     */
    getRole: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListRoleOutVo, ResponseTypeListRoleOutVo>({
        path: `/role/get`,
        method: "POST",
        format: "json",
        ...params
      }),

    /**
     * @description Returns users assigned to a role.
     *
     * @tags Roles
     * @name GetUserByRole
     * @summary Get users by role
     * @request POST:/role/getUserByRole
     * @response `200` `ResponseTypeListUserVo` OK
     * @response `400` `ResponseTypeListUserVo` Invalid input
     * @response `500` `ResponseTypeListUserVo` Server error
     */
    getUserByRole: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListUserVo, ResponseTypeListUserVo>({
        path: `/role/getUserByRole`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Returns roles assigned to a user.
     *
     * @tags Roles
     * @name GetRoleByUser
     * @summary Get roles by user
     * @request POST:/role/getRoleByUser
     * @response `200` `ResponseTypeListRoleOutVo` OK
     * @response `400` `ResponseTypeListRoleOutVo` Invalid input
     * @response `500` `ResponseTypeListRoleOutVo` Server error
     */
    getRoleByUser: (data: UserVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListRoleOutVo, ResponseTypeListRoleOutVo>({
        path: `/role/getRoleByUser`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Returns roles assigned to a function.
     *
     * @tags Roles
     * @name GetRoleByFunction
     * @summary Get roles by function
     * @request POST:/role/getRoleByFunction
     * @response `200` `ResponseTypeListRoleOutVo` OK
     * @response `400` `ResponseTypeListRoleOutVo` Invalid input
     * @response `500` `ResponseTypeListRoleOutVo` Server error
     */
    getRoleByFunction: (data: FunctionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListRoleOutVo, ResponseTypeListRoleOutVo>({
        path: `/role/getRoleByFunction`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Returns functions assigned to a role.
     *
     * @tags Roles
     * @name GetFunctionByRole
     * @summary Get functions by role
     * @request POST:/role/getFunctionByRole
     * @response `200` `ResponseTypeListFunctionVo` OK
     * @response `400` `ResponseTypeListFunctionVo` Invalid input
     * @response `500` `ResponseTypeListFunctionVo` Server error
     */
    getFunctionByRole: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListFunctionVo, ResponseTypeListFunctionVo>({
        path: `/role/getFunctionByRole`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Removes roles from a function.
     *
     * @tags Roles
     * @name FunctionUnbindRole
     * @summary Unbind function from roles
     * @request POST:/role/functionUnbindRole
     * @response `200` `ResponseTypeFunctionVo` OK
     * @response `400` `ResponseTypeFunctionVo` Invalid input
     * @response `500` `ResponseTypeFunctionVo` Server error
     */
    functionUnbindRole: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeFunctionVo, ResponseTypeFunctionVo>({
        path: `/role/functionUnbindRole`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Assigns roles to a function.
     *
     * @tags Roles
     * @name FunctionBindRole
     * @summary Bind function to roles
     * @request POST:/role/functionBindRole
     * @response `200` `ResponseTypeFunctionVo` OK
     * @response `400` `ResponseTypeFunctionVo` Invalid input
     * @response `500` `ResponseTypeFunctionVo` Server error
     */
    functionBindRole: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeFunctionVo, ResponseTypeFunctionVo>({
        path: `/role/functionBindRole`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Deletes a role.
     *
     * @tags Roles
     * @name DeleteRole
     * @summary Delete role
     * @request POST:/role/delete
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    deleteRole: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/role/delete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Deprecated: 請改用 /role/addWithFunctions。此 API 只建立角色，不會同步 functionIds 權限綁定。
     *
     * @tags Roles
     * @name AddRole
     * @summary Add role
     * @request POST:/role/add
     * @deprecated
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    addRole: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/role/add`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 建立角色並同步綁定 functionIds 權限。functionIds = null 時不處理權限；functionIds = [] 時清空權限；functionIds 有值時，以該清單為準綁定角色權限。
     *
     * @tags Roles
     * @name AddRoleWithFunctions
     * @summary Add role with functions
     * @request POST:/role/addWithFunctions
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    addRoleWithFunctions: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/role/addWithFunctions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  functions = {
    /**
     * @description Updates an existing function.
     *
     * @tags Functions
     * @name UpdateFunction
     * @summary Update function
     * @request POST:/function/update
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    updateFunction: (data: FunctionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/function/update`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 搜尋功能並回傳分頁結果，支援多種查詢條件與排序
     *
     * @tags Functions
     * @name SearchFunctions
     * @summary Search functions with pagination
     * @request POST:/function/search
     * @response `200` `ResponseTypePageResultFunctionVo` OK
     * @response `500` `ResponseTypePageResultFunctionVo` Server error
     */
    searchFunctions: (data: FunctionSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultFunctionVo, ResponseTypePageResultFunctionVo>({
        path: `/function/search`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Applies function deletions and saves new or updated functions.
     *
     * @tags Functions
     * @name SaveAllFunction
     * @summary Save function changes
     * @request POST:/function/saveAllFunction
     * @response `200` `ResponseTypeObject` OK
     * @response `400` `ResponseTypeObject` Invalid input
     * @response `500` `ResponseTypeObject` Server error
     */
    saveAllFunction: (data: FunctionTransVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeObject, ResponseTypeObject>({
        path: `/function/saveAllFunction`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Deletes a function.
     *
     * @tags Functions
     * @name DeleteFunction
     * @summary Delete function
     * @request POST:/function/delete
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteFunction: (data: FunctionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/function/delete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Creates a new function entry.
     *
     * @tags Functions
     * @name AddFunction
     * @summary Add function
     * @request POST:/function/add
     * @response `200` `ResponseTypeObject` OK
     * @response `400` `ResponseTypeObject` Invalid input
     * @response `500` `ResponseTypeObject` Server error
     */
    addFunction: (data: FunctionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeObject, ResponseTypeObject>({
        path: `/function/add`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Returns all functions.
     *
     * @tags Functions
     * @name GetFunction
     * @summary Get functions
     * @request GET:/function/get
     * @response `200` `ResponseTypeListFunctionVo` OK
     * @response `500` `ResponseTypeListFunctionVo` Server error
     */
    getFunction: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListFunctionVo, ResponseTypeListFunctionVo>({
        path: `/function/get`,
        method: "GET",
        format: "json",
        ...params
      })
  }
  auth = {
    /**
     * @description Creates an admin user when the provided key matches configuration.
     *
     * @tags Auth
     * @name CreateSuperUser
     * @summary Create super user
     * @request POST:/auth/superuser
     * @response `200` `ResponseTypeObject` OK
     * @response `400` `ResponseTypeObject` Invalid input
     * @response `500` `ResponseTypeObject` Server error
     */
    createSuperUser: (data: SuperUserRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeObject, ResponseTypeObject>({
        path: `/auth/superuser`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Creates a user account and returns a JWT access token.
     *
     * @tags Auth
     * @name Signup
     * @summary Register a new user
     * @request POST:/auth/signup
     * @response `200` `ResponseTypeToken` OK
     * @response `400` `ResponseTypeToken` Invalid input
     * @response `500` `ResponseTypeToken` Server error
     */
    signup: (data: SignupRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeToken, ResponseTypeToken>({
        path: `/auth/signup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Authenticates user credentials and returns a JWT access token.
     *
     * @tags Auth
     * @name Login
     * @summary User login
     * @request POST:/auth/login
     * @response `200` `ResponseTypeToken` OK
     * @response `401` `ResponseTypeToken` Unauthorized
     * @response `500` `ResponseTypeToken` Server error
     */
    login: (data: LoginRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeToken, ResponseTypeToken>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  aquarkData = {
    /**
     * @description Returns aquark data filtered by criteria.
     *
     * @tags AquarkData
     * @name GetData
     * @summary Get aquark data
     * @request POST:/aquarkData/getData
     * @response `200` `ResponseTypeListAquarkDataRaw` OK
     * @response `400` `ResponseTypeListAquarkDataRaw` Invalid input
     * @response `500` `ResponseTypeListAquarkDataRaw` Server error
     */
    getData: (data: CriteriaAPIFilter[], params: RequestParams = {}) =>
      this.http.request<ResponseTypeListAquarkDataRaw, ResponseTypeListAquarkDataRaw>({
        path: `/aquarkData/getData`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Returns averaged aquark data within a time range.
     *
     * @tags AquarkData
     * @name GetAverage
     * @summary Get average aquark data
     * @request POST:/aquarkData/getAverage
     * @response `200` `ResponseTypeListAverageAquark` OK
     * @response `400` `ResponseTypeListAverageAquark` Invalid input
     * @response `500` `ResponseTypeListAverageAquark` Server error
     */
    getAverage: (data: TimeRange, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListAverageAquark, ResponseTypeListAverageAquark>({
        path: `/aquarkData/getAverage`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Returns available aquark data column names.
     *
     * @tags AquarkData
     * @name GetColumnNameList
     * @summary Get column names
     * @request GET:/aquarkData/getColumnNameList
     * @response `200` `ResponseTypeListString` OK
     * @response `500` `ResponseTypeListString` Server error
     */
    getColumnNameList: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListString, ResponseTypeListString>({
        path: `/aquarkData/getColumnNameList`,
        method: "GET",
        format: "json",
        ...params
      })
  }
  alertLimits = {
    /**
     * @description Updates an existing alert limit.
     *
     * @tags Alert Limits
     * @name UpdateLimit
     * @summary Update alert limit
     * @request POST:/alertCheckLimit/update
     * @response `200` `ResponseTypeAlertCheckLimitVo` OK
     * @response `400` `ResponseTypeAlertCheckLimitVo` Invalid input
     * @response `500` `ResponseTypeAlertCheckLimitVo` Server error
     */
    updateLimit: (data: AlertCheckLimitVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeAlertCheckLimitVo, ResponseTypeAlertCheckLimitVo>({
        path: `/alertCheckLimit/update`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 支援 tableName、columnName、limitValue 範圍、createdBy 查詢條件，預設按 createdTime 降序排序
     *
     * @tags Alert Limits
     * @name SearchAlertCheckLimits
     * @summary 搜尋告警檢查限制（分頁）
     * @request POST:/alertCheckLimit/search
     * @response `200` `ResponseTypePageResultAlertCheckLimitVo` OK
     * @response `400` `ResponseTypePageResultAlertCheckLimitVo` Invalid input
     * @response `500` `ResponseTypePageResultAlertCheckLimitVo` Server error
     */
    searchAlertCheckLimits: (data: AlertCheckLimitSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultAlertCheckLimitVo, ResponseTypePageResultAlertCheckLimitVo>({
        path: `/alertCheckLimit/search`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Deletes an alert limit.
     *
     * @tags Alert Limits
     * @name DeleteLimit
     * @summary Delete alert limit
     * @request POST:/alertCheckLimit/delete
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteLimit: (data: AlertCheckLimitVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/alertCheckLimit/delete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Creates or updates an alert limit for a table column.
     *
     * @tags Alert Limits
     * @name AddLimit
     * @summary Add alert limit
     * @request POST:/alertCheckLimit/add
     * @response `200` `ResponseTypeAlertCheckLimitVo` OK
     * @response `400` `ResponseTypeAlertCheckLimitVo` Invalid input
     * @response `500` `ResponseTypeAlertCheckLimitVo` Server error
     */
    addLimit: (data: AlertCheckLimitVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeAlertCheckLimitVo, ResponseTypeAlertCheckLimitVo>({
        path: `/alertCheckLimit/add`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Returns all alert limits.
     *
     * @tags Alert Limits
     * @name GetLimit
     * @summary Get alert limits
     * @request GET:/alertCheckLimit/get
     * @response `200` `ResponseTypeListAlertCheckLimitVo` OK
     * @response `500` `ResponseTypeListAlertCheckLimitVo` Server error
     */
    getLimit: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListAlertCheckLimitVo, ResponseTypeListAlertCheckLimitVo>({
        path: `/alertCheckLimit/get`,
        method: "GET",
        format: "json",
        ...params
      })
  }
  adminBindings = {
    /**
     * @description Rebind all user-skill relations with level diff strategy
     *
     * @tags Admin Bindings
     * @name RebindUserSkills
     * @summary Rebind user skills
     * @request POST:/admin/bindings/user-skill/rebind
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    rebindUserSkills: (data: UserSkillRebindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/admin/bindings/user-skill/rebind`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Rebind all user-project relations with diff strategy
     *
     * @tags Admin Bindings
     * @name RebindUserProjects
     * @summary Rebind user projects
     * @request POST:/admin/bindings/user-project/rebind
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    rebindUserProjects: (data: UserProjectRebindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/admin/bindings/user-project/rebind`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Rebind all project-skill relations with level diff strategy
     *
     * @tags Admin Bindings
     * @name RebindProjectSkills
     * @summary Rebind project skills
     * @request POST:/admin/bindings/project-skill/rebind
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    rebindProjectSkills: (data: ProjectSkillRebindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/admin/bindings/project-skill/rebind`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 完整覆蓋式綁定專案成員技能。使用者必須已是專案成員（user_project 存在），否則拋出異常。
     *
     * @tags Admin Bindings
     * @name RebindProjectMemberSkills
     * @summary Rebind project member skills
     * @request POST:/admin/bindings/project-members-skills/rebind
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    rebindProjectMemberSkills: (data: ProjectMemberSkillsRebindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/admin/bindings/project-members-skills/rebind`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
}
