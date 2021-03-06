import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    post: null,
    loading: true,
    error: {},
  },
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
      state.loading = false;
    },
    getPost(state, action) {
      state.post = action.payload;
      state.loading = false;
    },
    postError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateLikes(state, action) {
      state.posts.map((post) =>
        post._id === action.payload.postId
          ? (post.likes = action.payload.likes)
          : null
      );
      state.loading = false;
    },
    deletePost(state, action) {
      //   console.log("payload", action.payload.postId);
      //   state.posts.filter((post) => {
      //     console.log("post", post._id);
      //     return post._id !== action.payload.postId;
      //   });
      state.posts.filter((post) => post._id !== action.payload.postId);
      state.loading = false;
    },
    addPost(state, action) {
      state.posts.unshift(action.payload);
      state.loading = false;
    },
    addComment(state, action) {
      state.post.comments = action.payload.comments;
    },
    removeComment(state, action) {
      // state.post.comments.filter(
      //   (comment) => comment._id !== action.payload.commentId
      // );
      state.post.comments = action.payload.comments;
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice;
