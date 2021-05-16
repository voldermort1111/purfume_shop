import { National } from './../../../entities/national.entity';
import { EntityRepository } from 'typeorm';
import { BaseRepository, IFindOptions } from '../../../core/base-repository';
import { INationalQueryAttribute } from '../../../entities/entity-attribute/national.interface';

export interface IFindNationalWhereOptions extends INationalQueryAttribute, IFindOptions {}

@EntityRepository(National)
export class NationalRepository extends BaseRepository<National> {
	findAndCountByOptions(options: IFindNationalWhereOptions = {}) {
		return super.findAndCountByOptions<IFindNationalWhereOptions>(options);
	}

	findsByOptions(options: IFindNationalWhereOptions = {}) {
		return super.findsByOptions<IFindNationalWhereOptions>(options);
	}
}
