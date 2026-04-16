import { model, Schema } from 'mongoose';
import { useHashPasswordHook } from './hooks/user.models.hooks';
import type { User } from './user.interface';

export interface UserModel extends User {}

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

export default model<UserModel>('User', UserSchema);
