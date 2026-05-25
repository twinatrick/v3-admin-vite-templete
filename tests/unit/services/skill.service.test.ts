/**
 * 技能管理服務單元測試
 * 測試 src/views/system-management/skill/service.ts
 */

import { describe, it, expect, beforeEach, vi } from "vitest"
import {
  createMockSkill,
  createMockSkills,
  createMockSkillPageResult,
  createMockSkillLevel,
  createMockSkillLevels
} from "../../helpers/test-data"
import { createMockApiClient, mockApiSuccess } from "../../helpers/mock-api"

// Mock API client
const mockApi = createMockApiClient()

// Mock the API module
vi.mock("@/api/client", () => ({
  api: mockApi
}))

// 動態導入 service（在 mock 之後）
let service: any

describe("技能管理服務測試", () => {
  beforeEach(async () => {
    // 重置所有 mocks
    vi.clearAllMocks()

    // 重新導入 service
    const module = await import("@/views/system-management/skill/service")
    service = module.default

    // 重置 service data
    service.data.skills = []
    service.data.page = 0
    service.data.size = 20
    service.data.totalElements = 0
    service.data.sortBy = "createdTime"
    service.data.sortDir = "desc"
    service.data.filters = {
      name: "",
      description: "",
      createdBy: ""
    }
  })

  describe("querySkill", () => {
    it("應該成功查詢技能（基本分頁）", async () => {
      // Arrange
      const mockSkills = createMockSkills(5)
      const pageResult = createMockSkillPageResult(mockSkills, {
        totalElements: 5,
        currentPage: 0,
        pageSize: 20
      })
      mockApiSuccess(mockApi.skills.searchSkills, pageResult)

      // Act
      await service.querySkill()

      // Assert
      expect(mockApi.skills.searchSkills).toHaveBeenCalledWith({
        page: 0,
        size: 20,
        sortBy: "createdTime",
        sortDir: "desc",
        name: "",
        description: "",
        createdBy: ""
      })
      expect(service.data.skills).toEqual(mockSkills)
      expect(service.data.totalElements).toBe(5)
    })

    it("應該支援按名稱過濾", async () => {
      // Arrange
      const mockSkills = [createMockSkill({ name: "Vue.js" })]
      const pageResult = createMockSkillPageResult(mockSkills)
      mockApiSuccess(mockApi.skills.searchSkills, pageResult)

      // Act
      await service.querySkill({ name: "Vue.js" })

      // Assert
      expect(mockApi.skills.searchSkills).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Vue.js"
        })
      )
      expect(service.data.filters.name).toBe("Vue.js")
    })

    it("應該支援按描述過濾", async () => {
      // Arrange
      const mockSkills = [createMockSkill({ description: "前端框架" })]
      const pageResult = createMockSkillPageResult(mockSkills)
      mockApiSuccess(mockApi.skills.searchSkills, pageResult)

      // Act
      await service.querySkill({ description: "前端框架" })

      // Assert
      expect(mockApi.skills.searchSkills).toHaveBeenCalledWith(
        expect.objectContaining({
          description: "前端框架"
        })
      )
      expect(service.data.filters.description).toBe("前端框架")
    })

    it("應該支援按創建者過濾", async () => {
      // Arrange
      const mockSkills = [createMockSkill({ createdBy: "admin" })]
      const pageResult = createMockSkillPageResult(mockSkills)
      mockApiSuccess(mockApi.skills.searchSkills, pageResult)

      // Act
      await service.querySkill({ createdBy: "admin" })

      // Assert
      expect(mockApi.skills.searchSkills).toHaveBeenCalledWith(
        expect.objectContaining({
          createdBy: "admin"
        })
      )
      expect(service.data.filters.createdBy).toBe("admin")
    })

    it("應該支援分頁參數", async () => {
      // Arrange
      const mockSkills = createMockSkills(10)
      const pageResult = createMockSkillPageResult(mockSkills, {
        currentPage: 2,
        pageSize: 10
      })
      mockApiSuccess(mockApi.skills.searchSkills, pageResult)

      // Act
      await service.querySkill({ page: 2, size: 10 })

      // Assert
      expect(mockApi.skills.searchSkills).toHaveBeenCalledWith(
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
      const mockSkills = createMockSkills(5)
      const pageResult = createMockSkillPageResult(mockSkills)
      mockApiSuccess(mockApi.skills.searchSkills, pageResult)

      // Act
      await service.querySkill({ sortBy: "name", sortDir: "asc" })

      // Assert
      expect(mockApi.skills.searchSkills).toHaveBeenCalledWith(
        expect.objectContaining({
          sortBy: "name",
          sortDir: "asc"
        })
      )
      expect(service.data.sortBy).toBe("name")
      expect(service.data.sortDir).toBe("asc")
    })

    it("當 API 返回空資料時應該正確處理", async () => {
      // Arrange
      mockApiSuccess(mockApi.skills.searchSkills, {})

      // Act
      await service.querySkill()

      // Assert
      expect(service.data.skills).toEqual([])
      expect(service.data.totalElements).toBe(0)
    })
  })

  describe("saveSkill", () => {
    it("應該成功創建新技能", async () => {
      // Arrange
      const newSkill = createMockSkill({ name: "新技能", id: undefined })
      const createdSkill = createMockSkill({ name: "新技能", id: "skill-new" })
      mockApiSuccess(mockApi.skills.addSkill, createdSkill)
      mockApiSuccess(mockApi.skills.searchSkills, createMockSkillPageResult([createdSkill]))

      // Act
      const result = await service.saveSkill(newSkill)

      // Assert
      expect(mockApi.skills.addSkill).toHaveBeenCalledWith(newSkill)
      expect(mockApi.skills.searchSkills).toHaveBeenCalled()
      expect(result).toEqual(createdSkill)
    })

    it("應該成功更新現有技能", async () => {
      // Arrange
      const existingSkill = createMockSkill({ id: "skill-1", name: "舊名稱" })
      const updatedSkill = { ...existingSkill, name: "新名稱" }
      mockApiSuccess(mockApi.skills.updateSkill, updatedSkill)
      mockApiSuccess(mockApi.skills.searchSkills, createMockSkillPageResult([updatedSkill]))

      // Act
      const result = await service.saveSkill(updatedSkill)

      // Assert
      expect(mockApi.skills.updateSkill).toHaveBeenCalledWith(updatedSkill)
      expect(mockApi.skills.searchSkills).toHaveBeenCalled()
      expect(result).toEqual(updatedSkill)
    })

    it("當創建 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const newSkill = createMockSkill({ id: undefined })
      mockApi.skills.addSkill.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.saveSkill(newSkill)).rejects.toThrow("創建技能失敗")
    })

    it("當更新 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const skill = createMockSkill()
      mockApi.skills.updateSkill.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.saveSkill(skill)).rejects.toThrow("更新技能失敗")
    })
  })

  describe("deleteSkill", () => {
    it("應該成功刪除技能", async () => {
      // Arrange
      const skill = createMockSkill()
      mockApiSuccess(mockApi.skills.deleteSkill, "Success")
      mockApiSuccess(mockApi.skills.searchSkills, createMockSkillPageResult([]))

      // Act
      await service.deleteSkill(skill)

      // Assert
      expect(mockApi.skills.deleteSkill).toHaveBeenCalledWith(skill)
      expect(mockApi.skills.searchSkills).toHaveBeenCalled()
    })

    it("當 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const skill = createMockSkill()
      mockApi.skills.deleteSkill.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.deleteSkill(skill)).rejects.toThrow("刪除技能失敗")
    })
  })

  describe("getSkillLevels", () => {
    it("應該成功取得技能等級列表", async () => {
      // Arrange
      const skillId = "skill-1"
      const mockLevels = createMockSkillLevels(3)
      mockApiSuccess(mockApi.skills.getSkillLevels, mockLevels)

      // Act
      const result = await service.getSkillLevels(skillId)

      // Assert
      expect(mockApi.skills.getSkillLevels).toHaveBeenCalledWith(skillId)
      expect(result).toEqual(mockLevels)
    })

    it("當 API 返回 null 時應該返回空陣列", async () => {
      // Arrange
      const skillId = "skill-1"
      mockApiSuccess(mockApi.skills.getSkillLevels, null)

      // Act
      const result = await service.getSkillLevels(skillId)

      // Assert
      expect(result).toEqual([])
    })
  })

  describe("saveSkillLevel", () => {
    it("應該成功創建新技能等級", async () => {
      // Arrange
      const newLevel = createMockSkillLevel({ id: undefined, skillId: "skill-1" })
      mockApiSuccess(mockApi.skills.addSkillLevel, "Success")

      // Act
      await service.saveSkillLevel(newLevel)

      // Assert
      expect(mockApi.skills.addSkillLevel).toHaveBeenCalledWith(newLevel)
    })

    it("應該成功更新現有技能等級", async () => {
      // Arrange
      const level = createMockSkillLevel({ id: "level-1", skillId: "skill-1" })
      mockApiSuccess(mockApi.skills.updateSkillLevel, "Success")

      // Act
      await service.saveSkillLevel(level)

      // Assert
      expect(mockApi.skills.updateSkillLevel).toHaveBeenCalledWith(level)
    })

    it("當創建 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const newLevel = createMockSkillLevel({ id: undefined })
      mockApi.skills.addSkillLevel.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.saveSkillLevel(newLevel)).rejects.toThrow("創建技能等級失敗")
    })

    it("當更新 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const level = createMockSkillLevel()
      mockApi.skills.updateSkillLevel.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.saveSkillLevel(level)).rejects.toThrow("更新技能等級失敗")
    })
  })

  describe("deleteSkillLevel", () => {
    it("應該成功刪除技能等級", async () => {
      // Arrange
      const level = createMockSkillLevel()
      mockApiSuccess(mockApi.skills.deleteSkillLevel, "Success")

      // Act
      await service.deleteSkillLevel(level)

      // Assert
      expect(mockApi.skills.deleteSkillLevel).toHaveBeenCalledWith(level)
    })

    it("當 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const level = createMockSkillLevel()
      mockApi.skills.deleteSkillLevel.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.deleteSkillLevel(level)).rejects.toThrow("刪除技能等級失敗")
    })
  })
})
