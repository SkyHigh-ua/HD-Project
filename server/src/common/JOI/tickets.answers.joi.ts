import Joi from 'joi';

export const createSchema = Joi.object({
    text: Joi.string().required(),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    insertURL: Joi.array<string>().required(),
    ticketId: Joi.number().required(),
    userId: Joi.number().required(),
});

export const updateSchema = Joi.object({
    text: Joi.string(),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    insertURL: Joi.array<string>(),
    ticketId: Joi.number(),
    userId: Joi.number(),
    answerDate: Joi.date(),
});
