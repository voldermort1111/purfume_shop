import { CapacityService } from './data-access/capacity.service';
import { CapacityRepository } from './data-access/capacity.repository';
import { CapacityController } from './capacity.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '@features/product/product.module';

@Module({
	imports: [TypeOrmModule.forFeature([CapacityRepository]), ProductModule],
	controllers: [CapacityController],
	providers: [CapacityService],
	exports: [CapacityService],
})
export class CapacityModule {}
