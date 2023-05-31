import {type DeepPartial} from 'typeorm';

export type User = {
    id: number;
    username: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    password: string;
    token?: string | null;
};

export type UserWithoutId = {id?: number} & Omit<User, 'id'>;

export type PartialUser = DeepPartial<User>;
