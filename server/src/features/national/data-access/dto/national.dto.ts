import { BaseQueryDto } from '@core/base-dto';
import { INational } from '@entities/entity-attribute/national.interface';
import { ApiProperty } from '@nestjs/swagger';
import { AutoConvertNumber } from '@shared/pipes/decorator-convert-http-query';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class NationalDtoRequest extends BaseQueryDto implements INational {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	@AutoConvertNumber(NationalDtoRequest)
	id: number;

	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	name: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	code: string;
}

@Exclude()
export class NationalBodyRequestDto implements INational {
	@Expose()
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	name: string;
}

@Exclude()
export class NationalUpdateRequestDto implements INational {
	@Expose()
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	name: string;
}
