import { combineReducers } from "redux";
import alertReducer from "./reducer/alert";
import authReducer from "./reducer/auth";
import profile from "./reducer/profile";
import post from "./reducer/post";

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile,
  post,
});
