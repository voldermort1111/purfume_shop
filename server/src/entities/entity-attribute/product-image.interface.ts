import { IBaseAttribute } from './base-attribute.interface';

export interface IProductImage extends IBaseAttribute {
	productId: number;
	value: string;
}

export interface IProductImageQueryAttribute extends Partial<IProductImage> {}
