import { SessionStoreKey } from "constants/app.constants";
import { axiosBaseHeader, setHeadersApi, axiosBase } from "./base";

const url = "/order";

export function createOrder(body) {
  return axiosBase.post(url, body);
}

export function getOrders(query) {
  return axiosBase.get(url, { params: query });
}

export function getPageOrders(query) {
  return axiosBase.get(`${url}/page`, { params: query });
}

export function deleteOrder(id) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).delete(`${url}/${id}`);
}

export function updateOrder(id, data) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).put(`${url}/${id}`, data);
}

export function getProductByOrder(id) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).get(`${url}/product-by-order/${id}`);
}
