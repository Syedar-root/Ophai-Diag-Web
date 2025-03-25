export interface CaseListQuery {
  pageNum: number
  pageSize: number
  diagStatus?: number
  diseaseType?: number
  patientInfoPatientId?: string
}

type CaseItem = {
  caseId: string | number
  patientId: string
  patientName: string
  age: number
  gender: number
  diagStatus: number
  diseaseType: string[]
  createDate: string
  updateDate: string
  responsibleDoctor: string
}

export interface CaseListResponse {
  items: any[]
  total: number
}

export interface CaseListViewObj {
  items: CaseItem[]
  total?: number
}
