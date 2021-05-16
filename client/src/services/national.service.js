import { axiosBase } from './base';

const url = '/national';

export function getNationals(query) {
	return axiosBase.get(url, { params: query });
}
