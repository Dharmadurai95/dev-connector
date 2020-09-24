import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROILE,
  GET_PROFILES,
  GET_REPOS,
  ACCOUND_DELETE,
} from "../action/actionType";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  errors: {},
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        loading: false,
        repos: payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
    case ACCOUND_DELETE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default profile;
