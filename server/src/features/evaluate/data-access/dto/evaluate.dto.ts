import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryDto } from '@core/base-dto';
import { AutoConvertNumber } from '@shared/pipes/decorator-convert-http-query';

export class EvaluateBodyRequestDto {
	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	productId: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	@Min(1)
	@Max(5)
	point: number;

	@ApiProperty({ required: false })
	@IsString()
	@MaxLength(1024)
	@IsOptional()
	comment?: string;

	userId: number;
}

export class EvaluateListDtoRequest extends BaseQueryDto {
	@ApiProperty()
	@IsNumber()
	@Min(1)
	@AutoConvertNumber(EvaluateListDtoRequest)
	productId: number;
}

export class EvaluateAvgPointDtoRequest {
	@ApiProperty()
	@IsNumber()
	@Min(1)
	@AutoConvertNumber(EvaluateAvgPointDtoRequest)
	productId: number;
}
