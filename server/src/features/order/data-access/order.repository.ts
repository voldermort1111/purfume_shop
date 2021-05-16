import { BaseRepository, IFindOptions } from '@core/base-repository';
import { IOrderQueryAttribute } from '@entities/entity-attribute/order.interface';
import { OrderProduct } from '@entities/order-product.entity';
import { Order } from '@entities/order.entity';
import { EntityRepository } from 'typeorm';

export interface IFindOrderWhereOptions extends IOrderQueryAttribute, IFindOptions {}

@EntityRepository(Order)
export class OrderRepository extends BaseRepository<Order> {
	findAndCountByOptions(options: IFindOrderWhereOptions = {}) {
		return super.findAndCountByOptions<IFindOrderWhereOptions>(options);
	}

	findsByOptions(options: IFindOrderWhereOptions = {}) {
		return super.findsByOptions<IFindOrderWhereOptions>(options);
	}

	async getProductsByOrder(id: number) {
		const orderProductRepo = this.getRepository<OrderProduct>(OrderProduct);
		return orderProductRepo
			.createQueryBuilder(`orderProduct`)
			.where(`orderProduct.orderId = :orderId`, { orderId: id })
			.innerJoinAndMapOne(`orderProduct.product`, `product`, `product_`, `orderProduct.productId = product_.id`)
			.select([
				`orderProduct.unitPrice`,
				`orderProduct.quantity`,
				`product_.id`,
				`product_.name`,
				`product_.code`,
				`product_.avatar`,
			])
			.getMany();
	}
}
