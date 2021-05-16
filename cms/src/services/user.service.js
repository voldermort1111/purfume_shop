import { SessionStoreKey } from "constants/app.constants";
import { axiosBaseHeader, setHeadersApi } from "./base";

const url = "/user";

export function getName() {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).get(`${url}/get-name`);
}

export function getInfo() {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).get(`${url}/get-info`);
}
