import { EOrderStatus } from '../../constants/entity.constants';
import { IBaseIncludeDateAttribute } from './base-attribute.interface';

export interface IOrder extends Omit<IBaseIncludeDateAttribute, 'deletedAt'> {
	userId: number;
	price: number;
	status: EOrderStatus;
	receiver: string;
	phoneNumber: string;
	address: string;
	note: string;
	deletedAt?: Date;
}

export interface IOrderQueryAttribute extends Partial<IOrder> {}
