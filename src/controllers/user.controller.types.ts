import type { User } from '../models/user/user.interface';

export interface CreateUserRequest {
	userData: Omit<User, '_id'>;
}

export interface CreateUserResponse {
	message: string;
	data: Omit<User, '_id'>;
}
