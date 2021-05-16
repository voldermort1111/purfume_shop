import { IBaseAttribute } from './base-attribute.interface';

export interface IOdorRange extends IBaseAttribute {
	value: string;
	deletedAt?: Date;
}
export interface IOdorRangeQueryAttribute extends Partial<IOdorRange> {}
