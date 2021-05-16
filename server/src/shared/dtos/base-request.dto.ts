import { MaxLimitPagination } from './../../constants/api.constants';
import { EDirection } from '../../constants/api.constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { AutoConvertNumber } from '../pipes/decorator-convert-http-query';

export class BasePaginationRequestDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	@AutoConvertNumber(BasePaginationRequestDto)
	@Min(1)
	@Max(MaxLimitPagination)
	limit: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	@AutoConvertNumber(BasePaginationRequestDto)
	@Min(0)
	page: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	sortBy: string;

	@ApiProperty({ required: false, enum: EDirection })
	@IsOptional()
	@IsEnum(EDirection)
	direction: EDirection;
}

export class BasePaginationExcludeSortRequestDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	@AutoConvertNumber(BasePaginationRequestDto)
	@Min(1)
	@Max(MaxLimitPagination)
	limit: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	@AutoConvertNumber(BasePaginationRequestDto)
	@Min(0)
	page: number;

	@IsOptional()
	@IsEmpty()
	sortBy: string;

	@IsOptional()
	@IsEmpty()
	direction: EDirection;
}

export class BasePaginationResponseDto<T = any> {
	@ApiProperty()
	@IsNumber()
	@Min(0)
	total: number;

	data: T[];

	static convertToPaginationResponse<T = any>(data: [any[], number]) {
		return {
			data: data[0],
			total: data[1],
		} as BasePaginationResponseDto<T>;
	}
}

export class BaseParamDto {
	@ApiProperty()
	@IsNumber()
	@Min(1)
	@IsNotEmpty()
	@AutoConvertNumber(BaseParamDto)
	id: number;
}
