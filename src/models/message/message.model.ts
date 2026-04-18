import { model, Schema } from 'mongoose';
import type { Message } from './message,models.interface';

export interface MessageModel extends Message {}

const MessageSchema = new Schema({
	sender: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	content: {
		type: String,
		required: true,
	},
	receiver: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

export default model<MessageModel>('Message', MessageSchema);
