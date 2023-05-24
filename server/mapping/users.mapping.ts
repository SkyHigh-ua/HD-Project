import { User } from '../common/users.interface'
import { UserEntity } from '../entities/users.entity'

export function mapUserToUserEntity(user: User): UserEntity {
  const userEntity = new UserEntity();
  userEntity.id = user.id;
  userEntity.username = user.username;
  userEntity.firstName = user.firstName;
  userEntity.lastName = user.lastName;
  userEntity.email = user.email;
  userEntity.password = user.password;
  userEntity.token = user.token;
  return userEntity;
}

export function mapUserEntityToUser(userEntity: UserEntity): User {
  const user: User = {
    id: userEntity.id,
    username: userEntity.username,
    firstName: userEntity.firstName,
    lastName: userEntity.lastName,
    email: userEntity.email,
    password: userEntity.password,
    token: userEntity.token
  };
  return user;
}