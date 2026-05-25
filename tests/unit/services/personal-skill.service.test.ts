/**
 * 個人技能管理服務單元測試
 * 測試 src/views/personal-management/skill/service.ts
 */

import { describe, it, expect, beforeEach, vi } from "vitest"
import {
  createMockCurrentUserSkill,
  createMockCurrentUserSkills,
  createMockCurrentUserSkillPageResult,
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

describe("個人技能管理服務測試", () => {
  beforeEach(async () => {
    // 重置所有 mocks
    vi.clearAllMocks()

    // 重新導入 service
    const module = await import("@/views/personal-management/skill/service")
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
      description: ""
    }
  })

  describe("querySkill", () => {
    it("應該成功查詢個人技能（基本分頁）", async () => {
      // Arrange
      const mockSkills = createMockCurrentUserSkills(5)
      const pageResult = createMockCurrentUserSkillPageResult(mockSkills, {
        totalElements: 5,
        currentPage: 0,
        pageSize: 20
      })
      mockApiSuccess(mockApi.skills.searchCurrentUserSkills, pageResult)

      // Act
      await service.querySkill()

      // Assert
      expect(mockApi.skills.searchCurrentUserSkills).toHaveBeenCalledWith({
        page: 0,
        size: 20,
        sortBy: "createdTime",
        sortDir: "desc",
        name: "",
        description: ""
      })
      expect(service.data.skills).toEqual(mockSkills)
      expect(service.data.totalElements).toBe(5)
    })

    it("應該支援按名稱過濾", async () => {
      // Arrange
      const mockSkills = [createMockCurrentUserSkill({ name: "Vue.js" })]
      const pageResult = createMockCurrentUserSkillPageResult(mockSkills)
      mockApiSuccess(mockApi.skills.searchCurrentUserSkills, pageResult)

      // Act
      await service.querySkill({ name: "Vue.js" })

      // Assert
      expect(mockApi.skills.searchCurrentUserSkills).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Vue.js"
        })
      )
      expect(service.data.filters.name).toBe("Vue.js")
    })

    it("應該支援按描述過濾", async () => {
      // Arrange
      const mockSkills = [createMockCurrentUserSkill({ description: "前端框架" })]
      const pageResult = createMockCurrentUserSkillPageResult(mockSkills)
      mockApiSuccess(mockApi.skills.searchCurrentUserSkills, pageResult)

      // Act
      await service.querySkill({ description: "前端框架" })

      // Assert
      expect(mockApi.skills.searchCurrentUserSkills).toHaveBeenCalledWith(
        expect.objectContaining({
          description: "前端框架"
        })
      )
      expect(service.data.filters.description).toBe("前端框架")
    })

    it("應該支援分頁參數", async () => {
      // Arrange
      const mockSkills = createMockCurrentUserSkills(10)
      const pageResult = createMockCurrentUserSkillPageResult(mockSkills, {
        currentPage: 2,
        pageSize: 10
      })
      mockApiSuccess(mockApi.skills.searchCurrentUserSkills, pageResult)

      // Act
      await service.querySkill({ page: 2, size: 10 })

      // Assert
      expect(mockApi.skills.searchCurrentUserSkills).toHaveBeenCalledWith(
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
      const mockSkills = createMockCurrentUserSkills(5)
      const pageResult = createMockCurrentUserSkillPageResult(mockSkills)
      mockApiSuccess(mockApi.skills.searchCurrentUserSkills, pageResult)

      // Act
      await service.querySkill({ sortBy: "name", sortDir: "asc" })

      // Assert
      expect(mockApi.skills.searchCurrentUserSkills).toHaveBeenCalledWith(
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
      mockApiSuccess(mockApi.skills.searchCurrentUserSkills, {})

      // Act
      await service.querySkill()

      // Assert
      expect(service.data.skills).toEqual([])
      expect(service.data.totalElements).toBe(0)
    })
  })

  describe("saveSkill", () => {
    it("應該成功創建新個人技能", async () => {
      // Arrange
      const newSkill = createMockCurrentUserSkill({ name: "新技能", id: undefined })
      const level = createMockSkillLevel({ id: "level-1" })
      const createdSkill = createMockCurrentUserSkill({ name: "新技能", id: "skill-new" })
      mockApiSuccess(mockApi.skills.addPersonalSkill, createdSkill)
      mockApiSuccess(mockApi.skills.searchCurrentUserSkills, createMockCurrentUserSkillPageResult([createdSkill]))

      // Act
      const result = await service.saveSkill(newSkill, level)

      // Assert
      expect(mockApi.skills.addPersonalSkill).toHaveBeenCalledWith({
        name: newSkill.name,
        description: newSkill.description,
        skillLevelId: level.id,
        skillLevelValue: level.levelValue,
        skillLevelTitle: level.title,
        skillLevelDescription: level.description
      })
      expect(mockApi.skills.searchCurrentUserSkills).toHaveBeenCalled()
      expect(result).toEqual(createdSkill)
    })

    it("應該成功更新現有個人技能", async () => {
      // Arrange
      const existingSkill = createMockCurrentUserSkill({ id: "skill-1", name: "舊名稱" })
      const updatedSkill = { ...existingSkill, name: "新名稱" }
      const level = createMockSkillLevel({ id: "level-1" })
      mockApiSuccess(mockApi.skills.updatePersonalSkill, "Success")
      mockApiSuccess(
        mockApi.skills.searchCurrentUserSkills,
        createMockCurrentUserSkillPageResult([updatedSkill as any])
      )

      // Act
      const result = await service.saveSkill(updatedSkill, level)

      // Assert
      expect(mockApi.skills.updatePersonalSkill).toHaveBeenCalledWith(
        { skillId: updatedSkill.id },
        {
          name: updatedSkill.name,
          description: updatedSkill.description,
          skillLevelId: level.id,
          skillLevelValue: level.levelValue,
          skillLevelTitle: level.title,
          skillLevelDescription: level.description
        }
      )
      expect(mockApi.skills.searchCurrentUserSkills).toHaveBeenCalled()
      expect(result).toBeDefined()
    })

    it("當創建 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const newSkill = createMockCurrentUserSkill({ id: undefined })
      mockApi.skills.addPersonalSkill.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.saveSkill(newSkill)).rejects.toThrow("創建技能失敗")
    })

    it("當更新 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const skill = createMockCurrentUserSkill()
      mockApi.skills.updatePersonalSkill.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.saveSkill(skill)).rejects.toThrow("更新技能失敗")
    })
  })

  describe("deleteSkill", () => {
    it("應該成功刪除個人技能", async () => {
      // Arrange
      const skill = createMockCurrentUserSkill({ id: "skill-1" })
      mockApiSuccess(mockApi.skills.deletePersonalSkill, "Success")
      mockApiSuccess(mockApi.skills.searchCurrentUserSkills, createMockCurrentUserSkillPageResult([]))

      // Act
      await service.deleteSkill(skill)

      // Assert
      expect(mockApi.skills.deletePersonalSkill).toHaveBeenCalledWith({ skillId: skill.id })
      expect(mockApi.skills.searchCurrentUserSkills).toHaveBeenCalled()
    })

    it("當沒有提供技能 ID 時應該拋出異常", async () => {
      // Arrange
      const skill = createMockCurrentUserSkill({ id: undefined })

      // Act & Assert
      await expect(service.deleteSkill(skill)).rejects.toThrow("Skill ID is required")
    })

    it("當 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const skill = createMockCurrentUserSkill({ id: "skill-1" })
      mockApi.skills.deletePersonalSkill.mockResolvedValue({ code: 500, data: null })

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
})
