import { request } from "@/utils/service"

export interface ListItem {
  key?: string
  sendTo?: string
  title?: string
  createTime?: Date
  content?: string
  carrier?: string
  onClick?: () => void
}

// export const notifyData: ListItem[] = [
//   {
//     avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
//     title: "Carrier 1.0 Dashboard",
//     datetime: "2023/12/18",
//     description: 'you can refer to "https://dashboards.corp.google.com/edit/_da7056e2_978b_4a4a_b7d8_d10204a38505"',
//     onClick: () => {
//       window.open("https://dashboards.corp.google.com/edit/_da7056e2_978b_4a4a_b7d8_d10204a38505")
//     }
//   }
//   ,
//   {
//     avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
//     title: "title 2",
//     datetime: "time 2",
//     description: "notify 2"
//   }
// ]

// enum Icon {
//   Sheet = "https://ssl.gstatic.com/docs/spreadsheets/favicon3.ico",
//   Form = "https://ssl.gstatic.com/docs/spreadsheets/forms/favicon_qp2.png"
// }

// export const messageData: ListItem[] = [
//   {
//     avatar: Icon.Form,
//     title: "Report Issue",
//     description: "Report Issue Sheet",
//     onClick: () => {
//       window.open(
//         "https://docs.google.com/forms/d/e/1FAIpQLSfwYQve7aOOFpdGUXj3XB0IZmCWj_FhXq32RdggHscsmAEO7w/viewform?usp=sharing"
//       )
//     }
//   },
//   {
//     avatar: Icon.Sheet,
//     title: "Daily & Final Report Setting",
//     description: "Daily & Final Report Setting Sheet",
//     onClick: () => {
//       window.open(
//         "https://docs.google.com/spreadsheets/d/12izevTAI7TOr-0Hf_uDXIoV7BkUdjV77iExAeNi-SzU/edit?resourcekey=0-yGPeglMcB4VXQDDQB3NPkA#gid=231662427"
//       )
//     }
//   },
//   {
//     avatar: Icon.Sheet,
//     title: "Release Note",
//     description: "Release Note",
//     onClick: () => {
//       window.open(
//         "https://docs.google.com/document/d/1Dk24336kyYaOrq9txlpXYltVQQ-1SPMUoqWmP1RqoPo/edit?usp=sharing&resourcekey=0-DRRtQcOMT3NYFvUyU7bpaw"
//       )
//     }
//   },
//   {
//     avatar: Icon.Sheet,
//     title: "Test Scope Import",
//     description: "Test Scope Import",
//     onClick: () => {
//       window.open("https://docs.google.com/spreadsheets/d/1Y2RqiNsKfLr16U8HYdBVFL3JKU8nKFkQ-BE2tkK2JFM/copy")
//     }
//   },
//   {
//     avatar: Icon.Sheet,
//     title: "User Manual",
//     description: "User Manual",
//     onClick: () => {
//       window.open("https://drive.google.com/file/d/1dO_6jFP1thHmX1DrOLVmYpGL0wgk5UNN/view?usp=drive_link")
//     }
//   },
//   {
//     avatar: Icon.Sheet,
//     title: "eWorking Template",
//     description: "eWorking Import Sheet Template",
//     onClick: () => {
//       window.open("https://docs.google.com/spreadsheets/d/1jODIN2xEXOrBwGS5bHSl1k_ujwQcCYtdukMm7eSBUzQ/copy")
//     }
//   }
// ]

// export const todoData: ListItem[] = [
//   {
//     title: "任务名称",
//     description: "这家伙很懒，什么都没留下",
//     extra: "未开始",
//     status: "info"
//   },
//   {
//     title: "任务名称",
//     description: "这家伙很懒，什么都没留下",
//     extra: "进行中",
//     status: ""
//   },
//   {
//     title: "任务名称",
//     description: "这家伙很懒，什么都没留下",
//     extra: "已超时",
//     status: "danger"
//   }
// ]

export function querySysMsg() {
  return request<ApiResponseData<any>>({
    url: "announcement/querySysMsg",
    method: "post"
  })
}
