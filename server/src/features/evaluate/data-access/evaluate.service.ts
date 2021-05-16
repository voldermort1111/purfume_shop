import { Product } from './../../../entities/product.entity';
import { EventEmitterPerfume } from './../../../shared/utils/event-emitter';
import { EvaluateBodyRequestDto } from './dto/evaluate.dto';
import { Injectable } from '@nestjs/common';
import { IFindProductEvaluateWhereOptions, ProductEvaluateRepository } from './evaluate.repository';
import { EEventTopicKey } from '@constants/event.constants';

@Injectable()
export class ProductEvaluateService {
	constructor(private readonly evaluateRepository: ProductEvaluateRepository) {}

	getListEvaluatePagination(options?: IFindProductEvaluateWhereOptions) {
		return this.evaluateRepository.getListEvaluatePagination(options);
	}

	getAll() {
		return this.evaluateRepository.getAll();
	}

	async getAdvPoint(productId: number) {
		const data = (await this.evaluateRepository.getAdvPoint(productId)) as { total: string; point: number }[];
		const result = { avg: 0, evaluates: [], total: 0 } as {
			avg: number;
			evaluates: { total: number; point: number }[];
			total: number;
		};
		let totalEvaluate = 0;
		let totalPoint = 0;
		for (let i = 0; i < 5; i++) {
			let _totalEvaluate = +(data.find(_ => _.point === i + 1)?.total || 0);
			totalEvaluate += _totalEvaluate;
			totalPoint += _totalEvaluate * (i + 1);
			result.evaluates.push({ point: i + 1, total: _totalEvaluate });
		}
		result.avg = !totalEvaluate ? 0 : +(totalPoint / totalEvaluate).toFixed(1);
		result.total = totalEvaluate;
		return result;
	}

	async evaluateProduct(data: EvaluateBodyRequestDto) {
		const evaluate = this.evaluateRepository.create(data);
		const product = await this.evaluateRepository
			.getRepository<Product>(Product)
			.findOne(data.productId, { loadEagerRelations: false });
		EventEmitterPerfume.getEventEmitter().emit(EEventTopicKey.Evaluate, { ...evaluate, product });
		return this.evaluateRepository.save(evaluate);
	}

	async checkEvaluated(userId: number, productId: number) {
		const evaluate = await this.evaluateRepository.findOne({ where: { userId, productId } });
		return !!evaluate;
	}
}
