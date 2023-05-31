import {type UserRequest} from '../common/types/request.types.js';
import {type NextFunction, type Response} from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config.js';
import * as Dao from '../DAO/users.dao.js';

export async function verifyUser(req: UserRequest, res: Response, next: NextFunction) {
    const {token} = req.headers;

    try {
        const [existingUser] = await Dao.findAllUsers({token: (token as string)});

        if (!existingUser) {
            return res.status(401).json({error: 'Invalid token'});
        }

        jwt.verify(token as string, authConfig.jwtSecret);

        next();
    } catch (error) {
        console.error('User verification error:', error);
        res.status(403).json({error: 'Forbidden'});
    }
}
