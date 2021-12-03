import { authActions } from "./auth-slice";
import { settingAlert } from "./alert-slice";
import { profileActions } from "./profile-slice";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

const url = "http://localhost:8000";

//Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${url}/api/auth`);
    dispatch(authActions.userLoaded(res.data));
  } catch (error) {
    dispatch(authActions.authError());
  }
};

//register user
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      const body = { name, email, password };
      const res = await axios.post(`${url}/api/users`, body);
      dispatch(authActions.registerSuccess(res.data));
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.error;
      if (errors) {
        errors.forEach((error) => dispatch(settingAlert(error.msg, "danger")));
      }

      dispatch(authActions.registerFail());
    }
  };

//login user
export const login = (email, password) => async (dispatch) => {
  try {
    const body = { email, password };
    const res = await axios.post(`${url}/api/auth`, body);
    dispatch(authActions.loginSuccess(res.data));
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
      errors.forEach((error) => dispatch(settingAlert(error.msg, "danger")));
    }

    dispatch(authActions.loginFail());
  }
};

//logout / Clear user
export const logout = () => (dispatch) => {
  dispatch(authActions.logout());
  dispatch(profileActions.clearProfile());
};
