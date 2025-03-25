import axios, {
  type AxiosResponse,
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosHeaders
} from 'axios'
import { ElMessage } from 'element-plus'

// 定义基础响应类型
export interface ResponseData<T = any> {
  code: number
  data: T
  message: string
}

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000
})

// 修改类型定义
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  noToken?: boolean
  headers?: AxiosHeaders | Record<string, string | number | boolean>
}

// 请求拦截器
request.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    // 在这里可以添加请求头、认证信息等
    config.headers = config.headers || {}
    if (!config.noToken) {
      const token: string = 'asdfggh1234567890'
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    if (config.method === 'get') {
      config.params = config.params || {}
      // config.params.t = Date.now();
    } else if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
      config.data = config.data || {}
    }
    return config as InternalAxiosRequestConfig
  },
  (error: AxiosError) => {
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    // 在这里可以对响应数据进行处理
    if (response.data.code !== 200) {
      ElMessage({
        message: response.data.message,
        type: 'error',
        duration: 2000
      })
      return Promise.reject(response.data)
    } else {
      // 在这里可以对响应数据进行处理
      ElMessage({
        message: response.data.message,
        type: 'success',
        duration: 2000
      })
      return response.data.data
    }
  },
  (error: AxiosError<ResponseData>) => {
    if (error.response) {
      console.error(`请求错误：状态码 ${error.response.status}`)
    }
    return Promise.reject(error)
  }
)

export default request
