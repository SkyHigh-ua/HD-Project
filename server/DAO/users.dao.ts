import { connection } from '../datasouce/db.datasouce';
import { UserEntity } from '../entities/users.entity';

export async function createUser(user: UserEntity): Promise<UserEntity> {
  return connection.manager.save(UserEntity, user);
}

export async function findAllUsers(
  filter?: { status?: string },
  page?: number,
  limit?: number
) {
  const query = connection.createQueryBuilder(UserEntity, 'User');

  if (filter?.status) {
    query.andWhere('User.status = :status', { status: filter.status });
  }

  if (page && limit) {
    query.skip((page - 1) * limit).take(limit);
  }

  const users = await query.getMany();
  return users;
}

export async function findUserById(id: number): Promise<UserEntity | null> {
  return connection.manager.findOne(UserEntity, {
    where: { id },
  });
}

export async function findUserByUsernameAndPassword(username: string, password: string): Promise<UserEntity | null> {
  return connection.manager.findOne(UserEntity, {
    where: { username, password },
  });
}

export async function updateUser(user: UserEntity): Promise<UserEntity> {
  return connection.manager.save(UserEntity, user);
}

export async function deleteUser(id: number): Promise<void> {
  await connection.manager.delete(UserEntity, id);
}