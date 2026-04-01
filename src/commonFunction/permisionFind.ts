import { FuctionList, RoleFunctionList } from "@/api/roles/type"
import { getRoleFunctionList } from "@/api/roles"

export async function getRoleFunctionAll() {
  const res = await getRoleFunctionList()
  return res.data
}

export const findData = (list: RoleFunctionList[], first: string, second: string) => {
  let flag = false
  if (list.length === 0) {
    return false
  }
  list.forEach((x: RoleFunctionList) => {
    if (flag) {
      return
    }
    x.functionBaseList.forEach((y: FuctionList) => {
      if (y.functionList === undefined || y.functionName === undefined) {
        return
      } else {
        if (flag) {
          return
        }
        if (y.functionName.includes(first) && y.functionList.includes(second)) {
          flag = true
          return
        }
        return
      }
    })
  })
  return flag
}

export const findDataByFunctionList = (list: RoleFunctionList[], first: string, second: string[]) => {
  let flag = false
  const permissionList = [] as string[]
  if (list.length === 0) {
    return false
  }
  list.forEach((x: RoleFunctionList) => {
    if (flag) {
      return
    }
    x.functionBaseList.forEach((y: FuctionList) => {
      if (y.functionList === undefined || y.functionName === undefined) {
        return
      } else {
        if (flag) {
          return
        }
        if (y.functionName.includes(first)) {
          second.forEach((item) => {
            const f: string[] = y.functionList as string[]
            if (f.includes(item)) return permissionList.push(item)
          })
          flag = true
          return
        }
        return
      }
    })
  })
  return permissionList
}
export const findDataByTitle = (list: RoleFunctionList[], first: string) => {
  let flag = false
  const permissionList = [] as string[]
  if (list.length === 0) {
    return []
  }
  list.forEach((x: RoleFunctionList) => {
    if (flag) {
      return
    }
    x.functionBaseList.forEach((y: FuctionList) => {
      if (y.functionList === undefined || y.functionName === undefined) {
        return
      } else {
        if (flag) {
          return
        }
        if (y.functionName.includes(first)) {
          y.functionList.forEach((item) => {
            return permissionList.push(item)
          })
          flag = true
          return
        }
        return
      }
    })
  })
  return permissionList
}
