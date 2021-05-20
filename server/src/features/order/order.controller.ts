import { OrderBodyDto, OrderDtoRequest, OrderUpdateBodyRequestDto } from './data-access/dto/order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards, UsePipes } from '@nestjs/common';
import { GuardPublic, RolesAdmin } from '../../guard/guard.decorator';
import { OrderService } from './data-access/order.service';
import { ValidationQueryPipe } from '@shared/pipes/validation.pipe';
import { ConvertHttpQueryPipe } from '@shared/pipes/convert-http-query.pipe';
import { BaseParamDto } from '@shared/dtos/base-request.dto';
import { RolesAdminGuard } from '@guard/roles-admin.guard';

@ApiTags('Order')
@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get()
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(OrderDtoRequest))
	get(@Query() query: OrderDtoRequest) {
		return this.orderService.findsByOptions({ ...query, deletedAt: null });
	}

	@Get('page')
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(OrderDtoRequest))
	getPage(@Query() query: OrderDtoRequest) {
		return this.orderService.findAndCountByOptions({ ...query, deletedAt: null });
	}

	@Post()
	@GuardPublic()
	async post(@Body() body: OrderBodyDto) {
		await this.orderService.createOrder(body);
	}

	@Post('has-auth')
	@ApiBearerAuth()
	async postHasAuth(@Body() body: OrderBodyDto, @Request() req) {
		body.userId = req?.user?.userId;
		await this.orderService.createOrder(body);
	}

	@Put(':id')
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async update(@Param() param: BaseParamDto, @Body() body: OrderUpdateBodyRequestDto) {
		await this.orderService.update(param.id, body);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	@RolesAdmin()
	async delete(@Param() param: BaseParamDto) {
		await this.orderService.delete(param.id);
	}

	@Get('product-by-order/:id')
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	async getProductsByOrder(@Param() param: BaseParamDto) {
		return this.orderService.getProductsByOrder(param.id);
	}
}
