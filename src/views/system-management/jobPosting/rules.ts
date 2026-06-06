export const rules = {
  companyId: [{ required: true, message: "請選擇公司", trigger: "change" }],
  title: [{ required: true, message: "職缺名稱為必填", trigger: "blur" }],
  url: [{ required: true, message: "網址為必填", trigger: "blur" }]
}
