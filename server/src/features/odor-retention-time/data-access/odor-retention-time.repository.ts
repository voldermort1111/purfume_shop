import { EntityRepository } from 'typeorm';
import { IOdorRetentionTimeQueryAttribute } from '@entities/entity-attribute/odor-retention-time.interface';
import { OdorRetentionTime } from '@entities/odor-retention-time.entity';
import { BaseRepository, IFindOptions } from '@core/base-repository';

export interface IFindOdorRetentionTimeWhereOptions extends IOdorRetentionTimeQueryAttribute, IFindOptions {}

@EntityRepository(OdorRetentionTime)
export class OdorRetentionTimeRepository extends BaseRepository<OdorRetentionTime> {
	findAndCountByOptions(options: IFindOdorRetentionTimeWhereOptions = {}) {
		return super.findAndCountByOptions<IFindOdorRetentionTimeWhereOptions>(options);
	}

	findsByOptions(options: IFindOdorRetentionTimeWhereOptions = {}) {
		return super.findsByOptions<IFindOdorRetentionTimeWhereOptions>(options);
	}
}
