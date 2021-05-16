import { axiosBase } from './base';

const url = '/odor-group';

export function getOdorGroups(query) {
	return axiosBase.get(url, { params: query });
}
