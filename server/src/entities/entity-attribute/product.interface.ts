import { EGender, EProductStatus } from '../../constants/entity.constants';
import { IBaseIncludeDateAttribute } from './base-attribute.interface';

export interface IProduct extends IBaseIncludeDateAttribute {
	avatar: string;
	name: string;
	code: string;
	status: EProductStatus;
	quantity: number;
	gender: EGender;
	price: number;
	originPrice: number;
	providerId: number;
	capacityId: number;
	styleId: number;
	odorRetentionTimeId: number;
	odorGroupId: number;
	odorRangeId: number;
}

export interface IProductQueryAttribute extends Partial<IProduct> {}
