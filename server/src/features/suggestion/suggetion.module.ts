import { WorkerModule } from 'workers/worker.module';
import { SuggestionService } from './data-access/suggestion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductRepository } from '@features/product/data-access/product.repository';
import { SuggestionController } from './suggestion.controller';

@Module({
	imports: [TypeOrmModule.forFeature([ProductRepository]), WorkerModule],
	providers: [SuggestionService],
	controllers: [SuggestionController],
})
export class SuggestionModule {}
