import { Product } from './product.entity';
import { IProductImage } from './entity-attribute/product-image.interface';
import { BaseEntity } from '../core/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'product_image' })
export class ProductImage extends BaseEntity implements IProductImage {
	@Column({
		type: 'int',
		width: 11,
	})
	productId: number;

	@Column({
		type: 'varchar',
		length: '255',
	})
	value: string;

	// references

	@ManyToOne<Product>(() => Product, product => product.productImages)
	product: Product;
}
