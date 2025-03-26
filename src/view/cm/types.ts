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

export function getCaseListViewObj(res: CaseListResponse): CaseListViewObj {
  let result: CaseListViewObj = {
    items: [] as CaseItem[],
    total: res.total
  }
  result.items = res.items.map((item: any) => {
    return {
      caseId: item.caseId,
      diseaseType: item.diseaseType,
      diagStatus: item.diagStatus,
      patientId: item.patientInfo.patientId,
      patientName: item.patientInfo.name?item.patientInfo.name:"不详",
      gender: item.patientInfo.gender?item.patientInfo.gender:"不详",
      age: item.patientInfo.age?item.patientInfo.age:"不详",
      createDate: item.createDate,
      updateDate: item.updateDate,
      responsibleDoctor: item.responsibleDoctor?item.responsibleDoctor:"不详"
    }
  })

  return result;
}