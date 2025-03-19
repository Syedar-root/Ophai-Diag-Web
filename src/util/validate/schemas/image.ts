import Joi from 'joi'

export const imageSchema = Joi.object({
  name: Joi.string()
    .pattern(/^([a-zA-Z0-9]+)_([\w\u4e00-\u9fff-]+)(_left|_right)\.(jpg|jpeg)$/)
    .messages({
      'string.pattern.base': '图片名称格式错误'
    })
})
