import {Router} from 'express';
import * as controllers from '../controllers/tickets.controllers.js';
import {verificationAndCreateMiddleware, verificationAndUpdateMiddleware}
    from '../middlewares/validation/tickets.validation.middleware.js';
import {verificationMiddleware} from '../middlewares/validation/users.validation.middleware.js';
import {verifyUser} from '../middlewares/users.middleware.js';
import {getAnswersStatisticsAcrossMonths} from '../statistics/tickets.statistics.js';

// eslint-disable-next-line new-cap
const ticketRouter = Router();

ticketRouter.get('/:ticketId', controllers.get);
ticketRouter.get('/', controllers.get);

ticketRouter.post('/', verificationAndCreateMiddleware, verifyUser, controllers.post);
ticketRouter.put('/:ticketId', verificationAndUpdateMiddleware, verifyUser, controllers.put);
ticketRouter.delete('/:ticketId', verificationMiddleware, verifyUser, controllers.remove);

export default ticketRouter;
