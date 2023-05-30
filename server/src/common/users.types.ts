import {type DeepPartial} from 'typeorm';

export type User = {
    id: number;
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    token?: string;
};

export type UserWithoutId = {id?: number} & Omit<User, 'id'>;

export type PartialUser = DeepPartial<User>;
