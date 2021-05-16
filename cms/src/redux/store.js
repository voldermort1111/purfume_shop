import { createStore, combineReducers } from "redux";
import ReducerStore from "./reducers";

const appReducers = combineReducers(ReducerStore);

const rootReducer = (state, action) => {
  // LOGOUT
  return appReducers(state, action);
};

const initialState = {
  product: {},
  cart: {},
};

const store = createStore(rootReducer, initialState);

export default store;
