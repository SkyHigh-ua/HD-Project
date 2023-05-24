import { DeepPartial } from 'typeorm'

export interface User {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    token?: string
}

export interface UserWithoutId extends Omit<User, 'id'>{ id?: number; }

export type PartialUser = DeepPartial<User>;