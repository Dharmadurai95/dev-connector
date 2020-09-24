import { SET_ALERT, REMOVE_ALERT } from "./actionType";
import { v4 as uuidv4 } from "uuid";

export const alertActionCreator = (msg, alertType) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
  setTimeout(() => {
    return dispatch({ type: REMOVE_ALERT, payload: id });
  }, 3000);
};
