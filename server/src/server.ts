import 'reflect-metadata';
import dotenv from 'dotenv';
import express, {type Express, type Request, type Response, type NextFunction} from 'express';
import session from 'express-session';
import userRouter from './routes/users.routes.js';

dotenv.config({path: './src/env/.env'});

const app: Express = express();
const portToListen = parseInt(process.env.SERVER_PORT!, 10);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    session({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
    }),
);

app.use('/users', userRouter);

app.use((err: Error & {status?: number}, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    const serverErrorStatus = 500;
    res.status(err.status ? err.status : serverErrorStatus).send(`[Error occurred]:${String(err.stack)}`);
});

app.listen(portToListen, () => {
    console.log('Server is running');
});
