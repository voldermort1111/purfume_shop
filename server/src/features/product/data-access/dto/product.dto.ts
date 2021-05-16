import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { IProduct } from '@entities/entity-attribute/product.interface';
import { BaseQueryDto } from '@core/base-dto';
import { EGender, EProductStatus } from '@constants/entity.constants';
import {
	AutoConvertArrayNumber,
	AutoConvertBoolean,
	AutoConvertNumber,
} from '@shared/pipes/decorator-convert-http-query';

@Exclude()
export class ProductDtoRequest extends BaseQueryDto implements Partial<IProduct> {
	@IsString()
	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	name: string;

	@IsString()
	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	code: string;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false, enum: EProductStatus })
	@IsEnum(EProductStatus)
	status: EProductStatus;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	@IsNumber()
	@AutoConvertNumber(ProductDtoRequest)
	quantity: number;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false, enum: EGender })
	@IsEnum(EGender)
	gender: EGender;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	@IsNumber()
	@AutoConvertNumber(ProductDtoRequest)
	price: number;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	@IsNumber()
	@AutoConvertNumber(ProductDtoRequest)
	originPrice: number;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	@IsNumber()
	@AutoConvertNumber(ProductDtoRequest)
	providerId: number;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	@IsNumber()
	@AutoConvertNumber(ProductDtoRequest)
	capacityId: number;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	@IsNumber()
	@AutoConvertNumber(ProductDtoRequest)
	styleId: number;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	@IsNumber()
	@AutoConvertNumber(ProductDtoRequest)
	odorRetentionTimeId: number;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	@IsNumber()
	@AutoConvertNumber(ProductDtoRequest)
	odorGroupId: number;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	@IsNumber()
	@AutoConvertNumber(ProductDtoRequest)
	odorRangeId: number;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	@IsNumber()
	@AutoConvertNumber(ProductDtoRequest)
	id: number;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	@IsNumber()
	@AutoConvertNumber(ProductDtoRequest)
	minPrice: number;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	@IsNumber()
	@AutoConvertNumber(ProductDtoRequest)
	maxPrice: number;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	@IsBoolean()
	@AutoConvertBoolean(ProductDtoRequest)
	loadEagerRelations: boolean;
}

@Exclude()
export class ProductResponseDto {
	@IsOptional()
	@ApiProperty({ required: false })
	@Expose()
	id: number;

	@IsString()
	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	name: string;

	@IsString()
	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	code: string;

	@IsOptional()
	@ApiProperty({ required: false, enum: EProductStatus })
	@IsEnum(EProductStatus)
	@Expose()
	status: EProductStatus;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	quantity: number;

	@IsOptional()
	@ApiProperty({ required: false, enum: EGender })
	@IsEnum(EGender)
	@Expose()
	gender: EGender;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	price: number;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	originPrice: number;

	@Expose()
	@ApiProperty({ required: false })
	provider: any;

	@Expose()
	@ApiProperty({ required: false })
	capacity: any;

	@Expose()
	@ApiProperty({ required: false })
	style: any;

	@Expose()
	@ApiProperty({ required: false })
	odorRetentionTime: any;

	@Expose()
	@ApiProperty({ required: false })
	odorGroup: any;

	@Expose()
	@ApiProperty({ required: false })
	odorRange: any;

	@IsOptional()
	@Expose()
	@ApiProperty({ required: false })
	avatar: string;
}

export class ProductIdsQueryDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsArray()
	@AutoConvertArrayNumber(ProductIdsQueryDto)
	ids: number[];
}

export class ProductCodeQueryDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	code: string;
}

@Exclude()
export class ProductBodyRequestDto {
	@IsString()
	@IsNotEmpty()
	@Expose()
	@ApiProperty()
	name: string;

	@IsString()
	@IsNotEmpty()
	@Expose()
	@ApiProperty()
	code: string;

	@IsNotEmpty()
	@Expose()
	@ApiProperty({ enum: EProductStatus })
	@IsEnum(EProductStatus)
	status: EProductStatus;

	@IsNotEmpty()
	@Expose()
	@ApiProperty()
	@IsNumber()
	@AutoConvertNumber(ProductDtoRequest)
	quantity: number;

	@IsNotEmpty()
	@Expose()
	@ApiProperty({ enum: EGender })
	@IsEnum(EGender)
	gender: EGender;

	@IsNotEmpty()
	@Expose()
	@ApiProperty()
	@IsNumber()
	price: number;

	@IsNotEmpty()
	@Expose()
	@ApiProperty()
	@IsNumber()
	originPrice: number;

	@IsNotEmpty()
	@Expose()
	@ApiProperty()
	@IsNumber()
	providerId: number;

	@IsNotEmpty()
	@Expose()
	@ApiProperty()
	@IsNumber()
	capacityId: number;

	@IsNotEmpty()
	@Expose()
	@ApiProperty()
	@IsNumber()
	styleId: number;

	@IsNotEmpty()
	@Expose()
	@ApiProperty()
	@IsNumber()
	odorRetentionTimeId: number;

	@IsNotEmpty()
	@Expose()
	@ApiProperty()
	@IsNumber()
	odorGroupId: number;

	@IsNotEmpty()
	@Expose()
	@ApiProperty()
	@IsNumber()
	odorRangeId: number;
}

@Exclude()
export class ProductUpdateRequestDto {
	@IsString()
	@IsOptional()
	@Expose()
	@ApiProperty()
	avatar: string;
}
