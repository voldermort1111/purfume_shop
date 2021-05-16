import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { GuardPublic, RolesAdmin } from '@guard/guard.decorator';
import { StyleService } from './data-access/style.service';
import { StyleBodyRequestDto, StyleDtoRequest, StyleUpdateRequestDto } from './data-access/dto/style.dto';
import { RolesAdminGuard } from '@guard/roles-admin.guard';
import { ValidationQueryPipe } from '@shared/pipes/validation.pipe';
import { ConvertHttpQueryPipe } from '@shared/pipes/convert-http-query.pipe';
import { BaseParamDto } from '@shared/dtos/base-request.dto';

@ApiTags('Style')
@Controller('style')
export class StyleController {
	constructor(private readonly styleService: StyleService) {}

	@Get()
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(StyleDtoRequest))
	get(@Query() query: StyleDtoRequest) {
		return this.styleService.findsByOptions({ ...query, deletedAt: null });
	}

	@Get('page')
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(StyleDtoRequest))
	getPage(@Query() query: StyleDtoRequest) {
		return this.styleService.findAndCountByOptions(query);
	}

	@Post()
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async create(@Body() body: StyleBodyRequestDto) {
		await this.styleService.create(body);
	}

	@Put(':id')
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async update(@Param() param: BaseParamDto, @Body() body: StyleUpdateRequestDto) {
		await this.styleService.update(param.id, body);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	@RolesAdmin()
	async delete(@Param() param: BaseParamDto) {
		await this.styleService.delete(param.id);
	}
}
