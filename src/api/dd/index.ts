import request from '@/util/request/index.ts'

export const getCaseService = (query: any): Promise<any> => {
  return request({
    url: '/api/case/simple/' + query,
    method: 'get'
  })
}
