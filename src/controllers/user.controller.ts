import type { Request, Response } from 'express';
import userModel from '../models/user/user.model';
import type {
	CreateUserRequest,
	CreateUserResponse,
	UserLoginRequest,
	UserLoginResponse,
} from './user.controller.types';
import { verifyPassword } from '../utils/password.util';

class UserController {
	// Implement user-related operations here
	public async register(req: Request, res: Response): Promise<Response> {
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
				errorDetails: err
			});
		}
	}

	public async login(req: Request, res: Response): Promise<Response> {
		const { name, password }  = req.body as UserLoginRequest;
		
		if (!name || password) {
			return res.status(401).json({
				message:'Campos obrigatorios ausentes: name e password.'});
		}
		try {
			const data = await userModel.findOne({ name })
			if (!data) {
				return res.status(400).json({message:'Usuário não existe!'})
			}

			const passwordIsValid = await verifyPassword(password, data.password)
			if (!passwordIsValid) {
				return res.status(400).json({message: 'Senha incorreta!'})
			}

			const userData = data.toObject()

			const result: UserLoginResponse = {
				success: true, 
				message: 'Login realizado com sucesso',
			    ...userData
			} 

			return res.status(200).json(result)
		} catch (err: any) {
			return res.status(500).json({
				message: 'Erro interno ao tentar realizar o login.',
				errorDetails: err
			});
		}
	}

	public async updateUser(req: any, res: any): Promise<void> {
		// Logic to update user information
	}

	public async deleteUser(req: any, res: any): Promise<void> {
		// Logic to delete a user
	}
}

export default new UserController();
