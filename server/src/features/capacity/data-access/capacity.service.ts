import { EEventTopicKey } from '@constants/event.constants';
import { ProductService } from '@features/product/data-access/product.service';
import { Injectable } from '@nestjs/common';
import { httpConflict } from '@shared/exceptions/http-exception';
import { IEventDataLabel } from '@shared/interfaces/event.interface';
import { EventEmitterPerfume } from '@shared/utils/event-emitter';
import { CapacityRepository, IFindCapacityWhereOptions } from './capacity.repository';
import { CapacityBodyRequestDto, CapacityUpdateRequestDto } from './dto/capacity.dto';

@Injectable()
export class CapacityService {
	constructor(
		private readonly capacityRepository: CapacityRepository,
		private readonly productService: ProductService,
	) {}

	findAndCountByOptions(options?: IFindCapacityWhereOptions) {
		return this.capacityRepository.findAndCountByOptions({ ...options, deletedAt: null });
	}

	findsByOptions(options?: IFindCapacityWhereOptions) {
		return this.capacityRepository.findsByOptions(options);
	}

	private async checkCanDelete(id: number) {
		const product = await this.productService.findOneByAttribute({ capacityId: id });
		return !product;
	}

	async delete(id: number) {
		const canDelete = await this.checkCanDelete(id);
		if (canDelete) {
			EventEmitterPerfume.getEventEmitter().emit(EEventTopicKey.RemoveLabel, {
				key: 'capacity',
				id,
			} as IEventDataLabel);
			return this.capacityRepository.delete(id);
		}
		return this.capacityRepository.update(id, { deletedAt: new Date() });
	}

	async create(data: CapacityBodyRequestDto) {
		let _data = await this.capacityRepository.findOne({ where: data });
		if (_data) {
			return httpConflict('Dữ liệu đã tồn tại!');
		}
		_data = this.capacityRepository.create(data);
		const result = await this.capacityRepository.save(_data);
		EventEmitterPerfume.getEventEmitter().emit(EEventTopicKey.AddLabel, {
			key: 'capacity',
			id: result.id,
		} as IEventDataLabel);
	}

	async update(id: number, data: CapacityUpdateRequestDto) {
		const _data = await this.capacityRepository.findOne({ where: data });
		if (_data) {
			return httpConflict('Dữ liệu đã tồn tại!');
		}
		return this.capacityRepository.update(id, data);
	}
}
