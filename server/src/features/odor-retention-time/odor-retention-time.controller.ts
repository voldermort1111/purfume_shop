import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { GuardPublic, RolesAdmin } from '../../guard/guard.decorator';
import { OdorRetentionTimeService } from './data-access/odor-retention-time.service';
import {
	OdorRetentionTimeDtoRequest,
	RetentionTimeBodyRequestDto,
	RetentionTimeUpdateRequestDto,
} from './data-access/dto/odor-retention-time.dto';
import { RolesAdminGuard } from '@guard/roles-admin.guard';
import { ValidationQueryPipe } from '@shared/pipes/validation.pipe';
import { ConvertHttpQueryPipe } from '@shared/pipes/convert-http-query.pipe';
import { BaseParamDto } from '@shared/dtos/base-request.dto';

@ApiTags('Odor retention time')
@Controller('odor-retention-time')
export class OdorRetentionTimeController {
	constructor(private readonly odorRetentionTimeService: OdorRetentionTimeService) {}

	@Get()
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(OdorRetentionTimeDtoRequest))
	get(@Query() query: OdorRetentionTimeDtoRequest) {
		return this.odorRetentionTimeService.findsByOptions({ ...query, deletedAt: null });
	}

	@Get('page')
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(OdorRetentionTimeDtoRequest))
	getPage(@Query() query: OdorRetentionTimeDtoRequest) {
		return this.odorRetentionTimeService.findAndCountByOptions(query);
	}

	@Post()
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async create(@Body() body: RetentionTimeBodyRequestDto) {
		await this.odorRetentionTimeService.create(body);
	}

	@Put(':id')
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async update(@Param() param: BaseParamDto, @Body() body: RetentionTimeUpdateRequestDto) {
		await this.odorRetentionTimeService.update(param.id, body);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	@RolesAdmin()
	async delete(@Param() param: BaseParamDto) {
		await this.odorRetentionTimeService.delete(param.id);
	}
}
