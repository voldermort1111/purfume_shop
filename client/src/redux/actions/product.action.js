import { ProductReduxAction } from '../store.constant';

export function changePageOptions(payload) {
	return { type: ProductReduxAction.pageOptions, payload };
}

export function clearProductStore() {
	return { type: ProductReduxAction.clearProductStore };
}
