import type { Request, Response } from 'express';
import messageModel from '../../models/message/message.model';

class MessageController {
	public async send(req: Request, res: Response): Promise<Response> {
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

	public async list(req: Request, res: Response): Promise<Response> {
		const idUserChat = req?.receiver?._id as string
		const idLoggedUser = req?.user?._id as string
		
		const messages = await messageModel.find({
				$or: [
					{ $and: [ {sender: idLoggedUser}, {receiver: idUserChat} ]},
					{ $and: [{ sender: idUserChat }, { receiver: idLoggedUser }] },
				]
			}).sort('createdAt');


            const messagesChat = messages.map(message => {
			  const	formatedMessage =  message.toObject()
				return {
					user: formatedMessage.sender,
					content: formatedMessage.content,
					createdAt: formatedMessage.createdAt,
					isSender: formatedMessage.sender.toString() === String(idLoggedUser)
				}
			})
		

		return res.status(200).json({
			success: true,
			data: messagesChat
		});	

	}
}

export default new MessageController();
