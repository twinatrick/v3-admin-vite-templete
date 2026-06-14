import { api } from "@/api/client"
import { FunctionVo, RoleOutVo } from "@/api/generated/Api"

interface PermissionData {
  roles: RoleOutVo[]
  functions: FunctionVo[]
}

export async function getRoleFunctionAll(): Promise<PermissionData> {
  const [rolesRes, functionsRes] = await Promise.all([
    api.roleController.getRole(),
    api.functionController.getFunction()
  ])

  if (rolesRes.data.code !== 200 || !rolesRes.data.data) {
    throw new Error(rolesRes.data.message || "Failed to fetch roles.")
  }
  if (functionsRes.data.code !== 200 || !functionsRes.data.data) {
    throw new Error(functionsRes.data.message || "Failed to fetch functions.")
  }

  return {
    roles: rolesRes.data.data,
    functions: functionsRes.data.data
  }
}

export const findData = (permissionData: PermissionData, first: string, second: string) => {
  const { roles, functions } = permissionData
  let flag = false

  if (roles.length === 0 || functions.length === 0) {
    return false
  }

  for (const role of roles) {
    if (flag) break
    if (role.functionIds) {
      for (const functionId of role.functionIds) {
        if (flag) break
        const func = functions.find((f) => f.id === functionId)
        if (func && func.name?.includes(first) && func.name?.includes(second)) {
          flag = true
          break
        }
      }
    }
  }
  return flag
}

export const findDataByFunctionList = (permissionData: PermissionData, first: string, second: string[]) => {
  const { roles, functions } = permissionData
  const permissionList: string[] = []

  if (roles.length === 0 || functions.length === 0) {
    return []
  }

  for (const role of roles) {
    if (role.functionIds) {
      for (const functionId of role.functionIds) {
        const func = functions.find((f) => f.id === functionId)
        if (func && func.name?.includes(first)) {
          // Assuming 'func.name' can contain multiple "functionList" items separated by a delimiter
          // Or if 'func.name' itself is the "functionList" item
          if (func.name) {
            second.forEach((item) => {
              if (func.name?.includes(item)) {
                permissionList.push(item)
              }
            })
          }
        }
      }
    }
  }
  return permissionList
}

export const findDataByTitle = (permissionData: PermissionData, first: string) => {
  const { roles, functions } = permissionData
  const permissionList: string[] = []

  if (roles.length === 0 || functions.length === 0) {
    return []
  }

  for (const role of roles) {
    if (role.functionIds) {
      for (const functionId of role.functionIds) {
        const func = functions.find((f) => f.id === functionId)
        if (func && func.name?.includes(first)) {
          // Assuming 'func.name' itself is the item to be pushed
          if (func.name) {
            permissionList.push(func.name)
          }
        }
      }
    }
  }
  return permissionList
}
