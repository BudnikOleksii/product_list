import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import commentsReducer from '../features/commentsSlice';
import { SortType } from '../types/SortType';

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
  getSortedProducts: (state: RootState) => {
    const { products, sortType } = state.productsState;

    switch (sortType) {
      case SortType.Name:
        return [...products].sort((a, b) => (
          a.name.localeCompare(b.name)
        ));
      case SortType.Count:
        return [...products].sort((a, b) => (
          a.count - b.count
        ));
      default:
        return [...products];
    }
  },
};
