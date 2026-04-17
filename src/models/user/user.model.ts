import { model, Schema } from 'mongoose';
import { useGenerateJwtToken, useHashPasswordHook } from './hooks/user.models.hooks';
import type { User } from './user.interface';

export interface UserModel extends User {
	generateToken: () => string;
}

export const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	photoUrl: {
		type: String,
		required: false,
	},
});

useHashPasswordHook();
useGenerateJwtToken();

export default model<UserModel>('User', UserSchema);
