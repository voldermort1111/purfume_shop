import { BaseRepository, IFindOptions } from '@core/base-repository';
import { IStyleQueryAttribute } from '@entities/entity-attribute/style.interface';
import { Style } from '@entities/style.entity';
import { EntityRepository } from 'typeorm';

export interface IFindStyleWhereOptions extends IStyleQueryAttribute, IFindOptions {}

@EntityRepository(Style)
export class StyleRepository extends BaseRepository<Style> {
	findAndCountByOptions(options: IFindStyleWhereOptions = {}) {
		return super.findAndCountByOptions<IFindStyleWhereOptions>(options);
	}

	findsByOptions(options: IFindStyleWhereOptions = {}) {
		return super.findsByOptions<IFindStyleWhereOptions>(options);
	}
}
