import request, { type CustomAxiosRequestConfig } from '@/util/request/index.ts'
import { type CaseListResponse } from '@/view/cm/types.ts'

export const getCaseListService = (query: any): Promise<CaseListResponse> => {
  const config: CustomAxiosRequestConfig = {
    url: '/api/case/list',
    method: 'get',
    params: query
  }
  return request(config)
}
