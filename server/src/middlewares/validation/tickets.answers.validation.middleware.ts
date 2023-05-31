import {validateRequest} from './common.validation.middleware.js';
import * as answersJoi from '../../common/JOI/tickets.answers.joi.js';
import * as usersJoi from '../../common/JOI/users.joi.js';

export const createMiddleware = validateRequest([{schema: answersJoi.createSchema, part: 'body'}]);
export const updateMiddleware = validateRequest([{schema: answersJoi.updateSchema, part: 'body'}]);

export const verificationAndCreateMiddleware = validateRequest([
    {schema: usersJoi.verificationSchema, part: 'headers'},
    {schema: answersJoi.createSchema, part: 'body'},
]);

export const verificationAndUpdateMiddleware = validateRequest([
    {schema: usersJoi.verificationSchema, part: 'headers'},
    {schema: answersJoi.updateSchema, part: 'body'},
]);
