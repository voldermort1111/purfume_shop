import { SessionStoreKey } from "constants/app.constants";
import { axiosBaseHeader, setHeadersApi, axiosBase } from "./base";

const url = "/odor-retention-time";

export function getRetentionTimes(query) {
  return axiosBase.get(url, { params: query });
}

export function getPageRetentionTimes(query) {
  return axiosBase.get(`${url}/page`, { params: query });
}

export function deleteRetentionTime(id) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).delete(`${url}/${id}`);
}

export function createRetentionTime(data) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).post(url, data);
}

export function updateRetentionTime(id, data) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).put(`${url}/${id}`, data);
}
