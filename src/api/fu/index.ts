import request from '@/util/request'
import type { CustomAxiosRequestConfig } from '@/util/request'

export const createCaseService = (query:any) =>{
  return request({
    url: '/api/preImage/saveAndProcess',
    method: 'post',
    data: query,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    noToken: false
  })
}