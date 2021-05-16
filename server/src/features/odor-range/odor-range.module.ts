import { ProductModule } from '@features/product/product.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OdorRangeRepository } from './data-access/odor-range.repository';
import { OdorRangeService } from './data-access/odor-range.service';
import { OdorRangeController } from './odor-range.controller';

@Module({
	imports: [TypeOrmModule.forFeature([OdorRangeRepository]), ProductModule],
	controllers: [OdorRangeController],
	providers: [OdorRangeService],
	exports: [OdorRangeService],
})
export class OdorRangeModule {}
