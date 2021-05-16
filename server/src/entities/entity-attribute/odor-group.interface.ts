import { IBaseAttribute } from './base-attribute.interface';

export interface IOdorGroup extends IBaseAttribute {
	value: string;
	name: string;
	deletedAt?: Date;
}

export interface IOdorGroupQueryAttribute extends Partial<IOdorGroup> {}
