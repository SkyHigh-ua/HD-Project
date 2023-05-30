import {type UserRequest} from '../common/request.types.js';
import {type NextFunction, type Response} from 'express';
import {type User} from '../common/users.types.js';
import * as userServices from '../services/users.services.js';
import jwt, {type JwtPayload} from 'jsonwebtoken';
import authConfig from '../config/auth.config.js';

export async function verifyUser(req: UserRequest, res: Response, next: NextFunction) {
    const {username, password} = req.body as User;

    try {
        const userData = await userServices.login(username, password);
        const {token} = userData;

        if (!token) {
            return res.sendStatus(401);
        }

        const decoded = jwt.verify(token, authConfig.jwtSecret) as JwtPayload;
        const {id} = decoded;

        req.user = await userServices.get(id as number) as User;

        next();
    } catch (error) {
        console.error('User verification error:', error);
        res.status(403).json({error: 'Forbidden'});
    }
}
