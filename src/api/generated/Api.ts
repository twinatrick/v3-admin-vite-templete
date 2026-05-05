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

export interface ResponseTypeString {
  /** @format int32 */
  code?: number
  data?: string
  message?: string
  errorType?: string
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
  /** 來源類型：USER（直接綁定）或 PROJECT（專案技能） */
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

export interface ResponseTypeSkillVo {
  /** @format int32 */
  code?: number
  data?: SkillVo
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
  permissions?: string
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

export interface ProjectSkillBindRequest {
  projectId?: string
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

export interface ResponseTypeListProjectVo {
  /** @format int32 */
  code?: number
  data?: ProjectVo[]
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

  users = {
    /**
     * @description 搜尋使用者並回傳分頁結果，支援多種查詢條件與排序
     *
     * @tags Users
     * @name SearchUsers
     * @summary Search users with pagination
     * @request POST:/backend/users/search
     * @response `200` `ResponseTypePageResultUserVo` OK
     * @response `500` `ResponseTypePageResultUserVo` Server error
     */
    searchUsers: (data: UserSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultUserVo, ResponseTypePageResultUserVo>({
        path: `/backend/users/search`,
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
     * @request POST:/backend/users/saveUser
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    saveUser: (data: UserVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/backend/users/saveUser`,
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
     * @request POST:/backend/users/create
     * @response `200` `boolean` OK
     * @response `400` `boolean` Invalid input
     * @response `500` `boolean` Server error
     */
    createUser: (data: UserVo, params: RequestParams = {}) =>
      this.http.request<boolean, boolean>({
        path: `/backend/users/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Binds a skill level to a user.
     *
     * @tags Users
     * @name BindUserSkill
     * @summary Bind user skill
     * @request POST:/backend/users/bindSkill
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    bindUserSkill: (data: UserSkillBindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/backend/users/bindSkill`,
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
     * @request POST:/backend/users/bindProject
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    bindUserProject: (data: UserProjectBindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/backend/users/bindProject`,
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
     * @request GET:/backend/users/infoVo
     * @response `200` `ResponseTypeUserVo` OK
     * @response `401` `ResponseTypeUserVo` Unauthorized
     * @response `500` `ResponseTypeUserVo` Server error
     */
    getUserInfo: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeUserVo, ResponseTypeUserVo>({
        path: `/backend/users/infoVo`,
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
     * @request GET:/backend/users/getAllUser
     * @response `200` `ResponseTypeListUserVo` OK
     * @response `500` `ResponseTypeListUserVo` Server error
     */
    getAllUser: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListUserVo, ResponseTypeListUserVo>({
        path: `/backend/users/getAllUser`,
        method: "GET",
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
     * @request POST:/backend/skill/update
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    updateSkill: (data: SkillVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/backend/skill/update`,
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
     * @request POST:/backend/skill/search
     * @response `200` `ResponseTypePageResultSkillVo` OK
     * @response `400` `ResponseTypePageResultSkillVo` Invalid input
     * @response `500` `ResponseTypePageResultSkillVo` Server error
     */
    searchSkills: (data: SkillSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultSkillVo, ResponseTypePageResultSkillVo>({
        path: `/backend/skill/search`,
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
     * @request POST:/backend/skill/level/update
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    updateSkillLevel: (data: SkillLevelVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/backend/skill/level/update`,
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
     * @request POST:/backend/skill/level/search
     * @response `200` `ResponseTypePageResultSkillLevelVo` OK
     * @response `400` `ResponseTypePageResultSkillLevelVo` Invalid input
     * @response `500` `ResponseTypePageResultSkillLevelVo` Server error
     */
    searchSkillLevels: (data: SkillLevelSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultSkillLevelVo, ResponseTypePageResultSkillLevelVo>({
        path: `/backend/skill/level/search`,
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
     * @request POST:/backend/skill/level/delete
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteSkillLevel: (data: SkillLevelVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/backend/skill/level/delete`,
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
     * @request POST:/backend/skill/level/add
     * @response `200` `ResponseTypeSkillLevelVo` OK
     * @response `400` `ResponseTypeSkillLevelVo` Invalid input
     * @response `500` `ResponseTypeSkillLevelVo` Server error
     */
    addSkillLevel: (data: SkillLevelVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeSkillLevelVo, ResponseTypeSkillLevelVo>({
        path: `/backend/skill/level/add`,
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
     * @request POST:/backend/skill/delete
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteSkill: (data: SkillVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/backend/skill/delete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description 在合併後的技能列表中搜尋，支援 name、description、createdBy 查詢條件
     *
     * @tags Skills
     * @name SearchCurrentUserSkills
     * @summary 搜尋當前使用者技能（分頁）
     * @request POST:/backend/skill/current/search
     * @response `200` `ResponseTypePageResultCurrentUserSkillVo` OK
     * @response `400` `ResponseTypePageResultCurrentUserSkillVo` Invalid input
     * @response `500` `ResponseTypePageResultCurrentUserSkillVo` Server error
     */
    searchCurrentUserSkills: (data: SkillSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultCurrentUserSkillVo, ResponseTypePageResultCurrentUserSkillVo>({
        path: `/backend/skill/current/search`,
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
     * @request POST:/backend/skill/add
     * @response `200` `ResponseTypeSkillVo` OK
     * @response `400` `ResponseTypeSkillVo` Invalid input
     * @response `500` `ResponseTypeSkillVo` Server error
     */
    addSkill: (data: SkillVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeSkillVo, ResponseTypeSkillVo>({
        path: `/backend/skill/add`,
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
     * @request GET:/backend/skill/level/get/{skillId}
     * @response `200` `ResponseTypeListSkillLevelVo` OK
     * @response `500` `ResponseTypeListSkillLevelVo` Server error
     */
    getSkillLevels: (skillId: string, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListSkillLevelVo, ResponseTypeListSkillLevelVo>({
        path: `/backend/skill/level/get/${skillId}`,
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
     * @request GET:/backend/skill/get
     * @response `200` `ResponseTypeListSkillVo` OK
     * @response `500` `ResponseTypeListSkillVo` Server error
     */
    getSkill: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListSkillVo, ResponseTypeListSkillVo>({
        path: `/backend/skill/get`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * @description 合併 USER（直接綁定）和 PROJECT（專案技能）兩個來源，每筆標記 sourceType
     *
     * @tags Skills
     * @name GetCurrentUserSkills
     * @summary 取得當前使用者技能
     * @request GET:/backend/skill/current
     * @response `200` `ResponseTypeListCurrentUserSkillVo` OK
     * @response `500` `ResponseTypeListCurrentUserSkillVo` Server error
     */
    getCurrentUserSkills: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListCurrentUserSkillVo, ResponseTypeListCurrentUserSkillVo>({
        path: `/backend/skill/current`,
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
     * @request POST:/backend/role/userUnbindRole
     * @response `200` `ResponseTypeUserVo` OK
     * @response `400` `ResponseTypeUserVo` Invalid input
     * @response `500` `ResponseTypeUserVo` Server error
     */
    userUnbindRole: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeUserVo, ResponseTypeUserVo>({
        path: `/backend/role/userUnbindRole`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Assigns roles to a user.
     *
     * @tags Roles
     * @name UserBindRole
     * @summary Bind user to roles
     * @request POST:/backend/role/userBindRole
     * @response `200` `ResponseTypeUserVo` OK
     * @response `400` `ResponseTypeUserVo` Invalid input
     * @response `500` `ResponseTypeUserVo` Server error
     */
    userBindRole: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeUserVo, ResponseTypeUserVo>({
        path: `/backend/role/userBindRole`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Updates role details.
     *
     * @tags Roles
     * @name UpdateRole
     * @summary Update role
     * @request POST:/backend/role/update
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    updateRole: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/backend/role/update`,
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
     * @request POST:/backend/role/search
     * @response `200` `ResponseTypePageResultRoleOutVo` OK
     * @response `500` `ResponseTypePageResultRoleOutVo` Server error
     */
    searchRoles: (data: RoleSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultRoleOutVo, ResponseTypePageResultRoleOutVo>({
        path: `/backend/role/search`,
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
     * @request POST:/backend/role/roleUnbindUser
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    roleUnbindUser: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/backend/role/roleUnbindUser`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Removes functions from a role.
     *
     * @tags Roles
     * @name RoleUnbindFunction
     * @summary Unbind role from functions
     * @request POST:/backend/role/roleUnbindFunction
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    roleUnbindFunction: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/backend/role/roleUnbindFunction`,
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
     * @request POST:/backend/role/roleBindUser
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    roleBindUser: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/backend/role/roleBindUser`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Assigns functions to a role.
     *
     * @tags Roles
     * @name RoleBindFunction
     * @summary Bind role to functions
     * @request POST:/backend/role/roleBindFunction
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    roleBindFunction: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/backend/role/roleBindFunction`,
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
     * @request POST:/backend/role/get
     * @response `200` `ResponseTypeListRoleOutVo` OK
     * @response `500` `ResponseTypeListRoleOutVo` Server error
     */
    getRole: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListRoleOutVo, ResponseTypeListRoleOutVo>({
        path: `/backend/role/get`,
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
     * @request POST:/backend/role/getUserByRole
     * @response `200` `ResponseTypeListUserVo` OK
     * @response `400` `ResponseTypeListUserVo` Invalid input
     * @response `500` `ResponseTypeListUserVo` Server error
     */
    getUserByRole: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListUserVo, ResponseTypeListUserVo>({
        path: `/backend/role/getUserByRole`,
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
     * @request POST:/backend/role/getRoleByUser
     * @response `200` `ResponseTypeListRoleOutVo` OK
     * @response `400` `ResponseTypeListRoleOutVo` Invalid input
     * @response `500` `ResponseTypeListRoleOutVo` Server error
     */
    getRoleByUser: (data: UserVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListRoleOutVo, ResponseTypeListRoleOutVo>({
        path: `/backend/role/getRoleByUser`,
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
     * @request POST:/backend/role/getRoleByFunction
     * @response `200` `ResponseTypeListRoleOutVo` OK
     * @response `400` `ResponseTypeListRoleOutVo` Invalid input
     * @response `500` `ResponseTypeListRoleOutVo` Server error
     */
    getRoleByFunction: (data: FunctionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListRoleOutVo, ResponseTypeListRoleOutVo>({
        path: `/backend/role/getRoleByFunction`,
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
     * @request POST:/backend/role/getFunctionByRole
     * @response `200` `ResponseTypeListFunctionVo` OK
     * @response `400` `ResponseTypeListFunctionVo` Invalid input
     * @response `500` `ResponseTypeListFunctionVo` Server error
     */
    getFunctionByRole: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListFunctionVo, ResponseTypeListFunctionVo>({
        path: `/backend/role/getFunctionByRole`,
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
     * @request POST:/backend/role/functionUnbindRole
     * @response `200` `ResponseTypeFunctionVo` OK
     * @response `400` `ResponseTypeFunctionVo` Invalid input
     * @response `500` `ResponseTypeFunctionVo` Server error
     */
    functionUnbindRole: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeFunctionVo, ResponseTypeFunctionVo>({
        path: `/backend/role/functionUnbindRole`,
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
     * @request POST:/backend/role/functionBindRole
     * @response `200` `ResponseTypeFunctionVo` OK
     * @response `400` `ResponseTypeFunctionVo` Invalid input
     * @response `500` `ResponseTypeFunctionVo` Server error
     */
    functionBindRole: (data: PermissionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeFunctionVo, ResponseTypeFunctionVo>({
        path: `/backend/role/functionBindRole`,
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
     * @request POST:/backend/role/delete
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    deleteRole: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/backend/role/delete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Creates a new role.
     *
     * @tags Roles
     * @name AddRole
     * @summary Add role
     * @request POST:/backend/role/add
     * @response `200` `ResponseTypeRoleOutVo` OK
     * @response `400` `ResponseTypeRoleOutVo` Invalid input
     * @response `500` `ResponseTypeRoleOutVo` Server error
     */
    addRole: (data: RoleOutVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeRoleOutVo, ResponseTypeRoleOutVo>({
        path: `/backend/role/add`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      })
  }
  projects = {
    /**
     * @description Updates an existing project.
     *
     * @tags Projects
     * @name UpdateProject
     * @summary Update project
     * @request POST:/backend/project/update
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    updateProject: (data: ProjectVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/backend/project/update`,
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
     * @request POST:/backend/project/search
     * @response `200` `ResponseTypePageResultProjectVo` OK
     * @response `500` `ResponseTypePageResultProjectVo` Server error
     */
    searchProjects: (data: ProjectSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultProjectVo, ResponseTypePageResultProjectVo>({
        path: `/backend/project/search`,
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
     * @request POST:/backend/project/delete
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteProject: (data: ProjectVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/backend/project/delete`,
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
     * @request POST:/backend/project/current/search
     * @response `200` `ResponseTypePageResultProjectVo` OK
     * @response `500` `ResponseTypePageResultProjectVo` Server error
     */
    searchCurrentUserProjects: (data: ProjectSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultProjectVo, ResponseTypePageResultProjectVo>({
        path: `/backend/project/current/search`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Binds a skill level to a project.
     *
     * @tags Projects
     * @name BindProjectSkill
     * @summary Bind project skill
     * @request POST:/backend/project/bindSkill
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    bindProjectSkill: (data: ProjectSkillBindRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/backend/project/bindSkill`,
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
     * @request POST:/backend/project/add
     * @response `200` `ResponseTypeProjectVo` OK
     * @response `400` `ResponseTypeProjectVo` Invalid input
     * @response `500` `ResponseTypeProjectVo` Server error
     */
    addProject: (data: ProjectVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeProjectVo, ResponseTypeProjectVo>({
        path: `/backend/project/add`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * @description Returns all projects.
     *
     * @tags Projects
     * @name GetProject
     * @summary Get projects
     * @request GET:/backend/project/get
     * @response `200` `ResponseTypeListProjectVo` OK
     * @response `500` `ResponseTypeListProjectVo` Server error
     */
    getProject: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListProjectVo, ResponseTypeListProjectVo>({
        path: `/backend/project/get`,
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
     * @request GET:/backend/project/current
     * @response `200` `ResponseTypeListProjectVo` OK
     * @response `500` `ResponseTypeListProjectVo` Server error
     */
    getCurrentUserProjects: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListProjectVo, ResponseTypeListProjectVo>({
        path: `/backend/project/current`,
        method: "GET",
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
     * @request POST:/backend/function/update
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    updateFunction: (data: FunctionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/backend/function/update`,
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
     * @request POST:/backend/function/search
     * @response `200` `ResponseTypePageResultFunctionVo` OK
     * @response `500` `ResponseTypePageResultFunctionVo` Server error
     */
    searchFunctions: (data: FunctionSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultFunctionVo, ResponseTypePageResultFunctionVo>({
        path: `/backend/function/search`,
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
     * @request POST:/backend/function/saveAllFunction
     * @response `200` `ResponseTypeObject` OK
     * @response `400` `ResponseTypeObject` Invalid input
     * @response `500` `ResponseTypeObject` Server error
     */
    saveAllFunction: (data: FunctionTransVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeObject, ResponseTypeObject>({
        path: `/backend/function/saveAllFunction`,
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
     * @request POST:/backend/function/delete
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteFunction: (data: FunctionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/backend/function/delete`,
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
     * @request POST:/backend/function/add
     * @response `200` `ResponseTypeObject` OK
     * @response `400` `ResponseTypeObject` Invalid input
     * @response `500` `ResponseTypeObject` Server error
     */
    addFunction: (data: FunctionVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeObject, ResponseTypeObject>({
        path: `/backend/function/add`,
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
     * @request GET:/backend/function/get
     * @response `200` `ResponseTypeListFunctionVo` OK
     * @response `500` `ResponseTypeListFunctionVo` Server error
     */
    getFunction: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListFunctionVo, ResponseTypeListFunctionVo>({
        path: `/backend/function/get`,
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
     * @request POST:/backend/auth/superuser
     * @response `200` `ResponseTypeObject` OK
     * @response `400` `ResponseTypeObject` Invalid input
     * @response `500` `ResponseTypeObject` Server error
     */
    createSuperUser: (data: SuperUserRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeObject, ResponseTypeObject>({
        path: `/backend/auth/superuser`,
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
     * @request POST:/backend/auth/signup
     * @response `200` `ResponseTypeObject` OK
     * @response `400` `ResponseTypeObject` Invalid input
     * @response `500` `ResponseTypeObject` Server error
     */
    signup: (data: SignupRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeObject, ResponseTypeObject>({
        path: `/backend/auth/signup`,
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
     * @request POST:/backend/auth/login
     * @response `200` `ResponseTypeObject` OK
     * @response `401` `ResponseTypeObject` Unauthorized
     * @response `500` `ResponseTypeObject` Server error
     */
    login: (data: LoginRequest, params: RequestParams = {}) =>
      this.http.request<ResponseTypeObject, ResponseTypeObject>({
        path: `/backend/auth/login`,
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
     * @request POST:/backend/aquarkData/getData
     * @response `200` `ResponseTypeListAquarkDataRaw` OK
     * @response `400` `ResponseTypeListAquarkDataRaw` Invalid input
     * @response `500` `ResponseTypeListAquarkDataRaw` Server error
     */
    getData: (data: CriteriaAPIFilter[], params: RequestParams = {}) =>
      this.http.request<ResponseTypeListAquarkDataRaw, ResponseTypeListAquarkDataRaw>({
        path: `/backend/aquarkData/getData`,
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
     * @request POST:/backend/aquarkData/getAverage
     * @response `200` `ResponseTypeListAverageAquark` OK
     * @response `400` `ResponseTypeListAverageAquark` Invalid input
     * @response `500` `ResponseTypeListAverageAquark` Server error
     */
    getAverage: (data: TimeRange, params: RequestParams = {}) =>
      this.http.request<ResponseTypeListAverageAquark, ResponseTypeListAverageAquark>({
        path: `/backend/aquarkData/getAverage`,
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
     * @request GET:/backend/aquarkData/getColumnNameList
     * @response `200` `ResponseTypeListString` OK
     * @response `500` `ResponseTypeListString` Server error
     */
    getColumnNameList: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListString, ResponseTypeListString>({
        path: `/backend/aquarkData/getColumnNameList`,
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
     * @request POST:/backend/alertCheckLimit/update
     * @response `200` `ResponseTypeAlertCheckLimitVo` OK
     * @response `400` `ResponseTypeAlertCheckLimitVo` Invalid input
     * @response `500` `ResponseTypeAlertCheckLimitVo` Server error
     */
    updateLimit: (data: AlertCheckLimitVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeAlertCheckLimitVo, ResponseTypeAlertCheckLimitVo>({
        path: `/backend/alertCheckLimit/update`,
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
     * @request POST:/backend/alertCheckLimit/search
     * @response `200` `ResponseTypePageResultAlertCheckLimitVo` OK
     * @response `400` `ResponseTypePageResultAlertCheckLimitVo` Invalid input
     * @response `500` `ResponseTypePageResultAlertCheckLimitVo` Server error
     */
    searchAlertCheckLimits: (data: AlertCheckLimitSearchQuery, params: RequestParams = {}) =>
      this.http.request<ResponseTypePageResultAlertCheckLimitVo, ResponseTypePageResultAlertCheckLimitVo>({
        path: `/backend/alertCheckLimit/search`,
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
     * @request POST:/backend/alertCheckLimit/delete
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    deleteLimit: (data: AlertCheckLimitVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/backend/alertCheckLimit/delete`,
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
     * @request POST:/backend/alertCheckLimit/add
     * @response `200` `ResponseTypeAlertCheckLimitVo` OK
     * @response `400` `ResponseTypeAlertCheckLimitVo` Invalid input
     * @response `500` `ResponseTypeAlertCheckLimitVo` Server error
     */
    addLimit: (data: AlertCheckLimitVo, params: RequestParams = {}) =>
      this.http.request<ResponseTypeAlertCheckLimitVo, ResponseTypeAlertCheckLimitVo>({
        path: `/backend/alertCheckLimit/add`,
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
     * @request GET:/backend/alertCheckLimit/get
     * @response `200` `ResponseTypeListAlertCheckLimitVo` OK
     * @response `500` `ResponseTypeListAlertCheckLimitVo` Server error
     */
    getLimit: (params: RequestParams = {}) =>
      this.http.request<ResponseTypeListAlertCheckLimitVo, ResponseTypeListAlertCheckLimitVo>({
        path: `/backend/alertCheckLimit/get`,
        method: "GET",
        format: "json",
        ...params
      })
  }
}
