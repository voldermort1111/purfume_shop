import { EEventTopicKey } from '@constants/event.constants';
import { EventEmitterPerfume } from './../shared/utils/event-emitter';
import KNN from '@algorithms/Knn';
import { ProductEvaluate } from '@entities/product-evaluate.entity';
import { CapacityService } from '@features/capacity/data-access/capacity.service';
import { ProductEvaluateService } from '@features/evaluate/data-access/evaluate.service';
import { OdorGroupService } from '@features/odor-group/data-access/odor-group.service';
import { OdorRangeService } from '@features/odor-range/data-access/odor-range.service';
import { OdorRetentionTimeService } from '@features/odor-retention-time/data-access/odor-retention-time.service';
import { ProviderService } from '@features/provider/data-access/provider.service';
import { StyleService } from '@features/style/data-access/style.service';
import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { EventEmitter } from 'events';
import { IEventDataLabel } from '@shared/interfaces/event.interface';

class StoreChildData {
	point: number = 0;
	total: number = 0;

	constructor(point?: number) {
		if (point !== undefined || point !== null) {
			this.point = point;
			this.total = 1;
		}
	}

	public addPoint(point: number) {
		this.point += point;
		this.total++;
	}
}

class EvaluateStoreData {
	provider: { [id: number]: StoreChildData } = {};
	capacity: { [id: number]: StoreChildData } = {};
	style: { [id: number]: StoreChildData } = {};
	odorRetentionTime: { [id: number]: StoreChildData } = {};
	odorGroup: { [id: number]: StoreChildData } = {};
	odorRange: { [id: number]: StoreChildData } = {};
}

@Injectable()
export class ProductSuggestionWorker {
	// KNN instance
	private KnnProvider: KNN;
	private KnnCapacity: KNN;
	private KnnStyle: KNN;
	private KnnRetentionTime: KNN;
	private KnnGroup: KNN;
	private KnnRange: KNN;

	// KNN data (train, label)

	private KnnProviderData: { train: number[][]; label: number[] } = { train: [], label: [] };
	private KnnCapacityData: { train: number[][]; label: number[] } = { train: [], label: [] };
	private KnnStyleData: { train: number[][]; label: number[] } = { train: [], label: [] };
	private KnnRetentionTimeData: { train: number[][]; label: number[] } = { train: [], label: [] };
	private KnnGroupData: { train: number[][]; label: number[] } = { train: [], label: [] };
	private KnnRangeData: { train: number[][]; label: number[] } = { train: [], label: [] };

	// store (source generate matrix)
	private evaluates: Map<number, EvaluateStoreData> = new Map();

	// column data of matrix
	private providers: number[] = [];
	private capacities: number[] = [];
	private styles: number[] = [];
	private retentionTimes: number[] = [];
	private groups: number[] = [];
	private ranges: number[] = [];

	private eventEmitter: EventEmitter;

	constructor(
		private readonly evaluateService: ProductEvaluateService,
		private readonly providerService: ProviderService,
		private readonly capacityService: CapacityService,
		private readonly styleService: StyleService,
		private readonly retentionTimeService: OdorRetentionTimeService,
		private readonly groupService: OdorGroupService,
		private readonly rangeService: OdorRangeService,
	) {
		this.init();
		this.addListener();
	}

	private async init() {
		await Promise.all([
			this.storeFromDb(this.providerService, 'providers'),
			this.storeFromDb(this.capacityService, 'capacities'),
			this.storeFromDb(this.styleService, 'styles'),
			this.storeFromDb(this.retentionTimeService, 'retentionTimes'),
			this.storeFromDb(this.groupService, 'groups'),
			this.storeFromDb(this.rangeService, 'ranges'),
		]);
		await this.storeEvaluates();
	}

	private addListener() {
		this.eventEmitter = EventEmitterPerfume.getEventEmitter();
		this.eventEmitter.addListener(EEventTopicKey.Evaluate, this._handleEvaluate.bind(this));
		this.eventEmitter.addListener(EEventTopicKey.AddLabel, this._handleAddLabel.bind(this));
		this.eventEmitter.addListener(EEventTopicKey.RemoveLabel, this._handleRemoveLabel.bind(this));
	}

	private _handleEvaluate(data: ProductEvaluate) {
		this.storeV([data]);
		this.training();
	}

	private _handleAddLabel(data: IEventDataLabel) {
		switch (data.key) {
			case 'provider': {
				this.addLabel('providers', data.id, this.KnnProviderData);
				this.KnnProvider = new KNN(this.KnnProviderData.train, this.KnnProviderData.label, { k: 3 });
				break;
			}
			case 'style': {
				this.addLabel('styles', data.id, this.KnnStyleData);
				this.KnnStyle = new KNN(this.KnnStyleData.train, this.KnnStyleData.label, { k: 3 });
				break;
			}
			case 'capacity': {
				this.addLabel('capacities', data.id, this.KnnCapacityData);
				this.KnnCapacity = new KNN(this.KnnCapacityData.train, this.KnnCapacityData.label, { k: 3 });
				break;
			}
			case 'odorGroup': {
				this.addLabel('groups', data.id, this.KnnGroupData);
				this.KnnGroup = new KNN(this.KnnGroupData.train, this.KnnGroupData.label, { k: 3 });
				break;
			}
			case 'odorRange': {
				this.addLabel('ranges', data.id, this.KnnRangeData);
				this.KnnRange = new KNN(this.KnnRangeData.train, this.KnnRangeData.label, { k: 3 });
				break;
			}
			case 'odorRetentionTime': {
				this.addLabel('retentionTimes', data.id, this.KnnRetentionTimeData);
				this.KnnRetentionTime = new KNN(this.KnnRetentionTimeData.train, this.KnnRetentionTimeData.label, {
					k: 3,
				});
				break;
			}
			default:
				break;
		}
	}

	private addLabel(
		storeKey: string,
		id: number,
		KnnData: {
			train: number[][];
			label: number[];
		},
	) {
		this[storeKey].push(id);
		for (const iterator of KnnData.train) {
			iterator.push(0);
		}
	}

	private _handleRemoveLabel(data: IEventDataLabel) {
		switch (data.key) {
			case 'provider': {
				this.removeLabel('providers', data.id, this.KnnProviderData);
				this.KnnProvider = new KNN(this.KnnProviderData.train, this.KnnProviderData.label, { k: 3 });
				break;
			}
			case 'style': {
				this.removeLabel('styles', data.id, this.KnnStyleData);
				this.KnnStyle = new KNN(this.KnnStyleData.train, this.KnnStyleData.label, { k: 3 });
				break;
			}
			case 'capacity': {
				this.removeLabel('capacities', data.id, this.KnnCapacityData);
				this.KnnCapacity = new KNN(this.KnnCapacityData.train, this.KnnCapacityData.label, { k: 3 });
				break;
			}
			case 'odorGroup': {
				this.removeLabel('groups', data.id, this.KnnGroupData);
				this.KnnGroup = new KNN(this.KnnGroupData.train, this.KnnGroupData.label, { k: 3 });
				break;
			}
			case 'odorRange': {
				this.removeLabel('ranges', data.id, this.KnnRangeData);
				this.KnnRange = new KNN(this.KnnRangeData.train, this.KnnRangeData.label, { k: 3 });
				break;
			}
			case 'odorRetentionTime': {
				this.removeLabel('retentionTimes', data.id, this.KnnRetentionTimeData);
				this.KnnRetentionTime = new KNN(this.KnnRetentionTimeData.train, this.KnnRetentionTimeData.label, {
					k: 3,
				});
				break;
			}
			default:
				break;
		}
	}

	private removeLabel(
		storekey: string,
		id: number,
		KnnData: {
			train: number[][];
			label: number[];
		},
	) {
		const index = this[storekey].findIndex(_ => _ === id);
		this[storekey].splice(index, 1);
		if (index !== -1) {
			for (const iterator of KnnData.train) {
				iterator.splice(index, 1);
			}
		}
	}

	private async storeFromDb(
		service:
			| ProviderService
			| CapacityService
			| StyleService
			| OdorRetentionTimeService
			| OdorGroupService
			| OdorRangeService,
		storeKey: string,
	) {
		const datas = await service.findsByOptions();
		const store = [];
		for (const iterator of datas) {
			store.push(iterator.id);
		}
		this[storeKey] = store;
	}

	private async storeEvaluates() {
		const evaluates = await this.evaluateService.getAll();
		from(evaluates)
			.pipe(
				groupBy(evaluate => evaluate.userId),
				mergeMap(group => group.pipe(toArray())),
			)
			.subscribe(data => this.storeV(data));
		this.training();
	}

	private storeV(evaluates: ProductEvaluate[]) {
		const userId = evaluates[0].userId;
		const evaluateStore = this.evaluates.get(userId) || new EvaluateStoreData();
		for (const iterator of evaluates) {
			// console.log(iterator);
			for (const key of Object.keys(evaluateStore)) {
				const storeChild = evaluateStore[key][iterator.product[`${key}Id`]] as StoreChildData;
				if (!storeChild) {
					evaluateStore[key][iterator.product[`${key}Id`]] = new StoreChildData(iterator.point);
				} else {
					storeChild.addPoint(iterator.point);
				}
			}
		}
		// console.log(evaluateStore);

		this.evaluates.set(userId, evaluateStore);
		this.addMatrix(this.providers, evaluateStore.provider, userId, this.KnnProviderData);
		this.addMatrix(this.capacities, evaluateStore.capacity, userId, this.KnnCapacityData);
		this.addMatrix(this.groups, evaluateStore.odorGroup, userId, this.KnnGroupData);
		this.addMatrix(this.ranges, evaluateStore.odorRange, userId, this.KnnRangeData);
		this.addMatrix(this.retentionTimes, evaluateStore.odorRetentionTime, userId, this.KnnRetentionTimeData);
		this.addMatrix(this.styles, evaluateStore.style, userId, this.KnnStyleData);
	}

	private addMatrix(
		store: number[],
		data: { [id: number]: StoreChildData },
		label: number,
		KnnData: {
			train: number[][];
			label: number[];
		},
	) {
		KnnData.label.push(label);
		KnnData.train.push(this.createMatrix(store, data));
	}

	private createMatrix(store: number[], data: { [id: number]: StoreChildData }) {
		const result = [] as number[];
		for (const id of store) {
			if (data[id]) {
				result.push(data[id].point / data[id].total);
			} else {
				result.push(0);
			}
		}
		return result;
	}

	private training() {
		// console.log(this.KnnProviderData);
		// console.log(this.KnnCapacityData);
		// console.log(this.KnnStyleData);
		// console.log(this.KnnRetentionTimeData);
		// console.log(this.KnnGroupData);
		// console.log(this.KnnRangeData);
		if (this.KnnProviderData.train.length) {
			this.KnnProvider = new KNN(this.KnnProviderData.train, this.KnnProviderData.label, { k: 3 });
		}
		if (this.KnnCapacityData.train.length) {
			this.KnnCapacity = new KNN(this.KnnCapacityData.train, this.KnnCapacityData.label, { k: 3 });
		}
		if (this.KnnStyleData.train.length) {
			this.KnnStyle = new KNN(this.KnnStyleData.train, this.KnnStyleData.label, { k: 3 });
		}
		if (this.KnnGroupData.train.length) {
			this.KnnGroup = new KNN(this.KnnGroupData.train, this.KnnGroupData.label, { k: 3 });
		}
		if (this.KnnRangeData.train.length) {
			this.KnnRange = new KNN(this.KnnRangeData.train, this.KnnRangeData.label, { k: 3 });
		}
		if (this.KnnRetentionTimeData.train.length) {
			this.KnnRetentionTime = new KNN(this.KnnRetentionTimeData.train, this.KnnRetentionTimeData.label, { k: 3 });
		}
	}

	public predict(userId: number) {
		const evaluateStore = this.evaluates.get(userId);
		if (!evaluateStore) {
			return;
		}
		const provider = this.KnnProvider.predictSingle(
			this.createMatrix(this.providers, evaluateStore.provider),
			userId,
		);
		const capacity = this.KnnCapacity.predictSingle(
			this.createMatrix(this.capacities, evaluateStore.capacity),
			userId,
		);
		const group = this.KnnGroup.predictSingle(this.createMatrix(this.groups, evaluateStore.odorGroup), userId);
		const range = this.KnnRange.predictSingle(this.createMatrix(this.ranges, evaluateStore.odorRange), userId);
		const reTime = this.KnnRetentionTime.predictSingle(
			this.createMatrix(this.retentionTimes, evaluateStore.odorRetentionTime),
			userId,
		);
		const style = this.KnnStyle.predictSingle(this.createMatrix(this.styles, evaluateStore.style), userId);
		console.log(provider, capacity, group, range, reTime, style);
		const temp = {};
		temp[provider] ? (temp[provider] = 1) : temp[provider]++;
		temp[capacity] ? (temp[capacity] = 1) : temp[capacity]++;
		temp[group] ? (temp[group] = 1) : temp[group]++;
		temp[range] ? (temp[range] = 1) : temp[range]++;
		temp[reTime] ? (temp[reTime] = 1) : temp[reTime]++;
		temp[style] ? (temp[style] = 1) : temp[style]++;
		let result = provider;
		let max = 0;
		for (const key of Object.keys(temp)) {
			if (temp[+key] > max) {
				result = +key;
				max = temp[+key];
			}
		}
		return result;
	}
}
