import connection from '../datasource/db.datasource.js';
import UserEntity from '../entities/users.entity.js';
import {type FindManyOptions} from 'typeorm';

const entityManager = connection.manager;

export async function createUser(user: UserEntity): Promise<UserEntity> {
    const newUser = entityManager.create(UserEntity, user);

    return entityManager.save(newUser);
}

type UserFilter = UserEntity;

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

    return entityManager.find(UserEntity, options);
}

export async function findUserById(id: number): Promise<UserEntity | undefined> {
    try {
        const result = await entityManager.findOne(UserEntity, {
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
        const result = await entityManager.findOne(UserEntity, {
            where: {username, password},
        });

        return result ? result : undefined;
    } catch (error) {
        console.error('Error occurred while finding user by Username and Password:', error);
        throw error;
    }
}

export async function updateUser(user: UserEntity): Promise<UserEntity> {
    const existingUser = await entityManager.findOne(UserEntity, {
        where: {
            id: user.id,
        },
    });

    if (!existingUser) {
        throw new Error(`User with ID ${user.id} does not exist.`);
    }

    existingUser.username = user.username;
    existingUser.firstName = user.firstName;
    existingUser.lastName = user.lastName;
    existingUser.email = user.email;
    existingUser.password = user.password;
    existingUser.token = user.token;

    return entityManager.save(existingUser);
}

export async function deleteUser(id: number): Promise<void> {
    const existingUser = await entityManager.findOne(UserEntity, {where: {id}});

    if (!existingUser) {
        throw new Error(`User with ID ${id} does not exist.`);
    }

    await entityManager.remove(existingUser);
}
