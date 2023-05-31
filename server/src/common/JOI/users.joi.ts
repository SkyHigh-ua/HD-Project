import Joi from 'joi';

export const verificationSchema = Joi.object({
    token: Joi.string().required(),
}).unknown(true);

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export const signupSchema = Joi.object({
    username: Joi.string().required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const updateSchema = Joi.object({
    username: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
});

export const verificationAndUpdateSchema
    = verificationSchema.concat(updateSchema);
