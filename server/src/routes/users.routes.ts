import {Router} from 'express';
import * as controller from '../controllers/users.controllers.js';
import usersJoi from '../common/users.joi.js';

// eslint-disable-next-line new-cap
const userRouter = Router();

// Список користувачів
userRouter.get('/', controller.get);
// Логаут
userRouter.get('/logout', controller.get);
// Отримання даних користувача за його id
userRouter.get('/:userId', controller.get);

// Логін
userRouter.post('/login', usersJoi.loginMiddleware, controller.login);
// Створення користувача
userRouter.post('/', usersJoi.postMiddleware, controller.post);
// Оновлення даних користувача за його id
userRouter.put('/:userId', usersJoi.putMiddleware, controller.put);
// Видалення користувача за його id
userRouter.delete('/:userId', controller.remove);

export default userRouter;
