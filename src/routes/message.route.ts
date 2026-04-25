import { Router } from 'express';
import messageController from '../controllers/message/message.controller';
import authMiddleware from '../middlewares/auth.middleware';

const messageRoute = Router();

messageRoute.post(
	'/send/:id',
	authMiddleware.authUserByToken,
	authMiddleware.authUserByParams,
	messageController.send,
);

messageRoute.get(
	'/list/:id',
	authMiddleware.authUserByToken,
	authMiddleware.authUserByParams,
	messageController.list,
);

export default messageRoute;
