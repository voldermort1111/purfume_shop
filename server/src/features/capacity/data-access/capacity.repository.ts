import { Capacity } from './../../../entities/capacity.entity';
import { EntityRepository } from 'typeorm';
import { BaseRepository, IFindOptions } from '../../../core/base-repository';
import { ICapacityQueryAttribute } from '@entities/entity-attribute/capacity.interface';

export interface IFindCapacityWhereOptions extends ICapacityQueryAttribute, IFindOptions {}

@EntityRepository(Capacity)
export class CapacityRepository extends BaseRepository<Capacity> {
	findAndCountByOptions(options: IFindCapacityWhereOptions = {}) {
		return super.findAndCountByOptions<IFindCapacityWhereOptions>(options);
	}

	findsByOptions(options: IFindCapacityWhereOptions = {}) {
		return super.findsByOptions<IFindCapacityWhereOptions>(options);
	}
}
