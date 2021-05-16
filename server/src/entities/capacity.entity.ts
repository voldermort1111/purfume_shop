import { ICapacity } from './entity-attribute/capacity.interface';
import { Entity, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { BaseEntity } from '../core/base-entity';
import { ECapacityUnit } from '../constants/entity.constants';
import { Product } from './product.entity';

@Entity({ name: 'capacity' })
export class Capacity extends BaseEntity implements ICapacity {
	@Column({
		type: 'int',
		width: 11,
	})
	value: number;

	@Column({
		type: 'enum',
		enum: ECapacityUnit,
		default: "'ml'",
	})
	unit: ECapacityUnit;

	// @DeleteDateColumn({ nullable: true })
	@Column({ type: 'timestamp' })
	deletedAt: Date;

	// references

	@OneToMany<Product>(() => Product, product => product.capacity)
	products: Product[];
}
