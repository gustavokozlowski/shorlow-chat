import { Router } from 'express';
import userController from '../controllers/user/user.controller';
import authMiddleware from '../middlewares/auth.middleware';

const userRoute = Router();

userRoute.post('/register', userController.register);
userRoute.post('/login', userController.login);

userRoute.get(
	'/:id',
	authMiddleware.authUserByParams,
	authMiddleware.authUserByToken,
	userController.getById,
);

export default userRoute;
