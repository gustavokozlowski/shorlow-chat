import type { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { AUTH_MESSAGE, USER_MESSAGE } from '../global.enums';
import type { User } from '../models/user/user.interface';
import userModel from '../models/user/user.model';

class AuthMiddleware {
	public async authUserByToken(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> {
		const token = req.headers['access-token'];

		if (!token) return res.status(401).json({ message: AUTH_MESSAGE.ERROR });

		try {
			const userToken = jsonwebtoken.verify(
				token as string,
				Bun.env.JWT_SECRET,
			) as User;

			const user = await userModel.findById(userToken._id);

			if (!user)
				return res.status(400).json({ message: USER_MESSAGE.NOTFOUND });

			req.user = user;

			return next();
		} catch (error: unknown) {
			console.error('Error on Auth middleware \n', error);
			res.status(401).json({ message: AUTH_MESSAGE.INVALID });
		}
	}

	public async authUserByParams(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> {
		try {
			const user = await userModel.findById(req.params.id);

			if (!user)
				return res.status(400).json({ message: USER_MESSAGE.NOTFOUND });

			req.receiver = user;

			return next();
		} catch (error: unknown) {
			console.error('Error on Auth middleware \n', error);
			res.status(401).json({ message: USER_MESSAGE.INVALID });
		}
	}
}

export default new AuthMiddleware();
