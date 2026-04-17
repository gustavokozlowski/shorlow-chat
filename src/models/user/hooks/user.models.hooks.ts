import jsonwebtoken from 'jsonwebtoken';
import { hashPassword } from '../../../utils/password.util';
import { type UserModel, UserSchema } from '../user.model';

export const useHashPasswordHook = () =>
	UserSchema.pre<UserModel>('save', async function (): Promise<void> {
		this.password = await hashPassword(this.password);
	});

export const useGenerateJwtToken = () =>
	(UserSchema.methods.generateToken = function (this: UserModel): string {
		const decodedToken = {
			_id: String(this._id),
			name: this.name,
			photoUrl: this.photoUrl,
		};

		return jsonwebtoken.sign(decodedToken, Bun.env.JWT_SECRET, {
			expiresIn: Bun.env
				.JWT_EXPIRES_IN as jsonwebtoken.SignOptions['expiresIn'],
		});
	});
