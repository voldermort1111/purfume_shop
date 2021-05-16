import { CartReduxAction } from '../store.constant';

export function addToCartStore(payload) {
	return { type: CartReduxAction.addToCart, payload };
}

export function removeToCartStore(id) {
	return { type: CartReduxAction.removeToCart, id };
}

export function updateQuantityCart(payload) {
	return { type: CartReduxAction.updateQuantity, payload };
}

export function clearCartStore() {
	return { type: CartReduxAction.clearCart };
}
