import { EUserRole } from '../../constants/entity.constants';
import { IBaseIncludeDateAttribute } from './base-attribute.interface';

export interface IUser extends IBaseIncludeDateAttribute {
	name: string;
	email: string;
	password: string;
	phoneNumber?: string;
	role?: EUserRole;
	salt: string;
	iterations: number;
	isNew?: boolean;
}
export interface IUserQueryAttribute extends Partial<IUser> {}
