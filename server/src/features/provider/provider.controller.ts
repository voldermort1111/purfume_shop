import { ProviderBodyRequestDto, ProviderDtoRequest, ProviderUpdateRequestDto } from './data-access/dto/provider.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProviderService } from './data-access/provider.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { GuardPublic, RolesAdmin } from '../../guard/guard.decorator';
import { RolesAdminGuard } from '@guard/roles-admin.guard';
import { ValidationQueryPipe } from '@shared/pipes/validation.pipe';
import { ConvertHttpQueryPipe } from '@shared/pipes/convert-http-query.pipe';
import { BaseParamDto } from '@shared/dtos/base-request.dto';
import { httpBadRequest } from '@shared/exceptions/http-exception';

@ApiTags('Provider')
@Controller('provider')
export class ProviderController {
	constructor(private readonly providerService: ProviderService) {}

	@Get()
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(ProviderDtoRequest))
	get(@Query() query: ProviderDtoRequest) {
		return this.providerService.findsByOptions({ ...query, deletedAt: null });
	}

	@Get('page')
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(ProviderDtoRequest))
	getPage(@Query() query: ProviderDtoRequest) {
		return this.providerService.findAndCountByOptions(query);
	}

	@Post()
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async create(@Body() body: ProviderBodyRequestDto) {
		await this.providerService.create(body);
	}

	@Put(':id')
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async update(@Param() param: BaseParamDto, @Body() body: ProviderUpdateRequestDto) {
		if (!Object.keys(body).length) {
			return httpBadRequest('Dữ liệu thay đổi không hợp lệ!');
		}
		await this.providerService.update(param.id, body);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	@RolesAdmin()
	async delete(@Param() param: BaseParamDto) {
		await this.providerService.delete(param.id);
	}
}
