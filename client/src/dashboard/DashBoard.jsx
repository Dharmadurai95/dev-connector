import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getCurrentProfile,
  deleteAccound,
} from "../action-reducers/action/profileAction";
import Spinner from "../spinner/spinner";
import { Link } from "react-router-dom";
import DashBoardAction from "./DashBoardAction";
import Experince from "./Experince";
import Education from "./Education";

const DashBoard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccound,
  history,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <div>
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">Welcome {user && user.name}</p>
          {/* <DashBoardAction /> */}
          {profile !== null ? (
            <>
              <DashBoardAction />
              {profile.experience.length !== 0 && (
                <Experince experince={profile.experience} />
              )}
              {profile.education.length !== 0 && (
                <Education education={profile.education} />
              )}
              <div className="my-2">
                <button
                  className="btn btn-danger"
                  onClick={() => deleteAccound(history)}
                >
                  {" "}
                  <i className="fas fa-user-minus"></i> Delete Accound
                </button>
              </div>
            </>
          ) : (
            <>
              <p>You have not yet a status profile , please add some info</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
};

DashBoard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object,
  profile: PropTypes.object,
  deleteAccound: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};
export default connect(mapStateToProps, { getCurrentProfile, deleteAccound })(
  withRouter(DashBoard)
);
