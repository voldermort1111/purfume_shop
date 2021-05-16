import { BaseRepository, IFindOptions } from '@core/base-repository';
import { IOdorRangeQueryAttribute } from '@entities/entity-attribute/odor-range.interface';
import { OdorRange } from '@entities/odor-range.entity';
import { EntityRepository } from 'typeorm';

export interface IFindOdorRangeWhereOptions extends IOdorRangeQueryAttribute, IFindOptions {}

@EntityRepository(OdorRange)
export class OdorRangeRepository extends BaseRepository<OdorRange> {
	findAndCountByOptions(options: IFindOdorRangeWhereOptions = {}) {
		return super.findAndCountByOptions<IFindOdorRangeWhereOptions>(options);
	}

	findsByOptions(options: IFindOdorRangeWhereOptions = {}) {
		return super.findsByOptions<IFindOdorRangeWhereOptions>(options);
	}
}
