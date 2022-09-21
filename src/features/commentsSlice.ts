/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCommentsByProductId } from '../api';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: { [key: string]: Comment[] };
  commentsIsLoading: boolean;
  commentsIsError: string;
};

const initialState: CommentsState = {
  comments: {},
  commentsIsLoading: false,
  commentsIsError: '',
};

export const fetchComments = createAsyncThunk(
  'currentPost/fetch_comments',
  getCommentsByProductId,
);

export const commentsSlice = createSlice({
  name: 'currentPostState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.commentsIsError = '';
      state.commentsIsLoading = true;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments[action.meta.arg] = action.payload;
      state.commentsIsLoading = false;
    });

    builder.addCase(fetchComments.rejected, (state, action) => {
      state.commentsIsError = action.error.name || '';
      state.commentsIsLoading = false;
    });
  },
});

export default commentsSlice.reducer;
