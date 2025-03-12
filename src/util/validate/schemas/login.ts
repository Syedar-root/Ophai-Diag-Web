import Joi from 'joi'

export const loginSchema = Joi.object({
  id: Joi.string()
    .trim()
    .min(1)
    .required()
    .label('账号')
    .messages({
      'string.empty': '账号不能为空',
      'string.min': '账号至少需要1个字符',
      'any.required': '必须填写账号'
    }),
  passwordHash: Joi.string()
    .trim()
    .min(6)
    .pattern(/^\S+$/, '不含空格')  // 禁止空格
    .required()
    .label('密码')
    .messages({
      'string.empty': '密码不能为空',
      'string.min': '密码至少需要6个字符',
      'any.required': '必须填写密码',
      'string.pattern.base': '密码不能包含空格'
    })
});