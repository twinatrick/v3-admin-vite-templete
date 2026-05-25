/**
 * 個人專案管理服務單元測試
 * 測試 src/views/personal-management/project/service.ts
 */

import { describe, it, expect, beforeEach, vi } from "vitest"
import {
  createMockProject,
  createMockProjects,
  createMockProjectPageResult,
  createMockCurrentUserSkills,
  createMockCurrentUserSkillPageResult,
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

describe("個人專案管理服務測試", () => {
  beforeEach(async () => {
    // 重置所有 mocks
    vi.clearAllMocks()

    // 重新導入 service
    const module = await import("@/views/personal-management/project/service")
    service = module.default

    // 重置 service data
    service.data.projects = []
    service.data.page = 0
    service.data.size = 20
    service.data.totalElements = 0
    service.data.sortBy = "createdTime"
    service.data.sortDir = "desc"
    service.data.filters = {
      name: "",
      description: ""
    }
    service.data.allSkills = []
  })

  describe("queryProject", () => {
    it("應該成功查詢個人專案（基本分頁）", async () => {
      // Arrange
      const mockProjects = createMockProjects(5)
      const pageResult = createMockProjectPageResult(mockProjects, {
        totalElements: 5,
        currentPage: 0,
        pageSize: 20
      })
      mockApiSuccess(mockApi.projects.searchCurrentUserProjects, pageResult)

      // Act
      await service.queryProject()

      // Assert
      expect(mockApi.projects.searchCurrentUserProjects).toHaveBeenCalledWith({
        page: 0,
        size: 20,
        sortBy: "createdTime",
        sortDir: "desc",
        name: "",
        description: ""
      })
      expect(service.data.projects).toEqual(mockProjects)
      expect(service.data.totalElements).toBe(5)
    })

    it("應該支援按名稱過濾", async () => {
      // Arrange
      const mockProjects = [createMockProject({ name: "電商平台" })]
      const pageResult = createMockProjectPageResult(mockProjects)
      mockApiSuccess(mockApi.projects.searchCurrentUserProjects, pageResult)

      // Act
      await service.queryProject({ name: "電商平台" })

      // Assert
      expect(mockApi.projects.searchCurrentUserProjects).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "電商平台"
        })
      )
      expect(service.data.filters.name).toBe("電商平台")
    })

    it("應該支援按描述過濾", async () => {
      // Arrange
      const mockProjects = [createMockProject({ description: "線上商城系統" })]
      const pageResult = createMockProjectPageResult(mockProjects)
      mockApiSuccess(mockApi.projects.searchCurrentUserProjects, pageResult)

      // Act
      await service.queryProject({ description: "線上商城系統" })

      // Assert
      expect(mockApi.projects.searchCurrentUserProjects).toHaveBeenCalledWith(
        expect.objectContaining({
          description: "線上商城系統"
        })
      )
      expect(service.data.filters.description).toBe("線上商城系統")
    })

    it("應該支援分頁參數", async () => {
      // Arrange
      const mockProjects = createMockProjects(10)
      const pageResult = createMockProjectPageResult(mockProjects, {
        currentPage: 2,
        pageSize: 10
      })
      mockApiSuccess(mockApi.projects.searchCurrentUserProjects, pageResult)

      // Act
      await service.queryProject({ page: 2, size: 10 })

      // Assert
      expect(mockApi.projects.searchCurrentUserProjects).toHaveBeenCalledWith(
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
      const mockProjects = createMockProjects(5)
      const pageResult = createMockProjectPageResult(mockProjects)
      mockApiSuccess(mockApi.projects.searchCurrentUserProjects, pageResult)

      // Act
      await service.queryProject({ sortBy: "name", sortDir: "asc" })

      // Assert
      expect(mockApi.projects.searchCurrentUserProjects).toHaveBeenCalledWith(
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
      mockApiSuccess(mockApi.projects.searchCurrentUserProjects, {})

      // Act
      await service.queryProject()

      // Assert
      expect(service.data.projects).toEqual([])
      expect(service.data.totalElements).toBe(0)
    })
  })

  describe("saveProject", () => {
    it("應該成功創建新個人專案", async () => {
      // Arrange
      const newProject = createMockProject({ name: "新專案", id: undefined })
      const createdProject = createMockProject({ name: "新專案", id: "project-new" })
      mockApiSuccess(mockApi.projects.addPersonalProject, createdProject)
      mockApiSuccess(mockApi.projects.searchCurrentUserProjects, createMockProjectPageResult([createdProject]))

      // Act
      const result = await service.saveProject(newProject)

      // Assert
      expect(mockApi.projects.addPersonalProject).toHaveBeenCalledWith({
        name: newProject.name,
        description: newProject.description
      })
      expect(mockApi.projects.searchCurrentUserProjects).toHaveBeenCalled()
      expect(result).toEqual(createdProject)
    })

    it("應該成功更新現有個人專案", async () => {
      // Arrange
      const existingProject = createMockProject({ id: "project-1", name: "舊名稱" })
      const updatedProject = { ...existingProject, name: "新名稱" }
      mockApiSuccess(mockApi.projects.updatePersonalProject, "Success")
      mockApiSuccess(mockApi.projects.searchCurrentUserProjects, createMockProjectPageResult([updatedProject]))

      // Act
      const result = await service.saveProject(updatedProject)

      // Assert
      expect(mockApi.projects.updatePersonalProject).toHaveBeenCalledWith(updatedProject.id, {
        name: updatedProject.name,
        description: updatedProject.description
      })
      expect(mockApi.projects.searchCurrentUserProjects).toHaveBeenCalled()
      expect(result).toEqual(updatedProject)
    })

    it("當創建 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const newProject = createMockProject({ id: undefined })
      mockApi.projects.addPersonalProject.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.saveProject(newProject)).rejects.toThrow("創建項目失敗")
    })

    it("當更新 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const project = createMockProject()
      mockApi.projects.updatePersonalProject.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.saveProject(project)).rejects.toThrow("更新項目失敗")
    })
  })

  describe("deleteProject", () => {
    it("應該成功刪除個人專案", async () => {
      // Arrange
      const project = createMockProject({ id: "project-1" })
      mockApiSuccess(mockApi.projects.deletePersonalProject, "Success")
      mockApiSuccess(mockApi.projects.searchCurrentUserProjects, createMockProjectPageResult([]))

      // Act
      await service.deleteProject(project)

      // Assert
      expect(mockApi.projects.deletePersonalProject).toHaveBeenCalledWith(project.id)
      expect(mockApi.projects.searchCurrentUserProjects).toHaveBeenCalled()
    })

    it("當沒有提供專案 ID 時應該拋出異常", async () => {
      // Arrange
      const project = createMockProject({ id: undefined })

      // Act & Assert
      await expect(service.deleteProject(project)).rejects.toThrow("Project ID is required")
    })

    it("當 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const project = createMockProject({ id: "project-1" })
      mockApi.projects.deletePersonalProject.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.deleteProject(project)).rejects.toThrow("刪除項目失敗")
    })
  })

  describe("getAllSkills", () => {
    it("應該成功取得所有個人技能列表", async () => {
      // Arrange
      const mockSkills = createMockCurrentUserSkills(5)
      const pageResult = createMockCurrentUserSkillPageResult(mockSkills, {
        totalElements: 5,
        currentPage: 0,
        pageSize: 1000
      })
      mockApiSuccess(mockApi.skills.searchCurrentUserSkills, pageResult)

      // Act
      const result = await service.getAllSkills()

      // Assert
      expect(mockApi.skills.searchCurrentUserSkills).toHaveBeenCalledWith({
        page: 0,
        size: 1000,
        sortBy: "name",
        sortDir: "asc"
      })
      expect(result).toEqual(mockSkills)
      expect(service.data.allSkills).toEqual(mockSkills)
    })

    it("當 API 返回空資料時應該返回空陣列", async () => {
      // Arrange
      mockApiSuccess(mockApi.skills.searchCurrentUserSkills, {})

      // Act
      const result = await service.getAllSkills()

      // Assert
      expect(result).toEqual([])
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

  describe("getProjectSkills", () => {
    it("應該成功取得個人專案技能綁定", async () => {
      // Arrange
      const projectId = "project-1"
      const projectSkills = [
        {
          projectId,
          skillId: "skill-1",
          skillName: "Vue",
          skillLevelId: "level-1",
          levelTitle: "中級",
          levelValue: 2
        }
      ]
      mockApiSuccess(mockApi.projects.getPersonalProjectSkills, projectSkills)

      // Act
      const result = await service.getProjectSkills(projectId)

      // Assert
      expect(mockApi.projects.getPersonalProjectSkills).toHaveBeenCalledWith(projectId)
      expect(result).toEqual(projectSkills)
    })

    it("當 API 返回 null 時應該返回空陣列", async () => {
      // Arrange
      const projectId = "project-1"
      mockApiSuccess(mockApi.projects.getPersonalProjectSkills, null)

      // Act
      const result = await service.getProjectSkills(projectId)

      // Assert
      expect(result).toEqual([])
    })
  })

  describe("bindSkillToProject", () => {
    it("應該成功綁定技能到個人專案", async () => {
      // Arrange
      const projectId = "project-1"
      const skillId = "skill-1"
      const skillLevelId = "level-1"
      mockApiSuccess(mockApi.projects.bindPersonalProjectSkill, "Success")

      // Act
      await service.bindSkillToProject(projectId, skillId, skillLevelId)

      // Assert
      expect(mockApi.projects.bindPersonalProjectSkill).toHaveBeenCalledWith(projectId, {
        skillId,
        skillLevelId
      })
    })

    it("當 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const projectId = "project-1"
      const skillId = "skill-1"
      const skillLevelId = "level-1"
      mockApi.projects.bindPersonalProjectSkill.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.bindSkillToProject(projectId, skillId, skillLevelId)).rejects.toThrow("綁定技能失敗")
    })
  })

  describe("updateProjectSkillLevel", () => {
    it("應該成功更新專案技能等級", async () => {
      // Arrange
      const projectId = "project-1"
      const skillId = "skill-1"
      const skillLevelId = "level-2"
      mockApiSuccess(mockApi.projects.updatePersonalProjectSkillLevel, "Success")

      // Act
      await service.updateProjectSkillLevel(projectId, skillId, skillLevelId)

      // Assert
      expect(mockApi.projects.updatePersonalProjectSkillLevel).toHaveBeenCalledWith(projectId, skillId, {
        skillLevelId
      })
    })

    it("當 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const projectId = "project-1"
      const skillId = "skill-1"
      const skillLevelId = "level-2"
      mockApi.projects.updatePersonalProjectSkillLevel.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.updateProjectSkillLevel(projectId, skillId, skillLevelId)).rejects.toThrow(
        "更新技能等級失敗"
      )
    })
  })

  describe("unbindSkillFromProject", () => {
    it("應該成功解除專案技能綁定", async () => {
      // Arrange
      const projectId = "project-1"
      const skillId = "skill-1"
      mockApiSuccess(mockApi.projects.unbindPersonalProjectSkill, "Success")

      // Act
      await service.unbindSkillFromProject(projectId, skillId)

      // Assert
      expect(mockApi.projects.unbindPersonalProjectSkill).toHaveBeenCalledWith(projectId, skillId)
    })

    it("當 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const projectId = "project-1"
      const skillId = "skill-1"
      mockApi.projects.unbindPersonalProjectSkill.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.unbindSkillFromProject(projectId, skillId)).rejects.toThrow("解除綁定失敗")
    })
  })
})
