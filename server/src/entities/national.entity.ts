import { Provider } from './provider.entity';
import { INational } from './entity-attribute/national.interface';
import { Entity, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { BaseEntity } from '../core/base-entity';

@Entity({ name: 'national' })
export class National extends BaseEntity implements INational {
	@Column({
		type: 'varchar',
		length: 50,
	})
	name: string;

	@Column({
		type: 'varchar',
		length: 50,
		nullable: true,
	})
	code: string;

	// @DeleteDateColumn({ nullable: true })
	@Column({ type: 'timestamp' })
	deletedAt: Date;

	// references

	@OneToMany<Provider>(() => Provider, provider => provider.national)
	providers: Provider[];
}
