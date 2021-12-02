import { authActions } from "./auth-slice";
import { settingAlert } from "./alert-slice";
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
    } catch (error) {
      const errors = error.response.data.error;
      if (errors) {
        errors.forEach((error) => dispatch(settingAlert(error.msg, "danger")));
      }

      dispatch(authActions.registerFail());
    }
  };
