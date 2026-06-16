import { FormRules } from "element-plus"

export const userJobLinkCreateRules: FormRules = {
  userId: {
    required: true,
    message: "Please select a user",
    trigger: "change"
  },
  jobPostingId: {
    required: true,
    message: "Please select a job posting",
    trigger: "change"
  }
}
