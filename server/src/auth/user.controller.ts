import { UserService } from './data-access/user.service';
import { Body, Controller, Get, Request, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { httpUnAuthorized } from '@shared/exceptions/http-exception';
import { UpdateUserInfoBodyDto } from './data-access/dto/auth.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('get-name')
	@ApiBearerAuth()
	async getName(@Request() req) {
		const userId = req?.user?.userId;
		if (!userId) {
			httpUnAuthorized();
		}
		return this.userService.getName(userId);
	}

	@Get('get-info')
	@ApiBearerAuth()
	async getInfo(@Request() req) {
		const userId = req?.user?.userId;
		if (!userId) {
			httpUnAuthorized();
		}
		return this.userService.getInfo(userId);
	}

	@Put()
	@ApiBearerAuth()
	updateInfo(@Body() body: UpdateUserInfoBodyDto, @Request() req) {
		return this.userService.updateById(req?.user?.userId, body);
	}
}
