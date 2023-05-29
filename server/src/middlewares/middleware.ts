import type Joi from 'joi';
import {type ValidationError} from 'joi';
import {type NextFunction, type Request, type Response} from 'express';
import authConfig from '../config/auth.config.js';
import jwt, {type JwtPayload} from 'jsonwebtoken';
import * as userServices from '../services/users.services.js';
import {type User} from '../common/users.types';
import {type UserRequest} from '../common/request.types.js';

export async function verifyUser(req: UserRequest, res: Response, next: NextFunction) {
    const {username, password} = req.body as User;

    try {
        const userData = await userServices.login(username, password);
        const {token} = userData;

        if (!token) {
            return res.sendStatus(401);
        }

        const decoded = jwt.verify(token, authConfig.jwtSecret) as JwtPayload;
        const {id} = decoded;

        req.user = await userServices.get(id as number) as User;

        next();
    } catch (error) {
        console.error('User verification error:', error);
        res.status(403).json({error: 'Forbidden'});
    }
}

// const hoursCount = 24;
// export const setUpSession = session({
//     secret: authConfig.jwtSecret,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: hoursCount * authConfig.hourInMilliseconds,
//     },
// });

export const handleError = (err: Error & {status?: number}, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    const serverErrorStatus = 500;
    let errorMessage: string;
    const statusCode = err.status ?? serverErrorStatus;

    if (process.env.NODE_ENV === 'production') {
        errorMessage = 'Internal Server Error';
    } else {
        errorMessage = err.message;
    }

    res.status(statusCode).json({error: errorMessage});
};

export const validateBody = (schema: Joi.ObjectSchema) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const {error} = schema.validate(req.body);

    if (error) {
        const errorMessage = getErrorMessage(error);

        return res.status(400).json(errorMessage);
    }

    next();
};

const getErrorMessage = (error: ValidationError): string => {
    const {details} = error;

    return details[0].message;
};
