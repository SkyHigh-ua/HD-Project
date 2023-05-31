import {type PartialUser, type User, type UserWithoutId} from '../common/types/users.types.js';
import * as Dao from '../DAO/users.dao.js';
import * as mapping from '../mapping/users.mapping.js';
import HttpError from '../common/error.class.js';

export async function get(
    userId?: number,
    filter?: PartialUser,
    page?: number,
    limit?: number,
) {
    if (userId) {
        const user = await Dao.findUserById(userId);

        if (!user) {
            return {error: `User with id ${userId} not found`};
        }

        return mapping.mapUserEntityToUser(user);
    }

    const users = await Dao.findAllUsers(filter, page, limit);

    return users.map(user => mapping.mapUserEntityToUser(user));
}

export async function create(userData: UserWithoutId) {
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
        username: userData.username ?? oldUser.username,
        firstName: userData.firstName ?? null,
        lastName: userData.lastName ?? null,
        email: userData.email ?? oldUser.email,
        password: userData.password ?? oldUser.password,
        token: userData.token ?? null,
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
