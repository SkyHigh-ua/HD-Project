import UserEntity from '../entities/users.entity.js';
import {type FindManyOptions} from 'typeorm';
import dbCommon from '../common/db.common.js';

export async function createUser(user: UserEntity): Promise<UserEntity> {
    const newUser = dbCommon.entityManager.create(UserEntity, user);

    return dbCommon.entityManager.save(newUser);
}

export async function findAllUsers(
    filter?: FindManyOptions<UserEntity>, // {status?: string}
    page?: number,
    limit?: number,
): Promise<UserEntity[]> {
    const options: FindManyOptions<UserEntity> = {
        ...filter,
        skip: page && limit ? (page - 1) * limit : undefined,
        take: limit,
    };

    return dbCommon.entityManager.find(UserEntity, options);
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

export async function updateUser(user: UserEntity): Promise<UserEntity> {
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
