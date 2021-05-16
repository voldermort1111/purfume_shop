import { EEventTopicKey } from '@constants/event.constants';
import { ProductService } from '@features/product/data-access/product.service';
import { Injectable } from '@nestjs/common';
import { httpConflict } from '@shared/exceptions/http-exception';
import { IEventDataLabel } from '@shared/interfaces/event.interface';
import { EventEmitterPerfume } from '@shared/utils/event-emitter';
import { StyleBodyRequestDto, StyleUpdateRequestDto } from './dto/style.dto';
import { IFindStyleWhereOptions, StyleRepository } from './style.repository';

@Injectable()
export class StyleService {
	constructor(
		private readonly providerRepository: StyleRepository,
		private readonly productService: ProductService,
	) {}

	findAndCountByOptions(options?: IFindStyleWhereOptions) {
		return this.providerRepository.findAndCountByOptions({ ...options, deletedAt: null });
	}

	findsByOptions(options?: IFindStyleWhereOptions) {
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
				key: 'style',
				id,
			} as IEventDataLabel);
			return this.providerRepository.delete(id);
		}
		return this.providerRepository.update(id, { deletedAt: new Date() });
	}

	async create(data: StyleBodyRequestDto) {
		let _data = await this.providerRepository.findOne({ where: data });
		if (_data) {
			return httpConflict('Dữ liệu đã tồn tại!');
		}
		_data = this.providerRepository.create(data);
		const result = await this.providerRepository.save(_data);
		EventEmitterPerfume.getEventEmitter().emit(EEventTopicKey.AddLabel, {
			key: 'style',
			id: result.id,
		} as IEventDataLabel);
	}

	async update(id: number, data: StyleUpdateRequestDto) {
		const _data = await this.providerRepository.findOne({ where: data });
		if (_data) {
			return httpConflict('Dữ liệu đã tồn tại!');
		}
		return this.providerRepository.update(id, data);
	}
}
