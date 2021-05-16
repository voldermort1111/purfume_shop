import { BaseQueryDto } from '@core/base-dto';
import { IOdorRange } from '@entities/entity-attribute/odor-range.interface';
import { ApiProperty } from '@nestjs/swagger';
import { AutoConvertNumber } from '@shared/pipes/decorator-convert-http-query';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class OdorRangeDtoRequest extends BaseQueryDto implements IOdorRange {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	@AutoConvertNumber(OdorRangeDtoRequest)
	@Min(1)
	id: number;

	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	value: string;
}

@Exclude()
export class OdorRangeBodyRequestDto implements IOdorRange {
	@Expose()
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	value: string;
}

@Exclude()
export class OdorRangeUpdateRequestDto implements IOdorRange {
	@Expose()
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	value: string;
}
