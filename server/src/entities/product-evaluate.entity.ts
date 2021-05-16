import { Product } from './product.entity';
import { User } from './user.entity';
import { BaseEntity } from '../core/base-entity';
import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from 'typeorm';
import { IProductEvaluate } from './entity-attribute/product-evaluate.interface';

@Entity({ name: 'product_evaluate' })
export class ProductEvaluate extends BaseEntity implements IProductEvaluate {
	@Column({
		type: 'int',
		width: 11,
	})
	userId: number;

	@Column({
		type: 'int',
		width: 11,
	})
	productId: number;

	@Column({
		type: 'tinyint',
		width: 1,
	})
	point: number;

	@Column({
		type: 'varchar',
		length: '1024',
		nullable: true,
	})
	comment: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	// references

	@ManyToOne<User>(() => User, user => user.productEvaluates)
	user: User;

	@ManyToOne<Product>(() => Product, product => product.productEvaluates)
	product: Product;
}
