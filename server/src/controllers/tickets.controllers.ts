import {type NextFunction, type Request, type Response} from 'express';
import {type FindManyOptions} from 'typeorm';
import * as services from '../services/tickets.services.js';
import type TicketEntity from '../entities/tickets.entity.js';
import {type PartialTicket, type TicketWithoutId} from '../common/tickets.types.js';

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const filter = req.body.filter as FindManyOptions<TicketEntity>;
        const page = req.body.page as number | undefined;
        const limit = req.body.limit as number | undefined;

        res.json(await services.get(Number(req.params.userId), filter, page, limit));
    } catch (err) {
        next(err);
    }
}

export async function post(req: Request, res: Response, next: NextFunction) {
    const ticketToCreate = req.body as TicketWithoutId;

    try {
        res.json(await services.create(ticketToCreate));
    } catch (err) {
        next(err);
    }
}

export async function put(req: Request, res: Response, next: NextFunction) {
    const ticketData = req.body as PartialTicket;

    try {
        res.json(await services.update(Number(req.params.ticketId), ticketData));
    } catch (err) {
        next(err);
    }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        res.send(services.remove(Number(req.params.ticketId)));
    } catch (err) {
        next(err);
    }
}
