import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from "./actionType";
import axios from "axios";
import { alertActionCreator } from "./alerAction";
import setAuthTokenHeader from "../utility/setHeader";

// set auth token headers
export const loaded = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthTokenHeader(localStorage.token);
  }
  try {
    const res = await axios.get("user/getUser");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//REGISTER action creators

export const authAction = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    name,
    email,
    password,
  });

  try {
    let response = await axios.post("/user/register", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
    dispatch(loaded());
  } catch (err) {
    let error = err.response.data.errors;
    if (error) {
      error.forEach((error) => {
        alertActionCreator(error.msg, "danger");
      });
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//LOGIN ACTION CREATORS

//REGISTER action creators

export const loginAction = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      email,
      password,
    });
    let response = await axios.post("/user/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
    dispatch(loaded());
  } catch (err) {
    let error = err.response.data.error;

    dispatch(alertActionCreator(error, "danger"));

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//logout action

export const logOutAction = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: CLEAR_PROFILE,
  });
};
