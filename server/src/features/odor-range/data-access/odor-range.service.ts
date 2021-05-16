import { EEventTopicKey } from '@constants/event.constants';
import { ProductService } from '@features/product/data-access/product.service';
import { Injectable } from '@nestjs/common';
import { httpConflict } from '@shared/exceptions/http-exception';
import { IEventDataLabel } from '@shared/interfaces/event.interface';
import { EventEmitterPerfume } from '@shared/utils/event-emitter';
import { OdorRangeBodyRequestDto, OdorRangeUpdateRequestDto } from './dto/odor-range.dto';
import { IFindOdorRangeWhereOptions, OdorRangeRepository } from './odor-range.repository';

@Injectable()
export class OdorRangeService {
	constructor(
		private readonly orderGroupRepository: OdorRangeRepository,
		private readonly productService: ProductService,
	) {}

	findAndCountByOptions(options?: IFindOdorRangeWhereOptions) {
		return this.orderGroupRepository.findAndCountByOptions({ ...options, deletedAt: null });
	}

	findsByOptions(options?: IFindOdorRangeWhereOptions) {
		return this.orderGroupRepository.findsByOptions(options);
	}

	private async checkCanDelete(id: number) {
		const product = await this.productService.findOneByAttribute({ odorRangeId: id });
		return !product;
	}

	async delete(id: number) {
		const canDelete = await this.checkCanDelete(id);
		if (canDelete) {
			EventEmitterPerfume.getEventEmitter().emit(EEventTopicKey.RemoveLabel, {
				key: 'odorRange',
				id,
			} as IEventDataLabel);
			return this.orderGroupRepository.delete(id);
		}
		return this.orderGroupRepository.update(id, { deletedAt: new Date() });
	}

	async create(data: OdorRangeBodyRequestDto) {
		let _data = await this.orderGroupRepository.findOne({ where: data });
		if (_data) {
			return httpConflict('Dữ liệu đã tồn tại!');
		}
		_data = this.orderGroupRepository.create(data);
		const result = await this.orderGroupRepository.save(_data);
		EventEmitterPerfume.getEventEmitter().emit(EEventTopicKey.AddLabel, {
			key: 'odorRange',
			id: result.id,
		} as IEventDataLabel);
	}

	async update(id: number, data: OdorRangeUpdateRequestDto) {
		const _data = await this.orderGroupRepository.findOne({ where: data });
		if (_data) {
			return httpConflict('Dữ liệu đã tồn tại!');
		}
		return this.orderGroupRepository.update(id, data);
	}
}
