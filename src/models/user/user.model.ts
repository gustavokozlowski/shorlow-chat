import { Document, model, Schema } from 'mongoose';
import type { User } from './user.interface';

interface UserModel extends User {}

const UserSchema = new Schema({
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

export default model<UserModel>('User', UserSchema);
