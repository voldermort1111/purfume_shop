import { IOdorRetentionTime } from './entity-attribute/odor-retention-time.interface';
import { Entity, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { BaseEntity } from '../core/base-entity';
import { Product } from './product.entity';

@Entity({ name: 'odor_retention_time' })
export class OdorRetentionTime extends BaseEntity implements IOdorRetentionTime {
	@Column({
		type: 'varchar',
		length: '50',
	})
	value: string;

	// @DeleteDateColumn({ nullable: true })
	@Column({ type: 'timestamp' })
	deletedAt: Date;

	// references

	@OneToMany<Product>(() => Product, product => product.odorRetentionTime)
	products: Product[];
}
