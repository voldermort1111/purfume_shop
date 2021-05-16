import { IStyle } from './entity-attribute/style.interface';
import { Entity, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { BaseEntity } from '../core/base-entity';
import { Product } from './product.entity';

@Entity({ name: 'style' })
export class Style extends BaseEntity implements IStyle {
	@Column({
		type: 'varchar',
		length: '50',
	})
	value: string;

	// @DeleteDateColumn({ nullable: true })
	@Column({ type: 'timestamp' })
	deletedAt: Date;

	// references

	@OneToMany<Product>(() => Product, product => product.style)
	products: Product[];
}
