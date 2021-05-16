import { axiosBase } from './base';

const url = '/provider';

export function getProviders(query) {
	return axiosBase.get(url, { params: query });
}

export function getProvidersPage(query) {
	return axiosBase.get(`${url}/page`, { params: query });
}
