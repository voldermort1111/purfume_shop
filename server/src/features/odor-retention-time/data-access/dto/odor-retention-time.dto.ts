import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IOdorRetentionTime } from '@entities/entity-attribute/odor-retention-time.interface';
import { BaseQueryDto } from '@core/base-dto';
import { Exclude, Expose } from 'class-transformer';
import { AutoConvertNumber } from '@shared/pipes/decorator-convert-http-query';

export class OdorRetentionTimeDtoRequest extends BaseQueryDto implements IOdorRetentionTime {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	@AutoConvertNumber(OdorRetentionTimeDtoRequest)
	id: number;

	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	value: string;
}

@Exclude()
export class RetentionTimeBodyRequestDto implements IOdorRetentionTime {
	@Expose()
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	value: string;
}

@Exclude()
export class RetentionTimeUpdateRequestDto implements IOdorRetentionTime {
	@Expose()
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	value: string;
}
