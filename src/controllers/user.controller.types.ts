import type { User } from '../models/user/user.interface';

type userData = Omit<User, '_id'>;
export interface CreateUserRequest {
	userData: userData;
}

export interface CreateUserResponse {
	message: string;
	data: Omit<User, 'password'>;
}
export interface UserLoginRequest {
name: string
password: string
}
export interface UserLoginResponse {
success: boolean
message: string
_id: string
name: string
}