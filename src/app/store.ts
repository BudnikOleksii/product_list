import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';

export const store = configureStore({
  reducer: {
    productsState: productsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const selectors = {
  getProducts: (state: RootState) => state.productsState,
};
