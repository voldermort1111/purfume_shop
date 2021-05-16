import { IBaseAttribute } from './base-attribute.interface';

export interface IOrderProduct extends IBaseAttribute {
	orderId: number;
	productId: number;
	unitPrice: number;
	quantity: number;
}

export interface IOrderProductQueryAttribute extends Partial<IOrderProduct> {}
