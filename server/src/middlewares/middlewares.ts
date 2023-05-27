import type Joi from 'joi';
import {type Request, type Response, type NextFunction} from 'express';

export const validateBody = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }

    next();
};
