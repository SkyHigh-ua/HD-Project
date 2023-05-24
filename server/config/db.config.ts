import dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm'
import { UserEntity } from '../entities/users.entity'

dotenv.config();

export const db: DataSourceOptions = 
{
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        UserEntity
    ],
    synchronize: true,
    // logging: true,
    migrations: [
        "../migrations/*.ts"
    ]
};