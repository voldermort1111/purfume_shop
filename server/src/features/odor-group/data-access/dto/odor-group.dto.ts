import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, MaxLength } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { IOdorGroup } from '@entities/entity-attribute/odor-group.interface';
import { BaseQueryDto } from '@core/base-dto';

export class OdorGroupDtoRequest extends BaseQueryDto implements IOdorGroup {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumberString()
	id: number;

	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	name: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	value: string;
}

@Exclude()
export class OdorGroupBodyRequestDto implements IOdorGroup {
	@Expose()
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	value: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	name: string;
}

@Exclude()
export class OdorGroupUpdateRequestDto implements IOdorGroup {
	@Expose()
	@ApiProperty()
	@IsString()
	@IsOptional()
	@MaxLength(50)
	value: string;

	@Expose()
	@IsString()
	@IsOptional()
	@MaxLength(50)
	name: string;
}
