import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './data-access/product.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import {
	ProductBodyRequestDto,
	ProductCodeQueryDto,
	ProductDtoRequest,
	ProductIdsQueryDto,
	ProductResponseDto,
	ProductUpdateRequestDto,
} from './data-access/dto/product.dto';
import { GuardPublic, RolesAdmin } from '../../guard/guard.decorator';
import { ValidationQueryPipe } from '@shared/pipes/validation.pipe';
import { ConvertHttpQueryPipe } from '@shared/pipes/convert-http-query.pipe';
import { BaseParamDto } from '@shared/dtos/base-request.dto';
import { RolesAdminGuard } from '@guard/roles-admin.guard';

@ApiTags('Product')
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get()
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(ProductDtoRequest))
	get(@Query() query: ProductDtoRequest) {
		return this.productService.findsByOptions(query);
	}

	@Get('new')
	@GuardPublic()
	getNews() {
		return this.productService.getNews();
	}

	@Get('page')
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(ProductDtoRequest))
	@ApiOkResponse({ type: [ProductResponseDto] })
	getPage(@Query() query: ProductDtoRequest) {
		return this.productService.findAndCountByOptions(query);
	}

	@Get('get-by-ids')
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(ProductIdsQueryDto))
	getByListId(@Query() query: ProductIdsQueryDto) {
		return this.productService.findByIds(query.ids);
	}

	@Get(':id')
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	getOneByIdAndCode(@Param() param: BaseParamDto, @Query() query: ProductCodeQueryDto) {
		console.log(param, query);
		return this.productService.findByIdAndCode(param.id, query.code);
	}

	@Get('info/:id')
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	getInfo(@Param() query: BaseParamDto) {
		return this.productService.findById(query.id);
	}

	@Post()
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async create(@Body() body: ProductBodyRequestDto) {
		await this.productService.create(body);
	}

	@Post('add-image/:id')
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	async addImage(@Param() param: BaseParamDto, @Body() body: { image: string }) {
		await this.productService.addImage(param.id, body.image);
	}

	@Delete('remove-image/:id')
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	async removeImage(@Param() param: BaseParamDto) {
		await this.productService.removeImage(param.id);
	}

	@Put(':id')
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async update(@Param() param: BaseParamDto, @Body() body: ProductBodyRequestDto) {
		await this.productService.update(param.id, body);
	}
	@Put('update-avatar/:id')
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	async updateAvatar(@Param() param: BaseParamDto, @Body() body: ProductUpdateRequestDto) {
		await this.productService.updateAvatar(param.id, body.avatar);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@UseGuards(RolesAdminGuard)
	@RolesAdmin()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	async delete(@Param() param: BaseParamDto) {
		await this.productService.delete(param.id);
	}

	@Get('get-images/:id')
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	async getImages(@Param() param: BaseParamDto) {
		return this.productService.getImages(param.id);
	}

	@Get('get-avatar/:id')
	@GuardPublic()
	@UsePipes(ValidationQueryPipe)
	@UsePipes(new ConvertHttpQueryPipe(BaseParamDto))
	async getAvatar(@Param() param: BaseParamDto) {
		return this.productService.getAvatar(param.id);
	}
}
