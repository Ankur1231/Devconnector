import axios from "axios";
import { postActions } from "./post-slice";
import { settingAlert } from "./alert-slice";

const url = "http://localhost:8000";

//get all the posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}/api/post`);
    dispatch(postActions.getPosts(res.data));
  } catch (error) {
    dispatch(
      postActions.postError({
        msg: error.response.statusText,
        status: error.response.status,
      })
    );
  }
};

// like/unlike posts
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`${url}/api/post/like/${postId}`);
    dispatch(postActions.updateLikes({ postId, likes: res.data.likes }));
  } catch (error) {
    dispatch(
      postActions.postError({
        msg: error.response.statusText,
        status: error.response.status,
      })
    );
  }
};

//delete posts
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`${url}/api/post/${postId}`);
    dispatch(postActions.deletePost({ postId }));
    dispatch(settingAlert("Post removed", "success"));
  } catch (error) {
    dispatch(
      postActions.postError({
        msg: error.response.statusText,
        status: error.response.status,
      })
    );
  }
};

//add posts
export const addPost = (formData) => async (dispatch) => {
  console.log(formData);
  try {
    const res = await axios.post(`${url}/api/post`, formData);
    dispatch(postActions.addPost(res.data));
    dispatch(settingAlert("Post Created", "success"));
  } catch (error) {
    dispatch(
      postActions.postError({
        msg: error.response.statusText,
        status: error.response.status,
      })
    );
  }
};
