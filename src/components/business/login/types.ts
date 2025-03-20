export interface userDto {
  userId?: string
  passwordHash: string
  confirmPassword?: string
  userName?: string
  email?: string
  gender?: string // 移除 null 类型
  phone?: string // 移除 null 类型
  realName?: string
  age?: number | null // 数值类型保持 null
  hospital?: string
  position?: string // 原定义是 number | null，但模板中使用的是字符串输入
  idNumber?: string // 身份证
}
