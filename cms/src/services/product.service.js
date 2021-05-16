import { SessionStoreKey } from "constants/app.constants";
import { axiosBaseHeader, setHeadersApi, axiosBase } from "./base";

const url = "/product";

export function getProducts(query) {
  return axiosBase.get(url, { params: query });
}

export function getProductsPage(query) {
  return axiosBase.get(`${url}/page`, { params: query });
}

export function getProductByIdAndCode(id, code) {
  return axiosBase.get(`${url}/${id}`, { params: { code } });
}

export function getProductByIds(ids) {
  return axiosBase.get(`${url}/get-by-ids`, { params: { ids } });
}

export function getProductImages(id) {
  return axiosBase.get(`${url}/get-images/${id}`);
}

export function getAvatarProduct(id) {
  return axiosBase.get(`${url}/get-avatar/${id}`);
}

export function deleteProduct(id) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).delete(`${url}/${id}`);
}

export function createProduct(data) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).post(url, data);
}

export function updateProduct(id, data) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).put(`${url}/${id}`, data);
}

export function updateAvatar(id, avatar) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).put(`${url}/update-avatar/${id}`, { avatar });
}

export function addImage(id, image) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).post(`${url}/add-image/${id}`, { image });
}

export function removeImage(id) {
  return axiosBaseHeader(
    setHeadersApi.setAuthorization(
      sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN)
    )
  ).delete(`${url}/remove-image/${id}`);
}
