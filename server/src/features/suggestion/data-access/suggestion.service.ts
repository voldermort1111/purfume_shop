import { ProductSuggestionWorker } from './../../../workers/product-suggestion.worker';
import { ProductRepository } from '@features/product/data-access/product.repository';
import { Injectable } from '@nestjs/common';
import { Product } from '@entities/product.entity';
import { ProductEvaluate } from '@entities/product-evaluate.entity';
import { Order } from '@entities/order.entity';
import { In, Not } from 'typeorm';

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
		const orders = await this.productRepository
			.getRepository<Order>(Order)
			.find({ where: { userId }, relations: ['orderProducts'] });

		const setExcludeId = new Set<number>();
		if (orders.length) {
			for (const order of orders) {
				for (const iterator of order.orderProducts) {
					setExcludeId.add(iterator.productId);
				}
			}
		}
		const excludeIds = Array.from(setExcludeId);
		const evaluates = await this.productRepository
			.getRepository<ProductEvaluate>(ProductEvaluate)
			.find({ where: { userId: userSuggestion, productId: Not(In(excludeIds)) }, select: ['productId'] });

		let newProducts = [] as Product[];
		const suggestionProducts = await this.productRepository.getProductSuggestionByIds(
			evaluates.map(_ => _.productId),
		);
		if (6 - suggestionProducts.length > 0) {
			const suggestionProductIds = suggestionProducts.map(_ => _.id).concat(excludeIds);
			newProducts = await this.productRepository.getProductsNew(6 - evaluates.length, suggestionProductIds);
		}
		return [].concat(suggestionProducts, newProducts);
	}
}
