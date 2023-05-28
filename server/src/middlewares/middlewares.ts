import type Joi from 'joi';
import {type ValidationError} from 'joi';
import {type NextFunction, type Request, type Response} from 'express';

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
