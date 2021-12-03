import axios from "axios";
import { profileActions } from "./profile-slice";
import { settingAlert } from "./alert-slice";

const url = "http://localhost:8000";

//Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}/api/profile/me`);
    dispatch(profileActions.getProfile(res.data));
  } catch (error) {
    dispatch(
      profileActions.profileError({ msg: error.response.statusText, status: error.response.status })
    );
  }
};

//Create or update Profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await axios.post(`${url}/api/profile`, formData);
      dispatch(profileActions.getProfile(res.data));
      dispatch(settingAlert(edit ? "Profile Updated" : "Profile Created", "success"));
      if (!edit) {
        navigate("/dashboard");
      }
    } catch (error) {
      const errors = error.response.data.error;
      if (errors) {
        errors.forEach((error) => dispatch(settingAlert(error.msg, "danger")));
      }
      dispatch(
        profileActions.profileError({
          msg: error.response.statusText,
          status: error.response.status,
        })
      );
    }
  };