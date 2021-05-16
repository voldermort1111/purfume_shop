import { BaseQueryDto } from '@core/base-dto';
import { IStyle } from '@entities/entity-attribute/style.interface';
import { ApiProperty } from '@nestjs/swagger';
import { AutoConvertNumber } from '@shared/pipes/decorator-convert-http-query';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class StyleDtoRequest extends BaseQueryDto implements IStyle {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	@AutoConvertNumber(StyleDtoRequest)
	id: number;

	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	value: string;
}

@Exclude()
export class StyleBodyRequestDto implements IStyle {
	@Expose()
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	value: string;
}

@Exclude()
export class StyleUpdateRequestDto implements IStyle {
	@Expose()
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	value: string;
}
