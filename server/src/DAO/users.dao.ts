import {connection} from '../datasource/db.datasource.js';
import UserEntity from '../entities/users.entity.js';

export async function createUser(user: UserEntity): Promise<UserEntity> {
    return connection.manager.save(UserEntity, user);
}

export async function findAllUsers(
    filter?: {status?: string},
    page?: number,
    limit?: number,
) {
    const query = connection.createQueryBuilder(UserEntity, 'User');

    if (filter?.status) {
        query.andWhere('User.status = :status', {status: filter.status});
    }

    if (page && limit) {
        query.skip((page - 1) * limit).take(limit);
    }

    return query.getMany();
}

export async function findUserById(id: number): Promise<UserEntity | undefined> {
    const result = await connection.manager.findOne(UserEntity, {
        where: {id},
    });

    return result ? result : undefined;
}

export async function findUserByUsernameAndPassword(username: string, password: string): Promise<UserEntity | undefined> {
    const result = await connection.manager.findOne(UserEntity, {
        where: {username, password},
    });

    return result ? result : undefined;
}

export async function updateUser(user: UserEntity): Promise<UserEntity> {
    return connection.manager.save(UserEntity, user);
}

export async function deleteUser(id: number): Promise<void> {
    await connection.manager.delete(UserEntity, id);
}
