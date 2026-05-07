import { FormRules } from "element-plus"

// 技能新增驗證規則
export const skillCreateRules: FormRules = {
  name: {
    required: true,
    message: "請輸入技能名稱",
    trigger: "blur"
  }
}

// 技能編輯驗證規則
export const skillEditRules: FormRules = {
  name: {
    required: true,
    message: "請輸入技能名稱",
    trigger: "blur"
  }
}

// 技能等級新增驗證規則
export const skillLevelCreateRules: FormRules = {
  levelValue: [
    { required: true, message: "請輸入等級值", trigger: "blur" },
    { type: "number", message: "等級值必須是數字", trigger: "blur" }
  ],
  title: {
    required: true,
    message: "請輸入等級標題",
    trigger: "blur"
  }
}

// 技能等級編輯驗證規則
export const skillLevelEditRules: FormRules = {
  levelValue: [
    { required: true, message: "請輸入等級值", trigger: "blur" },
    { type: "number", message: "等級值必須是數字", trigger: "blur" }
  ],
  title: {
    required: true,
    message: "請輸入等級標題",
    trigger: "blur"
  }
}
