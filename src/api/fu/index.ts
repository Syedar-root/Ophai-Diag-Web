import request from '@/util/request'
import type { CustomAxiosRequestConfig } from '@/util/request'

export const uploadCaseService = (query: any) => {
  return request({
    url: '/api/preImage/saveAndProcess',
    method: 'post',
    data: query,
    noToken: true
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // }
  } as CustomAxiosRequestConfig)
}
