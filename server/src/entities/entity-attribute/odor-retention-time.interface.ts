import { IBaseAttribute } from './base-attribute.interface';

export interface IOdorRetentionTime extends IBaseAttribute {
	value: string;
	deletedAt?: Date;
}
export interface IOdorRetentionTimeQueryAttribute extends Partial<IOdorRetentionTime> {}
