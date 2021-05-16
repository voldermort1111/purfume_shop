import { OrderProduct } from './order-product.entity';
import { User } from './user.entity';
import { IOrder } from './entity-attribute/order.interface';
import { BaseEntity } from '../core/base-entity';
import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn, OneToMany, DeleteDateColumn } from 'typeorm';
import { EOrderStatus } from '../constants/entity.constants';

@Entity({ name: 'order' })
export class Order extends BaseEntity implements IOrder {
	@Column({
		type: 'int',
		width: 11,
		nullable: true,
	})
	userId: number;

	@Column({
		type: 'int',
		width: 11,
	})
	price: number;

	@Column({
		type: 'enum',
		enum: EOrderStatus,
		default: EOrderStatus.pending,
	})
	status: EOrderStatus;

	@Column({
		type: 'varchar',
		length: '50',
	})
	receiver: string;

	@Column({
		type: 'varchar',
		length: '15',
	})
	phoneNumber: string;

	@Column({
		type: 'varchar',
		length: '255',
	})
	address: string;

	@Column({
		type: 'varchar',
		length: '1024',
		nullable: true,
	})
	note: string;

	// @DeleteDateColumn({ nullable: true })
	@Column({ type: 'timestamp' })
	deletedAt: Date;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	// references

	@ManyToOne<User>(() => User, user => user.orders)
	user: User;

	@OneToMany<OrderProduct>(() => OrderProduct, orderProduct => orderProduct.order)
	orderProducts: OrderProduct[];
}
