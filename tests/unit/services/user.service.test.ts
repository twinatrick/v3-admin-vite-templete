/**
 * 使用者管理服務單元測試
 * 測試 src/views/system-management/user/service.ts
 */

import { describe, it, expect, beforeEach, vi } from "vitest"
import {
  createMockUser,
  createMockUsers,
  createMockRoles,
  createMockUserPageResult
} from "../../helpers/test-data"
import {
  createMockApiClient,
  mockApiSuccess,
  mockApiError
} from "../../helpers/mock-api"

// Mock API client
const mockApi = createMockApiClient()

// Mock the API module
vi.mock("@/api/client", () => ({
  api: mockApi
}))

// 動態導入 service（在 mock 之後）
let service: any

describe("使用者管理服務測試", () => {
  beforeEach(async () => {
    // 重置所有 mocks
    vi.clearAllMocks()

    // 重新導入 service
    const module = await import("@/views/system-management/user/service")
    service = module.default

    // 重置 service data
    service.data.user = []
    service.data.role = []
    service.data.page = 0
    service.data.size = 20
    service.data.totalElements = 0
    service.data.sortBy = "createdTime"
    service.data.sortDir = "desc"
    service.data.filters = {
      name: "",
      email: "",
      phone: "",
      createdBy: ""
    }
  })

  describe("initialize", () => {
    it("應該成功載入角色資料", async () => {
      // Arrange
      const mockRoles = createMockRoles(3)
      mockApiSuccess(mockApi.roles.getRole, mockRoles)

      // Act
      await service.initialize()

      // Assert
      expect(mockApi.roles.getRole).toHaveBeenCalledTimes(1)
      expect(service.data.role).toEqual(mockRoles)
    })

    it("當 API 返回 null 時應該設定為空陣列", async () => {
      // Arrange
      mockApiSuccess(mockApi.roles.getRole, null)

      // Act
      await service.initialize()

      // Assert
      expect(service.data.role).toEqual([])
    })
  })

  describe("queryUser", () => {
    it("應該成功查詢使用者（基本分頁）", async () => {
      // Arrange
      const mockUsers = createMockUsers(5)
      const pageResult = createMockUserPageResult(mockUsers, {
        totalElements: 5,
        currentPage: 0,
        pageSize: 20
      })
      mockApiSuccess(mockApi.users.searchUsers, pageResult)

      // Act
      await service.queryUser()

      // Assert
      expect(mockApi.users.searchUsers).toHaveBeenCalledWith({
        page: 0,
        size: 20,
        sortBy: "createdTime",
        sortDir: "desc",
        name: "",
        email: "",
        phone: "",
        createdBy: ""
      })
      expect(service.data.user).toEqual(mockUsers)
      expect(service.data.totalElements).toBe(5)
    })

    it("應該支援按姓名過濾", async () => {
      // Arrange
      const mockUsers = [createMockUser({ name: "張三" })]
      const pageResult = createMockUserPageResult(mockUsers)
      mockApiSuccess(mockApi.users.searchUsers, pageResult)

      // Act
      await service.queryUser({ name: "張三" })

      // Assert
      expect(mockApi.users.searchUsers).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "張三"
        })
      )
      expect(service.data.filters.name).toBe("張三")
    })

    it("應該支援按郵箱過濾", async () => {
      // Arrange
      const mockUsers = [createMockUser({ email: "test@example.com" })]
      const pageResult = createMockUserPageResult(mockUsers)
      mockApiSuccess(mockApi.users.searchUsers, pageResult)

      // Act
      await service.queryUser({ email: "test@example.com" })

      // Assert
      expect(mockApi.users.searchUsers).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "test@example.com"
        })
      )
      expect(service.data.filters.email).toBe("test@example.com")
    })

    it("應該支援按電話過濾", async () => {
      // Arrange
      const mockUsers = [createMockUser({ phone: "0912345678" })]
      const pageResult = createMockUserPageResult(mockUsers)
      mockApiSuccess(mockApi.users.searchUsers, pageResult)

      // Act
      await service.queryUser({ phone: "0912345678" })

      // Assert
      expect(mockApi.users.searchUsers).toHaveBeenCalledWith(
        expect.objectContaining({
          phone: "0912345678"
        })
      )
      expect(service.data.filters.phone).toBe("0912345678")
    })

    it("應該支援按停用狀態過濾", async () => {
      // Arrange
      const mockUsers = [createMockUser({ disabled: true })]
      const pageResult = createMockUserPageResult(mockUsers)
      mockApiSuccess(mockApi.users.searchUsers, pageResult)

      // Act
      await service.queryUser({ disabled: true })

      // Assert
      expect(mockApi.users.searchUsers).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: true
        })
      )
      expect(service.data.filters.disabled).toBe(true)
    })

    it("應該支援按創建者過濾", async () => {
      // Arrange
      const mockUsers = [createMockUser({ createdBy: "admin" })]
      const pageResult = createMockUserPageResult(mockUsers)
      mockApiSuccess(mockApi.users.searchUsers, pageResult)

      // Act
      await service.queryUser({ createdBy: "admin" })

      // Assert
      expect(mockApi.users.searchUsers).toHaveBeenCalledWith(
        expect.objectContaining({
          createdBy: "admin"
        })
      )
      expect(service.data.filters.createdBy).toBe("admin")
    })

    it("應該支援多條件組合過濾", async () => {
      // Arrange
      const mockUsers = [
        createMockUser({
          name: "張三",
          email: "zhang@example.com",
          phone: "0912345678"
        })
      ]
      const pageResult = createMockUserPageResult(mockUsers)
      mockApiSuccess(mockApi.users.searchUsers, pageResult)

      // Act
      await service.queryUser({
        name: "張三",
        email: "zhang@example.com",
        phone: "0912345678"
      })

      // Assert
      expect(mockApi.users.searchUsers).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "張三",
          email: "zhang@example.com",
          phone: "0912345678"
        })
      )
    })

    it("應該支援分頁參數", async () => {
      // Arrange
      const mockUsers = createMockUsers(10)
      const pageResult = createMockUserPageResult(mockUsers, {
        currentPage: 2,
        pageSize: 10
      })
      mockApiSuccess(mockApi.users.searchUsers, pageResult)

      // Act
      await service.queryUser({ page: 2, size: 10 })

      // Assert
      expect(mockApi.users.searchUsers).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 2,
          size: 10
        })
      )
      expect(service.data.page).toBe(2)
      expect(service.data.size).toBe(10)
    })

    it("應該支援排序（升序）", async () => {
      // Arrange
      const mockUsers = createMockUsers(5)
      const pageResult = createMockUserPageResult(mockUsers)
      mockApiSuccess(mockApi.users.searchUsers, pageResult)

      // Act
      await service.queryUser({ sortBy: "name", sortDir: "asc" })

      // Assert
      expect(mockApi.users.searchUsers).toHaveBeenCalledWith(
        expect.objectContaining({
          sortBy: "name",
          sortDir: "asc"
        })
      )
      expect(service.data.sortBy).toBe("name")
      expect(service.data.sortDir).toBe("asc")
    })

    it("應該支援排序（降序）", async () => {
      // Arrange
      const mockUsers = createMockUsers(5)
      const pageResult = createMockUserPageResult(mockUsers)
      mockApiSuccess(mockApi.users.searchUsers, pageResult)

      // Act
      await service.queryUser({ sortBy: "createdTime", sortDir: "desc" })

      // Assert
      expect(mockApi.users.searchUsers).toHaveBeenCalledWith(
        expect.objectContaining({
          sortBy: "createdTime",
          sortDir: "desc"
        })
      )
      expect(service.data.sortDir).toBe("desc")
    })

    it("當 API 返回空資料時應該正確處理", async () => {
      // Arrange
      mockApiSuccess(mockApi.users.searchUsers, {})

      // Act
      await service.queryUser()

      // Assert
      expect(service.data.user).toEqual([])
      expect(service.data.totalElements).toBe(0)
    })
  })

  describe("createUser", () => {
    it("應該成功創建使用者", async () => {
      // Arrange
      const newUser = createMockUser({ name: "新使用者" })
      mockApiSuccess(mockApi.users.saveUser, { code: 200, data: "Success" })

      // Act
      await service.createUser(newUser)

      // Assert
      expect(mockApi.users.saveUser).toHaveBeenCalledWith(newUser)
      expect(service.data.user[0]).toEqual(newUser)
    })

    it("當 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const newUser = createMockUser()
      mockApiSuccess(mockApi.users.saveUser, { code: 500, data: "Error" })

      // Act & Assert
      await expect(service.createUser(newUser)).rejects.toThrow()
    })
  })

  describe("updateUser", () => {
    it("應該成功更新使用者", async () => {
      // Arrange
      const existingUser = createMockUser({ id: "user-1", name: "舊名稱" })
      service.data.user = [existingUser]

      const updatedUser = { ...existingUser, name: "新名稱" }
      mockApiSuccess(mockApi.users.saveUser, "Success")

      // Act
      await service.updateUser(updatedUser)

      // Assert
      expect(mockApi.users.saveUser).toHaveBeenCalledWith(updatedUser)
      expect(service.data.user[0].name).toBe("新名稱")
    })

    it("當 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const user = createMockUser()
      mockApiError(mockApi.users.saveUser, "更新失敗")

      // Act & Assert
      await expect(service.updateUser(user)).rejects.toThrow()
    })
  })

  describe("saveUser", () => {
    it("應該成功儲存使用者並重新查詢", async () => {
      // Arrange
      const user = createMockUser()
      mockApiSuccess(mockApi.users.saveUser, "Success")
      mockApiSuccess(mockApi.users.searchUsers, createMockUserPageResult([user]))

      // Act
      await service.saveUser(user)

      // Assert
      expect(mockApi.users.saveUser).toHaveBeenCalledWith(user)
      expect(mockApi.users.searchUsers).toHaveBeenCalled()
    })

    it("當 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const user = createMockUser()
      mockApiError(mockApi.users.saveUser, "儲存失敗")

      // Act & Assert
      await expect(service.saveUser(user)).rejects.toThrow()
    })
  })

  describe("deleteUser", () => {
    it("應該拋出錯誤（功能已停用）", async () => {
      // Arrange
      const user = createMockUser()

      // Act & Assert
      await expect(service.deleteUser(user)).rejects.toThrow("此功能已停用")
    })
  })
})
