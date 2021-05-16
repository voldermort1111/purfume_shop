import { ApiProperty } from '@nestjs/swagger';
import { AutoConvertNumber } from '@shared/pipes/decorator-convert-http-query';
import { EPageDirection, IOptionsPaging } from '@shared/types/shared.type';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class BaseQueryDto implements IOptionsPaging {
	@IsOptional()
	@ApiProperty({ required: false })
	@IsNumber()
	@AutoConvertNumber(BaseQueryDto)
	limit: number;

	@IsOptional()
	@ApiProperty({ required: false })
	@IsNumber()
	@AutoConvertNumber(BaseQueryDto)
	page: number;

	@IsOptional()
	@ApiProperty({ required: false })
	@IsString()
	sortBy: string;

	@IsOptional()
	@ApiProperty({ required: false, enum: EPageDirection })
	@IsEnum(EPageDirection)
	direction: EPageDirection;
}
