import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logOutAction } from "../action-reducers/action/auth";

const Navbar = (props) => {
  const { authState, logOut } = props;
  const isAuthRoute = (
    <ul>
      <li>
        <NavLink to="/profiles">Developers</NavLink>
      </li>
      <li>
        <NavLink to="/posts">Posts</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">
          {""}
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink onClick={logOut} to="/">
          {""}
          <i className="fas fa-sign-out-alt"></i>
          {""}
          <span className="hide-sm">Logout</span>
        </NavLink>
      </li>
    </ul>
  );
  const guestRoute = (
    <ul>
      <li>
        <NavLink to="/profiles">Developers</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  );
  return (
    <>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/" exact>
            <i className="fas fa-code"></i> DevConnector
          </Link>
        </h1>
        {!authState.loading && (
          <>{authState.isAuthentication ? isAuthRoute : guestRoute}</>
        )}
      </nav>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authState: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
