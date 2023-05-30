import {Router} from 'express';
import * as controllers from '../controllers/tickets.controllers.js';
import joi from '../common/JOI/tickets.joi.js';

// eslint-disable-next-line new-cap
const ticketRouter = Router();

ticketRouter.get('/:ticketId', controllers.get);
ticketRouter.get('/', controllers.get);

ticketRouter.post('/', joi.postMiddleware, controllers.post);
ticketRouter.put('/:ticketId', joi.putMiddleware, controllers.put);
ticketRouter.delete('/:ticketId', controllers.remove);

export default ticketRouter;
