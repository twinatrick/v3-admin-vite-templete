export interface Role {
  key: string
  name: string
  function: string[]
}

export type RoleListResponseData = ApiResponseData<Role[]>

export type RoleFunctionList = {
  roleName?: string
  functionBaseList: FuctionList[]
}
export type FuctionList = {
  functionName?: string
  functionList?: string[]
}
