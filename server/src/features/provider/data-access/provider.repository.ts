import { EntityRepository } from 'typeorm';
import { IProviderQueryAttribute } from '@entities/entity-attribute/provider.interface';
import { BaseRepository, IFindOptions } from '@core/base-repository';
import { Provider } from '@entities/provider.entity';

export interface IFindProviderWhereOptions extends IProviderQueryAttribute, IFindOptions {}

@EntityRepository(Provider)
export class ProviderRepository extends BaseRepository<Provider> {
	findAndCountByOptions(options: IFindProviderWhereOptions = {}) {
		return super.findAndCountByOptions<IFindProviderWhereOptions>(options);
	}

	findsByOptions(options: IFindProviderWhereOptions = {}) {
		return super.findsByOptions<IFindProviderWhereOptions>(options);
	}
}
