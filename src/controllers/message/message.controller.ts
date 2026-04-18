import type { Request, Response } from 'express';
import messageModel from '../../models/message/message.model';

class MessageController {
	public async send(req: Request, res: Response) {
		const { content, sender } = req.body;

		const message = await messageModel.create({
			content,
			sender,
			receiver: req.params.id?.toString(),
		});

		return res.status(201).json({
			message: '',
			data: message,
		});
	}
}

export default new MessageController();
