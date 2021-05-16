const API_CONFIG = {
	PROTOCOL: 'http',
	HOST: 'localhost',
	PORT: '5151',
};

const URL_API = `${API_CONFIG.PROTOCOL}://${API_CONFIG.HOST}${API_CONFIG.PORT ? ':' + API_CONFIG.PORT : ''}/api`;

const optionsBaseAxios = {
	baseURL: URL_API,
	timeout: 5000,
};

export default {
	URL_API,
	optionsBaseAxios,
};
