import * as usersJoi from '../../common/JOI/users.joi.js';
import {validateRequest} from './common.validation.middleware.js';

export const verificationMiddleware
    = validateRequest([{schema: usersJoi.verificationSchema, part: 'headers'}]);
export const loginMiddleware = validateRequest([{schema: usersJoi.loginSchema, part: 'body'}]);
export const signupMiddleware = validateRequest([{schema: usersJoi.signupSchema, part: 'body'}]);
export const updateMiddleware = validateRequest([{schema: usersJoi.updateSchema, part: 'body'}]);

export const verificationAndUpdateMiddleware
    = validateRequest([
        {schema: usersJoi.verificationSchema, part: 'headers'},
        {schema: usersJoi.updateSchema, part: 'body'},
    ]);
