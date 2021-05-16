import { EEventTopicKey } from '@constants/event.constants';
import { ProductService } from '@features/product/data-access/product.service';
import { Injectable } from '@nestjs/common';
import { httpConflict } from '@shared/exceptions/http-exception';
import { IEventDataLabel } from '@shared/interfaces/event.interface';
import { EventEmitterPerfume } from '@shared/utils/event-emitter';
import { OdorGroupBodyRequestDto, OdorGroupUpdateRequestDto } from './dto/odor-group.dto';
import { IFindOdorGroupWhereOptions, OdorGroupRepository } from './odor-group.repository';

@Injectable()
export class OdorGroupService {
	constructor(
		private readonly orderGroupRepository: OdorGroupRepository,
		private readonly productService: ProductService,
	) {}

	findAndCountByOptions(options?: IFindOdorGroupWhereOptions) {
		return this.orderGroupRepository.findAndCountByOptions({ ...options, deletedAt: null });
	}

	findsByOptions(options?: IFindOdorGroupWhereOptions) {
		return this.orderGroupRepository.findsByOptions(options);
	}

	private async checkCanDelete(id: number) {
		const product = await this.productService.findOneByAttribute({ odorGroupId: id });
		return !product;
	}

	async delete(id: number) {
		const canDelete = await this.checkCanDelete(id);
		if (canDelete) {
			EventEmitterPerfume.getEventEmitter().emit(EEventTopicKey.RemoveLabel, {
				key: 'odorGroup',
				id,
			} as IEventDataLabel);
			return this.orderGroupRepository.delete(id);
		}
		return this.orderGroupRepository.update(id, { deletedAt: new Date() });
	}

	async create(data: OdorGroupBodyRequestDto) {
		let _data = await this.orderGroupRepository.findOne({ where: data });
		if (_data) {
			return httpConflict('Dữ liệu đã tồn tại!');
		}
		_data = this.orderGroupRepository.create(data);
		const result = await this.orderGroupRepository.save(_data);
		EventEmitterPerfume.getEventEmitter().emit(EEventTopicKey.AddLabel, {
			key: 'odorGroup',
			id: result.id,
		} as IEventDataLabel);
	}

	async update(id: number, data: OdorGroupUpdateRequestDto) {
		const _data = await this.orderGroupRepository.findOne({ where: data });
		if (_data) {
			return httpConflict('Dữ liệu đã tồn tại!');
		}
		return this.orderGroupRepository.update(id, data);
	}
}
