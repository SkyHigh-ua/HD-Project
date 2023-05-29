import 'reflect-metadata';
import dotenv from 'dotenv';
import express, {type Express} from 'express';
import session from 'express-session';
import userRouter from './routes/users.routes.js';
import authConfig from './config/auth.config.js';
import config from './config/db.config.js';
import path from 'path';
import {fileURLToPath} from 'url';
import {handleError, setUpSession, verifyUser} from './middlewares/middleware.js';

const app: Express = express();
const portToListen = parseInt(config.SERVER_PORT!, 10);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', '..', 'client')));

// app.use(verifyUser);

app.use('/users', userRouter);

app.use(handleError);

app.listen(portToListen, () => {
    console.log('Server is running');
});
