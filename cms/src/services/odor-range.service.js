import { SessionStoreKey } from "constants/app.constants";
import { axiosBaseHeader, setHeadersApi, axiosBase } from "./base";

const url = "/odor-range";

export function getOdorRanges(query) {
  return axiosBase.get(url, { params: query });
}

export function getPageOdorRanges(query) {
  return axiosBase.get(`${url}/page`, { params: query });
}

export function deleteOdorRange(id) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).delete(`${url}/${id}`);
}

export function createOdorRange(data) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).post(url, data);
}

export function updateOdorRange(id, data) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).put(`${url}/${id}`, data);
}
