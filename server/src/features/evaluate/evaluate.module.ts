import { ProductEvaluateController } from './evaluate.controller';
import { ProductEvaluateService } from './data-access/evaluate.service';
import { ProductEvaluateRepository } from './data-access/evaluate.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([ProductEvaluateRepository])],
	providers: [ProductEvaluateService],
	controllers: [ProductEvaluateController],
	exports: [ProductEvaluateService],
})
export class EvaluateModule {}
