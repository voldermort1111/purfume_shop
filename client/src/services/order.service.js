import { axiosBase, axiosBaseHeader, setHeadersApi } from './base';
import { SessionStoreKey } from './../constants/app.constants';

const url = '/order';

export function createOrder(body) {
	const token = sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN);
	if (token) {
		return axiosBaseHeader(setHeadersApi.setAuthorization(sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN))).post(
			`${url}/has-auth`,
			body,
		);
	}
	return axiosBase.post(url, body);
}
