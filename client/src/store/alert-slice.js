import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const alertSlice = createSlice({
  name: "alert",
  initialState: [],
  reducers: {
    setAlert(state, action) {
      state.push(action.payload);
    },
    removeAlert(state, action) {
      state.pop();
    },
  },
});

export const alertActions = alertSlice.actions;

export const settingAlert = (msg, alertType) => (dispatch) => {
  const id = uuid();
  dispatch(alertActions.setAlert({ msg, alertType, id }));
  setTimeout(() => dispatch(alertActions.removeAlert(id)), 5000);
};

export default alertSlice;
