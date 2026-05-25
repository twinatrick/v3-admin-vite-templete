/**
 * Mock API 輔助函數
 * 用於在測試中模擬 API 回應
 */

import { vi } from "vitest"
import type { ApiResponse } from "@/api/generated/Api"

/**
 * 創建成功的 API 回應
 */
export function createSuccessResponse<T>(data: T, code = 200): ApiResponse<T> {
  return {
    code,
    data,
    message: "Success",
    errorType: undefined
  }
}

/**
 * 創建失敗的 API 回應
 */
export function createErrorResponse<T>(
  message: string,
  code = 500,
  errorType = "ServerError"
): ApiResponse<T> {
  return {
    code,
    data: undefined as unknown as T,
    message,
    errorType
  }
}

/**
 * Mock API 客戶端
 * 用於測試時替換真實的 API 客戶端
 */
export function createMockApiClient() {
  return {
    users: {
      searchUsers: vi.fn(),
      saveUser: vi.fn(),
      createUser: vi.fn(),
      bindUserSkill: vi.fn(),
      bindUserProject: vi.fn(),
      getUserInfo: vi.fn(),
      getAllUser: vi.fn()
    },
    roles: {
      searchRoles: vi.fn(),
      getRole: vi.fn(),
      addRole: vi.fn(),
      updateRole: vi.fn(),
      deleteRole: vi.fn(),
      userBindRole: vi.fn(),
      userUnbindRole: vi.fn(),
      roleBindUser: vi.fn(),
      roleUnbindUser: vi.fn(),
      roleBindFunction: vi.fn(),
      roleUnbindFunction: vi.fn(),
      functionBindRole: vi.fn(),
      functionUnbindRole: vi.fn(),
      getUserByRole: vi.fn(),
      getRoleByUser: vi.fn(),
      getRoleByFunction: vi.fn(),
      getFunctionByRole: vi.fn()
    },
    skills: {
      searchSkills: vi.fn(),
      searchCurrentUserSkills: vi.fn(),
      searchSkillLevels: vi.fn(),
      getSkill: vi.fn(),
      getCurrentUserSkills: vi.fn(),
      getSkillLevels: vi.fn(),
      addSkill: vi.fn(),
      updateSkill: vi.fn(),
      deleteSkill: vi.fn(),
      addSkillLevel: vi.fn(),
      updateSkillLevel: vi.fn(),
      deleteSkillLevel: vi.fn(),
      addPersonalSkill: vi.fn(),
      updatePersonalSkill: vi.fn(),
      updatePersonalSkillLevel: vi.fn(),
      deletePersonalSkill: vi.fn()
    },
    projects: {
      searchProjects: vi.fn(),
      searchCurrentUserProjects: vi.fn(),
      getProject: vi.fn(),
      getCurrentUserProjects: vi.fn(),
      getProjectSkills: vi.fn(),
      getPersonalProjectSkills: vi.fn(),
      addProject: vi.fn(),
      updateProject: vi.fn(),
      deleteProject: vi.fn(),
      bindProjectSkill: vi.fn(),
      addPersonalProject: vi.fn(),
      updatePersonalProject: vi.fn(),
      deletePersonalProject: vi.fn(),
      bindPersonalProjectSkill: vi.fn(),
      updatePersonalProjectSkillLevel: vi.fn(),
      unbindPersonalProjectSkill: vi.fn()
    },
    adminBindings: {
      rebindProjectSkills: vi.fn()
    },
    functions: {
      searchFunctions: vi.fn(),
      getFunction: vi.fn(),
      addFunction: vi.fn(),
      updateFunction: vi.fn(),
      deleteFunction: vi.fn(),
      saveAllFunction: vi.fn()
    },
    alertLimits: {
      searchAlertCheckLimits: vi.fn(),
      getLimit: vi.fn(),
      updateLimit: vi.fn(),
      deleteLimit: vi.fn()
    },
    aquarkData: {
      getData: vi.fn(),
      getAverage: vi.fn(),
      getColumnNameList: vi.fn()
    },
    auth: {
      login: vi.fn(),
      signup: vi.fn(),
      createSuperUser: vi.fn()
    }
  }
}

/**
 * 重置所有 Mock 函數
 */
export function resetMockApi(mockApi: ReturnType<typeof createMockApiClient>) {
  Object.values(mockApi).forEach((controller) => {
    Object.values(controller).forEach((fn) => {
      if (vi.isMockFunction(fn)) {
        fn.mockReset()
      }
    })
  })
}

/**
 * 設定 Mock 函數返回成功回應
 */
export function mockApiSuccess<T>(mockFn: any, data: T, code = 200) {
  mockFn.mockResolvedValue(createSuccessResponse(data, code))
}

/**
 * 設定 Mock 函數返回失敗回應
 */
export function mockApiError<T>(mockFn: any, message: string, code = 500) {
  mockFn.mockResolvedValue(createErrorResponse<T>(message, code))
}

/**
 * 驗證 API 被呼叫的次數和參數
 */
export function expectApiCalled(mockFn: any, times: number, ...args: any[]) {
  expect(mockFn).toHaveBeenCalledTimes(times)
  if (args.length > 0) {
    expect(mockFn).toHaveBeenCalledWith(...args)
  }
}

/**
 * 等待所有 Promise 完成
 */
export async function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0))
}
