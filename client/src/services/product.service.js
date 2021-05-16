import { axiosBase, axiosBaseHeader, setHeadersApi } from './base';
import { SessionStoreKey } from './../constants/app.constants';

const url = '/product';

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

export function getImagesProduct(id) {
	return axiosBase.get(`${url}/get-images/${id}`);
}

export function getProductNews() {
	return axiosBase.get(`${url}/new`);
}

export function getProductSuggesttion() {
	return axiosBaseHeader(setHeadersApi.setAuthorization(sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN))).get(
		`/suggestion`,
	);
}
