import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
		required: false,
	},
});

export default model('User', UserSchema);
