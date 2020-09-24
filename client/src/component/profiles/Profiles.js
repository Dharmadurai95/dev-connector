import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../spinner/spinner";
import { getAllProfiles } from "../../action-reducers/action/profileAction";
import Profile from "./Profile";
const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary ">Developers </h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i>
            Browse and connect with developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((singleProfile) => {
                return (
                  <Profile key={singleProfile._id} profile={singleProfile} />
                );
              })
            ) : (
              <h4>No profiles Found...</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};
export default connect(mapStateToProps, { getAllProfiles })(Profiles);
