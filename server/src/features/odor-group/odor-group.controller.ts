import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { GuardPublic, RolesAdmin } from '../../guard/guard.decorator';
import { OdorGroupService } from './data-access/odor-group.service';
import {
	OdorGroupBodyRequestDto,
	OdorGroupDtoRequest,
	OdorGroupUpdateRequestDto,
} from './data-access/dto/odor-group.dto';
import { RolesAdminGuard } from '@guard/roles-admin.guard';
import { ValidationQueryPipe } from '@shared/pipes/validation.pipe';
import { ConvertHttpQueryPipe } from '@shared/pipes/convert-http-query.pipe';
import { BaseParamDto } from '@shared/dtos/base-request.dto';
import { httpBadRequest } from '@shared/exceptions/http-exception';

@ApiTags('Odor group')
@Controller('odor-group')
export class OdorGroupController {
	constructor(private readonly odorGroupService: OdorGroupService) {}

	@Get()
	@GuardPublic()
	get(@Query() query: OdorGroupDtoRequest) {
		return this.odorGroupService.findsByOptions({ ...query, deletedAt: null });
	}

	@Get('page')
	@GuardPublic()
	getPage(@Query() query: OdorGroupDtoRequest) {
		return this.odorGroupService.findAndCountByOptions(query);
	}

	@Post()
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async create(@Body() body: OdorGroupBodyRequestDto) {
		await this.odorGroupService.create(body);
	}

	@Put(':id')
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async update(@Param() param: BaseParamDto, @Body() body: OdorGroupUpdateRequestDto) {
		if (!Object.keys(body).length) {
			return httpBadRequest('Dữ liệu thay đổi không hợp lệ!');
		}
		await this.odorGroupService.update(param.id, body);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	@RolesAdmin()
	async delete(@Param() param: BaseParamDto) {
		await this.odorGroupService.delete(param.id);
	}
}
