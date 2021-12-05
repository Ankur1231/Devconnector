import axios from "axios";
import { profileActions } from "./profile-slice";
import { settingAlert } from "./alert-slice";
import { authActions } from "./auth-slice";

const url = "http://localhost:8000";

//Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}/api/profile/me`);
    dispatch(profileActions.getProfile(res.data));
  } catch (error) {
    dispatch(
      profileActions.profileError({
        msg: error.response.statusText,
        status: error.response.status,
      })
    );
  }
};

//get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch(profileActions.clearProfile());
  try {
    const res = await axios.get(`${url}/api/profile`);
    dispatch(profileActions.getProfiles(res.data));
  } catch (error) {
    dispatch(
      profileActions.profileError({
        msg: error.response.statusText,
        status: error.response.status,
      })
    );
  }
};

//get profile by userID
export const getProfileByUserId = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}/api/profile/user/${userId}`);
    dispatch(profileActions.getProfile(res.data));
  } catch (error) {
    dispatch(
      profileActions.profileError({
        msg: error.response.statusText,
        status: error.response.status,
      })
    );
  }
};

//get github repos
export const getGithubRepos = (userName) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}/api/profile/github/${userName}`);
    dispatch(profileActions.getRepos(res.data));
  } catch (error) {
    dispatch(
      profileActions.profileError({
        msg: error.response.statusText,
        status: error.response.status,
      })
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

//add experience
export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const res = await axios.put(`${url}/api/profile/experience`, formData);
    dispatch(profileActions.updateProfile(res.data));
    dispatch(settingAlert("Experienec Added", "success"));
    navigate("/dashboard");
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

//add education
export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const res = await axios.put(`${url}/api/profile/education`, formData);
    dispatch(profileActions.updateProfile(res.data));
    dispatch(settingAlert("education Added", "success"));
    navigate("/dashboard");
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

//delete Education
export const deleteEducation = (id) => async (dispatch) => {
  if (window.confirm("Are you sure ? This cannot be undone!")) {
    try {
      const res = await axios.delete(`${url}/api/profile/education/${id}`);
      dispatch(profileActions.updateProfile(res.data));

      dispatch(settingAlert("education Deleted", "success"));
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
  }
};

//delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  if (window.confirm("Are you sure ? This cannot be undone!")) {
    try {
      const res = await axios.delete(`${url}/api/profile/experience/${id}`);
      dispatch(profileActions.updateProfile(res.data));

      dispatch(settingAlert("experience Deleted", "success"));
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
  }
};

//delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure ? This cannot be undone!")) {
    try {
      await axios.delete(`${url}/api/profile`);
      dispatch(profileActions.clearProfile());
      dispatch(authActions.accountDeleted());

      dispatch(settingAlert("account successfully deleted", "success"));
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
  }
};
