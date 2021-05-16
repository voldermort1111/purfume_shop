import { ProductSuggestionWorker } from './../../../workers/product-suggestion.worker';
import { ProductRepository } from '@features/product/data-access/product.repository';
import { Injectable } from '@nestjs/common';
import { Product } from '@entities/product.entity';
import { ProductEvaluate } from '@entities/product-evaluate.entity';

@Injectable()
export class SuggestionService {
	constructor(
		private readonly productRepository: ProductRepository,
		private readonly suggestionWorker: ProductSuggestionWorker,
	) {}

	async getProductSuggestion(userId: number) {
		const userSuggestion = this.suggestionWorker.predict(userId);
		if (!userSuggestion || userSuggestion < 1) {
			return this.productRepository.getProductsNew();
		}
		const evaluates = await this.productRepository
			.getRepository<ProductEvaluate>(ProductEvaluate)
			.find({ where: { userId: userSuggestion }, select: ['productId'] });

		let newProducts = [] as Product[];
		const suggestionProducts = await this.productRepository.getProductSuggestionByIds(
			evaluates.map(_ => _.productId),
		);
		if (6 - suggestionProducts.length > 0) {
			const suggestionProductIds = suggestionProducts.map(_ => _.id);
			newProducts = await this.productRepository.getProductsNew(6 - evaluates.length, suggestionProductIds);
		}
		return [].concat(suggestionProducts, newProducts);
	}
}
