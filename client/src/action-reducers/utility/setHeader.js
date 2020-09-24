import axios from "axios";

const setAuthTokeHeaders = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthTokeHeaders;
