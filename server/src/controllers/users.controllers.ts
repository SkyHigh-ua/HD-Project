import * as services from '../services/users.services.js';
import {type NextFunction, type Request, type Response} from 'express';
import {type PartialUser, type User, type UserWithoutId} from '../common/types/users.types';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config.js';
import {type UserRequest} from '../common/types/request.types';

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const filter = req.body.filter as PartialUser;
        const page = req.body.page as number | undefined;
        const limit = req.body.limit as number | undefined;

        res.json(await services.get(Number(req.params.userId), filter, page, limit));
    } catch (err) {
        next(err);
    }
}

export async function post(req: Request, res: Response, next: NextFunction) {
    const userData = req.body as UserWithoutId;

    try {
        res.json(await services.create(userData));
    } catch (err) {
        next(err);
    }
}

export async function login(req: UserRequest, res: Response, next: NextFunction) {
    const {username, password} = req.body as User;

    try {
        const loggedInUser = await services.login(username, password);

        const {id} = loggedInUser;
        loggedInUser.token = jwt.sign({id}, authConfig.jwtSecret, {expiresIn: '10m'});
        await services.update(id, loggedInUser);

        res.json(loggedInUser);
    } catch (err) {
        next(err);
    }
}

export async function logout(req: UserRequest, res: Response) {
    const {token} = req.headers;

    try {
        const [existingUser]
            = await services.get(undefined, {token: (token as string)}) as User[];

        if (!existingUser) {
            return res.status(401).json({error: 'User not found'});
        }

        // @ts-ignore
        existingUser.token = null;
        const {id} = existingUser;

        res.json(await services.update(id, existingUser));
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function put(req: Request, res: Response, next: NextFunction) {
    const userData = req.body as PartialUser;

    try {
        res.json(await services.update(Number(req.params.userId), userData));
    } catch (err) {
        next(err);
    }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        res.send(services.remove(Number(req.params.userId)));
    } catch (err) {
        next(err);
    }
}
