import { NationalBodyRequestDto, NationalDtoRequest, NationalUpdateRequestDto } from './data-access/dto/national.dto';
import { NationalService } from './data-access/national.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { GuardPublic, RolesAdmin } from '../../guard/guard.decorator';
import { ValidationQueryPipe } from '@shared/pipes/validation.pipe';
import { ConvertHttpQueryPipe } from '@shared/pipes/convert-http-query.pipe';
import { RolesAdminGuard } from '@guard/roles-admin.guard';
import { BaseParamDto } from '@shared/dtos/base-request.dto';

@ApiTags('National')
@Controller('national')
export class NationalController {
	constructor(private readonly nationalService: NationalService) {}

	@Get()
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(NationalDtoRequest))
	get(@Query() query: NationalDtoRequest) {
		return this.nationalService.findsByOptions({ ...query, deletedAt: null });
	}

	@Get('page')
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(NationalDtoRequest))
	getPage(@Query() query: NationalDtoRequest) {
		return this.nationalService.findAndCountByOptions(query);
	}

	@Post()
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async create(@Body() body: NationalBodyRequestDto) {
		await this.nationalService.create(body);
	}

	@Put(':id')
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async update(@Param() param: BaseParamDto, @Body() body: NationalUpdateRequestDto) {
		await this.nationalService.update(param.id, body);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	@RolesAdmin()
	async delete(@Param() param: BaseParamDto) {
		await this.nationalService.delete(param.id);
	}
}
