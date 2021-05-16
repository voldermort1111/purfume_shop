import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Query, Request, UsePipes } from '@nestjs/common';
import { ProductEvaluateService } from './data-access/evaluate.service';
import {
	EvaluateAvgPointDtoRequest,
	EvaluateBodyRequestDto,
	EvaluateListDtoRequest,
} from './data-access/dto/evaluate.dto';
import { GuardPublic } from '@guard/guard.decorator';
import { ValidationQueryPipe } from '@shared/pipes/validation.pipe';
import { ConvertHttpQueryPipe } from '@shared/pipes/convert-http-query.pipe';
import { BaseParamDto } from '@shared/dtos/base-request.dto';

@ApiTags('Evaluate')
@Controller('evaluate')
export class ProductEvaluateController {
	constructor(private readonly evaluateService: ProductEvaluateService) {}

	// @Get()
	// @GuardPublic()
	// get(@Query() query: ProductEvaluateDtoRequest) {
	// 	return this.evaluateService.findsByOptions(query);
	// }

	@Get('page')
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(EvaluateListDtoRequest))
	getPage(@Query() query: EvaluateListDtoRequest) {
		return this.evaluateService.getListEvaluatePagination(query);
	}

	@Get('avg-point')
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(EvaluateAvgPointDtoRequest))
	getAvgPoint(@Query() query: EvaluateAvgPointDtoRequest) {
		return this.evaluateService.getAdvPoint(query.productId);
	}

	@Post()
	@ApiBearerAuth()
	evaluate(@Body() body: EvaluateBodyRequestDto, @Request() req) {
		body.userId = req?.user?.userId;
		return this.evaluateService.evaluateProduct(body);
	}

	@Get('check-evaluated/:id')
	@ApiBearerAuth()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	checkEvaluated(@Param() param: BaseParamDto, @Request() req) {
		return this.evaluateService.checkEvaluated(req?.user?.userId, param.id);
	}
}
