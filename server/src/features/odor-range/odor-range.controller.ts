import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { GuardPublic, RolesAdmin } from '../../guard/guard.decorator';
import { OdorRangeService } from './data-access/odor-range.service';
import {
	OdorRangeBodyRequestDto,
	OdorRangeDtoRequest,
	OdorRangeUpdateRequestDto,
} from './data-access/dto/odor-range.dto';
import { RolesAdminGuard } from '@guard/roles-admin.guard';
import { ValidationQueryPipe } from '@shared/pipes/validation.pipe';
import { ConvertHttpQueryPipe } from '@shared/pipes/convert-http-query.pipe';
import { BaseParamDto } from '@shared/dtos/base-request.dto';

@ApiTags('Odor range')
@Controller('odor-range')
export class OdorRangeController {
	constructor(private readonly odorGroupService: OdorRangeService) {}

	@Get()
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(OdorRangeDtoRequest))
	get(@Query() query: OdorRangeDtoRequest) {
		return this.odorGroupService.findsByOptions({ ...query, deletedAt: null });
	}

	@Get('page')
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(OdorRangeDtoRequest))
	getPage(@Query() query: OdorRangeDtoRequest) {
		return this.odorGroupService.findAndCountByOptions(query);
	}

	@Post()
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async create(@Body() body: OdorRangeBodyRequestDto) {
		await this.odorGroupService.create(body);
	}

	@Put(':id')
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async update(@Param() param: BaseParamDto, @Body() body: OdorRangeUpdateRequestDto) {
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
