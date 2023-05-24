import express from 'express';
import * as controller from '../controllers/users.controllers'
import { postMiddleware, putMiddleware } from '../common/users.joi'

export const userRouter = express.Router();

// список користувачів
userRouter.get('/', controller.get);
// логін
userRouter.get('/login', controller.get);
// логаут
userRouter.get('/logout', controller.get);
// отримання даних користувача за його id
userRouter.get('/:userId', controller.get);
// створення користувача
userRouter.post('/', postMiddleware, controller.post);
// оновлення даних користувача за його id
userRouter.put('/:userId', putMiddleware, controller.put);
// видалення користувача за його id
userRouter.delete('/:userId', controller.remove);