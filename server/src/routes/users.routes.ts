import {Router} from 'express';
import * as controller from '../controllers/users.controllers.js';
import usersJoi from '../common/users.joi.js';
import {verifyUser} from '../middlewares/middleware.js';

// eslint-disable-next-line new-cap
const userRouter = Router();

// Логін
userRouter.post('/login', usersJoi.loginMiddleware, controller.login);

userRouter.use(verifyUser);

// Логаут
userRouter.post('/logout', controller.logout);
// Отримання даних користувача за його id
userRouter.get('/:userId', controller.get);
// Список користувачів
userRouter.get('/', controller.get);
// Створення користувача
userRouter.post('/signup', usersJoi.postMiddleware, controller.post);
// Оновлення даних користувача за його id
userRouter.put('/:userId', usersJoi.putMiddleware, controller.put);
// Видалення користувача за його id
userRouter.delete('/:userId', controller.remove);

export default userRouter;
