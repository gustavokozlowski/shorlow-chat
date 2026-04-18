import type { Message } from '../../models/message/message,models.interface';

type messageData = Omit<Message, 'createdAt'>;

export interface SendMessageRequest {
	message: messageData;
}

export interface SendMessageResponse {
	success: boolean;
	message: string;
}
