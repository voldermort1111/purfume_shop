import { Product } from './product.entity';
import { Order } from './order.entity';
import { BaseEntity } from '../core/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IOrderProduct } from './entity-attribute/order-product.interface';

@Entity({ name: 'order_product' })
export class OrderProduct extends BaseEntity implements IOrderProduct {
	@Column({
		type: 'int',
		width: 11,
	})
	orderId: number;

	@Column({
		type: 'int',
		width: 11,
	})
	productId: number;

	@Column({
		type: 'int',
		width: 11,
	})
	unitPrice: number;

	@Column({
		type: 'int',
		width: 11,
	})
	quantity: number;

	// references

	@ManyToOne<Order>(() => Order, order => order.orderProducts)
	order: Order;

	@ManyToOne<Product>(() => Product, product => product.orderProducts)
	product: Product;
}
