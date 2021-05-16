import { Entity, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { BaseEntity } from '../core/base-entity';
import { IOdorGroup } from './entity-attribute/odor-group.interface';
import { Product } from './product.entity';

@Entity({ name: 'odor_group' })
export class OdorGroup extends BaseEntity implements IOdorGroup {
	@Column({
		type: 'varchar',
		length: '50',
	})
	name: string;

	@Column({
		type: 'varchar',
		length: '50',
	})
	value: string;

	// @DeleteDateColumn({ nullable: true })
	@Column({ type: 'timestamp' })
	deletedAt: Date;

	// references

	@OneToMany<Product>(() => Product, product => product.odorGroup)
	products: Product[];
}
