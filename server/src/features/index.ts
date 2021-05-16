import { EvaluateModule } from './evaluate/evaluate.module';
import { ImageModule } from './image/image.module';
import { CapacityModule } from './capacity/capacity.module';
import { NationalModule } from './national/national.module';
import { OdorGroupModule } from './odor-group/odor-group.module';
import { ProductModule } from './product/product.module';
import { ProviderModule } from './provider/provider.module';
import { OrderModule } from './order/order.module';
import { OdorRangeModule } from './odor-range/odor-range.module';
import { StyleModule } from './style/style.module';
import { OdorRetentionTimeModule } from './odor-retention-time/odor-retention-time.module';
import { SuggestionModule } from './suggestion/suggetion.module';

export const MODULES = [
	ImageModule,
	ProductModule,
	ProviderModule,
	NationalModule,
	CapacityModule,
	OdorGroupModule,
	OrderModule,
	EvaluateModule,
	OdorRetentionTimeModule,
	OdorRangeModule,
	StyleModule,
	SuggestionModule,
];
