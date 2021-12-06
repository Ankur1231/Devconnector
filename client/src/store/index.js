import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alert-slice";
import authSlice from "./auth-slice";
import profileSlice from "./profile-slice";
import postSlice from "./post-slice";

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    post: postSlice.reducer,
  },
});

export default store;
