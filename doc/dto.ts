// 诊断分析界面（病例界面）
interface diagnosedCaseDTO{
    patientInfo: any,
    historyCases: [any],
    imageData: [any],
    aiDiag: any,
    normalDiag: any,
}

// 快速创建/导入病例界面
interface caseDTO{
    patientInfo: any,
    imageData: [any],
}

// 病例库界面
interface caseLibDTO{
    casesList:[any],
}

