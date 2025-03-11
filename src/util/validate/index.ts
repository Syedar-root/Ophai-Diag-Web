// ... existing imports ...
import Joi from "joi";
import {ElMessage} from "element-plus";

// 新增验证处理器
export const validate = async (values: any, schema: Joi.Schema) => {
  try {
    return await schema.validateAsync(values, { 
      abortEarly: false, // 显示所有错误
      allowUnknown: true // 允许未定义的键
    });
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      // 拼接错误信息
      const errorMessages = error.details.map(detail => {
        return `${detail.context?.label || '字段'}：${detail.message}`
      }).join('\n');
      
      ElMessage({
        message: `验证失败：\n${errorMessages}`,
        type: 'error',
        duration: 3000,
        grouping: true
      });
    }
    throw error;
  }
};

// 原schema定义保持不变
export const loginSchema = Joi.object({
    id: Joi.string().required().label('账号'),
    passwordHash: Joi.string().required().label('密码') // 添加密码字段示例
});
