# 缺少 API

## 取得專案成員技能等級

目前前端可使用 `api.adminBindings.rebindProjectMemberSkills` 寫入專案成員技能等級，但缺少乾淨的讀取 API 可在編輯專案時回填既有資料。

現有 Swagger 可見 HATEOAS API：

- `/userProjectSkills/search/findByProjectId`
- `/userProjectSkills/search/findByUserIdAndProjectId`
- `/userProjects/search/findByUserId`

但生成型別 `EntityModelUserProjectSkill` 沒有直接暴露：

- `userId`
- `projectId`
- `skillId`
- `skillLevelId`

建議後端補一個 VO API：

```http
GET /project/{projectId}/member-skills
```

建議回傳：

```ts
{
  userId: string
  userEmail: string
  skills: {
    skillId: string
    skillName: string
    skillLevelId: string
    levelTitle: string
    levelValue: number
  }
  ;[]
}
;[]
```
