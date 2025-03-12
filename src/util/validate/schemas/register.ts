import Joi from 'joi';

export const registerSchema = Joi.object({
  passwordHash: Joi.string()
    .trim()
    .min(6)
    .required()
    .label('密码')
    .messages({
      'string.empty': '密码不能为空',
      'string.min': '密码至少需要6个字符',
      'any.required': '必须填写密码',
      'string.pattern.base': '密码不能包含空格'
    }),
  confirmPasswordHash: Joi.string()
    .valid(Joi.ref('passwordHash'))
    .required()
    .label('确认密码')
    .messages({
      'string.empty': '确认密码不能为空',
      'any.only': '两次输入密码不一致',
      'any.required': '请再次输入密码确认'
    }),
  userName: Joi.string()
    .trim()
    .min(1)
    .required()
    .label('用户名')
    .messages({
      'string.empty': '用户名不能为空',
      'string.min': '用户名至少需要1个字符',
      'any.required': '必须填写用户名'
    }),
  email: Joi.string()
    .trim()
    // .email({tlds: {allow: true}})
    .required()
    .label('邮箱')
    .messages({
      'string.empty': '邮箱不能为空',
      'string.email': '请输入有效的邮箱地址',
      'any.required': '必须填写邮箱'
    }),
  phone: Joi.string()
    .trim()
    .pattern(/^1[0-9]{10}$/, '请输入有效的手机号')
    .label('手机号')
    .messages({
      'string.pattern.base': '请输入有效的手机号',
    })
});