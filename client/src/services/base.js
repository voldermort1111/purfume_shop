import axios from 'axios';
import apiConstants from '../constants/api.constants';

export const setHeadersApi = {
	setAuthorization: function (access_token) {
		return {
			Authorization: `Bearer ${access_token}`,
		};
	},
	applicationJson: {
		'Content-Type': 'application/json',
	},
};

export const axiosBase = axios.create(apiConstants.optionsBaseAxios);

export const axiosBaseHeader = headers => {
	return axios.create({
		...apiConstants.optionsBaseAxios,
		headers,
	});
};
