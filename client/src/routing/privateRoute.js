import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  isAuth: { isAuthentication, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthentication || loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
