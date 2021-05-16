import { ProductReduxAction } from "../store.constant";

const ProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ProductReduxAction.pageOptions:
      return Object.assign({}, state, action.payload);

    case ProductReduxAction.clearProductStore:
      return {};

    default:
      return state;
  }
};

export default ProductReducer;
