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

// export const deleteCommentById = createAsyncThunk(
//   'currentPost/delete_comment',
//   deleteComment,
// );
//
// export const addComment = createAsyncThunk(
//   'currentPost/add_comment',
//   createComment,
// );

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.comments[action.meta.arg] = action.payload;
      state.commentsIsLoading = false;
    });

    builder.addCase(fetchComments.rejected, (state, action) => {
      state.commentsIsError = action.error.name || '';
      state.commentsIsLoading = false;
    });

    // builder.addCase(deleteCommentById.pending, (state, action) => {
    //   const id = state.selectedPostId || 0;
    //
    //   state.comments[id] = state.comments[id].filter(comment => (
    //     comment.id !== action.meta.arg
    //   ));
    // });
    //
    // builder.addCase(addComment.pending, (state, action) => {
    //   const id = state.selectedPostId || 0;
    //
    //   state.comments[id].push({
    //     ...action.meta.arg,
    //     id: -(state.comments[id].length),
    //   });
    // });
    //
    // builder.addCase(addComment.fulfilled, (state, action) => {
    //   const id = state.selectedPostId || 0;
    //   const fakeId = -(state.comments[id].length - 1);
    //
    //   state.comments[id] = state.comments[id].map(comment => (
    //     comment.id === fakeId ? action.payload : comment
    //   ));
    // });
  },
});

// export const { setSelectedPostId } = commentsSlice.actions;
export default commentsSlice.reducer;
