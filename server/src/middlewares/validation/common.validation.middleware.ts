import {type ValidationError} from 'joi';
import type Joi from 'joi';
import {type NextFunction, type Request, type Response} from 'express';

type ValidationSchema = {
    schema: Joi.ObjectSchema;
    part: 'body' | 'headers' | 'query' | 'params' | 'cookies';
};

export const validateRequest = (schemas: ValidationSchema[]) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    for (const schema of schemas) {
        const requestPart = req[schema.part] as Record<string, unknown>;
        const {error} = schema.schema.validate(requestPart);

        if (error) {
            const errorMessage = getErrorMessage(error);

            return res.status(400).json(errorMessage);
        }
    }

    next();
};

const getErrorMessage = (error: ValidationError): string => {
    const {details} = error;

    return details[0].message;
};
