import { CapacityBodyRequestDto, CapacityDtoRequest, CapacityUpdateRequestDto } from './data-access/dto/capacity.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, UsePipes, Put } from '@nestjs/common';
import { CapacityService } from './data-access/capacity.service';
import { RolesAdminGuard } from '@guard/roles-admin.guard';
import { GuardPublic, RolesAdmin } from '@guard/guard.decorator';
import { ValidationQueryPipe } from '@shared/pipes/validation.pipe';
import { ConvertHttpQueryPipe } from '@shared/pipes/convert-http-query.pipe';
import { BaseParamDto } from '@shared/dtos/base-request.dto';
import { httpBadRequest } from '@shared/exceptions/http-exception';

@ApiTags('Capacity')
@Controller('capacity')
export class CapacityController {
	constructor(private readonly capacityService: CapacityService) {}

	@Get()
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(CapacityDtoRequest))
	get(@Query() query: CapacityDtoRequest) {
		return this.capacityService.findsByOptions({ ...query, deletedAt: null });
	}

	@Get('page')
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(CapacityDtoRequest))
	getPage(@Query() query: CapacityDtoRequest) {
		return this.capacityService.findAndCountByOptions(query);
	}

	@Post()
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async create(@Body() body: CapacityBodyRequestDto) {
		await this.capacityService.create(body);
	}

	@Put(':id')
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async update(@Param() param: BaseParamDto, @Body() body: CapacityUpdateRequestDto) {
		if (!Object.keys(body).length) {
			return httpBadRequest('Dữ liệu thay đổi không hợp lệ!');
		}
		await this.capacityService.update(param.id, body);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	@RolesAdmin()
	async delete(@Param() param: BaseParamDto) {
		await this.capacityService.delete(param.id);
	}
}
