import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class AuthDto {
	@ApiProperty()
	@IsEmail()
	@IsNotEmpty()
	@Expose()
	email: string;
}

export class LoginDto extends AuthDto {
	@ApiProperty()
	@IsNotEmpty()
	@Expose()
	password: string;
}

@Exclude()
export class RegisterDto extends AuthDto {
	@ApiProperty()
	@IsNotEmpty()
	@Expose()
	password: string;

	@ApiProperty()
	@IsNotEmpty()
	@Expose()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@Expose()
	phoneNumber: string;
}

export class ForgotPasswordDto extends AuthDto {}

export class LoginResponseDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	accessToken: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	refreshToken: string;
}

export class RefreshJwtTokenDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	refreshToken: string;
}

@Exclude()
export class UpdateUserInfoBodyDto {
	@ApiProperty()
	@IsNotEmpty()
	@Expose()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@Expose()
	phoneNumber: string;
}
