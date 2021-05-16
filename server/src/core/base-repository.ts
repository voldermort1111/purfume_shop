import { IOptionsPaging } from './../shared/types/shared.type';
import { Repository, Connection, Transaction, TransactionManager, EntityManager, EntityTarget } from 'typeorm';
import { cloneFilterObject } from './../shared/utils/common';

type ActionWithTransaction = (manager: EntityManager, ...arg: any) => Promise<any>;

export interface IFindOptions extends IOptionsPaging {}

export abstract class BaseRepository<E, A = any> extends Repository<E> {
	// protected abstract name: string;
	constructor(public readonly connection: Connection) {
		super();
	}

	getRepository<E = any>(entity: any) {
		return this.connection.getRepository<E>(entity);
	}

	@Transaction()
	createTransaction(@TransactionManager() manager: EntityManager, ...arg: ActionWithTransaction[]) {
		for (const iterator of arg) {
			iterator.call(this, iterator.arguments);
		}
	}

	// createWithTransaction(manager: EntityManager, data: E, plainObject: A) {
	// 	return manager.create<E>({ name: this.name, type: data } as EntityTarget<E>, plainObject);
	// }

	saveWithTransaction(manager: EntityManager, ...data: E[]) {
		return manager.save<E>(data);
	}

	// updateWithTransaction(manager: EntityManager, data: E, criteria: any) {
	// 	return manager.update<E>({ name: this.name, type: data } as EntityTarget<E>, criteria, data);
	// }

	// deleteWithTransaction(manager: EntityManager, data: E, criteria: any) {
	// 	return manager.delete<E>({ name: this.name, type: data } as EntityTarget<E>, criteria);
	// }

	// softDeleteWithTransaction(manager: EntityManager, data: E, criteria: any) {
	// 	return manager.softDelete<E>({ name: this.name, type: data } as EntityTarget<E>, criteria);
	// }

	removeWithTransaction(manager: EntityManager, data: E) {
		return manager.remove<E>(data);
	}

	softRemoveWithTransaction(manager: EntityManager, data: E) {
		return manager.softRemove<E>(data);
	}

	findAndCountByOptions<T extends IFindOptions>(options: T | IFindOptions = {}) {
		let take, skip, order;
		if (options.limit && options.page) {
			take = options.limit;
			skip = (+options.page - 1) * +options.limit;
		}
		if (options.direction && options.sortBy) {
			order = options.direction && options.sortBy && { [options.sortBy]: options.direction };
		}
		return this.findAndCount({
			where: cloneFilterObject(options, ['page', 'limit', 'sortBy', 'direction']),
			take,
			skip,
			order,
		});
	}

	findsByOptions<T extends IFindOptions>(options: T | IFindOptions = {}) {
		let take, skip, order;
		if (options.limit && options.page) {
			take = options.limit;
			skip = (+options.page - 1) * +options.limit;
		}
		if (options.direction && options.sortBy) {
			order = options.direction && options.sortBy && { [options.sortBy]: options.direction };
		}
		return this.find({
			where: cloneFilterObject(options, ['page', 'limit', 'sortBy', 'direction']),
			take,
			skip,
			order,
		});
	}
}
