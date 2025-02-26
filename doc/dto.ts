//
interface PatientInfo{
    id:number;
    name: string;
    age: number;
    gender: string;
}

interface HistoryCase{
    id:number;
    date:Date;
    description:string;
}

interface  ImageData{
    id:number;
    image: string;
}

type diseaseRate = { name:string, rate:number };
interface AiDiag{
    id:number;
    diagnosis: string[],
    suggestions: string[],
    chartData: diseaseRate[],
}

type doctorSuggestion = { name: string; position: string;  suggestions: string };
interface NormalDiag{
    id:number;
    date:Date;
    doctorName:string;
    department:string;
    suggestions:doctorSuggestion[];
}



// DTO
// 诊断分析界面（病例界面）
interface DiagnosedCaseDTO{
    patientInfo: PatientInfo,
    historyCases: HistoryCase[],
    imageData: ImageData[],
    aiDiag: AiDiag,
    normalDiag: NormalDiag,
}

// 快速创建/导入病例界面
interface CaseDTO{
    patientInfo: PatientInfo,
    imageData: ImageData[],
}

type Case = { id:number, patientInfo:PatientInfo, responsibleDoctor:string, createDate:Date, lastUpdateDate:Date};
// 病例库界面
interface CaseLibDTO{
    casesList:Case[],
}

