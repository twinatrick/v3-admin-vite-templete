/**
 * 專案管理服務單元測試
 * 測試 src/views/system-management/project/service.ts
 */

import { describe, it, expect, beforeEach, vi } from "vitest"
import {
  createMockProject,
  createMockProjects,
  createMockProjectPageResult,
  createMockSkills,
  createMockSkillPageResult,
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

describe("專案管理服務測試", () => {
  beforeEach(async () => {
    // 重置所有 mocks
    vi.clearAllMocks()

    // 重新導入 service
    const module = await import("@/views/system-management/project/service")
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
      description: "",
      createdBy: ""
    }
    service.data.allSkills = []
  })

  describe("queryProject", () => {
    it("應該成功查詢專案（基本分頁）", async () => {
      // Arrange
      const mockProjects = createMockProjects(5)
      const pageResult = createMockProjectPageResult(mockProjects, {
        totalElements: 5,
        currentPage: 0,
        pageSize: 20
      })
      mockApiSuccess(mockApi.projects.searchProjects, pageResult)

      // Act
      await service.queryProject()

      // Assert
      expect(mockApi.projects.searchProjects).toHaveBeenCalledWith({
        page: 0,
        size: 20,
        sortBy: "createdTime",
        sortDir: "desc",
        name: "",
        description: "",
        createdBy: ""
      })
      expect(service.data.projects).toEqual(mockProjects)
      expect(service.data.totalElements).toBe(5)
    })

    it("應該支援按名稱過濾", async () => {
      // Arrange
      const mockProjects = [createMockProject({ name: "電商平台" })]
      const pageResult = createMockProjectPageResult(mockProjects)
      mockApiSuccess(mockApi.projects.searchProjects, pageResult)

      // Act
      await service.queryProject({ name: "電商平台" })

      // Assert
      expect(mockApi.projects.searchProjects).toHaveBeenCalledWith(
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
      mockApiSuccess(mockApi.projects.searchProjects, pageResult)

      // Act
      await service.queryProject({ description: "線上商城系統" })

      // Assert
      expect(mockApi.projects.searchProjects).toHaveBeenCalledWith(
        expect.objectContaining({
          description: "線上商城系統"
        })
      )
      expect(service.data.filters.description).toBe("線上商城系統")
    })

    it("應該支援按創建者過濾", async () => {
      // Arrange
      const mockProjects = [createMockProject({ createdBy: "admin" })]
      const pageResult = createMockProjectPageResult(mockProjects)
      mockApiSuccess(mockApi.projects.searchProjects, pageResult)

      // Act
      await service.queryProject({ createdBy: "admin" })

      // Assert
      expect(mockApi.projects.searchProjects).toHaveBeenCalledWith(
        expect.objectContaining({
          createdBy: "admin"
        })
      )
      expect(service.data.filters.createdBy).toBe("admin")
    })

    it("應該支援分頁參數", async () => {
      // Arrange
      const mockProjects = createMockProjects(10)
      const pageResult = createMockProjectPageResult(mockProjects, {
        currentPage: 2,
        pageSize: 10
      })
      mockApiSuccess(mockApi.projects.searchProjects, pageResult)

      // Act
      await service.queryProject({ page: 2, size: 10 })

      // Assert
      expect(mockApi.projects.searchProjects).toHaveBeenCalledWith(
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
      mockApiSuccess(mockApi.projects.searchProjects, pageResult)

      // Act
      await service.queryProject({ sortBy: "name", sortDir: "asc" })

      // Assert
      expect(mockApi.projects.searchProjects).toHaveBeenCalledWith(
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
      mockApiSuccess(mockApi.projects.searchProjects, {})

      // Act
      await service.queryProject()

      // Assert
      expect(service.data.projects).toEqual([])
      expect(service.data.totalElements).toBe(0)
    })
  })

  describe("saveProject", () => {
    it("應該成功創建新專案", async () => {
      // Arrange
      const newProject = createMockProject({ name: "新專案", id: undefined })
      const createdProject = createMockProject({ name: "新專案", id: "project-new" })
      mockApiSuccess(mockApi.projects.addProject, createdProject)
      mockApiSuccess(mockApi.projects.searchProjects, createMockProjectPageResult([createdProject]))

      // Act
      const result = await service.saveProject(newProject)

      // Assert
      expect(mockApi.projects.addProject).toHaveBeenCalledWith(newProject)
      expect(mockApi.projects.searchProjects).toHaveBeenCalled()
      expect(result).toEqual(createdProject)
    })

    it("應該成功更新現有專案", async () => {
      // Arrange
      const existingProject = createMockProject({ id: "project-1", name: "舊名稱" })
      const updatedProject = { ...existingProject, name: "新名稱" }
      mockApiSuccess(mockApi.projects.updateProject, updatedProject)
      mockApiSuccess(mockApi.projects.searchProjects, createMockProjectPageResult([updatedProject]))

      // Act
      const result = await service.saveProject(updatedProject)

      // Assert
      expect(mockApi.projects.updateProject).toHaveBeenCalledWith(updatedProject)
      expect(mockApi.projects.searchProjects).toHaveBeenCalled()
      expect(result).toEqual(updatedProject)
    })

    it("當創建 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const newProject = createMockProject({ id: undefined })
      mockApi.projects.addProject.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.saveProject(newProject)).rejects.toThrow("創建項目失敗")
    })

    it("當更新 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const project = createMockProject()
      mockApi.projects.updateProject.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.saveProject(project)).rejects.toThrow("更新項目失敗")
    })
  })

  describe("deleteProject", () => {
    it("應該成功刪除專案", async () => {
      // Arrange
      const project = createMockProject()
      mockApiSuccess(mockApi.projects.deleteProject, "Success")
      mockApiSuccess(mockApi.projects.searchProjects, createMockProjectPageResult([]))

      // Act
      await service.deleteProject(project)

      // Assert
      expect(mockApi.projects.deleteProject).toHaveBeenCalledWith(project)
      expect(mockApi.projects.searchProjects).toHaveBeenCalled()
    })

    it("當 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const project = createMockProject()
      mockApi.projects.deleteProject.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.deleteProject(project)).rejects.toThrow("刪除項目失敗")
    })
  })

  describe("getAllSkills", () => {
    it("應該成功取得所有技能列表", async () => {
      // Arrange
      const mockSkills = createMockSkills(5)
      const pageResult = createMockSkillPageResult(mockSkills, {
        totalElements: 5,
        currentPage: 0,
        pageSize: 1000
      })
      mockApiSuccess(mockApi.skills.searchSkills, pageResult)

      // Act
      const result = await service.getAllSkills()

      // Assert
      expect(mockApi.skills.searchSkills).toHaveBeenCalledWith({
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
      mockApiSuccess(mockApi.skills.searchSkills, {})

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

  describe("bindSkillToProject", () => {
    it("應該成功綁定技能到專案", async () => {
      // Arrange
      const projectId = "project-1"
      const skillId = "skill-1"
      const skillLevelId = "level-1"
      mockApiSuccess(mockApi.projects.getProjectSkills, [])
      mockApiSuccess(mockApi.adminBindings.rebindProjectSkills, "Success")

      // Act
      await service.bindSkillToProject(projectId, skillId, skillLevelId)

      // Assert
      expect(mockApi.projects.getProjectSkills).toHaveBeenCalledWith(projectId)
      expect(mockApi.adminBindings.rebindProjectSkills).toHaveBeenCalledWith({
        projectId,
        bindings: [
          {
            skillId,
            skillLevelId
          }
        ]
      })
    })

    it("當 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const projectId = "project-1"
      const skillId = "skill-1"
      const skillLevelId = "level-1"
      mockApiSuccess(mockApi.projects.getProjectSkills, [])
      mockApi.adminBindings.rebindProjectSkills.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.bindSkillToProject(projectId, skillId, skillLevelId)).rejects.toThrow("綁定技能失敗")
    })
  })

  describe("getProjectSkills", () => {
    it("應該成功取得專案技能綁定", async () => {
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
      mockApiSuccess(mockApi.projects.getProjectSkills, projectSkills)

      // Act
      const result = await service.getProjectSkills(projectId)

      // Assert
      expect(mockApi.projects.getProjectSkills).toHaveBeenCalledWith(projectId)
      expect(result).toEqual(projectSkills)
    })
  })

  describe("rebindProjectSkills", () => {
    it("應該成功重綁專案技能", async () => {
      // Arrange
      const projectId = "project-1"
      const bindings = [
        {
          skillId: "skill-1",
          skillLevelId: "level-1"
        }
      ]
      mockApiSuccess(mockApi.adminBindings.rebindProjectSkills, "Success")

      // Act
      await service.rebindProjectSkills(projectId, bindings)

      // Assert
      expect(mockApi.adminBindings.rebindProjectSkills).toHaveBeenCalledWith({
        projectId,
        bindings
      })
    })

    it("當 API 返回錯誤時應該拋出異常", async () => {
      // Arrange
      const projectId = "project-1"
      const bindings = [
        {
          skillId: "skill-1",
          skillLevelId: "level-1"
        }
      ]
      mockApi.adminBindings.rebindProjectSkills.mockResolvedValue({ code: 500, data: null })

      // Act & Assert
      await expect(service.rebindProjectSkills(projectId, bindings)).rejects.toThrow("更新專案技能綁定失敗")
    })
  })
})
