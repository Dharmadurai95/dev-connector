import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  REMOVE_COMMENT,
  ADD_COMMENT,
} from "./actionType";
import { alertActionCreator } from "./alerAction";
import axios from "axios";

export const postActionCreator = () => async (dispatch) => {
  try {
    let post = await axios.get("/post/getAllPost");

    dispatch({
      type: GET_POSTS,
      payload: post.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//ADD LIKES

export const likeActionCreator = (id) => async (dispatch) => {
  try {
    let post = await axios.patch(`/post/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: post.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//unlikee action creator

export const unUikeActionCreator = (id) => async (dispatch) => {
  try {
    let post = await axios.patch(`/post/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: post.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//delete post
export const deletePostActionCreator = (id) => async (dispatch) => {
  try {
    await axios.delete(`/post/deletePost/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(alertActionCreator("Post Delete Successfully", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response,
        status: error.response,
      },
    });
  }
};

//create  post
export const createPostActionCreator = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let post = await axios.post(`/post/createPost`, formData, config);

    dispatch({
      type: ADD_POST,
      payload: post.data,
    });
    dispatch(alertActionCreator("Post Created ", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response,
        status: error.response,
      },
    });
  }
};

//get single post action creator

export const getSinglePostActionCreator = (id) => async (dispatch) => {
  try {
    let post = await axios.get(`/post/getSinglePost/${id}`);

    dispatch({
      type: GET_POST,
      payload: post.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//add command

//create  post
export const createCommentActionCreator = (postId, formData) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let post = await axios.post(
      `/post/postCommant/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: post.data,
    });
    dispatch(alertActionCreator("Comment Created ", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response,
        status: error.response,
      },
    });
  }
};

//remove command

export const deleteCommentActionCreator = (postId, cmdId) => async (
  dispatch
) => {
  try {
    await axios.delete(`/post/deleteCommant/${postId}/${cmdId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: cmdId,
    });
    dispatch(alertActionCreator("Comment Removed ", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response,
        status: error.response,
      },
    });
  }
};
