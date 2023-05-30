import {type User, type UserWithoutId} from '../common/users.types';
import UserEntity from '../entities/users.entity.js';

export function mapUserToUserEntity(user: UserWithoutId): UserEntity {
    const userEntity = new UserEntity();

    if (user.id !== undefined) {
        userEntity.id = user.id;
    }

    userEntity.username = user.username;
    userEntity.firstName = user.firstName;
    userEntity.lastName = user.lastName;
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.token = user.token;

    return userEntity;
}

export function mapUserEntityToUser(userEntity: UserEntity): User {
    return {
        id: userEntity.id,
        username: userEntity.username,
        firstName: userEntity.firstName,
        lastName: userEntity.lastName,
        email: userEntity.email,
        password: userEntity.password,
        token: userEntity.token,
    };
}
