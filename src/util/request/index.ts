import axios, {AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig} from "axios";
import {ElMessage} from "element-plus";

const request :AxiosInstance = axios.create({
	baseURL: "http://localhost:8080",
})

// 添加请求拦截器
request.interceptors.request.use(
	function (config:InternalAxiosRequestConfig) {
		const token = "123456";
		if(token){
			config.headers = config.headers || {};
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},function (error :AxiosError) {
		return Promise.reject(error);
	}
)

// 添加响应拦截器
request.interceptors.response.use(
	function (response: AxiosResponse){
		return response;
	},function (error) {
		if(error.response && error.response.data){
			const {code, message} = error.response.data;
			ElMessage.error({
				message: message+"("+code+")",
				duration: 5000,
			})
		}
		return Promise.reject(error);
	}
)