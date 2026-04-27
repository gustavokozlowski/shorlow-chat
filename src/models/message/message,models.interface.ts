import type { Types } from 'mongoose';

export interface Message {
	sender: Types.ObjectId;
	content?: string;
	receiver: Types.ObjectId;
	createdAt?: Date;
}
