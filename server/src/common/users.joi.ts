import * as middleware from '../middlewares/middlewares.js';
import Joi from 'joi';

const postMiddleware = middleware.validateBody(Joi.object({
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
}));

const putMiddleware = middleware.validateBody(Joi.object({
    username: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
}));

export default {postMiddleware, putMiddleware};
