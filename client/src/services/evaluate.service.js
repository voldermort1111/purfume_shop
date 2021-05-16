import { axiosBase, axiosBaseHeader, setHeadersApi } from './base';
import { SessionStoreKey } from './../constants/app.constants';

const url = '/evaluate';

export function evaluateProduct(data) {
	return axiosBaseHeader(setHeadersApi.setAuthorization(sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN))).post(
		url,
		data,
	);
}

export function checkEvaluated(id) {
	return axiosBaseHeader(setHeadersApi.setAuthorization(sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN))).get(
		`${url}/check-evaluated/${id}`,
	);
}

export function getListEvaluateByProduct(data) {
	return axiosBase.get(`${url}/page`, { params: data });
}

export function getAvgPoint(data) {
	return axiosBase.get(`${url}/avg-point`, { params: data });
}
