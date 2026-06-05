/**
 * 測試資料工廠
 * 用於生成測試所需的各種資料
 */

import type {
  UserVo,
  RoleOutVo,
  SkillVo,
  SkillLevelVo,
  ProjectVo,
  FunctionVo,
  CurrentUserSkillVo,
  PageResultUserVo,
  PageResultRoleOutVo,
  PageResultSkillVo,
  PageResultProjectVo,
  PageResultCurrentUserSkillVo
} from "@/api/generated/Api"

/** 生成測試用的使用者資料 */
export function createMockUser(override: Partial<UserVo> = {}): UserVo {
  return {
    id: `user-${Math.random().toString(36).substr(2, 9)}`,
    name: "測試使用者",
    email: "test@example.com",
    password: "password123",
    phone: "0912345678",
    disabled: false,
    createdBy: "admin",
    updatedBy: "admin",
    createdTime: new Date().toISOString(),
    updatedTime: new Date().toISOString(),
    roleArr: [],
    permissions: [],
    ...override
  }
}

/** 生成測試用的角色資料 */
export function createMockRole(override: Partial<RoleOutVo> = {}): RoleOutVo {
  return {
    id: `role-${Math.random().toString(36).substr(2, 9)}`,
    name: "測試角色",
    description: "這是一個測試角色",
    createdBy: "admin",
    updatedBy: "admin",
    createdTime: new Date().toISOString(),
    updatedTime: new Date().toISOString(),
    functionIds: [],
    ...override
  }
}

/** 生成測試用的技能資料 */
export function createMockSkill(override: Partial<SkillVo> = {}): SkillVo {
  return {
    id: `skill-${Math.random().toString(36).substr(2, 9)}`,
    name: "測試技能",
    description: "這是一個測試技能",
    createdBy: "admin",
    updatedBy: "admin",
    createdTime: new Date().toISOString(),
    updatedTime: new Date().toISOString(),
    userIds: [],
    ...override
  }
}

/** 生成測試用的技能等級資料 */
export function createMockSkillLevel(override: Partial<SkillLevelVo> = {}): SkillLevelVo {
  return {
    id: `level-${Math.random().toString(36).substr(2, 9)}`,
    skillId: `skill-${Math.random().toString(36).substr(2, 9)}`,
    levelValue: 1,
    title: "初級",
    description: "初級技能等級",
    createdBy: "admin",
    updatedBy: "admin",
    createdTime: new Date().toISOString(),
    updatedTime: new Date().toISOString(),
    ...override
  }
}

/** 生成測試用的專案資料 */
export function createMockProject(override: Partial<ProjectVo> = {}): ProjectVo {
  return {
    id: `project-${Math.random().toString(36).substr(2, 9)}`,
    name: "測試專案",
    description: "這是一個測試專案",
    createdBy: "admin",
    updatedBy: "admin",
    createdTime: new Date().toISOString(),
    updatedTime: new Date().toISOString(),
    userIds: [],
    ...override
  }
}

/** 生成測試用的功能資料 */
export function createMockFunction(override: Partial<FunctionVo> = {}): FunctionVo {
  return {
    id: `func-${Math.random().toString(36).substr(2, 9)}`,
    name: "測試功能",
    parent: "",
    sort: "001",
    type: 1,
    disabled: false,
    edit: false,
    newAdd: false,
    delete: false,
    ...override
  }
}

/** 生成測試用的當前使用者技能資料 */
export function createMockCurrentUserSkill(
  override: Partial<CurrentUserSkillVo> = {}
): CurrentUserSkillVo {
  return {
    id: `skill-${Math.random().toString(36).substr(2, 9)}`,
    name: "測試技能",
    description: "這是一個測試技能",
    createdBy: "user",
    updatedBy: "user",
    createdTime: new Date().toISOString(),
    updatedTime: new Date().toISOString(),
    sourceType: "USER",
    ...override
  }
}

/** 生成測試用的使用者分頁結果 */
export function createMockUserPageResult(
  content: UserVo[] = [],
  override: Partial<PageResultUserVo> = {}
): PageResultUserVo {
  return {
    content,
    totalElements: content.length,
    totalPages: Math.ceil(content.length / 20),
    currentPage: 0,
    pageSize: 20,
    hasNext: false,
    hasPrevious: false,
    isFirst: true,
    isLast: true,
    ...override
  }
}

/** 生成測試用的角色分頁結果 */
export function createMockRolePageResult(
  content: RoleOutVo[] = [],
  override: Partial<PageResultRoleOutVo> = {}
): PageResultRoleOutVo {
  return {
    content,
    totalElements: content.length,
    totalPages: Math.ceil(content.length / 20),
    currentPage: 0,
    pageSize: 20,
    hasNext: false,
    hasPrevious: false,
    isFirst: true,
    isLast: true,
    ...override
  }
}

/** 生成測試用的技能分頁結果 */
export function createMockSkillPageResult(
  content: SkillVo[] = [],
  override: Partial<PageResultSkillVo> = {}
): PageResultSkillVo {
  return {
    content,
    totalElements: content.length,
    totalPages: Math.ceil(content.length / 20),
    currentPage: 0,
    pageSize: 20,
    hasNext: false,
    hasPrevious: false,
    isFirst: true,
    isLast: true,
    ...override
  }
}

/** 生成測試用的專案分頁結果 */
export function createMockProjectPageResult(
  content: ProjectVo[] = [],
  override: Partial<PageResultProjectVo> = {}
): PageResultProjectVo {
  return {
    content,
    totalElements: content.length,
    totalPages: Math.ceil(content.length / 20),
    currentPage: 0,
    pageSize: 20,
    hasNext: false,
    hasPrevious: false,
    isFirst: true,
    isLast: true,
    ...override
  }
}

/** 生成測試用的當前使用者技能分頁結果 */
export function createMockCurrentUserSkillPageResult(
  content: CurrentUserSkillVo[] = [],
  override: Partial<PageResultCurrentUserSkillVo> = {}
): PageResultCurrentUserSkillVo {
  return {
    content,
    totalElements: content.length,
    totalPages: Math.ceil(content.length / 20),
    currentPage: 0,
    pageSize: 20,
    hasNext: false,
    hasPrevious: false,
    isFirst: true,
    isLast: true,
    ...override
  }
}

/** 生成批量測試使用者 */
export function createMockUsers(count: number): UserVo[] {
  return Array.from({ length: count }, (_, i) =>
    createMockUser({
      name: `使用者 ${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: `091234567${i}`
    })
  )
}

/** 生成批量測試角色 */
export function createMockRoles(count: number): RoleOutVo[] {
  return Array.from({ length: count }, (_, i) =>
    createMockRole({
      name: `角色 ${i + 1}`,
      description: `測試角色 ${i + 1} 描述`
    })
  )
}

/** 生成批量測試技能 */
export function createMockSkills(count: number): SkillVo[] {
  return Array.from({ length: count }, (_, i) =>
    createMockSkill({
      name: `技能 ${i + 1}`,
      description: `測試技能 ${i + 1} 描述`
    })
  )
}

/** 生成批量測試專案 */
export function createMockProjects(count: number): ProjectVo[] {
  return Array.from({ length: count }, (_, i) =>
    createMockProject({
      name: `專案 ${i + 1}`,
      description: `測試專案 ${i + 1} 描述`
    })
  )
}

/** 生成批量測試技能等級 */
export function createMockSkillLevels(count: number): SkillLevelVo[] {
  return Array.from({ length: count }, (_, i) =>
    createMockSkillLevel({
      levelValue: i + 1,
      title: `等級 ${i + 1}`,
      description: `測試技能等級 ${i + 1} 描述`
    })
  )
}

/** 生成批量測試當前使用者技能 */
export function createMockCurrentUserSkills(count: number): CurrentUserSkillVo[] {
  return Array.from({ length: count }, (_, i) =>
    createMockCurrentUserSkill({
      name: `技能 ${i + 1}`,
      description: `測試技能 ${i + 1} 描述`
    })
  )
}
