import {Router} from 'express';
import {verifyUser} from '../middlewares/users.middleware.js';

// eslint-disable-next-line new-cap
export const answerRouter = Router();

answerRouter.get('/:answerId');
answerRouter.get('/');

// answerRouter.use(verificationMiddleware, verifyUser);

answerRouter.post('/');
answerRouter.put('/:answerId');
answerRouter.delete('/:answerId');

export default answerRouter;
