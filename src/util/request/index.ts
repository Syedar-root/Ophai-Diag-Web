import axios, {type AxiosRequestConfig, type AxiosResponse, type AxiosError, type AxiosInstance } from "axios";
import {ElMessage} from "element-plus";

// 定义基础响应类型
interface ResponseData<T = any> {
  code: number;
  data: T;
  message: string;
}

const request: AxiosInstance = axios.create(
    {
      baseURL: "/api",
      timeout: 5000
}) ;

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  noToken?: boolean;
}

// 请求拦截器
request.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    // 在这里可以添加请求头、认证信息等
      if (!config.noToken) {
          const token : string = 'asdfggh1234567890';
          if (token) {
              config.headers = config.headers || {};
              config.headers.Authorization = `Bearer ${token}`;
          }
      }
      if (config.data && typeof config.data !== 'string') {
          config.data = JSON.stringify(config.data);
      }
      if (config.method === 'get') {
          config.params = config.params || {};
          config.params.t = Date.now();
      }else if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
          config.data = config.data || {};
          config.data.t = Date.now();
      }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    if (response.status === 200) {
      if (response.data.code !== 200) {
        ElMessage({
            message: response.data.message,
            type: 'error',
            duration: 2000
        });
        return Promise.reject(response.data.data);
      }else{
        // 在这里可以对响应数据进行处理
          ElMessage({
              message: response.data.message,
              type: 'success',
              duration: 2000
          })
          return Promise.reject(response.data.data);
      }
    }else if (response.status === 500){
        ElMessage({
            message: '服务器错误',
            type: 'error',
            duration: 2000
        })
    }else {
        ElMessage({
            message: '未知错误',
            type: 'error',
            duration: 2000
        })
        return response.data.data;
    }
  },
  (error: AxiosError<ResponseData>) => {
    if (error.response) {
      console.error(`请求错误：状态码 ${error.response.status}`);
    }
    return Promise.reject(error);
  }
);

export default request;
