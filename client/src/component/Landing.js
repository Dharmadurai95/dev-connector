import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuth }) => {
  if (isAuth.isAuthentication) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      {Landing}
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Developer Connector</h1>
            <p className="lead">
              Create a developer profile/portfolio, share posts and get help
              from other developers
            </p>
            <div className="buttons">
              <NavLink to="/register" className="btn btn-primary">
                Sign Up
              </NavLink>
              <NavLink to="/login" className="btn btn-light">
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Landing.propTypes = {
  isAuth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { isAuth: state.auth };
};
export default connect(mapStateToProps)(Landing);
