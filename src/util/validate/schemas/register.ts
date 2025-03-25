import Joi from 'joi'

export const registerSchema = Joi.object({
  passwordHash: Joi.string()
    .trim()
    .min(6)
    .max(16)
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[\w!@#$%^&*()_+\-=\[\]{};':",.<>/?]{6,16}$/)
    .required()
    .label('密码')
    .messages({
      'string.empty': '密码不能为空',
      'string.min': '密码至少需要6位',
      'string.max': '密码最多有16位',
      'string.pattern.base': '密码必须包含数字、大小写，可以包含特殊符号，不包含空格',
      'any.required': '必须填写密码'
    }),
  confirmPasswordHash: Joi.string().valid(Joi.ref('passwordHash')).required().label('确认密码').messages({
    'string.empty': '确认密码不能为空',
    'any.only': '两次输入密码不一致',
    'any.required': '请再次输入密码确认'
  }),
  userName: Joi.string()
    .trim()
    .min(2)
    .max(20)
    .pattern(/^[\u4e00-\u9fa5·•]{2,}$/)
    .required()
    .label('用户名')
    .messages({
      'string.empty': '用户名不能为空',
      'string.min': '用户名至少需要2个中文字符',
      'any.required': '必须填写用户名',
      'string.pattern.base': '至少需要两个中文字符'
    }),
  email: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .label('邮箱')
    .messages({
      'string.empty': '邮箱不能为空',
      'any.required': '必须填写邮箱',
      'string.pattern.base': '请输入有效的邮箱'
    }),
  phone: Joi.string()
    .trim()
    .pattern(/^1[3-9]\\d{9}$/, '请输入有效的手机号')
    .label('手机号')
    .messages({
      'string.pattern.base': '请输入有效的手机号'
    }),
  gender: Joi.string().trim().required().label('性别').messages({
    'any.required': '性别不能为空'
  }),
  /* 身份证号验证
    [1-9]                // 首位不能为0
    \d{5}                // 前6位：行政区划代码（省/市/县）
    (19|20)\d{2}         // 年份：1900-2099
    (0[1-9]|1[0-2])      // 月份：01-12
    [0-9]{2}             // 日期：01-31（不验证具体月份天数）
    \d{3}                // 顺序码：3位随机数字
    [0-9X]               // 校验码：0-9或X（罗马数字10）
   */
  idNumber: Joi.string()
    .trim()
    .required()
    .label('身份证号')
    .pattern(/^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])[0-9]{2}\d{3}[0-9X]$/)
    .messages({
      'string.pattern.base': '请输入有效的身份证号'
    })
})
