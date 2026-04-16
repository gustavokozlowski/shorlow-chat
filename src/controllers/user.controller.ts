import type { Request, Response } from 'express';
import userModel from '../models/user/user.model';
import type {
	CreateUserRequest,
	CreateUserResponse,
} from './user.controller.types';

class UserController {
	// Implement user-related operations here
	public async createUser(req: Request, res: Response): Promise<Response> {
		const { userData } = req.body as CreateUserRequest;

		if (!userData.name || !userData.password) {
			return res.status(400).json({
				message: 'Campos obrigatorios ausentes: name e password.',
			});
		}

		try {
			const createdUser = await userModel.create(userData);
			const createdUserObject = createdUser.toObject();
			const { password, __v, ...safeData } = createdUserObject;

			const response: CreateUserResponse = {
				message: 'User created',
				data: safeData,
			};

			return res.status(201).json(response);
		} catch (err: any) {
			return res.status(500).json({
				message: 'Erro interno ao criar usuario.',
				errorDetails: err,
			});
		}
	}

	public async getUser(req: any, res: any): Promise<void> {
		// Logic to retrieve a user by ID
	}

	public async updateUser(req: any, res: any): Promise<void> {
		// Logic to update user information
	}

	public async deleteUser(req: any, res: any): Promise<void> {
		// Logic to delete a user
	}
}

export default new UserController();
