import { ProductModule } from '@features/product/product.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './data-access/order.repository';
import { OrderService } from './data-access/order.service';
import { OrderController } from './order.controller';

@Module({
	imports: [TypeOrmModule.forFeature([OrderRepository]), ProductModule],
	controllers: [OrderController],
	providers: [OrderService],
})
export class OrderModule {}
