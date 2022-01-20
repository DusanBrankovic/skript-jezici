const Joi = require('joi');

const loginSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(16).required(),
    password: Joi.string().min(5).required(),
})

const registerSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(16).required().messages({
        'string.base': `"name" should be a type of 'text'`,
        'string.empty': `"name" cannot be an empty field`,
        'string.min': `"name" should have a minimum length of {#limit}`,
        'any.required': `"name" is a required field`
      }),
    password: Joi.string().min(5).required(),
    email: Joi.string().email().lowercase().required(),
})

module.exports = {
    loginSchema : loginSchema,
    registerSchema : registerSchema
}