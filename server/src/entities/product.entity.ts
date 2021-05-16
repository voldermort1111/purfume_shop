import { ProductImage } from './product-image.entity';
import { OdorRetentionTime } from './odor-retention-time.entity';
import { Style } from './style.entity';
import { Capacity } from './capacity.entity';
import { Provider } from './provider.entity';
import { EProductStatus } from './../constants/entity.constants';
import { IProduct } from './entity-attribute/product.interface';
import { BaseEntityIncludeDate } from '../core/base-entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EGender } from '../constants/entity.constants';
import { OdorGroup } from './odor-group.entity';
import { OdorRange } from './odor-range.entity';
import { ProductEvaluate } from './product-evaluate.entity';
import { ProductFavourite } from './product-favourite.entity';
import { OrderProduct } from './order-product.entity';

@Entity({ name: 'product' })
export class Product extends BaseEntityIncludeDate implements IProduct {
	@Column({
		type: 'varchar',
		length: '255',
	})
	name: string;

	@Column({
		type: 'varchar',
		length: '50',
		unique: true,
	})
	code: string;

	@Column({
		type: 'enum',
		enum: EProductStatus,
		default: EProductStatus.active,
	})
	status: EProductStatus;

	@Column({
		type: 'int',
		width: 11,
		default: 0,
	})
	quantity: number;

	@Column({
		type: 'enum',
		enum: EGender,
	})
	gender: EGender;

	@Column({
		type: 'int',
		width: 11,
	})
	price: number;

	@Column({
		type: 'int',
		width: 11,
	})
	originPrice: number;

	@Column({
		type: 'varchar',
		length: '255',
		nullable: true,
	})
	avatar: string;

	@Column({
		type: 'int',
		width: 11,
	})
	providerId: number;

	@Column({
		type: 'int',
		width: 11,
	})
	capacityId: number;

	@Column({
		type: 'int',
		width: 11,
	})
	styleId: number;

	@Column({
		type: 'int',
		width: 11,
	})
	odorRetentionTimeId: number;

	@Column({
		type: 'int',
		width: 11,
	})
	odorGroupId: number;

	@Column({
		type: 'int',
		width: 11,
	})
	odorRangeId: number;

	// references

	@ManyToOne<Provider>(() => Provider, provider => provider.products, { eager: true })
	provider: Provider;

	@ManyToOne<Capacity>(() => Capacity, capacity => capacity.products, { eager: true })
	capacity: Capacity;

	@ManyToOne<Style>(() => Style, style => style.products, { eager: true })
	style: Style;

	@ManyToOne<OdorRetentionTime>(() => OdorRetentionTime, odorRetentionTime => odorRetentionTime.products, {
		eager: true,
	})
	odorRetentionTime: OdorRetentionTime;

	@ManyToOne<OdorGroup>(() => OdorGroup, odorGroup => odorGroup.products, { eager: true })
	odorGroup: OdorGroup;

	@ManyToOne<OdorRange>(() => OdorRange, odorRange => odorRange.products, { eager: true })
	odorRange: OdorRange;

	@OneToMany<ProductImage>(() => ProductImage, productImage => productImage.product)
	productImages: ProductImage[];

	@OneToMany<ProductEvaluate>(() => ProductEvaluate, productEvaluate => productEvaluate.product)
	productEvaluates: ProductEvaluate[];

	@OneToMany<ProductFavourite>(() => ProductFavourite, productFavourite => productFavourite.product)
	productFavourites: ProductFavourite[];

	@OneToMany<OrderProduct>(() => OrderProduct, orderProduct => orderProduct.product)
	orderProducts: OrderProduct[];
}
