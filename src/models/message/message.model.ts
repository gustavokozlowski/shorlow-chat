import { Document, model, Schema } from 'mongoose';
import type { Message } from './message,models.interface';

interface MessageModel extends Message, Document {}

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
