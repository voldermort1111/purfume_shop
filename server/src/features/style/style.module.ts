import { ProductModule } from '@features/product/product.module';
import { StyleRepository } from './data-access/style.repository';
import { StyleService } from './data-access/style.service';
import { StyleController } from './style.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([StyleRepository]), ProductModule],
	controllers: [StyleController],
	providers: [StyleService],
	exports: [StyleService],
})
export class StyleModule {}
