import { TableColumnMap } from "@/components/FilterTable/type"
const listToString = (cellValue: any) => {
  if (cellValue) {
    return cellValue.map((item: any) => item).join("\n")
  } else {
    return ""
  }
}
const columnMap: { [key: string]: Array<TableColumnMap> } = {
  user: [
    {
      name: "email",
      value: "E-mail",
      type: "string"
    },
    {
      name: "faily_name",
      value: "Family Name",
      type: "string"
    },
    {
      name: "given_name",
      value: "Given Name",
      type: "string"
    },
    {
      name: "roleList",
      value: "Role",
      type: "string",
      formatter: listToString
    },
    {
      name: "tagList",
      value: "Tag",
      type: "string",
      formatter: listToString
    },
    {
      name: "location",
      value: "Location",
      type: "select"
    }
  ]
}

export default columnMap
