import { National } from './national.entity';
import { Product } from './product.entity';
import { Entity, Column, OneToMany, ManyToOne, DeleteDateColumn } from 'typeorm';
import { BaseEntity } from '../core/base-entity';
import { IProvider } from './entity-attribute/provider.interface';

@Entity({ name: 'provider' })
export class Provider extends BaseEntity implements IProvider {
	@Column({
		type: 'varchar',
		length: '50',
	})
	name: string;

	@Column({
		type: 'varchar',
		length: '50',
		nullable: true,
	})
	code?: string;

	@Column({
		type: 'int',
		width: 11,
		nullable: true,
	})
	nationalId: number;

	// @DeleteDateColumn({ nullable: true })
	@Column({ type: 'timestamp' })
	deletedAt: Date;

	// references

	@OneToMany<Product>(() => Product, product => product.provider)
	products: Product[];

	@ManyToOne<National>(() => National, national => national.providers, { eager: true })
	national: National;
}
