import { FormRules } from "element-plus"

export const jobPostingCreateRules: FormRules = {
  companyId: {
    required: true,
    message: "Please select a company",
    trigger: "change"
  },
  title: {
    required: true,
    message: "Please input job title",
    trigger: "blur"
  },
  url: {
    required: true,
    message: "Please input job url",
    trigger: "blur"
  }
}

export const jobPostingEditRules: FormRules = {
  companyId: {
    required: true,
    message: "Please select a company",
    trigger: "change"
  },
  title: {
    required: true,
    message: "Please input job title",
    trigger: "blur"
  },
  url: {
    required: true,
    message: "Please input job url",
    trigger: "blur"
  }
}
