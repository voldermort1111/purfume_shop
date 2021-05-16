import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { AutoConvertNumber } from '@shared/pipes/decorator-convert-http-query';
import { IProvider } from '@entities/entity-attribute/provider.interface';
import { BaseQueryDto } from '@core/base-dto';

export class ProviderDtoRequest extends BaseQueryDto implements IProvider {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	@AutoConvertNumber(ProviderDtoRequest)
	id: number;

	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	name: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	code: string;

	@IsOptional()
	@ApiProperty({ required: false })
	@IsNumber()
	@AutoConvertNumber(ProviderDtoRequest)
	nationalId: number;
}

@Exclude()
export class ProviderBodyRequestDto implements IProvider {
	@Expose()
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@Expose()
	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	nationalId: number;
}

@Exclude()
export class ProviderUpdateRequestDto implements IProvider {
	@Expose()
	@ApiProperty()
	@IsString()
	@IsOptional()
	name: string;

	@Expose()
	@ApiProperty()
	@IsNumber()
	@IsOptional()
	nationalId: number;
}
