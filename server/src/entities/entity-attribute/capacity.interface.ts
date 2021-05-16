import { ECapacityUnit } from '../../constants/entity.constants';
import { IBaseAttribute } from './base-attribute.interface';

export interface ICapacity extends IBaseAttribute {
	value: number;
	unit: ECapacityUnit;
	deletedAt?: Date;
}

export interface ICapacityQueryAttribute extends Partial<ICapacity> {}
