import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** 登入*/
export function loginApi(authCode: string) {
  return request<Login.LoginResponseData>({
    url: "login/",
    method: "get",
    params: { code: authCode },
    timeout: 60000
  })
}
export function loginUseEmail(email: string, password: string) {
  return request<Login.LoginResponseData>({
    url: "/backend/auth/login",
    method: "post",
    data: { email, password }
  })
}

export function registerUseEmail(email: string, password: string) {
  return request<Login.LoginResponseData>({
    url: "/backend/auth/signup",
    method: "post",
    data: { email, password }
  })
}
