import {type User, type PartialUser} from '../common/users.interface.js';
import * as Dao from '../DAO/users.dao.js';
import * as mapping from '../mapping/users.mapping.js';
import HttpError from '../common/error.class.js';
import {type FindManyOptions} from 'typeorm';
import type UserEntity from '../entities/users.entity';

export async function get(
    id?: number,
    filter?: FindManyOptions<UserEntity>,
    page?: number,
    limit?: number,
) {
    if (id) {
        const user = await Dao.findUserById(id);

        if (!user) {
            throw new HttpError(`User with id ${id} not found`, 404);
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

export async function update(id: number, userData: PartialUser) {
    const oldUserEntity = await Dao.findUserById(id);

    if (!oldUserEntity) {
        throw new HttpError(`User with id ${id} not found`, 404);
    }

    const oldUser = mapping.mapUserEntityToUser(oldUserEntity);
    const updatedUserData: User = {
        id,
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

export async function remove(id: number) {
    const existedUser = await Dao.findUserById(id);

    if (!existedUser) {
        throw new HttpError(`User with id ${id} not found`, 404);
    }

    await Dao.deleteUser(id);

    return 'User deleted';
}
