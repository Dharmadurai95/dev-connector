import React, { useState } from "react";
import { loginAction } from "../../action-reducers/action/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink, Redirect } from "react-router-dom";

const Login = ({ loginUser, isAuthenticate }) => {
  const [login, setlogin] = useState({ email: "", password: "" });
  const onchange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    const { email, password } = login;
    loginUser(email, password);
  };
  // redirect dash board
  if (isAuthenticate) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={(e) => onsubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            onChange={(e) => onchange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => onchange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <NavLink to={"/register"}>Sign Up</NavLink>
      </p>
    </>
  );
};

Login.propTypes = {
  loginAction: PropTypes.func,
  isAuthenticate: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticate: state.auth.isAuthentication,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) => dispatch(loginAction(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
