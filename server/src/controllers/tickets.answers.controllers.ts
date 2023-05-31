import {type NextFunction, type Request, type Response} from 'express';
import {type PartialTicketAnswer, type TicketAnswerWithoutId} from '../common/types/tickets.answers.types';
import * as services from '../services/tickets.answers.services.js';
import {getAnswersStatisticsAcrossMonths} from '../statistics/tickets.statistics.js';

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const filter = req.body.filter as PartialTicketAnswer;
        const page = req.body.page as number | undefined;
        const limit = req.body.limit as number | undefined;

        res.json(await services.get(Number(req.params.answerId), filter, page, limit));
    } catch (err) {
        next(err);
    }
}

export async function getStatistics(req: Request, res: Response, next: NextFunction) {
    try {
        const statistics = await getAnswersStatisticsAcrossMonths();
        res.json(statistics);
    } catch (err) {
        next(err);
    }
}

export async function post(req: Request, res: Response, next: NextFunction) {
    const answerToCreate = req.body as TicketAnswerWithoutId;

    try {
        res.json(await services.create(answerToCreate));
    } catch (err) {
        next(err);
    }
}

export async function put(req: Request, res: Response, next: NextFunction) {
    const answerData = req.body as PartialTicketAnswer;

    try {
        res.json(await services.update(Number(req.params.answerId), answerData));
    } catch (err) {
        next(err);
    }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        res.send(services.remove(Number(req.params.answerId)));
    } catch (err) {
        next(err);
    }
}
