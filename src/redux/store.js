import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./Slice/post";
import { authReducer } from "./Slice/auth";

const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
  },
});

export default store;
