import { ECapacityUnit } from '@constants/entity.constants';
import { BaseQueryDto } from '@core/base-dto';
import { ICapacity } from '@entities/entity-attribute/capacity.interface';
import { ApiProperty } from '@nestjs/swagger';
import { AutoConvertNumber } from '@shared/pipes/decorator-convert-http-query';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CapacityDtoRequest extends BaseQueryDto implements ICapacity {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	@AutoConvertNumber(CapacityDtoRequest)
	id: number;

	@IsOptional()
	@IsNumber()
	@AutoConvertNumber(CapacityDtoRequest)
	@ApiProperty({ required: false })
	value: number;

	@IsString()
	@IsOptional()
	@IsEnum(ECapacityUnit)
	@ApiProperty({ required: false })
	unit: ECapacityUnit;
}

@Exclude()
export class CapacityBodyRequestDto implements ICapacity {
	@Expose()
	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	@Min(0)
	@Max(10000)
	value: number;

	@Expose()
	@IsEnum(ECapacityUnit)
	@IsNotEmpty()
	unit: ECapacityUnit;
}

@Exclude()
export class CapacityUpdateRequestDto implements ICapacity {
	@Expose()
	@ApiProperty()
	@IsNumber()
	@IsOptional()
	@Min(0)
	@Max(10000)
	value: number;

	@Expose()
	@IsEnum(ECapacityUnit)
	@IsOptional()
	unit: ECapacityUnit;
}
