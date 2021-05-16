import AuthReducer from './auth.reducer';
import CartReducer from './cart.reducer';
import ProductReducer from './product.reducer';

export default {
	product: ProductReducer,
	cart: CartReducer,
	auth: AuthReducer,
};
