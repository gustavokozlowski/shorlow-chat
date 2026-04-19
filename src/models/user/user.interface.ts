import type { Types } from "mongoose";
export interface User {
	_id: Types.ObjectId | string;
	name: string;
	password: string;
	photoUrl?: string;
}
