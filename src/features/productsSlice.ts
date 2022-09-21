/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { getProducts } from '../api';

type ProductsState = {
  products: Product[];
  productsIsLoading: boolean;
  productsError: string;
};

const initialState: ProductsState = {
  products: [],
  productsIsLoading: false,
  productsError: '',
};

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetch_products',
  getProducts,
);

export const productsStateSlice = createSlice({
  name: 'productsState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.productsIsLoading = true;
      state.productsError = '';
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.products = action.payload;
      state.productsIsLoading = false;
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.productsError = action.error.name || '';
      state.productsIsLoading = false;
    });
  },
});

// export const { clearPosts } = productsStateSlice.actions;
export default productsStateSlice.reducer;
