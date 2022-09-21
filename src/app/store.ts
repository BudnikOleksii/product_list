import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import commentsReducer from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    productsState: productsReducer,
    commentsState: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const selectors = {
  getProducts: (state: RootState) => state.productsState,
  getComments: (state: RootState) => state.commentsState,
};
