import { SessionStoreKey } from "constants/app.constants";
import { axiosBaseHeader, setHeadersApi, axiosBase } from "./base";

const url = "/auth";

export function login(data) {
  return axiosBase.post(`${url}/admin-login`, data);
}

export function changePassword(data) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).put(`${url}/change-password`, data);
}

export function signup(data) {
  return axiosBase.post(`${url}/register`, data);
}

export function getInfoUser(data) {}
