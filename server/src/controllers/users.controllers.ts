import * as services from '../services/users.services.js';
import {type Request, type Response, type NextFunction} from 'express';
import {type FindManyOptions} from 'typeorm';
import type UserEntity from '../entities/users.entity.js';
import {type User} from '../common/users.interface';

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const filter = req.body.filter as FindManyOptions<UserEntity>;
        const page = req.body.page as number | undefined;
        const limit = req.body.limit as number | undefined;

        res.json(await services.get(Number(req.params.userId), filter, page, limit));
    } catch (err) {
        next(err);
    }
}

export async function post(req: Request, res: Response, next: NextFunction) {
    try {
        const userData = req.body as User;
        res.json(await services.create(userData));
    } catch (err) {
        next(err);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const {username, password} = req.body as User;
        res.json(await services.login(username, password));
    } catch (err) {
        next(err);
    }
}

export async function put(req: Request, res: Response, next: NextFunction) {
    try {
        const userData = req.body as User;
        res.json(await services.update(Number(req.params.userId), userData));
    } catch (err) {
        next(err);
    }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        res.send(await services.remove(Number(req.params.userId)));
    } catch (err) {
        next(err);
    }
}
