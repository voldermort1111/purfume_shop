import { EEventTopicKey } from '@constants/event.constants';
import { NationalService } from '@features/national/data-access/national.service';
import { ProductService } from '@features/product/data-access/product.service';
import { Injectable } from '@nestjs/common';
import { httpBadRequest, httpConflict } from '@shared/exceptions/http-exception';
import { IEventDataLabel } from '@shared/interfaces/event.interface';
import { EventEmitterPerfume } from '@shared/utils/event-emitter';
import { ProviderBodyRequestDto, ProviderUpdateRequestDto } from './dto/provider.dto';
import { IFindProviderWhereOptions, ProviderRepository } from './provider.repository';

@Injectable()
export class ProviderService {
	constructor(
		private readonly productService: ProductService,
		private readonly providerRepository: ProviderRepository,
		private readonly nationalService: NationalService,
	) {}

	findAndCountByOptions(options?: IFindProviderWhereOptions) {
		return this.providerRepository.findAndCountByOptions({ ...options, deletedAt: null });
	}

	findsByOptions(options?: IFindProviderWhereOptions) {
		return this.providerRepository.findsByOptions(options);
	}

	private async checkCanDelete(id: number) {
		const product = await this.productService.findOneByAttribute({ capacityId: id });
		return !product;
	}

	async delete(id: number) {
		const canDelete = await this.checkCanDelete(id);
		if (canDelete) {
			EventEmitterPerfume.getEventEmitter().emit(EEventTopicKey.RemoveLabel, {
				key: 'provider',
				id,
			} as IEventDataLabel);
			return this.providerRepository.delete(id);
		}
		return this.providerRepository.update(id, { deletedAt: new Date() });
	}

	async create(data: ProviderBodyRequestDto) {
		let _data = await this.providerRepository.findOne({ where: data });
		if (_data) {
			return httpConflict('Dữ liệu đã tồn tại!');
		}
		const national = await this.nationalService.findOneById(data.nationalId);
		if (!national) {
			return httpBadRequest(`Quốc gia không tồn tại!`);
		}
		_data = this.providerRepository.create(data);
		const result = await this.providerRepository.save(_data);
		EventEmitterPerfume.getEventEmitter().emit(EEventTopicKey.AddLabel, {
			key: 'provider',
			id: result.id,
		} as IEventDataLabel);
	}

	async update(id: number, data: ProviderUpdateRequestDto) {
		const _data = await this.providerRepository.findOne({ where: data });
		if (_data) {
			return httpConflict('Dữ liệu đã tồn tại!');
		}
		if (data.nationalId) {
			const national = await this.nationalService.findOneById(data.nationalId);
			if (!national) {
				return httpBadRequest(`Quốc gia không tồn tại!`);
			}
		}
		return this.providerRepository.update(id, data);
	}
}
