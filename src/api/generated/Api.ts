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

export interface BindUserSkillOrProject {
  userId?: string
  skill?: string
  projectId?: string
  type?: string
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

export interface ResponseTypeProjectVo {
  /** @format int32 */
  code?: number
  data?: ProjectVo
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

export interface ResponseTypeListSkillVo {
  /** @format int32 */
  code?: number
  data?: SkillVo[]
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
     * @description Binds a skill to a user or to a project and user.
     *
     * @tags Users
     * @name BindUserSkillOrProject
     * @summary Bind user skill or project
     * @request POST:/backend/users/BindUserSkillOrProject
     * @response `200` `ResponseTypeString` OK
     * @response `400` `ResponseTypeString` Invalid input
     * @response `500` `ResponseTypeString` Server error
     */
    BindUserSkillOrProject: (data: BindUserSkillOrProject, params: RequestParams = {}) =>
      this.http.request<ResponseTypeString, ResponseTypeString>({
        path: `/backend/users/BindUserSkillOrProject`,
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
