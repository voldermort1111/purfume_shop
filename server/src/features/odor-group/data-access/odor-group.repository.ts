import { OdorGroup } from './../../../entities/odor-group.entity';
import { BaseRepository, IFindOptions } from './../../../core/base-repository';
import { IOdorGroupQueryAttribute } from './../../../entities/entity-attribute/odor-group.interface';
import { EntityRepository } from 'typeorm';

export interface IFindOdorGroupWhereOptions extends IOdorGroupQueryAttribute, IFindOptions {}

@EntityRepository(OdorGroup)
export class OdorGroupRepository extends BaseRepository<OdorGroup> {
	findAndCountByOptions(options: IFindOdorGroupWhereOptions = {}) {
		return super.findAndCountByOptions<IFindOdorGroupWhereOptions>(options);
	}

	findsByOptions(options: IFindOdorGroupWhereOptions = {}) {
		return super.findsByOptions<IFindOdorGroupWhereOptions>(options);
	}
}
