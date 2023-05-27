import {type User, UserWithoutId, type PartialUser} from '../common/users.interface.js';
import * as Dao from '../DAO/users.dao.js';
import * as mapping from '../mapping/users.mapping.js';
import HttpError from '../common/error.class.js';

export async function get(
    id?: number,
    filter?: {status?: string},
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

export async function create(user_data: User) {
    const user = await Dao.createUser(mapping.mapUserToUserEntity(user_data));
    return mapping.mapUserEntityToUser(user);
}

export async function update(id: number, user_data: PartialUser) {
    const old_user_entity = await Dao.findUserById(id);
    if (!old_user_entity) {
        throw new HttpError(`User with id ${id} not found`, 404);
    }

    const old_user = mapping.mapUserEntityToUser(old_user_entity);
    const updatedUser = await Dao.updateUser(mapping.mapUserToUserEntity({
        id,
        username: user_data.username ? user_data.username : old_user.username,
        firstName: user_data.firstName ? user_data.firstName : old_user.firstName,
        lastName: user_data.lastName ? user_data.lastName : old_user.lastName,
        email: user_data.email ? user_data.email : old_user.email,
        password: user_data.password ? user_data.password : old_user.password,
        token: user_data.token ? user_data.token : old_user.token,
    }));
    return mapping.mapUserEntityToUser(updatedUser);
}

export async function remove(id: number) {
    await Dao.deleteUser(id);
    return 'user deleted';
}
