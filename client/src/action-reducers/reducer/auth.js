import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUND_DELETE,
} from "../action/actionType";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthentication: null,
  loading: true,
  user: null,
};
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthentication: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        loading: false,
        isAuthentication: true,
        ...payload,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUND_DELETE:
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        isAuthentication: false,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
