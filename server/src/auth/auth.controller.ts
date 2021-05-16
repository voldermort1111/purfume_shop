import { RolesAdmin } from './../guard/guard.decorator';
import { RolesAdminGuard } from './../guard/roles-admin.guard';
import { AuthService } from './auth.service';
import { Controller, Post, Body, Get, Query, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginResponseDto, RefreshJwtTokenDto, RegisterDto } from './data-access/dto/auth.dto';
import { GuardPublic } from '../guard/guard.decorator';
import { EUserRole } from '@constants/entity.constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@GuardPublic()
	@ApiOkResponse({ type: LoginResponseDto })
	regiter(@Body() userCreate: RegisterDto): Promise<LoginResponseDto> {
		return this.authService.register(userCreate);
	}

	@Post('login')
	@GuardPublic()
	@ApiOkResponse({ type: LoginResponseDto })
	login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
		return this.authService.login(loginDto);
	}

	@Post('admin-login')
	@GuardPublic()
	@ApiOkResponse({ type: LoginResponseDto })
	adminLogin(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
		return this.authService.adminLogin(loginDto);
	}

	@Put('change-password')
	@ApiBearerAuth()
	async changePassword(@Body() body: { password: string }, @Request() req) {
		return this.authService.changePassword(req?.user.userId, body.password);
	}

	@Post('create')
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin(EUserRole.admin)
	create(@Body() userCreate: RegisterDto) {
		console.log(userCreate);
		// return this.authService.createAccount(userCreate);
	}

	// @Post('forgot-password')
	// async forgetPassword(
	// 	@Body() body: ForgotPasswordDto,
	// ): Promise<{
	// 	message: string;
	// }> {
	// 	try {
	// 		await this.authService.forgotPassword(body.email);
	// 	} catch (e) {
	// 		throw new HttpException(
	// 			{
	// 				status: HttpStatus.BAD_REQUEST,
	// 				error: e.message,
	// 			},
	// 			HttpStatus.BAD_REQUEST,
	// 		);
	// 	}
	// 	return { message: 'success' };
	// }

	@Get('refresh-token')
	@GuardPublic()
	refreshToken(@Query() query: RefreshJwtTokenDto): Promise<string> {
		return this.authService.refreshJwtToken(query.refreshToken);
	}
}
