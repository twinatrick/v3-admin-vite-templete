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
  csq?: string
  peak?: boolean
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

export interface ResponseTypeString {
  /** @format int32 */
  code?: number
  data?: string
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

export interface PersonalProjectSkillLevelRequest {
  skillLevelId?: string
}

export interface PersonalProjectRequest {
  name?: string
  description?: string
}

export interface SkillBindingsRebindRequest {
  bindings: SkillLevelBindingItem[]
}

export interface SkillLevelBindingItem {
  skillId: string
  skillLevelId: string
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
  validSortDir?: boolean
  normalizedSortDir?: string
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
  validSortDir?: boolean
  normalizedSortDir?: string
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
  validSortDir?: boolean
  normalizedSortDir?: string
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

export interface AudioRecognizeVo {
  text?: string
  phonetic?: string
}

export interface ResponseTypeAudioRecognizeVo {
  /** @format int32 */
  code?: number
  data?: AudioRecognizeVo
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

export interface UserProjectBindRequest {
  userId?: string
  projectId?: string
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

export interface ResponseTypeUserJobLinkVo {
  /** @format int32 */
  code?: number
  data?: UserJobLinkVo
  message?: string
  errorType?: string
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

/** 職缺搜尋查詢參數 */
export interface JobPostingSearchQuery {
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
  /** 職缺標題（模糊查詢） */
  title?: string
  /** 公司ID（精確查詢） */
  companyId?: string
  /** 公司名稱（模糊查詢） */
  companyName?: string
  /** 薪資範圍（模糊查詢） */
  salaryRange?: string
  /**
   * 發布日期（起始）
   * @format date
   */
  postedDateStart?: string
  /**
   * 發布日期（結束）
   * @format date
   */
  postedDateEnd?: string
  /** 創建者（精確查詢） */
  createdBy?: string
  normalizedSortDir?: string
  validSortDir?: boolean
}

/** 分頁結果 */
export interface PageResultJobPostingVo {
  /** 資料列表 */
  content?: JobPostingVo[]
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

export interface ResponseTypePageResultJobPostingVo {
  /** @format int32 */
  code?: number
  /** 分頁結果 */
  data?: PageResultJobPostingVo
  message?: string
  errorType?: string
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

export interface CreateCompanyRequest {
  name: string
  websites: string[]
  description?: string
}

export interface ResponseTypeListUserJobLinkVo {
  /** @format int32 */
  code?: number
  data?: UserJobLinkVo[]
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
      baseURL: axiosConfig.baseURL || ""
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
 * @title BackendArchitectureLab
 * @version 1.0.0
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http
  }

  aquarkDataController = {
    /**
     * @description Returns aquark data filtered by criteria.
     *
     * @tags aquark-data-controller
     * @name GetData
     * @summary Get aquark data
     * @request POST:/api/aquarkData/getData
     * @secure
     * @response `200` `ResponseTypeListAquarkDataRaw` OK
     * @response `400` `ResponseTypeListAquarkDataRaw` Invalid input
     * @response `500` `ResponseTypeListAquarkDataRaw` Server error
     */
    getData: (data: CriteriaAPIFilter[], params: RequestParams = {}) =>
      this.http.request<ResponseTypeListAquarkDataRaw, ResponseTypeListAquarkDataRaw>({
        path: `/api/aquarkData/getData`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Returns averaged aquark data within a time range.
     *
     * @tags aquark-data-controller
     * @name GetAverage
     * @summary Get average aquark data
     * @request POST:/api/aquarkData/getAverage
     * @secure
     * @response `200` `ResponseTypeListAverageAquark` OK
     * @response `400` `ResponseTypeListAverageAquark` Invalid input
     * @response `500` `ResponseTypeListAverageAquark` Server error
     */
    getAverage: (data: TimeRange, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListAverageAquark, ResponseTypeListAverageAquark>({
        path: `/api/aquarkData/getAverage`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Returns available aquark data column names.
     *
     * @tags aquark-data-controller
     * @name GetColumnNameList
     * @summary Get column names
     * @request GET:/api/aquarkData/getColumnNameList
     * @secure
     * @response `200` `ResponseTypeListString` OK
     * @response `500` `ResponseTypeListString` Server error
     */
    getColumnNameList: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListString, ResponseTypeListString>({
        path: `/api/aquarkData/getColumnNameList`,
        method: "GET",
        secure: true,
        ...params
      })
  }
  alertCheckLimitController = {
    /**
     * @description Updates an existing alert limit.
     *
     * @tags alert-check-limit-controller
     * @name UpdateLimit
     * @summary Update alert limit
     * @request POST:/api/alertCheckLimit/update
     * @secure
     * @response `200` `ResponseTypeAlertCheckLimitVo` OK
     * @response `400` `ResponseTypeAlertCheckLimitVo` Invalid input
     * @response `500` `ResponseTypeAlertCheckLimitVo` Server error
     */
    updateLimit: (data: AlertCheckLimitVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeAlertCheckLimitVo, ResponseTypeAlertCheckLimitVo>({
        path: `/api/alertCheckLimit/update`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 支援 tableName、columnName、limitValue 範圍、createdBy 查詢條件，預設按 createdTime 降序排序
     *
     * @tags alert-check-limit-controller
     * @name SearchAlertCheckLimits
     * @summary 搜尋告警檢查限制（分頁）
     * @request POST:/api/alertCheckLimit/search
     * @secure
     * @response `200` `ResponseTypePageResultAlertCheckLimitVo` OK
     * @response `400` `ResponseTypePageResultAlertCheckLimitVo` Invalid input
     * @response `500` `ResponseTypePageResultAlertCheckLimitVo` Server error
     */
    searchAlertCheckLimits: (data: AlertCheckLimitSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultAlertCheckLimitVo, ResponseTypePageResultAlertCheckLimitVo>({
        path: `/api/alertCheckLimit/search`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Deletes an alert limit.
     *
     * @tags alert-check-limit-controller
     * @name DeleteLimit
     * @summary Delete alert limit
     * @request POST:/api/alertCheckLimit/delete
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteLimit: (data: AlertCheckLimitVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/alertCheckLimit/delete`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Creates or updates an alert limit for a table column.
     *
     * @tags alert-check-limit-controller
     * @name AddLimit
     * @summary Add alert limit
     * @request POST:/api/alertCheckLimit/add
     * @secure
     * @response `200` `ResponseTypeAlertCheckLimitVo` OK
     * @response `400` `ResponseTypeAlertCheckLimitVo` Invalid input
     * @response `500` `ResponseTypeAlertCheckLimitVo` Server error
     */
    addLimit: (data: AlertCheckLimitVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeAlertCheckLimitVo, ResponseTypeAlertCheckLimitVo>({
        path: `/api/alertCheckLimit/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Returns all alert limits.
     *
     * @tags alert-check-limit-controller
     * @name GetLimit
     * @summary Get alert limits
     * @request GET:/api/alertCheckLimit/get
     * @secure
     * @response `200` `ResponseTypeListAlertCheckLimitVo` OK
     * @response `500` `ResponseTypeListAlertCheckLimitVo` Server error
     */
    getLimit: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListAlertCheckLimitVo, ResponseTypeListAlertCheckLimitVo>({
        path: `/api/alertCheckLimit/get`,
        method: "GET",
        secure: true,
        ...params
      })
  }
  projectController = {
    /**
     * @description 更新個人可操作專案中某技能的等級綁定。僅接受既有等級 ID。
     *
     * @tags project-controller
     * @name UpdatePersonalProjectSkillLevel
     * @summary Update personal project skill level
     * @request PUT:/api/project/personal/{projectId}/skill/{skillId}/level
     * @secure
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
        path: `/api/project/personal/${projectId}/skill/${skillId}/level`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 修改個人專案，僅限擁有者
     *
     * @tags project-controller
     * @name UpdatePersonalProject
     * @summary Update personal project
     * @request PUT:/api/project/personal/update/{projectId}
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    updatePersonalProject: (projectId: string, data: PersonalProjectRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/project/personal/update/${projectId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Updates an existing project.
     *
     * @tags project-controller
     * @name UpdateProject
     * @summary Update project
     * @request POST:/api/project/update
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    updateProject: (data: ProjectVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/project/update`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 搜尋專案並回傳分頁結果，支援多種查詢條件與排序
     *
     * @tags project-controller
     * @name SearchProjects
     * @summary Search projects with pagination
     * @request POST:/api/project/search
     * @secure
     * @response `200` `ResponseTypePageResultProjectVo` OK
     * @response `500` `ResponseTypePageResultProjectVo` Server error
     */
    searchProjects: (data: ProjectSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultProjectVo, ResponseTypePageResultProjectVo>({
        path: `/api/project/search`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 綁定技能到可操作的個人專案。管理員指定專案雖不可修改主資料，但可修改綁定關係。每個專案技能綁定只能選擇一個等級。
     *
     * @tags project-controller
     * @name BindPersonalProjectSkill
     * @summary Bind personal project skill
     * @request POST:/api/project/personal/{projectId}/skill/bind
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    bindPersonalProjectSkill: (projectId: string, data: PersonalProjectSkillBindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/project/personal/${projectId}/skill/bind`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 新增個人專案，自動綁定當前使用者
     *
     * @tags project-controller
     * @name AddPersonalProject
     * @summary Add personal project
     * @request POST:/api/project/personal/add
     * @secure
     * @response `200` `ResponseTypeProjectVo` OK
     * @response `400` `ResponseTypeProjectVo` Invalid input
     * @response `500` `ResponseTypeProjectVo` Server error
     */
    addPersonalProject: (data: PersonalProjectRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeProjectVo, ResponseTypeProjectVo>({
        path: `/api/project/personal/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Deletes a project.
     *
     * @tags project-controller
     * @name DeleteProject
     * @summary Delete project
     * @request POST:/api/project/delete
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteProject: (data: ProjectVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/project/delete`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 搜尋當前使用者的專案並回傳分頁結果，支援多種查詢條件與排序
     *
     * @tags project-controller
     * @name SearchCurrentUserProjects
     * @summary Search current user projects with pagination
     * @request POST:/api/project/current/search
     * @secure
     * @response `200` `ResponseTypePageResultProjectVo` OK
     * @response `500` `ResponseTypePageResultProjectVo` Server error
     */
    searchCurrentUserProjects: (data: ProjectSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultProjectVo, ResponseTypePageResultProjectVo>({
        path: `/api/project/current/search`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Binds a skill level to a project. This operation manages binding relation only and does not modify skill content. Admin-assigned skills can still be bound by authorized users.
     *
     * @tags project-controller
     * @name BindProjectSkill
     * @summary Bind project skill
     * @request POST:/api/project/bindSkill
     * @deprecated
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    bindProjectSkill: (data: ProjectSkillBindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/project/bindSkill`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Creates a new project.
     *
     * @tags project-controller
     * @name AddProject
     * @summary Add project
     * @request POST:/api/project/add
     * @secure
     * @response `200` `ResponseTypeProjectVo` OK
     * @response `400` `ResponseTypeProjectVo` Invalid input
     * @response `500` `ResponseTypeProjectVo` Server error
     */
    addProject: (data: ProjectVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeProjectVo, ResponseTypeProjectVo>({
        path: `/api/project/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 獲取指定專案綁定的所有技能與等級詳細資訊
     *
     * @tags project-controller
     * @name GetProjectSkills
     * @summary Get project skills
     * @request GET:/api/project/{projectId}/skills
     * @secure
     * @response `200` `ResponseTypeListProjectSkillVo` OK
     * @response `500` `ResponseTypeListProjectSkillVo` Server error
     */
    getProjectSkills: (projectId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListProjectSkillVo, ResponseTypeListProjectSkillVo>({
        path: `/api/project/${projectId}/skills`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description 取得專案所有成員在此專案中的技能等級綁定，供編輯專案時回填既有資料
     *
     * @tags project-controller
     * @name GetProjectMemberSkills
     * @summary Get project member skills
     * @request GET:/api/project/{projectId}/member-skills
     * @secure
     * @response `200` `ResponseTypeListProjectMemberSkillVo` OK
     * @response `500` `ResponseTypeListProjectMemberSkillVo` Server error
     */
    getProjectMemberSkills: (projectId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListProjectMemberSkillVo, ResponseTypeListProjectMemberSkillVo>({
        path: `/api/project/${projectId}/member-skills`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description 獲取個人專屬的專案綁定的所有技能與等級詳細資訊，會驗證當前使用者權限
     *
     * @tags project-controller
     * @name GetPersonalProjectSkills
     * @summary Get personal project skills
     * @request GET:/api/project/personal/{projectId}/skills
     * @secure
     * @response `200` `ResponseTypeListProjectSkillVo` OK
     * @response `500` `ResponseTypeListProjectSkillVo` Server error
     */
    getPersonalProjectSkills: (projectId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListProjectSkillVo, ResponseTypeListProjectSkillVo>({
        path: `/api/project/personal/${projectId}/skills`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description Returns all projects.
     *
     * @tags project-controller
     * @name GetProject
     * @summary Get projects
     * @request GET:/api/project/get
     * @secure
     * @response `200` `ResponseTypeListProjectVo` OK
     * @response `500` `ResponseTypeListProjectVo` Server error
     */
    getProject: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListProjectVo, ResponseTypeListProjectVo>({
        path: `/api/project/get`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description 回傳當前使用者所屬的所有專案
     *
     * @tags project-controller
     * @name GetCurrentUserProjects
     * @summary Get current user projects
     * @request GET:/api/project/current
     * @secure
     * @response `200` `ResponseTypeListProjectVo` OK
     * @response `500` `ResponseTypeListProjectVo` Server error
     */
    getCurrentUserProjects: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListProjectVo, ResponseTypeListProjectVo>({
        path: `/api/project/current`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description 解除個人可操作專案中的技能綁定。
     *
     * @tags project-controller
     * @name UnbindPersonalProjectSkill
     * @summary Unbind personal project skill
     * @request DELETE:/api/project/personal/{projectId}/skill/{skillId}
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    unbindPersonalProjectSkill: (projectId: string, skillId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/project/personal/${projectId}/skill/${skillId}`,
        method: "DELETE",
        secure: true,
        ...params
      }),

    /**
     * @description 刪除個人專案，僅限擁有者
     *
     * @tags project-controller
     * @name DeletePersonalProject
     * @summary Delete personal project
     * @request DELETE:/api/project/personal/delete/{projectId}
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deletePersonalProject: (projectId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/project/personal/delete/${projectId}`,
        method: "DELETE",
        secure: true,
        ...params
      })
  }
  userBindingController = {
    /**
     * @description Rebind all current-user skill-level bindings with diff strategy
     *
     * @tags user-binding-controller
     * @name RebindCurrentUserSkills
     * @summary Rebind current user skills
     * @request POST:/api/user/bindings/skill/rebind
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    rebindCurrentUserSkills: (data: SkillBindingsRebindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/user/bindings/skill/rebind`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Rebind project skills for a manageable project with diff strategy
     *
     * @tags user-binding-controller
     * @name RebindCurrentUserProjectSkills
     * @summary Rebind current user project skills
     * @request POST:/api/user/bindings/project/{projectId}/skill/rebind
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    rebindCurrentUserProjectSkills: (projectId: string, data: SkillBindingsRebindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/user/bindings/project/${projectId}/skill/rebind`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      })
  }
  skillController = {
    /**
     * @description Updates an existing skill.
     *
     * @tags skill-controller
     * @name UpdateSkill
     * @summary Update skill
     * @request POST:/api/skill/update
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    updateSkill: (data: SkillVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/skill/update`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 支援 name、description、createdBy 查詢條件，預設按 createdTime 降序排序
     *
     * @tags skill-controller
     * @name SearchSkills
     * @summary 搜尋技能（分頁）
     * @request POST:/api/skill/search
     * @secure
     * @response `200` `ResponseTypePageResultSkillVo` OK
     * @response `400` `ResponseTypePageResultSkillVo` Invalid input
     * @response `500` `ResponseTypePageResultSkillVo` Server error
     */
    searchSkills: (data: SkillSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultSkillVo, ResponseTypePageResultSkillVo>({
        path: `/api/skill/search`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 只有技能的擁有者可以修改技能主資料。管理者指派給使用者的技能視為唯讀，不可透過個人修改 API 變更 name/description 等內容。
     *
     * @tags skill-controller
     * @name UpdatePersonalSkill
     * @summary 修改個人技能
     * @request POST:/api/skill/personal/update
     * @secure
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
        path: `/api/skill/personal/update`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 更新 user-skill 關聯上的 skill level，不會修改技能主資料。
     *
     * @tags skill-controller
     * @name UpdatePersonalSkillLevel
     * @summary 修改個人技能綁定等級
     * @request POST:/api/skill/personal/update-level
     * @secure
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
        path: `/api/skill/personal/update-level`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 移除 user-skill 綁定。管理者指派技能雖不可修改主資料，仍可解除個人綁定。
     *
     * @tags skill-controller
     * @name DeletePersonalSkill
     * @summary 解除個人技能綁定
     * @request POST:/api/skill/personal/delete
     * @secure
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
        path: `/api/skill/personal/delete`,
        method: "POST",
        query: query,
        secure: true,
        ...params
      }),

    /**
     * @description 一般使用者新增技能，會自動綁定到當前登入使用者。若未提供 skillLevelId，可手動填寫等級值、標題與描述建立第一個技能等級。
     *
     * @tags skill-controller
     * @name AddPersonalSkill
     * @summary 新增個人技能
     * @request POST:/api/skill/personal/add
     * @secure
     * @response `200` `ResponseTypeSkillVo` OK
     * @response `400` `ResponseTypeSkillVo` Invalid input
     * @response `500` `ResponseTypeSkillVo` Server error
     */
    addPersonalSkill: (data: PersonalSkillRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeSkillVo, ResponseTypeSkillVo>({
        path: `/api/skill/personal/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Updates a skill level.
     *
     * @tags skill-controller
     * @name UpdateSkillLevel
     * @summary Update skill level
     * @request POST:/api/skill/level/update
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    updateSkillLevel: (data: SkillLevelVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/skill/level/update`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 支援 skillId、levelValue、title、description、createdBy 查詢條件，預設按 createdTime 降序排序
     *
     * @tags skill-controller
     * @name SearchSkillLevels
     * @summary 搜尋技能等級（分頁）
     * @request POST:/api/skill/level/search
     * @secure
     * @response `200` `ResponseTypePageResultSkillLevelVo` OK
     * @response `400` `ResponseTypePageResultSkillLevelVo` Invalid input
     * @response `500` `ResponseTypePageResultSkillLevelVo` Server error
     */
    searchSkillLevels: (data: SkillLevelSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultSkillLevelVo, ResponseTypePageResultSkillLevelVo>({
        path: `/api/skill/level/search`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Deletes a skill level.
     *
     * @tags skill-controller
     * @name DeleteSkillLevel
     * @summary Delete skill level
     * @request POST:/api/skill/level/delete
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteSkillLevel: (data: SkillLevelVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/skill/level/delete`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Creates a level under a specific skill.
     *
     * @tags skill-controller
     * @name AddSkillLevel
     * @summary Add skill level
     * @request POST:/api/skill/level/add
     * @secure
     * @response `200` `ResponseTypeSkillLevelVo` OK
     * @response `400` `ResponseTypeSkillLevelVo` Invalid input
     * @response `500` `ResponseTypeSkillLevelVo` Server error
     */
    addSkillLevel: (data: SkillLevelVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeSkillLevelVo, ResponseTypeSkillLevelVo>({
        path: `/api/skill/level/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Deletes a skill.
     *
     * @tags skill-controller
     * @name DeleteSkill
     * @summary Delete skill
     * @request POST:/api/skill/delete
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteSkill: (data: SkillVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/skill/delete`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 在合併後的技能列表中搜尋，支援 name、description、createdBy 查詢條件。管理者指派技能可查詢但不可透過個人 API 修改；可依權限進行綁定關聯。
     *
     * @tags skill-controller
     * @name SearchCurrentUserSkills
     * @summary 搜尋當前使用者技能（分頁）
     * @request POST:/api/skill/current/search
     * @secure
     * @response `200` `ResponseTypePageResultCurrentUserSkillVo` OK
     * @response `400` `ResponseTypePageResultCurrentUserSkillVo` Invalid input
     * @response `500` `ResponseTypePageResultCurrentUserSkillVo` Server error
     */
    searchCurrentUserSkills: (data: SkillSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultCurrentUserSkillVo, ResponseTypePageResultCurrentUserSkillVo>({
        path: `/api/skill/current/search`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Creates a new skill.
     *
     * @tags skill-controller
     * @name AddSkill
     * @summary Add skill
     * @request POST:/api/skill/add
     * @secure
     * @response `200` `ResponseTypeSkillVo` OK
     * @response `400` `ResponseTypeSkillVo` Invalid input
     * @response `500` `ResponseTypeSkillVo` Server error
     */
    addSkill: (data: SkillVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeSkillVo, ResponseTypeSkillVo>({
        path: `/api/skill/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Returns all levels for a skill.
     *
     * @tags skill-controller
     * @name GetSkillLevels
     * @summary Get skill levels
     * @request GET:/api/skill/level/get/{skillId}
     * @secure
     * @response `200` `ResponseTypeListSkillLevelVo` OK
     * @response `500` `ResponseTypeListSkillLevelVo` Server error
     */
    getSkillLevels: (skillId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListSkillLevelVo, ResponseTypeListSkillLevelVo>({
        path: `/api/skill/level/get/${skillId}`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description Returns all skills.
     *
     * @tags skill-controller
     * @name GetSkill
     * @summary Get skills
     * @request GET:/api/skill/get
     * @secure
     * @response `200` `ResponseTypeListSkillVo` OK
     * @response `500` `ResponseTypeListSkillVo` Server error
     */
    getSkill: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListSkillVo, ResponseTypeListSkillVo>({
        path: `/api/skill/get`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description 合併 USER（直接綁定）和 PROJECT（專案技能）兩個來源，每筆標記 sourceType。管理者指派技能可查看但不可透過個人 API 修改；可依權限進行綁定關聯。
     *
     * @tags skill-controller
     * @name GetCurrentUserSkills
     * @summary 取得當前使用者技能
     * @request GET:/api/skill/current
     * @secure
     * @response `200` `ResponseTypeListCurrentUserSkillVo` OK
     * @response `500` `ResponseTypeListCurrentUserSkillVo` Server error
     */
    getCurrentUserSkills: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListCurrentUserSkillVo, ResponseTypeListCurrentUserSkillVo>({
        path: `/api/skill/current`,
        method: "GET",
        secure: true,
        ...params
      })
  }
  projectAdminController = {
    /**
     * @description Rebind all user-skill relations with level diff strategy
     *
     * @tags project-admin-controller
     * @name RebindUserSkills
     * @summary Rebind user skills
     * @request POST:/api/project/admin/bindings/user-skill/rebind
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    rebindUserSkills: (data: UserSkillRebindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/project/admin/bindings/user-skill/rebind`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Rebind all user-project relations with diff strategy
     *
     * @tags project-admin-controller
     * @name RebindUserProjects
     * @summary Rebind user projects
     * @request POST:/api/project/admin/bindings/user-project/rebind
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    rebindUserProjects: (data: UserProjectRebindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/project/admin/bindings/user-project/rebind`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Rebind all project-skill relations with level diff strategy
     *
     * @tags project-admin-controller
     * @name RebindProjectSkills
     * @summary Rebind project skills
     * @request POST:/api/project/admin/bindings/project-skill/rebind
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    rebindProjectSkills: (data: ProjectSkillRebindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/project/admin/bindings/project-skill/rebind`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 完整覆蓋式綁定專案成員技能。使用者必須已是專案成員（user_project 存在），否則拋出異常。
     *
     * @tags project-admin-controller
     * @name RebindProjectMemberSkills
     * @summary Rebind project member skills
     * @request POST:/api/project/admin/bindings/project-members-skills/rebind
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    rebindProjectMemberSkills: (data: ProjectMemberSkillsRebindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/project/admin/bindings/project-members-skills/rebind`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      })
  }
  learnController = {
    /**
     * @description 上傳音訊進行 Whisper 辨識，並根據語言及模式轉換為拼音、注音或羅馬音。
     *
     * @tags learn-controller
     * @name RecognizeAudio
     * @summary 語音辨識與拼音轉換
     * @request POST:/api/stt/v1/{lan}/{mode}
     * @secure
     * @response `200` `ResponseTypeAudioRecognizeVo` OK
     */
    recognizeAudio: (
      lan: string,
      mode: string,
      data: {
        /**
         * 音訊檔案
         * @format binary
         */
        file: File
      },
      params: RequestParams = {}
    ) =>
      this.http.request<ResponseTypeAudioRecognizeVo, any>({
        path: `/api/stt/v1/${lan}/${mode}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params
      })
  }
  userController = {
    /**
     * @description 完整覆蓋式綁定使用者角色。空清單清空所有角色，null 清單拋出異常。
     *
     * @tags user-controller
     * @name RebindUserRoles
     * @summary Rebind user roles
     * @request POST:/api/users/{userId}/roles/rebind
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    rebindUserRoles: (userId: string, data: UserRoleRebindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/users/${userId}/roles/rebind`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 搜尋使用者並回傳分頁結果，支援多種查詢條件與排序
     *
     * @tags user-controller
     * @name SearchUsers
     * @summary Search users with pagination
     * @request POST:/api/users/search
     * @secure
     * @response `200` `ResponseTypePageResultUserVo` OK
     * @response `500` `ResponseTypePageResultUserVo` Server error
     */
    searchUsers: (data: UserSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultUserVo, ResponseTypePageResultUserVo>({
        path: `/api/users/search`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Updates a user and their role assignments.
     *
     * @tags user-controller
     * @name SaveUser
     * @summary Save user with roles
     * @request POST:/api/users/saveUser
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    saveUser: (data: UserVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/users/saveUser`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Creates a new user account.
     *
     * @tags user-controller
     * @name CreateUser
     * @summary Create user
     * @request POST:/api/users/create
     * @secure
     * @response `200` `boolean` OK
     * @response `400` `boolean` Invalid input
     * @response `500` `boolean` Server error
     */
    createUser: (data: UserVo, params: RequestParams = {}) =>
      this.http.request<boolean, boolean>({
        path: `/api/users/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Binds a user to a project.
     *
     * @tags user-controller
     * @name BindUserProject
     * @summary Bind user project
     * @request POST:/api/users/bindProject
     * @deprecated
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    bindUserProject: (data: UserProjectBindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/users/bindProject`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Returns current user profile and permissions.
     *
     * @tags user-controller
     * @name GetUserInfo
     * @summary Get current user info
     * @request GET:/api/users/infoVo
     * @secure
     * @response `200` `ResponseTypeUserVo` OK
     * @response `401` `ResponseTypeUserVo` Unauthorized
     * @response `500` `ResponseTypeUserVo` Server error
     */
    getUserInfo: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeUserVo, ResponseTypeUserVo>({
        path: `/api/users/infoVo`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description Returns all users with their roles and permissions.
     *
     * @tags user-controller
     * @name GetAllUser
     * @summary Get all users
     * @request GET:/api/users/getAllUser
     * @secure
     * @response `200` `ResponseTypeListUserVo` OK
     * @response `500` `ResponseTypeListUserVo` Server error
     */
    getAllUser: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListUserVo, ResponseTypeListUserVo>({
        path: `/api/users/getAllUser`,
        method: "GET",
        secure: true,
        ...params
      })
  }
  roleController = {
    /**
     * @description Removes roles from a user.
     *
     * @tags role-controller
     * @name UserUnbindRole
     * @summary Unbind user from roles
     * @request POST:/api/role/userUnbindRole
     * @secure
     * @response `200` `ResponseTypeUserVo` OK
     * @response `400` `ResponseTypeUserVo` Invalid input
     * @response `500` `ResponseTypeUserVo` Server error
     */
    userUnbindRole: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeUserVo, ResponseTypeUserVo>({
        path: `/api/role/userUnbindRole`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name UserBindRole
     * @request POST:/api/role/userBindRole
     * @deprecated
     * @secure
     * @response `200` `ResponseTypeUserVo` OK
     * @response `400` `ResponseTypeUserVo` Invalid input
     * @response `500` `ResponseTypeUserVo` Server error
     */
    userBindRole: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeUserVo, ResponseTypeUserVo>({
        path: `/api/role/userBindRole`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Deprecated: 請改用 /role/updateWithFunctions。此 API 只更新角色資料，不會同步 functionIds 權限綁定。
     *
     * @tags role-controller
     * @name UpdateRole
     * @summary Update role
     * @request POST:/api/role/update
     * @deprecated
     * @secure
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    updateRole: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/api/role/update`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 更新角色資料並同步 functionIds 權限。functionIds = null 時保留既有權限不變；functionIds = [] 時清空該角色所有權限；functionIds 有值時，以該清單覆蓋該角色權限。
     *
     * @tags role-controller
     * @name UpdateRoleWithFunctions
     * @summary Update role with functions
     * @request POST:/api/role/updateWithFunctions
     * @secure
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    updateRoleWithFunctions: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/api/role/updateWithFunctions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 搜尋角色並回傳分頁結果，支援多種查詢條件與排序
     *
     * @tags role-controller
     * @name SearchRoles
     * @summary Search roles with pagination
     * @request POST:/api/role/search
     * @secure
     * @response `200` `ResponseTypePageResultRoleOutVo` OK
     * @response `500` `ResponseTypePageResultRoleOutVo` Server error
     */
    searchRoles: (data: RoleSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultRoleOutVo, ResponseTypePageResultRoleOutVo>({
        path: `/api/role/search`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Removes users from a role.
     *
     * @tags role-controller
     * @name RoleUnbindUser
     * @summary Unbind role from users
     * @request POST:/api/role/roleUnbindUser
     * @secure
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    roleUnbindUser: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/api/role/roleUnbindUser`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Deprecated: 請改用 /role/updateWithFunctions，透過 functionIds 一次同步角色權限；若要清空權限請傳 functionIds = []。
     *
     * @tags role-controller
     * @name RoleUnbindFunction
     * @summary Unbind role from functions
     * @request POST:/api/role/roleUnbindFunction
     * @deprecated
     * @secure
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    roleUnbindFunction: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/api/role/roleUnbindFunction`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Assigns users to a role.
     *
     * @tags role-controller
     * @name RoleBindUser
     * @summary Bind role to users
     * @request POST:/api/role/roleBindUser
     * @secure
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    roleBindUser: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/api/role/roleBindUser`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Deprecated: 請改用 /role/updateWithFunctions，透過 functionIds 一次同步角色權限。
     *
     * @tags role-controller
     * @name RoleBindFunction
     * @summary Bind role to functions
     * @request POST:/api/role/roleBindFunction
     * @deprecated
     * @secure
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    roleBindFunction: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/api/role/roleBindFunction`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Returns all roles.
     *
     * @tags role-controller
     * @name GetRole
     * @summary Get roles
     * @request POST:/api/role/get
     * @secure
     * @response `200` `ResponseTypeListRoleOutVo` OK
     * @response `500` `ResponseTypeListRoleOutVo` Server error
     */
    getRole: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListRoleOutVo, ResponseTypeListRoleOutVo>({
        path: `/api/role/get`,
        method: "POST",
        secure: true,
        ...params
      }),

    /**
     * @description Returns users assigned to a role.
     *
     * @tags role-controller
     * @name GetUserByRole
     * @summary Get users by role
     * @request POST:/api/role/getUserByRole
     * @secure
     * @response `200` `ResponseTypeListUserVo` OK
     * @response `400` `ResponseTypeListUserVo` Invalid input
     * @response `500` `ResponseTypeListUserVo` Server error
     */
    getUserByRole: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListUserVo, ResponseTypeListUserVo>({
        path: `/api/role/getUserByRole`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Returns roles assigned to a user.
     *
     * @tags role-controller
     * @name GetRoleByUser
     * @summary Get roles by user
     * @request POST:/api/role/getRoleByUser
     * @secure
     * @response `200` `ResponseTypeListRoleOutVo` OK
     * @response `400` `ResponseTypeListRoleOutVo` Invalid input
     * @response `500` `ResponseTypeListRoleOutVo` Server error
     */
    getRoleByUser: (data: UserVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListRoleOutVo, ResponseTypeListRoleOutVo>({
        path: `/api/role/getRoleByUser`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Returns roles assigned to a function.
     *
     * @tags role-controller
     * @name GetRoleByFunction
     * @summary Get roles by function
     * @request POST:/api/role/getRoleByFunction
     * @secure
     * @response `200` `ResponseTypeListRoleOutVo` OK
     * @response `400` `ResponseTypeListRoleOutVo` Invalid input
     * @response `500` `ResponseTypeListRoleOutVo` Server error
     */
    getRoleByFunction: (data: FunctionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListRoleOutVo, ResponseTypeListRoleOutVo>({
        path: `/api/role/getRoleByFunction`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Returns functions assigned to a role.
     *
     * @tags role-controller
     * @name GetFunctionByRole
     * @summary Get functions by role
     * @request POST:/api/role/getFunctionByRole
     * @secure
     * @response `200` `ResponseTypeListFunctionVo` OK
     * @response `400` `ResponseTypeListFunctionVo` Invalid input
     * @response `500` `ResponseTypeListFunctionVo` Server error
     */
    getFunctionByRole: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListFunctionVo, ResponseTypeListFunctionVo>({
        path: `/api/role/getFunctionByRole`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Removes roles from a function.
     *
     * @tags role-controller
     * @name FunctionUnbindRole
     * @summary Unbind function from roles
     * @request POST:/api/role/functionUnbindRole
     * @secure
     * @response `200` `ResponseTypeFunctionVo` OK
     * @response `400` `ResponseTypeFunctionVo` Invalid input
     * @response `500` `ResponseTypeFunctionVo` Server error
     */
    functionUnbindRole: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeFunctionVo, ResponseTypeFunctionVo>({
        path: `/api/role/functionUnbindRole`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Assigns roles to a function.
     *
     * @tags role-controller
     * @name FunctionBindRole
     * @summary Bind function to roles
     * @request POST:/api/role/functionBindRole
     * @secure
     * @response `200` `ResponseTypeFunctionVo` OK
     * @response `400` `ResponseTypeFunctionVo` Invalid input
     * @response `500` `ResponseTypeFunctionVo` Server error
     */
    functionBindRole: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeFunctionVo, ResponseTypeFunctionVo>({
        path: `/api/role/functionBindRole`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Deletes a role.
     *
     * @tags role-controller
     * @name DeleteRole
     * @summary Delete role
     * @request POST:/api/role/delete
     * @secure
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    deleteRole: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/api/role/delete`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Deprecated: 請改用 /role/addWithFunctions。此 API 只建立角色，不會同步 functionIds 權限綁定。
     *
     * @tags role-controller
     * @name AddRole
     * @summary Add role
     * @request POST:/api/role/add
     * @deprecated
     * @secure
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    addRole: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/api/role/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 建立角色並同步綁定 functionIds 權限。functionIds = null 時不處理權限；functionIds = [] 時清空權限；functionIds 有值時，以該清單為準綁定角色權限。
     *
     * @tags role-controller
     * @name AddRoleWithFunctions
     * @summary Add role with functions
     * @request POST:/api/role/addWithFunctions
     * @secure
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    addRoleWithFunctions: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/api/role/addWithFunctions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      })
  }
  functionController = {
    /**
     * @description Updates an existing function.
     *
     * @tags function-controller
     * @name UpdateFunction
     * @summary Update function
     * @request POST:/api/function/update
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    updateFunction: (data: FunctionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/function/update`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 搜尋功能並回傳分頁結果，支援多種查詢條件與排序
     *
     * @tags function-controller
     * @name SearchFunctions
     * @summary Search functions with pagination
     * @request POST:/api/function/search
     * @secure
     * @response `200` `ResponseTypePageResultFunctionVo` OK
     * @response `500` `ResponseTypePageResultFunctionVo` Server error
     */
    searchFunctions: (data: FunctionSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultFunctionVo, ResponseTypePageResultFunctionVo>({
        path: `/api/function/search`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Applies function deletions and saves new or updated functions.
     *
     * @tags function-controller
     * @name SaveAllFunction
     * @summary Save function changes
     * @request POST:/api/function/saveAllFunction
     * @secure
     * @response `200` `ResponseTypeObject` OK
     * @response `400` `ResponseTypeObject` Invalid input
     * @response `500` `ResponseTypeObject` Server error
     */
    saveAllFunction: (data: FunctionTransVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeObject, ResponseTypeObject>({
        path: `/api/function/saveAllFunction`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Deletes a function.
     *
     * @tags function-controller
     * @name DeleteFunction
     * @summary Delete function
     * @request POST:/api/function/delete
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteFunction: (data: FunctionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/function/delete`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Creates a new function entry.
     *
     * @tags function-controller
     * @name AddFunction
     * @summary Add function
     * @request POST:/api/function/add
     * @secure
     * @response `200` `ResponseTypeObject` OK
     * @response `400` `ResponseTypeObject` Invalid input
     * @response `500` `ResponseTypeObject` Server error
     */
    addFunction: (data: FunctionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeObject, ResponseTypeObject>({
        path: `/api/function/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Returns all functions.
     *
     * @tags function-controller
     * @name GetFunction
     * @summary Get functions
     * @request GET:/api/function/get
     * @secure
     * @response `200` `ResponseTypeListFunctionVo` OK
     * @response `500` `ResponseTypeListFunctionVo` Server error
     */
    getFunction: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListFunctionVo, ResponseTypeListFunctionVo>({
        path: `/api/function/get`,
        method: "GET",
        secure: true,
        ...params
      })
  }
  authController = {
    /**
     * @description Creates an admin user when the provided key matches configuration.
     *
     * @tags auth-controller
     * @name CreateSuperUser
     * @summary Create super user
     * @request POST:/api/auth/superuser
     * @secure
     * @response `200` `ResponseTypeObject` OK
     * @response `400` `ResponseTypeObject` Invalid input
     * @response `500` `ResponseTypeObject` Server error
     */
    createSuperUser: (data: SuperUserRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeObject, ResponseTypeObject>({
        path: `/api/auth/superuser`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Creates a user account and returns a JWT access token.
     *
     * @tags auth-controller
     * @name Signup
     * @summary Register a new user
     * @request POST:/api/auth/signup
     * @secure
     * @response `200` `ResponseTypeToken` OK
     * @response `400` `ResponseTypeToken` Invalid input
     * @response `500` `ResponseTypeToken` Server error
     */
    signup: (data: SignupRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeToken, ResponseTypeToken>({
        path: `/api/auth/signup`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description Authenticates user credentials and returns a JWT access token.
     *
     * @tags auth-controller
     * @name Login
     * @summary User login
     * @request POST:/api/auth/login
     * @secure
     * @response `200` `ResponseTypeToken` OK
     * @response `401` `ResponseTypeToken` Unauthorized
     * @response `500` `ResponseTypeToken` Server error
     */
    login: (data: LoginRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeToken, ResponseTypeToken>({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      })
  }
  jobPostingController = {
    /**
     * @description 更新職缺資訊。
     *
     * @tags job-posting-controller
     * @name UpdateJobPosting
     * @summary 更新職缺
     * @request PUT:/api/job-posting/update
     * @secure
     * @response `200` `ResponseTypeJobPostingVo` OK
     * @response `400` `ResponseTypeJobPostingVo` Invalid input
     * @response `500` `ResponseTypeJobPostingVo` Server error
     */
    updateJobPosting: (data: JobPostingVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeJobPostingVo, ResponseTypeJobPostingVo>({
        path: `/api/job-posting/update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 根據條件分頁搜尋職缺。
     *
     * @tags job-posting-controller
     * @name SearchJobPostings
     * @summary 分頁搜尋職缺
     * @request POST:/api/job-posting/search
     * @secure
     * @response `200` `ResponseTypePageResultJobPostingVo` OK
     * @response `400` `ResponseTypePageResultJobPostingVo` Invalid input
     * @response `500` `ResponseTypePageResultJobPostingVo` Server error
     */
    searchJobPostings: (data: JobPostingSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultJobPostingVo, ResponseTypePageResultJobPostingVo>({
        path: `/api/job-posting/search`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 根據公司 ID 爬取該公司網站上的職缺並使用 Gemini 分析。
     *
     * @tags job-posting-controller
     * @name ScrapeJobs
     * @summary 爬取並分析職缺
     * @request POST:/api/job-posting/scrape/{companyId}
     * @secure
     * @response `200` `ResponseTypeListJobPostingVo` OK
     * @response `400` `ResponseTypeListJobPostingVo` Invalid input
     * @response `500` `ResponseTypeListJobPostingVo` Server error
     */
    scrapeJobs: (companyId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListJobPostingVo, ResponseTypeListJobPostingVo>({
        path: `/api/job-posting/scrape/${companyId}`,
        method: "POST",
        secure: true,
        ...params
      }),

    /**
     * @description 手動新增一筆職缺。
     *
     * @tags job-posting-controller
     * @name AddJobPosting
     * @summary 新增職缺
     * @request POST:/api/job-posting/add
     * @secure
     * @response `200` `ResponseTypeJobPostingVo` OK
     * @response `400` `ResponseTypeJobPostingVo` Invalid input
     * @response `500` `ResponseTypeJobPostingVo` Server error
     */
    addJobPosting: (data: CreateJobPostingRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeJobPostingVo, ResponseTypeJobPostingVo>({
        path: `/api/job-posting/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 返回所有職缺列表。
     *
     * @tags job-posting-controller
     * @name GetAllJobPostings
     * @summary 取得所有職缺
     * @request GET:/api/job-posting/get
     * @secure
     * @response `200` `ResponseTypeListJobPostingVo` OK
     * @response `500` `ResponseTypeListJobPostingVo` Server error
     */
    getAllJobPostings: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListJobPostingVo, ResponseTypeListJobPostingVo>({
        path: `/api/job-posting/get`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description 根據 ID 取得職缺資訊。
     *
     * @tags job-posting-controller
     * @name GetJobPostingById
     * @summary 取得職缺詳情
     * @request GET:/api/job-posting/get/{id}
     * @secure
     * @response `200` `ResponseTypeJobPostingVo` OK
     * @response `500` `ResponseTypeJobPostingVo` Server error
     */
    getJobPostingById: (id: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeJobPostingVo, ResponseTypeJobPostingVo>({
        path: `/api/job-posting/get/${id}`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description 根據公司 ID 取得該公司所有職缺。
     *
     * @tags job-posting-controller
     * @name GetJobPostingsByCompanyId
     * @summary 取得公司職缺
     * @request GET:/api/job-posting/company/{companyId}
     * @secure
     * @response `200` `ResponseTypeListJobPostingVo` OK
     * @response `500` `ResponseTypeListJobPostingVo` Server error
     */
    getJobPostingsByCompanyId: (companyId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListJobPostingVo, ResponseTypeListJobPostingVo>({
        path: `/api/job-posting/company/${companyId}`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description 根據 ID 刪除職缺。
     *
     * @tags job-posting-controller
     * @name DeleteJobPosting
     * @summary 刪除職缺
     * @request DELETE:/api/job-posting/delete/{id}
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteJobPosting: (id: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/job-posting/delete/${id}`,
        method: "DELETE",
        secure: true,
        ...params
      })
  }
  companyController = {
    /**
     * @description 更新公司資訊。
     *
     * @tags company-controller
     * @name UpdateCompany
     * @summary 更新公司
     * @request PUT:/api/company/update
     * @secure
     * @response `200` `ResponseTypeCompanyVo` OK
     * @response `400` `ResponseTypeCompanyVo` Invalid input
     * @response `500` `ResponseTypeCompanyVo` Server error
     */
    updateCompany: (data: UpdateCompanyRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeCompanyVo, ResponseTypeCompanyVo>({
        path: `/api/company/update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 建立一間新的公司。
     *
     * @tags company-controller
     * @name AddCompany
     * @summary 新增公司
     * @request POST:/api/company/add
     * @secure
     * @response `200` `ResponseTypeCompanyVo` OK
     * @response `400` `ResponseTypeCompanyVo` Invalid input
     * @response `500` `ResponseTypeCompanyVo` Server error
     */
    addCompany: (data: CreateCompanyRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeCompanyVo, ResponseTypeCompanyVo>({
        path: `/api/company/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 返回所有公司列表。
     *
     * @tags company-controller
     * @name GetAllCompanies
     * @summary 取得所有公司
     * @request GET:/api/company/get
     * @secure
     * @response `200` `ResponseTypeListCompanyVo` OK
     * @response `500` `ResponseTypeListCompanyVo` Server error
     */
    getAllCompanies: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListCompanyVo, ResponseTypeListCompanyVo>({
        path: `/api/company/get`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description 根據 ID 取得公司資訊。
     *
     * @tags company-controller
     * @name GetCompanyById
     * @summary 取得公司詳情
     * @request GET:/api/company/get/{id}
     * @secure
     * @response `200` `ResponseTypeCompanyVo` OK
     * @response `500` `ResponseTypeCompanyVo` Server error
     */
    getCompanyById: (id: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeCompanyVo, ResponseTypeCompanyVo>({
        path: `/api/company/get/${id}`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description 根據 ID 刪除公司。
     *
     * @tags company-controller
     * @name DeleteCompany
     * @summary 刪除公司
     * @request DELETE:/api/company/delete/{id}
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteCompany: (id: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/company/delete/${id}`,
        method: "DELETE",
        secure: true,
        ...params
      })
  }
  userJobBindingController = {
    /**
     * @description 當前使用者綁定一筆職缺。
     *
     * @tags user-job-binding-controller
     * @name AddJob
     * @summary 綁定職缺
     * @request POST:/api/user/bindings/job/add/{jobPostingId}
     * @secure
     * @response `200` `ResponseTypeUserJobLinkVo` OK
     * @response `400` `ResponseTypeUserJobLinkVo` Invalid input
     * @response `500` `ResponseTypeUserJobLinkVo` Server error
     */
    addJob: (jobPostingId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeUserJobLinkVo, ResponseTypeUserJobLinkVo>({
        path: `/api/user/bindings/job/add/${jobPostingId}`,
        method: "POST",
        secure: true,
        ...params
      }),

    /**
     * @description 取得當前使用者所有已綁定的職缺。
     *
     * @tags user-job-binding-controller
     * @name GetMyJobs
     * @summary 取得已綁定職缺列表
     * @request GET:/api/user/bindings/job
     * @secure
     * @response `200` `ResponseTypeListUserJobLinkVo` OK
     * @response `500` `ResponseTypeListUserJobLinkVo` Server error
     */
    getMyJobs: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListUserJobLinkVo, ResponseTypeListUserJobLinkVo>({
        path: `/api/user/bindings/job`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description 當前使用者解除綁定一筆職缺。
     *
     * @tags user-job-binding-controller
     * @name RemoveJob
     * @summary 解除綁定職缺
     * @request DELETE:/api/user/bindings/job/{jobPostingId}
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    removeJob: (jobPostingId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/user/bindings/job/${jobPostingId}`,
        method: "DELETE",
        secure: true,
        ...params
      })
  }
  userJobLinkController = {
    /**
     * @description 建立使用者與職缺的關聯。
     *
     * @tags user-job-link-controller
     * @name AddUserJobLink
     * @summary 新增使用者職缺連結
     * @request POST:/api/user-job-link/add
     * @secure
     * @response `200` `ResponseTypeUserJobLinkVo` OK
     * @response `400` `ResponseTypeUserJobLinkVo` Invalid input
     * @response `500` `ResponseTypeUserJobLinkVo` Server error
     */
    addUserJobLink: (data: UserJobLinkVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeUserJobLinkVo, ResponseTypeUserJobLinkVo>({
        path: `/api/user-job-link/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params
      }),

    /**
     * @description 根據使用者 ID 取得該使用者所有職缺連結。
     *
     * @tags user-job-link-controller
     * @name GetUserJobLinksByUserId
     * @summary 取得使用者所有職缺連結
     * @request GET:/api/user-job-link/user/{userId}
     * @secure
     * @response `200` `ResponseTypeListUserJobLinkVo` OK
     * @response `500` `ResponseTypeListUserJobLinkVo` Server error
     */
    getUserJobLinksByUserId: (userId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListUserJobLinkVo, ResponseTypeListUserJobLinkVo>({
        path: `/api/user-job-link/user/${userId}`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description 根據職缺 ID 取得該職缺的所有使用者連結。
     *
     * @tags user-job-link-controller
     * @name GetUserJobLinksByJobPostingId
     * @summary 取得職缺所有使用者連結
     * @request GET:/api/user-job-link/job-posting/{jobPostingId}
     * @secure
     * @response `200` `ResponseTypeListUserJobLinkVo` OK
     * @response `500` `ResponseTypeListUserJobLinkVo` Server error
     */
    getUserJobLinksByJobPostingId: (jobPostingId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListUserJobLinkVo, ResponseTypeListUserJobLinkVo>({
        path: `/api/user-job-link/job-posting/${jobPostingId}`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description 返回所有使用者職缺連結列表。
     *
     * @tags user-job-link-controller
     * @name GetAllUserJobLinks
     * @summary 取得所有連結
     * @request GET:/api/user-job-link/get
     * @secure
     * @response `200` `ResponseTypeListUserJobLinkVo` OK
     * @response `500` `ResponseTypeListUserJobLinkVo` Server error
     */
    getAllUserJobLinks: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListUserJobLinkVo, ResponseTypeListUserJobLinkVo>({
        path: `/api/user-job-link/get`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description 根據 ID 取得使用者職缺連結資訊。
     *
     * @tags user-job-link-controller
     * @name GetUserJobLinkById
     * @summary 取得連結詳情
     * @request GET:/api/user-job-link/get/{id}
     * @secure
     * @response `200` `ResponseTypeUserJobLinkVo` OK
     * @response `500` `ResponseTypeUserJobLinkVo` Server error
     */
    getUserJobLinkById: (id: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeUserJobLinkVo, ResponseTypeUserJobLinkVo>({
        path: `/api/user-job-link/get/${id}`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * @description 根據 ID 刪除使用者職缺連結。
     *
     * @tags user-job-link-controller
     * @name DeleteUserJobLink
     * @summary 刪除使用者職缺連結
     * @request DELETE:/api/user-job-link/delete/{id}
     * @secure
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteUserJobLink: (id: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/api/user-job-link/delete/${id}`,
        method: "DELETE",
        secure: true,
        ...params
      })
  }
}
