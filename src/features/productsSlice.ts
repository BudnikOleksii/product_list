/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import {
  createProduct, deleteProductById, getProducts, updateProduct,
} from '../api';
import { SortType } from '../types/SortType';

type ProductsState = {
  products: Product[];
  productsIsLoading: boolean;
  productsError: string;
  sortType: SortType;
};

const initialState: ProductsState = {
  products: [],
  productsIsLoading: false,
  productsError: '',
  sortType: SortType.Name,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetch_products',
  getProducts,
);

export const addNewProduct = createAsyncThunk(
  'products/add_product',
  createProduct,
);

export const updateProductById = createAsyncThunk(
  'products/update_product',
  updateProduct,
);

export const removeProductById = createAsyncThunk(
  'products/delete_product',
  deleteProductById,
);

export const productsStateSlice = createSlice({
  name: 'productsState',
  initialState,
  reducers: {
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.productsIsLoading = true;
      state.productsError = '';
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.productsIsLoading = false;
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.productsError = action.error.name || '';
      state.productsIsLoading = false;
    });

    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });

    builder.addCase(updateProductById.fulfilled, (state, action) => {
      state.products = state.products.map(product => (
        product.id === action.meta.arg.id ? action.payload : product
      ));
    });

    builder.addCase(removeProductById.fulfilled, (state, action) => {
      state.products = state.products.filter(product => (
        product.id !== action.meta.arg
      ));
    });
  },
});

export const { changeSortType } = productsStateSlice.actions;
export default productsStateSlice.reducer;
