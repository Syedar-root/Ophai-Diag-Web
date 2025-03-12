export interface userDto {
    id?: string;
    passwordHash: string;
    confirmPasswordHash?: string;
    userName?: string;
    email?: string;
    gender?: string;      // 移除 null 类型
    phone?: string;       // 移除 null 类型
    realName?: string;
    age?: number | null;  // 数值类型保持 null
    hospital?: string;
    department?: string;
    position?: string;    // 原定义是 number | null，但模板中使用的是字符串输入
    proDoctorId?: string; // 添加模板中使用的字段
    idCard?: string;       // 添加模板中使用的字段
}

