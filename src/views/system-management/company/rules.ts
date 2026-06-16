import { FormRules } from "element-plus"

export const companyCreateRules: FormRules = {
  name: {
    required: true,
    message: "Please input company name",
    trigger: "blur"
  }
}

export const companyEditRules: FormRules = {
  name: {
    required: true,
    message: "Please input company name",
    trigger: "blur"
  }
}
