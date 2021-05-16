import { IBaseAttribute } from './base-attribute.interface';

export interface IProvider extends IBaseAttribute {
	name: string;
	code?: string;
	nationalId: number;
	deletedAt?: Date;
}

export interface IProviderQueryAttribute extends Partial<IProvider> {}
