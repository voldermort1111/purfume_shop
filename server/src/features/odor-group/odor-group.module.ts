import { ProductModule } from '@features/product/product.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OdorGroupRepository } from './data-access/odor-group.repository';
import { OdorGroupService } from './data-access/odor-group.service';
import { OdorGroupController } from './odor-group.controller';

@Module({
	imports: [TypeOrmModule.forFeature([OdorGroupRepository]), ProductModule],
	controllers: [OdorGroupController],
	providers: [OdorGroupService],
	exports: [OdorGroupService],
})
export class OdorGroupModule {}
