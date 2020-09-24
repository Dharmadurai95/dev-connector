import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreator from "../../action-reducers/action/alerAction";
import { authAction } from "../../action-reducers/action/auth";
import PropTypes from "prop-types";

const Register = (props) => {
  const [Register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  let { name, email, password, password2 } = Register;

  //getting from form feilds
  let onchange = (e) => {
    e.persist();
    setRegister({ ...Register, [e.target.name]: e.target.value });
  };

  //submit form DATA
  let onsubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      props.setAlert("Password missmatch", "danger");
    } else {
      let newUser = {
        name,
        email,
        password,
      };
      props.authentication(newUser);
    }
  };
  if (props.isAuthenticate) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onsubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            onChange={(e) => onchange(e)}
            value={name}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            value={email}
            onChange={(e) => onchange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={(e) => onchange(e)}
            value={password}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            onChange={(e) => onchange(e)}
            value={password2}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <NavLink to="/login">Sign In</NavLink>
      </p>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alert,
    isAuthenticate: state.auth.isAuthentication,
  };
};
const mapDispatchToprops = (dispatch) => {
  return {
    setAlert: (msg, type) =>
      dispatch(actionCreator.alertActionCreator(msg, type)),
    authentication: (newUser) => dispatch(authAction(newUser)),
  };
};
export default connect(mapStateToProps, mapDispatchToprops)(Register);
