import { FormRules } from "element-plus"

// 項目新增驗證規則
export const projectCreateRules: FormRules = {
  name: {
    required: true,
    message: "請輸入項目名稱",
    trigger: "blur"
  }
}

// 項目編輯驗證規則
export const projectEditRules: FormRules = {
  name: {
    required: true,
    message: "請輸入項目名稱",
    trigger: "blur"
  }
}
