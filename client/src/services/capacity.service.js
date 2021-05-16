import { axiosBase } from './base';

const url = '/capacity';

export function getCapacities(query) {
	return axiosBase.get(url, { params: query });
}
