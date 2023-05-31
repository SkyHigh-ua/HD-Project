import {type Request} from 'express';
import {type User} from './users.types.js';

export type UserRequest = {
    user?: User;
} & Request;
