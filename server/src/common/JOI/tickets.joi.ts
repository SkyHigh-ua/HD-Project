import Joi from 'joi';
import {verificationSchema} from './users.joi.js';

export const createSchema = Joi.object({
    title: Joi.string().required(),
    from: Joi.string().required(),
    text: Joi.string().required(),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    insertURL: Joi.array<string>().required(),
    status: Joi.string().required(),
    userId: Joi.number(),
});

export const updateSchema = Joi.object({
    title: Joi.string(),
    from: Joi.string(),
    text: Joi.string(),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    insertURL: Joi.array<string>(),
    status: Joi.string(),
    userId: Joi.number(),
});
