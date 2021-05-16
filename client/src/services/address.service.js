import axios from 'axios';

const url = 'https://dc.tintoc.net/app/api-customer/public';

export function getCity() {
	return axios.get(`${url}/provinces`, { params: { page: 0, size: 100, sort: 'name' } });
}

export function getDistrict(cityId) {
	return axios.get(`${url}/districts`, {
		params: { page: 0, size: 1000, ['provinceId.equals']: cityId },
	});
}

export function getWard(districtId) {
	return axios.get(`${url}/wards`, {
		params: { page: 0, size: 1000, ['districtId.equals']: districtId },
	});
}
