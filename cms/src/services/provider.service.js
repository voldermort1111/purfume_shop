import { SessionStoreKey } from "constants/app.constants";
import { axiosBaseHeader, setHeadersApi, axiosBase } from "./base";

const url = "/provider";

export function getProviders(query) {
  return axiosBase.get(url, { params: query });
}

export function getPageProviders(query) {
  return axiosBase.get(`${url}/page`, { params: query });
}

export function deleteProvider(id) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).delete(`${url}/${id}`);
}

export function createProvider(data) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).post(url, data);
}

export function updateProvider(id, data) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).put(`${url}/${id}`, data);
}
