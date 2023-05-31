import {validateRequest} from './common.validation.middleware.js';
import * as ticketsJoi from '../../common/JOI/tickets.joi.js';
import * as usersJoi from '../../common/JOI/users.joi.js';

export const createMiddleware = validateRequest([{schema: ticketsJoi.createSchema, part: 'body'}]);
export const updateMiddleware = validateRequest([{schema: ticketsJoi.updateSchema, part: 'body'}]);
export const verificationAndCreateMiddleware
    = validateRequest([
        {schema: usersJoi.verificationSchema, part: 'headers'},
        {schema: ticketsJoi.createSchema, part: 'body'},
    ]);
export const verificationAndUpdateMiddleware
    = validateRequest([
        {schema: usersJoi.verificationSchema, part: 'headers'},
        {schema: ticketsJoi.updateSchema, part: 'body'},
    ]);
