import {Router} from 'express';
import * as controller from '../controllers/users.controllers.js';
import * as validation from '../middlewares/validation/users.validation.middleware.js';
import {verificationAndUpdateMiddleware, verificationMiddleware}
    from '../middlewares/validation/users.validation.middleware.js';
import {verifyUser} from '../middlewares/users.middleware.js';

// eslint-disable-next-line new-cap
const userRouter = Router();

// Створення користувача
userRouter.post('/signup', validation.signupMiddleware, controller.post);
// Логін
userRouter.post('/login', validation.loginMiddleware, controller.login);

// Логаут
userRouter.post('/logout', verifyUser, controller.logout);
// Отримання даних користувача за його id
userRouter.get('/:userId', verificationMiddleware, verifyUser, controller.get);
// Список користувачів
userRouter.get('/', verificationMiddleware, verifyUser, controller.get);
// Оновлення даних користувача за його id
userRouter.put('/:userId', verificationMiddleware, verifyUser, controller.put);
// Видалення користувача за його id
userRouter.delete('/:userId', verificationMiddleware, verifyUser, controller.remove);

export default userRouter;
