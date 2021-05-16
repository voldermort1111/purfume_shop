import { CapacityModule } from '@features/capacity/capacity.module';
import { EvaluateModule } from '@features/evaluate/evaluate.module';
import { OdorGroupModule } from '@features/odor-group/odor-group.module';
import { OdorRangeModule } from '@features/odor-range/odor-range.module';
import { OdorRetentionTimeModule } from '@features/odor-retention-time/odor-retention-time.module';
import { ProviderModule } from '@features/provider/provider.module';
import { StyleModule } from '@features/style/style.module';
import { Module } from '@nestjs/common';
import { ProductSuggestionWorker } from './product-suggestion.worker';

@Module({
	imports: [
		EvaluateModule,
		ProviderModule,
		CapacityModule,
		StyleModule,
		OdorRetentionTimeModule,
		OdorGroupModule,
		OdorRangeModule,
	],
	providers: [ProductSuggestionWorker],
	exports: [ProductSuggestionWorker],
})
export class WorkerModule {}
