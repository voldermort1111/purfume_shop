import { Between, EntityRepository, Equal, In, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not } from 'typeorm';
import { cloneFilterObject } from '@shared/utils/common';
import { BaseRepository, IFindOptions } from '@core/base-repository';
import { IProductQueryAttribute } from '@entities/entity-attribute/product.interface';
import { Product } from '@entities/product.entity';
import { EProductStatus } from '@constants/entity.constants';

export interface IFindProductWhereOptions extends Partial<IProductQueryAttribute>, IFindOptions {
	minPrice?: number;
	maxPrice?: number;
	loadEagerRelations?: boolean;
}

@EntityRepository(Product)
export class ProductRepository extends BaseRepository<Product> {
	findAndCountByOptions(options: IFindProductWhereOptions = {}) {
		let customOpts = {} as any;
		if (options.maxPrice && options.minPrice) {
			customOpts.price = Between(options.minPrice, options.maxPrice);
		} else if (options.maxPrice && !options.minPrice) {
			customOpts.price = LessThanOrEqual(options.maxPrice);
		} else if (!options.maxPrice && options.minPrice) {
			customOpts.price = MoreThanOrEqual(options.minPrice);
		}
		if (options.name) {
			customOpts.name = Like(`%${options.name}%`);
		}
		// if (options.nationalId) {
		// 	customOpts['product_provider.nationalId'] = { nationalId: options.nationalId };
		// }
		let take, skip, order;
		if (options.limit && options.page) {
			take = options.limit;
			skip = (+options.page - 1) * +options.limit;
		}
		if (options.direction && options.sortBy) {
			order = options.direction && options.sortBy && { [options.sortBy]: options.direction };
		}
		const isLoadEagerRelations = options.loadEagerRelations;
		options = cloneFilterObject(options, [
			'maxPrice',
			'minPrice',
			'nationalId',
			'page',
			'limit',
			'sortBy',
			'direction',
			'loadEagerRelations',
			'name',
		]);

		if (Object.keys(customOpts).length) {
			for (const key of Object.keys(customOpts)) {
				options[key] = customOpts[key];
			}
		}

		return this.findAndCount({
			where: options,
			take,
			skip,
			order,
			loadEagerRelations: isLoadEagerRelations,
		});
	}

	getProductsNew(take?: number, excludeIds?: number[]) {
		const where = {} as any;
		if (excludeIds) {
			where.id = Not(In(excludeIds));
		}
		where.deletedAt = null;
		where.quantity = MoreThan(0);
		where.status = EProductStatus.active;
		return this.find({
			where,
			take: take !== undefined ? take : 6,
			order: { createdAt: 'DESC' },
			loadEagerRelations: false,
		});
	}

	getProductSuggestionByIds(ids: number[]) {
		const where = {} as any;
		where.quantity = MoreThan(0);
		where.status = EProductStatus.active;
		return this.find({
			where: { id: In(ids), quantity: MoreThan(0), status: EProductStatus.active, deletedAt: null },
			take: 6,
			order: { createdAt: 'DESC' },
			loadEagerRelations: false,
		});
	}

	async getSimilar(id: number, groupId: number, rangeId: number, retentionTimeId: number) {
		const queryBuilder = await this.createQueryBuilder('products');
		queryBuilder.where(`products.id != :id`, { id });
		queryBuilder.andWhere(
			`products.odorGroupId = :groupId OR products.odorRangeId = :rangeId OR products.odorRetentionTimeId = :retentionTimeId`,
			{ groupId, rangeId, retentionTimeId },
		);
		queryBuilder.orderBy('RAND()');
		queryBuilder.limit(3);
		return queryBuilder.getMany();
	}
}
