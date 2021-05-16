import {
	PrimaryGeneratedColumn,
	BaseEntity as TypeOrmBaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	Column,
} from 'typeorm';
import { IBaseAttribute, IBaseIncludeDateAttribute } from './../entities/entity-attribute/base-attribute.interface';

export abstract class BaseEntity extends TypeOrmBaseEntity implements IBaseAttribute {
	@PrimaryGeneratedColumn()
	id: number;
}

export abstract class BaseEntityIncludeDate extends BaseEntity implements IBaseIncludeDateAttribute {
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	// @DeleteDateColumn({ nullable: true })
	@Column({ type: 'timestamp' })
	deletedAt: Date;
}
