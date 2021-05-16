import { IBaseIncludeDateAttribute } from './base-attribute.interface';

export interface IProductEvaluate extends Omit<IBaseIncludeDateAttribute, 'deletedAt'> {
	userId: number;
	productId: number;
	point: number;
	comment: string;
}
export interface IProductEvaluateQueryAttribute extends Partial<IProductEvaluate> {}
