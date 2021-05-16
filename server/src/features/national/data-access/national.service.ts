import { Provider } from '@entities/provider.entity';
import { NationalRepository, IFindNationalWhereOptions } from './national.repository';
import { Injectable } from '@nestjs/common';
import { httpConflict } from '@shared/exceptions/http-exception';
import { NationalBodyRequestDto, NationalUpdateRequestDto } from './dto/national.dto';

@Injectable()
export class NationalService {
	constructor(private readonly nationalRepository: NationalRepository) {}

	findAndCountByOptions(options?: IFindNationalWhereOptions) {
		return this.nationalRepository.findAndCountByOptions({ ...options, deletedAt: null });
	}

	findsByOptions(options?: IFindNationalWhereOptions) {
		return this.nationalRepository.findsByOptions(options);
	}

	findOneById(id: number) {
		return this.nationalRepository.findOne(id);
	}

	private async checkCanDelete(id: number) {
		const provider = await this.nationalRepository.getRepository<Provider>(Provider).findOne({ nationalId: id });
		return !provider;
	}

	async delete(id: number) {
		const canDelete = await this.checkCanDelete(id);
		if (canDelete) {
			return this.nationalRepository.delete(id);
		}
		return this.nationalRepository.update(id, { deletedAt: new Date() });
	}

	async create(data: NationalBodyRequestDto) {
		let _data = await this.nationalRepository.findOne({ where: data });
		if (_data) {
			return httpConflict('Dữ liệu đã tồn tại!');
		}
		_data = this.nationalRepository.create(data);
		return this.nationalRepository.save(_data);
	}

	async update(id: number, data: NationalUpdateRequestDto) {
		const _data = await this.nationalRepository.findOne({ where: data });
		if (_data) {
			return httpConflict('Dữ liệu đã tồn tại!');
		}
		return this.nationalRepository.update(id, data);
	}
}
