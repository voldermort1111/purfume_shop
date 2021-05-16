import { IBaseAttribute } from './base-attribute.interface';

export interface IStyle extends IBaseAttribute {
	value: string;
	deletedAt?: Date;
}

export interface IStyleQueryAttribute extends Partial<IStyle> {}
