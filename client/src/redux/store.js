import { createStore, combineReducers } from 'redux';
import ReducerStore from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['product', 'cart'],
};

const appReducers = combineReducers(ReducerStore);

const rootReducer = (state, action) => {
	// LOGOUT
	return appReducers(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const initialState = {
// 	product: {},
// 	cart: {},
// };

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
