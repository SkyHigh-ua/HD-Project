import 'reflect-metadata';
import express, {type Express} from 'express';
import userRouter from './routes/users.routes.js';
import config from './config/db.config.js';
import {handleError} from './middlewares/middleware.common.js';
import ticketRouter from './routes/tickets.routes.js';
import answerRouter from './routes/tickets.answers.routes.js';
import {verifyUser} from './middlewares/users.middleware.js';

const app: Express = express();
const portToListen = parseInt(config.SERVER_PORT!, 10);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, '..', '..', 'client')));

app.use('/users', userRouter);

app.use('/tickets', ticketRouter);
app.use('/tickets/answers', answerRouter);

app.use(handleError);
app.listen(portToListen, () => {
    console.log('Server is running');
});
