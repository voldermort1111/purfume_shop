import { CartReduxAction } from '../store.constant';

const CartReducer = (state = {}, action) => {
	switch (action.type) {
		case CartReduxAction.addToCart:
			if (!action.payload?.id) {
				return state;
			}
			if (state[action.payload.id] === undefined) {
				return Object.assign({}, state, { [action.payload.id]: action.payload.quantity || 1 });
			}
			return Object.assign({}, state, {
				[action.payload.id]: (state[action.payload.id] || 1) + action.payload.quantity,
			});

		case CartReduxAction.removeToCart:
			const oldState = { ...state };
			delete oldState[action.id];
			return oldState;

		case CartReduxAction.updateQuantity:
			return Object.assign({}, state, { [action.payload.id]: action.payload.quantity });

		case CartReduxAction.clearCart:
			return {};
	}
	return state;
};

export default CartReducer;
