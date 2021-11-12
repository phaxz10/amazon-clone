// import { configureStore } from '@reduxjs/toolkit';
// import basketReducer from '../slices/basketSlice';
// import productsReducer from '../slices/productsSlice';

// export const store = configureStore({
//   reducer: {
//     basket: basketReducer,
//     products: productsReducer,
//   },
// });

import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import basketReducer from '../slices/basketSlice';

const reducers = combineReducers({
  basket: basketReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

// export default store;
