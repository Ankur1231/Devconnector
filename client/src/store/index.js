import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alert-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
