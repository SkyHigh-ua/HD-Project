import * as middleware from '../../middlewares/middleware.common.js';
import Joi, {number, string} from 'joi';

const postMiddleware = middleware.validateBody(Joi.object({
    title: Joi.string().required(),
    from: Joi.string().required(),
    text: Joi.string().required(),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    insertURL: Joi.array<string>().required(),
    status: Joi.string().required(),
}));

const putMiddleware = middleware.validateBody(Joi.object({
    title: Joi.string(),
    from: Joi.string(),
    text: Joi.string(),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    insertURL: Joi.array<string>(),
    status: Joi.string(),
}));

export default {postMiddleware, putMiddleware};
