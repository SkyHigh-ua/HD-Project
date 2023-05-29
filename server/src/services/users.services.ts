import {type PartialUser, type User} from '../common/users.types';
import * as Dao from '../DAO/users.dao.js';
import * as mapping from '../mapping/users.mapping.js';
import HttpError from '../common/error.class.js';
import {type FindManyOptions} from 'typeorm';
import type UserEntity from '../entities/users.entity';
import jwt from 'jsonwebtoken';
import config from '../config/auth.config';

export async function get(
    userId?: number,
    filter?: FindManyOptions<UserEntity>,
    page?: number,
    limit?: number,
) {
    if (userId) {
        const user = await Dao.findUserById(userId);

        if (!user) {
            throw new HttpError(`User with id ${userId} not found`, 404);
        }

        return mapping.mapUserEntityToUser(user);
    }

    const users = await Dao.findAllUsers(filter, page, limit);

    return users.map(user => mapping.mapUserEntityToUser(user));
}

export async function create(userData: User) {
    const userEntity = mapping.mapUserToUserEntity(userData);
    const createdUser = await Dao.createUser(userEntity);

    return mapping.mapUserEntityToUser(createdUser);
}

export async function login(username: string, password: string) {
    const existingUser = await Dao.findUserByUsernameAndPassword(username, password);

    if (!existingUser) {
        throw new HttpError('Invalid credentials', 401);
    }

    return mapping.mapUserEntityToUser(existingUser);
}

export async function update(userId: number, userData: PartialUser) {
    const oldUserEntity = await Dao.findUserById(userId);

    if (!oldUserEntity) {
        throw new HttpError(`User with id ${userId} not found`, 404);
    }

    const oldUser = mapping.mapUserEntityToUser(oldUserEntity);
    const updatedUserData: User = {
        id: userId,
        username: userData.username ? userData.username : oldUser.username,
        firstName: userData.firstName ? userData.firstName : oldUser.firstName,
        lastName: userData.lastName ? userData.lastName : oldUser.lastName,
        email: userData.email ? userData.email : oldUser.email,
        password: userData.password ? userData.password : oldUser.password,
        token: userData.token ? userData.token : oldUser.token,
    };

    const updatedUserEntity = mapping.mapUserToUserEntity(updatedUserData);
    const updatedUser = await Dao.updateUser(updatedUserEntity);

    return mapping.mapUserEntityToUser(updatedUser);
}

export async function remove(userId: number) {
    const existedUser = await Dao.findUserById(userId);

    if (!existedUser) {
        throw new HttpError(`User with id ${userId} not found`, 404);
    }

    await Dao.deleteUser(userId);

    return 'User deleted';
}
