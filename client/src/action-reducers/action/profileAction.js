import axios from "axios";

import {
  ACCOUND_DELETE,
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROILE,
  GET_PROFILES,
  GET_REPOS,
} from "./actionType";
import { alertActionCreator } from "./alerAction";
// /profile/getProfile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    let currentUser = await axios.get("/profile/getProfile");
    dispatch({
      type: GET_PROFILE,
      payload: currentUser.data,
    });
  } catch (error) {
    console.log("Profile Not Found", error.response.data.msg);
    dispatch(alertActionCreator(error.response.data.msg, "light"));
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//get profile by id
// /profile/getProfile
export const getProfileById = (userId) => async (dispatch) => {
  try {
    let currentUser = await axios.get(`/profile/getProfile/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: currentUser.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//get github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    let currentUser = await axios.get(`/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: currentUser.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response,
        status: error.response,
      },
    });
  }
};

// /profile/getProfile
export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    let currentUser = await axios.get("/profile/getProfiles");
    dispatch({
      type: GET_PROFILES,
      payload: currentUser.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// create or update profile

export const createOrUpdateProfile = (
  profileData,
  history,
  edit = false
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await axios.post(
      "/profile/createProfile",
      JSON.stringify(profileData),
      config
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(
      alertActionCreator(
        edit ? "Profile Updated" : " Profile Created",
        "success"
      )
    );

    history.push("/dashboard");
  } catch (err) {
    let error = err.response.data.errors;
    if (error) {
      error.forEach((error) => {
        alertActionCreator(error.msg, "danger");
      });
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//UPDATE EDUCATION

export const educationAdd = (FormData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let currentUser = await axios.patch(
      "/profile/updateEducation",
      FormData,
      config
    );
    dispatch({
      type: UPDATE_PROILE,
      payload: currentUser.data,
    });
    dispatch(alertActionCreator("Education Added", "success"));
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Experince added

export const ExperinceAdd = (FormData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let currentUser = await axios.patch(
      "/profile/updateExperince",
      FormData,
      config
    );
    dispatch({
      type: UPDATE_PROILE,
      payload: currentUser.data,
    });
    dispatch(alertActionCreator("Experince Added", "success"));
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//delete experience
export const deleteExperiece = (id) => async (dispatch) => {
  try {
    let res = await axios.delete(`/profile/deleteExp/${id}`);
    dispatch({
      type: UPDATE_PROILE,
      payload: res.data,
    });
    dispatch(alertActionCreator("Experience Deleted", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    let res = await axios.delete(`/profile/deleteEdu/${id}`);
    dispatch({
      type: UPDATE_PROILE,
      payload: res.data,
    });
    dispatch(alertActionCreator("Education Deleted", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//DELETE ACCOUND

export const deleteAccound = (history) => async (dispatch) => {
  if (window.confirm("Are you sure ? this can not be undone ")) {
    try {
      axios
        .delete(`/profile/deleteUserProfile`)
        .then((resolve) => console.log(resolve))
        .catch((e) => console.log(e));
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUND_DELETE });
      history.push("/");
      dispatch(
        alertActionCreator("Accound Has Been Permenently Deleted", "danger")
      );
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};
