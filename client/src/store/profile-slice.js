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
    getProfiles(state, action) {
      state.profiles = action.payload;
      state.loading = false;
    },
    getRepos(state, action) {
      state.repos = action.payload;
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
    updateProfile(state, action) {
      state.profile = action.payload;
      state.loading = false;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
