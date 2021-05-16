import { IOrder, IOrderQueryAttribute } from './../../../../entities/entity-attribute/order.interface';
import { EOrderStatus } from './../../../../constants/entity.constants';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsArray,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsNumberString,
	IsOptional,
	IsString,
	Max,
	MaxLength,
	Min,
	MinLength,
	ValidateNested,
} from 'class-validator';
import { BaseQueryDto } from '../../../../core/base-dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { AutoConvertNumber } from '@shared/pipes/decorator-convert-http-query';

export class OrderDtoRequest extends BaseQueryDto implements IOrder {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	@AutoConvertNumber(OrderDtoRequest)
	id: number;

	@IsOptional()
	@ApiProperty({ required: false })
	@IsNumber()
	@AutoConvertNumber(OrderDtoRequest)
	userId: number;

	@IsOptional()
	@ApiProperty({ required: false })
	@IsNumber()
	@AutoConvertNumber(OrderDtoRequest)
	price: number;

	@ApiProperty({ enum: EOrderStatus, required: false })
	@IsOptional()
	@IsEnum(EOrderStatus)
	status: EOrderStatus;

	@IsOptional()
	@ApiProperty({ required: false })
	@IsString()
	receiver: string;

	@IsOptional()
	@ApiProperty({ required: false })
	@IsString()
	phoneNumber: string;

	@IsOptional()
	@ApiProperty({ required: false })
	@IsString()
	address: string;

	@IsOptional()
	@ApiProperty({ required: false })
	@IsString()
	note: string;

	@IsOptional()
	@ApiProperty({ required: false })
	@IsString()
	createdAt: Date;

	@IsOptional()
	@ApiProperty({ required: false })
	@IsString()
	updatedAt: Date;
}

class Product {
	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	id: number;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	@Max(5)
	quantity: number;
}

@Exclude()
export class OrderBodyDto implements IOrderQueryAttribute {
	userId?: number;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	@Expose()
	name: string;

	@ApiProperty()
	@MaxLength(15)
	@MinLength(9)
	@IsNotEmpty()
	@Expose()
	phoneNumber: string;

	@ApiProperty()
	@MaxLength(255)
	@IsString()
	@IsNotEmpty()
	@Expose()
	address: string;

	@ApiProperty()
	@MaxLength(255)
	@IsOptional()
	@Expose()
	note: string;

	@Type(() => Product)
	@ValidateNested()
	@IsArray()
	@IsNotEmpty()
	@Expose()
	products: Product[];
}

@Exclude()
export class OrderUpdateBodyRequestDto {
	@ApiProperty({ enum: EOrderStatus })
	@Expose()
	@IsEnum(EOrderStatus)
	@IsNotEmpty()
	status: EOrderStatus;
}
