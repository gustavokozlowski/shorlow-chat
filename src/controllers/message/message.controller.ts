import type { Request, Response } from 'express';
import messageModel from '../../models/message/message.model';
class MessageController {
	public async send(req: Request, res: Response) {
		const { content } = req.body;

		const message = await messageModel.create({
			content,
			sender: req.user?._id.toString(),
			receiver: req.params.id?.toString(),
		});
		
		return res.status(201).json({
			success: true,
			data: message,
		});
	}
}

export default new MessageController();
