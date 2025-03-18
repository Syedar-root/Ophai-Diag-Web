export interface ffDTO {
  patientId: string
  patientName: string
  patientAge: number | null
  patientGender: string
  patientComplaint: string[]
}

export interface BulkImage {
  patientId: string
  leftFile: File | null
  rightFile: File | null
  previewLeft: string
  previewRight: string
}
