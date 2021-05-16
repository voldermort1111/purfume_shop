import { EEventTopicKey } from '@constants/event.constants';
import { ProductService } from '@features/product/data-access/product.service';
import { Injectable } from '@nestjs/common';
import { httpConflict } from '@shared/exceptions/http-exception';
import { IEventDataLabel } from '@shared/interfaces/event.interface';
import { EventEmitterPerfume } from '@shared/utils/event-emitter';
import { RetentionTimeBodyRequestDto, RetentionTimeUpdateRequestDto } from './dto/odor-retention-time.dto';
import { IFindOdorRetentionTimeWhereOptions, OdorRetentionTimeRepository } from './odor-retention-time.repository';

@Injectable()
export class OdorRetentionTimeService {
	constructor(
		private readonly orderGroupRepository: OdorRetentionTimeRepository,
		private readonly productService: ProductService,
	) {}

	findAndCountByOptions(options?: IFindOdorRetentionTimeWhereOptions) {
		return this.orderGroupRepository.findAndCountByOptions({ ...options, deletedAt: null });
	}

	findsByOptions(options?: IFindOdorRetentionTimeWhereOptions) {
		return this.orderGroupRepository.findsByOptions(options);
	}

	private async checkCanDelete(id: number) {
		const product = await this.productService.findOneByAttribute({ odorRetentionTimeId: id });
		return !product;
	}

	async delete(id: number) {
		const canDelete = await this.checkCanDelete(id);
		if (canDelete) {
			EventEmitterPerfume.getEventEmitter().emit(EEventTopicKey.RemoveLabel, {
				key: 'odorRetentionTime',
				id,
			} as IEventDataLabel);
			return this.orderGroupRepository.delete(id);
		}
		return this.orderGroupRepository.update(id, { deletedAt: new Date() });
	}

	async create(data: RetentionTimeBodyRequestDto) {
		let _data = await this.orderGroupRepository.findOne({ where: data });
		if (_data) {
			return httpConflict('Dữ liệu đã tồn tại!');
		}
		_data = this.orderGroupRepository.create(data);
		const result = await this.orderGroupRepository.save(_data);
		EventEmitterPerfume.getEventEmitter().emit(EEventTopicKey.AddLabel, {
			key: 'odorRetentionTime',
			id: result.id,
		} as IEventDataLabel);
	}

	async update(id: number, data: RetentionTimeUpdateRequestDto) {
		const _data = await this.orderGroupRepository.findOne({ where: data });
		if (_data) {
			return httpConflict('Dữ liệu đã tồn tại!');
		}
		return this.orderGroupRepository.update(id, data);
	}
}
