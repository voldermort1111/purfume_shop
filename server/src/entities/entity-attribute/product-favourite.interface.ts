import { IBaseAttribute } from './base-attribute.interface';

export interface IProductFavourite extends IBaseAttribute {
	userId: number;
	productId: number;
}
export interface IProductFavouriteQueryAttribute extends Partial<IProductFavourite> {}
