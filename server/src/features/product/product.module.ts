import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './data-access/product.repository';
import { ProductService } from './data-access/product.service';

@Module({
	imports: [TypeOrmModule.forFeature([ProductRepository])],
	providers: [ProductService],
	controllers: [ProductController],
	exports: [ProductService],
})
export class ProductModule {}
