import { hashPassword } from '../../../utils/password.util';
import { type UserModel, UserSchema } from '../user.model';

export const useHashPasswordHook = () =>
	UserSchema.pre<UserModel>('save', async function () {
		this.password = await hashPassword(this.password);
	});
