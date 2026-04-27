import {
	Document,
	Model,
	model,
	type QueryWithHelpers,
	Schema,
} from 'mongoose';
import type { Message } from './message,models.interface';

export interface MessageModel extends Message, Document {}

interface MessageStatic extends Model<MessageModel> {
	searchChat(
		userLoggedId: string,
		userChatId: string,
	): QueryWithHelpers<MessageModel[], MessageModel>;
}

const MessageSchema = new Schema<MessageModel>({
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

MessageSchema.statics.searchChat = function (
	userLoggedId: string,
	userChatId: string,
): QueryWithHelpers<MessageModel[], MessageModel> {
	return this.find({
		$or: [
			{ $and: [{ sender: userLoggedId }, { receiver: userChatId }] },
			{ $and: [{ sender: userChatId }, { receiver: userLoggedId }] },
		],
	});
};

export default model<MessageModel, MessageStatic>('Message', MessageSchema);
