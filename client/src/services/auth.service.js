import { SessionStoreKey } from '../constants/app.constants';
import { axiosBaseHeader, setHeadersApi, axiosBase } from './base';

const url = '/auth';

export function login(data) {
	return axiosBase.post(`${url}/login`, data);
}

export function signup(data) {
	return axiosBase.post(`${url}/register`, data);
}

export function getName() {
	return axiosBaseHeader(setHeadersApi.setAuthorization(sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN))).get(
		`/user/get-name`,
	);
}

export function getInfo() {
	return axiosBaseHeader(setHeadersApi.setAuthorization(sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN))).get(
		`/user/get-info`,
	);
}

export function updateInfo(body) {
	return axiosBaseHeader(setHeadersApi.setAuthorization(sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN))).put(
		`/user`,
		body,
	);
}

export function changePassword(data) {
	return axiosBaseHeader(setHeadersApi.setAuthorization(sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN))).put(
		`${url}/change-password`,
		data,
	);
}
