import { Router } from 'express';
import messageController from '../controllers/message/message.controller';

const messageRoute = Router();

messageRoute.post('/send/:id', messageController.send);

export default messageRoute;
