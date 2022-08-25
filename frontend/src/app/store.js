import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import productReducer from '../features/products/reducers/productsSlice'
import productApi from '../features/products/reducers/productsApi';
import authReducer from '../features/auth/reducers/authSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    [productApi.reducerPath]: productApi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(
      productApi.middleware
    )
});

setupListeners(store.dispatch);
