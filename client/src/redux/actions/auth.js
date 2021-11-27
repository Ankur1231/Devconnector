import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";
import { setAlert } from "./alert";

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      const body = { name, email, password };
      const res = await axios.post("http://localhost:8000/api/users", body);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      const errors = error.response.data.error;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        console.log("alo");
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
