import { FormRules } from "element-plus"

// 用戶新增驗證規則
export const userCreateRules: FormRules = {
  email: {
    required: true,
    message: "Please input email"
  },
  roles: {
    required: true,
    message: "Please select role",
    validator(_r, value: string[]) {
      return value.length > 0
    }
  },
  name: {
    required: true,
    message: "Please input name",
    trigger: "blur"
  },
  password: {
    required: true,
    message: "Please input password",
    trigger: "blur"
  },
  disabled: {
    required: true,
    message: "Please select status",
    trigger: "change"
  }
}

// 用戶編輯驗證規則 (密碼為可選)
export const userEditRules: FormRules = {
  email: {
    required: true,
    message: "Please input email"
  },
  roles: {
    required: true,
    message: "Please select role",
    validator(_r, value: string[]) {
      return value.length > 0
    }
  },
  name: {
    required: true,
    message: "Please input name",
    trigger: "blur"
  },
  disabled: {
    required: true,
    message: "Please select status",
    trigger: "change"
  }
}
