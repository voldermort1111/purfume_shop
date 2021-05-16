import { SessionStoreKey } from "constants/app.constants";
import { axiosBaseHeader, setHeadersApi, axiosBase } from "./base";

const url = "/capacity";

export function getCapacities(query) {
  return axiosBase.get(url, { params: query });
}

export function getPageCapacities(query) {
  return axiosBase.get(`${url}/page`, { params: query });
}

export function deleteCapacity(id) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).delete(`${url}/${id}`);
}

export function createCapacity(data) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).post(url, data);
}

export function updateCapacity(id, data) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).put(`${url}/${id}`, data);
}
