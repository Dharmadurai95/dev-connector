import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./action-reducers/index";

const stateInitial = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  stateInitial,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
