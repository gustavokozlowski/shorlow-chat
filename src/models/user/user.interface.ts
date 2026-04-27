import type { Types } from 'mongoose';
export interface User {
	_id: Types.ObjectId;
	name: string;
	password: string;
	photoUrl?: string;
}
