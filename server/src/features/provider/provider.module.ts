import { ProviderRepository } from './data-access/provider.repository';
import { ProviderService } from './data-access/provider.service';
import { ProviderController } from './provider.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '@features/product/product.module';
import { NationalModule } from '@features/national/national.module';

@Module({
	imports: [TypeOrmModule.forFeature([ProviderRepository]), NationalModule, ProductModule],
	controllers: [ProviderController],
	providers: [ProviderService],
	exports: [ProviderService],
})
export class ProviderModule {}
