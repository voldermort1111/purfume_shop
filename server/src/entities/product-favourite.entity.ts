import { Product } from './product.entity';
import { User } from './user.entity';
import { IProductFavourite } from './entity-attribute/product-favourite.interface';
import { BaseEntity } from '../core/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'product_favourite' })
export class ProductFavourite extends BaseEntity implements IProductFavourite {
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

	// references

	@ManyToOne<User>(() => User, user => user.productFavourites)
	user: User;

	@ManyToOne<Product>(() => Product, product => product.productFavourites)
	product: Product;
}
