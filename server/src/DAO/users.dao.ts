import UserEntity from '../entities/users.entity.js';
import dbCommon from '../common/db.common.js';
import {type PartialUser, User} from '../common/types/users.types';
import connection from '../datasource/db.datasource.js';

export async function createUser(user: UserEntity): Promise<UserEntity> {
    const newUser = dbCommon.entityManager.create(UserEntity, user);

    return dbCommon.entityManager.save(newUser);
}

export async function findAllUsers(
    filter?: PartialUser,
    page?: number,
    limit?: number,
): Promise<UserEntity[]> {
    const query = connection.createQueryBuilder(UserEntity, 'User');

    if (filter?.email) {
        query.andWhere('User.email = :email', {email: filter.email});
    }

    if (filter?.firstName) {
        query.andWhere('User.firstName = :firstName', {firstName: filter.firstName});
    }

    if (filter?.lastName) {
        query.andWhere('User.lastName = :lastName', {lastName: filter.lastName});
    }

    if (filter?.password) {
        query.andWhere('User.password = :password', {password: filter.password});
    }

    if (filter?.username) {
        query.andWhere('User.username = :username', {username: filter.username});
    }

    if (filter?.token) {
        query.andWhere('User.token = :token', {token: filter.token});
    }

    if (page && limit) {
        query.skip((page - 1) * limit).take(limit);
    }

    return query.getMany();
}

export async function findUserById(id: number): Promise<UserEntity | undefined> {
    try {
        const result = await dbCommon.entityManager.findOne(UserEntity, {
            where: {id},
        });

        return result ? result : undefined;
    } catch (error) {
        console.error('Error occurred while finding user by ID:', error);
        throw error;
    }
}

export async function findUserByUsernameAndPassword(username: string, password: string):
Promise<UserEntity | undefined> {
    try {
        const result = await dbCommon.entityManager.findOne(UserEntity, {
            where: {username, password},
        });

        return result ? result : undefined;
    } catch (error) {
        console.error('Error occurred while finding user by Username and Password:', error);
        throw error;
    }
}

export async function updateUser(user: UserEntity) {
    const existingUser = await findUserById(user.id);

    if (!existingUser) {
        throw new Error(`User with ID ${user.id} does not exist.`);
    }

    existingUser.username = user.username;
    existingUser.firstName = user.firstName;
    existingUser.lastName = user.lastName;
    existingUser.email = user.email;
    existingUser.password = user.password;
    existingUser.token = user.token;

    return dbCommon.entityManager.save(existingUser);
}

export async function deleteUser(userId: number): Promise<void> {
    const existingUser = await findUserById(userId);

    if (!existingUser) {
        throw new Error(`User with ID ${userId} does not exist.`);
    }

    await dbCommon.entityManager.remove(existingUser);
}
