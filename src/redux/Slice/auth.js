import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAuth = createAsyncThunk("/auth/fetchAuth", async (params) => {
  const { data } = await axios.post(
    `https://mernblog-qnjk.onrender.com/auth/login`,
    params
  );
  return data;
});

export const fetchRegister = createAsyncThunk(
  "/auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post(
      `https://mernblog-qnjk.onrender.com/auth/register`,
      params
    );
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk("/auth/fetchAuthMe", async () => {
  const { data } = await axios.get(
    `https://mernblog-qnjk.onrender.com/auth/me`
  );
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    //////////////////////////////////
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    //////////////////////////////////
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const logout = authSlice.actions.logout;

export const authReducer = authSlice.reducer;
