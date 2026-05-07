import { FormRules } from "element-plus"

// 角色新增驗證規則
export const roleCreateRules: FormRules = {
  name: {
    required: true,
    message: "請輸入角色名稱",
    trigger: "blur"
  }
}

// 角色編輯驗證規則
export const roleEditRules: FormRules = {
  name: {
    required: true,
    message: "請輸入角色名稱",
    trigger: "blur"
  }
}
