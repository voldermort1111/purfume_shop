import { axiosBase } from './base';

const url = '/order';

export function createOrder(body) {
	return axiosBase.post(url, body);
}
