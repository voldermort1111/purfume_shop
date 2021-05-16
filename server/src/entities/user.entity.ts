import { ProductFavourite } from './product-favourite.entity';
import { Order } from './order.entity';
import { ProductEvaluate } from './product-evaluate.entity';
import { IUser } from './entity-attribute/user.interface';
import { BaseEntityIncludeDate } from '../core/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { EUserRole } from '../constants/entity.constants';

@Entity({ name: 'user' })
export class User extends BaseEntityIncludeDate implements IUser {
	@Column({
		type: 'varchar',
		length: '50',
	})
	name: string;

	@Column({
		type: 'varchar',
		length: '255',
		unique: true,
	})
	email: string;

	@Column({
		type: 'varchar',
		length: '255',
	})
	password: string;

	@Column({
		type: 'varchar',
		length: '15',
		nullable: true,
	})
	phoneNumber: string;

	@Column({
		type: 'enum',
		enum: EUserRole,
		default: EUserRole.user,
	})
	role: EUserRole;

	@Column({
		type: 'varchar',
		length: '255',
	})
	salt: string;

	@Column({
		type: 'int',
		width: 11,
	})
	iterations: number;

	@Column({
		name: 'isNew',
		type: 'boolean',
		default: 0,
	})
	isNew: boolean;

	// references

	@OneToMany<ProductEvaluate>(() => ProductEvaluate, productEvaluate => productEvaluate.user)
	productEvaluates: ProductEvaluate[];

	@OneToMany<Order>(() => Order, order => order.user)
	orders: Order[];

	@OneToMany<ProductFavourite>(() => ProductFavourite, productFavourite => productFavourite.user)
	productFavourites: ProductFavourite[];
}
