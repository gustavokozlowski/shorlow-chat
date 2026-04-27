import { Document, model, Schema } from 'mongoose';
import {
	useGenerateJwtToken,
	useHashPasswordHook,
} from './hooks/user.models.hooks';
import type { User } from './user.interface';
interface UserModel extends User, Document {
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
