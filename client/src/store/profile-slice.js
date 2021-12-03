import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
  },
  reducers: {
    getProfile(state, action) {
      state.profile = action.payload;
      state.loading = false;
    },
    profileError(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.profile = null;
    },
    clearProfile(state, action) {
      state.loading = false;
      state.profile = null;
      state.repos = [];
      state.error = {};
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
