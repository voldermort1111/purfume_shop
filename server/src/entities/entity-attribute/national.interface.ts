import { IBaseAttribute } from './base-attribute.interface';

export interface INational extends IBaseAttribute {
	name: string;
	code?: string;
	deletedAt?: Date;
}

export interface INationalQueryAttribute extends Partial<INational> {}
