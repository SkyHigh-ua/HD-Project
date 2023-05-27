import dotenv from 'dotenv';
import {type DataSourceOptions} from 'typeorm';
import UserEntity from '../entities/users.entity.js';

dotenv.config({path: './src/env/.env'});

const db: DataSourceOptions
= {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        UserEntity,
    ],
    synchronize: true,
    // Logging: true,
    migrations: [
        '../migrations/*.ts',
    ],
};

export default db;
