import {Router} from 'express';
import {verifyUser} from '../middlewares/users.middleware.js';
import * as controllers from '../controllers/tickets.answers.controllers.js';
import {verificationMiddleware} from '../middlewares/validation/users.validation.middleware.js';
import {verificationAndCreateMiddleware, verificationAndUpdateMiddleware}
    from '../middlewares/validation/tickets.answers.validation.middleware.js';

// eslint-disable-next-line new-cap
export const answerRouter = Router();

answerRouter.get('/', controllers.get);
answerRouter.get('/:answerId', controllers.get);

answerRouter.post('/', verificationAndCreateMiddleware, verifyUser, controllers.post);
answerRouter.put('/:answerId', verificationAndUpdateMiddleware, verifyUser, controllers.put);
answerRouter.delete('/:answerId', verificationMiddleware, verifyUser, controllers.remove);

export default answerRouter;
