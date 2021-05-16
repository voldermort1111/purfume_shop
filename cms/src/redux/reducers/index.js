import AuthReducer from "./auth.reducer";
import CartReducer from "./cart.reducer";
import ProductReducer from "./product.reducer";

const reducers = {
  product: ProductReducer,
  cart: CartReducer,
  auth: AuthReducer,
};

export default reducers;
