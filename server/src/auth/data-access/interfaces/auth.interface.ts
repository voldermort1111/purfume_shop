import { EAccountType } from './../../../constants/entity.constants';
export interface IRefeshToken {
	userId: number;
	refreshToken: string;
}

export interface IJwtPayload {
	userId: number;
	type: EAccountType;
	roles: string[];
}
