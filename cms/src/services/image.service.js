import { SessionStoreKey } from "constants/app.constants";
import { axiosBaseHeader, setHeadersApi, axiosBase } from "./base";

const url = "/image";

export function uploadImage(image) {
  var formData = new FormData();
  formData.append("file", image);
  return axiosBase.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
