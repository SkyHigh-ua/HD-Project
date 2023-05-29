import type Joi from 'joi';
import {type ValidationError} from 'joi';
import {type NextFunction, type Request, type Response} from 'express';
import session from 'express-session';
import authConfig from '../config/auth.config.js';
import jwt, {type JwtPayload} from 'jsonwebtoken';
import * as userServices from '../services/users.services.js';

declare module 'express' {
    interface Request {
        user?: unknown; // Add your desired user property and its type
    }
}

export function verifyUser(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.cookie; // Get the session cookie from request header
    console.log(authHeader);
    if (!authHeader) {
        return res.sendStatus(401);
    }

    const cookie = authHeader.split('=')[1]; // If there is, split the cookie string to get the actual jwt token
    console.log(cookie);
    // that's like checking the integrity of the cookie
    jwt.verify(cookie, authConfig.jwtSecret, async (err, decoded) => {
        if (err) {
            // If token has been altered, return a forbidden error
            return res.sendStatus(403);
        }

        const {id} = decoded as JwtPayload; // Get user id from the decoded token
        req.user = await userServices.get(id as number); // Put the data object into req.user
        next();
    });
}

const hoursCount = 24;
export const setUpSession = session({
    secret: authConfig.jwtSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: hoursCount * authConfig.hourInMilliseconds,
    },
});

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
