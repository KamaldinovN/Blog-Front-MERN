import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get(
    `https://frozen-escarpment-09799.herokuapp.com/posts`
  );
  return data;
});

export const fetchNewPosts = createAsyncThunk("posts/fetchNewPosts", async () => {
  const { data } = await axios.get(
      `https://frozen-escarpment-09799.herokuapp.com/posts/new`
  );
  return data;
});
export const fetchPopularPosts = createAsyncThunk("posts/fetchPopularPosts", async () => {
  const { data } = await axios.get(
      `https://frozen-escarpment-09799.herokuapp.com/posts/popular`
  );
  return data;
});
export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get(
    `https://frozen-escarpment-09799.herokuapp.com/tags`
  );
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  (id) => {
    axios.delete(`https://frozen-escarpment-09799.herokuapp.com/posts/${id}`);
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    ////////////////////////////////////
    [fetchNewPosts.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchNewPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchNewPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    ///////////////////////////////////
    [fetchPopularPosts.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPopularPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPopularPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    ////////////////////////////////////
    [fetchTags.pending]: (state) => {
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    ////////////////////////////////////
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const postReducer = postsSlice.reducer;
