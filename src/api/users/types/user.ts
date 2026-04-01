import * as RoleType from "@/views/system-management/role/type"
import { parameter } from "@/api/settings/types"
export type User = {
  key?: string
  email?: string
  faily_name?: string
  given_name?: string
  role?: string
  permissions?: string[]
  accessToken?: string
  location?: string
  password?: string
  name?: string
}
export type UserInfoVO = {
  key?: string
  email?: string
  password?: string
  name?: string
  location?: string
  familyName?: string
  givenName?: string
  supervisor?: string[]
  subordinate?: string[]
  roles?: string[]
  tags?: string[]
  ldap?: string
  permissions?: RoleType.Function[]
}
export type UserListQuery = {
  keyword?: string
  role?: string[]
}

export type UserVO = {
  id?: string
  email?: string
  password?: string
  name?: string
  ldap?: string
  location?: string
  familyName?: string
  givenName?: string
  supervisor?: User[]
  roleArr?: string[]
  tags?: string[]
  disabled?: boolean
  status?: number
}

export type InitData = {
  role: RoleType.Role[]
  tag: RoleType.Role[]
  location: parameter[]
}

export type UserListResponseData = ApiResponseData<User[]>

export type UserInfoResponseData = ApiResponseData<UserInfoVO>
