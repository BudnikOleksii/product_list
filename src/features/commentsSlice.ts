/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addNewComment, deleteComment, getCommentsByProductId } from '../api';
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

export const removeComment = createAsyncThunk(
  'currentPost/remove_comment',
  deleteComment,
);

export const addNewCommentForProduct = createAsyncThunk(
  'currentPost/add_comment',
  addNewComment,
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

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.comments[action.meta.arg.productId] = state.comments[action.meta.arg.productId].filter(
        comment => comment.id !== action.meta.arg.id,
      );
    });

    builder.addCase(addNewCommentForProduct.fulfilled, (state, action) => {
      state.comments[action.meta.arg.productId].push(action.payload);
    });
  },
});

export default commentsSlice.reducer;
