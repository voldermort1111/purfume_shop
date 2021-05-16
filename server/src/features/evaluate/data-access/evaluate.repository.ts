import { EntityRepository } from 'typeorm';
import { BaseRepository, IFindOptions } from '../../../core/base-repository';
import { IProductEvaluateQueryAttribute } from '@entities/entity-attribute/product-evaluate.interface';
import { ProductEvaluate } from '@entities/product-evaluate.entity';

export interface IFindProductEvaluateWhereOptions extends IProductEvaluateQueryAttribute, IFindOptions {}

@EntityRepository(ProductEvaluate)
export class ProductEvaluateRepository extends BaseRepository<ProductEvaluate> {
	getListEvaluatePagination(options: IFindProductEvaluateWhereOptions = {}) {
		const queryBuilder = this.createQueryBuilder(ProductEvaluate.name);
		const selections = [
			`${ProductEvaluate.name}.id`,
			`${ProductEvaluate.name}.userId`,
			`${ProductEvaluate.name}.productId`,
			`${ProductEvaluate.name}.point`,
			`${ProductEvaluate.name}.comment`,
			`${ProductEvaluate.name}.createdAt`,
			`users.id`,
			`users.name`,
			`users.email`,
		];
		queryBuilder.where(`${ProductEvaluate.name}.productId = :productId`, { productId: options.productId });
		queryBuilder.innerJoinAndMapOne(
			`${ProductEvaluate.name}.user`,
			`user`,
			`users`,
			`${ProductEvaluate.name}.userId = users.id`,
		);
		queryBuilder.select(selections);
		queryBuilder.limit(+options.limit || 5);
		queryBuilder.offset(((+options.page || 1) - 1) * (+options.limit || 5));
		queryBuilder.orderBy(`${ProductEvaluate.name}.id`, 'DESC');
		return queryBuilder.getManyAndCount();
	}

	getAdvPoint(productId: number) {
		const queryBuilder = this.createQueryBuilder(ProductEvaluate.name);
		queryBuilder.where(`${ProductEvaluate.name}.productId = :productId`, { productId });
		queryBuilder.select([`COUNT(${ProductEvaluate.name}.point) as total`]);
		queryBuilder.addSelect(`${ProductEvaluate.name}.point as point`);
		queryBuilder.groupBy(`${ProductEvaluate.name}.point`);
		return queryBuilder.getRawMany();
	}

	findsByOptions(options: IFindProductEvaluateWhereOptions = {}) {
		return super.findsByOptions<IFindProductEvaluateWhereOptions>(options);
	}

	getAll() {
		const queryBuilder = this.createQueryBuilder(ProductEvaluate.name);
		const selections = [
			`${ProductEvaluate.name}.userId`,
			`${ProductEvaluate.name}.productId`,
			`${ProductEvaluate.name}.point`,
			`product_alias.providerId`,
			`product_alias.capacityId`,
			`product_alias.styleId`,
			`product_alias.odorRetentionTimeId`,
			`product_alias.odorGroupId`,
			`product_alias.odorRangeId`,
		];
		queryBuilder.innerJoinAndMapOne(
			`${ProductEvaluate.name}.product`,
			`product`,
			`product_alias`,
			`${ProductEvaluate.name}.productId = product_alias.id`,
		);
		queryBuilder.select(selections);
		return queryBuilder.getMany();
	}
}
