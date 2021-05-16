import { ProductModule } from '@features/product/product.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OdorRetentionTimeRepository } from './data-access/odor-retention-time.repository';
import { OdorRetentionTimeService } from './data-access/odor-retention-time.service';
import { OdorRetentionTimeController } from './odor-retention-time.controller';

@Module({
	imports: [TypeOrmModule.forFeature([OdorRetentionTimeRepository]), ProductModule],
	controllers: [OdorRetentionTimeController],
	providers: [OdorRetentionTimeService],
	exports: [OdorRetentionTimeService],
})
export class OdorRetentionTimeModule {}
