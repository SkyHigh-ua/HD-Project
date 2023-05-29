import * as userServices from '../services/users.services.js';
import {type NextFunction, type Request, type Response} from 'express';
import {type FindManyOptions} from 'typeorm';
import type UserEntity from '../entities/users.entity.js';
import {type User} from '../common/users.types';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config.js';
import {type UserRequest} from '../common/request.types.js';

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const filter = req.body.filter as FindManyOptions<UserEntity>;
        const page = req.body.page as number | undefined;
        const limit = req.body.limit as number | undefined;

        res.json(await userServices.get(Number(req.params.userId), filter, page, limit));
    } catch (err) {
        next(err);
    }
}

export async function post(req: Request, res: Response, next: NextFunction) {
    try {
        const userData = req.body as User;
        res.json(await userServices.create(userData));
    } catch (err) {
        next(err);
    }
}

export async function login(req: UserRequest, res: Response, next: NextFunction) {
    try {
        const {username, password} = req.body as User;
        const loggedInUser = await userServices.login(username, password);

        const {id} = loggedInUser;
        loggedInUser.token = jwt.sign({id}, authConfig.jwtSecret, {expiresIn: '1m'});
        await userServices.update(id, loggedInUser);

        res.json(loggedInUser);
    } catch (err) {
        next(err);
    }
}

export async function logout(req: UserRequest, res: Response) {
    try {
        if (!req.user) {
            // User is not authenticated, treat it as a successful logout
            res.sendStatus(200);
            return;
        }

        console.log(req.user);
        const {id} = req.user;

        req.user.token = undefined;
        await userServices.update(id, req.user);

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function put(req: Request, res: Response, next: NextFunction) {
    try {
        const userData = req.body as User;
        res.json(await userServices.update(Number(req.params.userId), userData));
    } catch (err) {
        next(err);
    }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        res.send(await userServices.remove(Number(req.params.userId)));
    } catch (err) {
        next(err);
    }
}
