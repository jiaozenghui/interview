import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 50000,
	headers: { 'Content-Type': 'application/json' },
	paramsSerializer: {
		serialize(params) {
			return qs.stringify(params, { allowDots: true });
		},
	},
});

// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		// 对响应数据做点什么
		const res = response.data;
		if (res.code && res.code !== 200) {
			return Promise.reject(service.interceptors.response);
		} else {
			return res;
		}
	},
	(error) => {

		console.log(error.message);
		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;
