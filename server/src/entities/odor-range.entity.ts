import { Entity, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { BaseEntity } from '../core/base-entity';
import { IOdorRange } from './entity-attribute/odor-range.interface';
import { Product } from './product.entity';

@Entity({ name: 'odor_range' })
export class OdorRange extends BaseEntity implements IOdorRange {
	@Column({
		type: 'varchar',
		length: '50',
	})
	value: string;

	// @DeleteDateColumn({ nullable: true })
	@Column({ type: 'timestamp' })
	deletedAt: Date;

	// references

	@OneToMany<Product>(() => Product, product => product.odorRange)
	products: Product[];
}
