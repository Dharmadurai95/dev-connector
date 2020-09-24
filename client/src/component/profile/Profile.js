import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../action-reducers/action/profileAction";
import Spinner from "../../spinner/spinner";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperince from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithubRepos from "./ProfileGithubRepo";
const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);
  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" exact className="btn btn-light">
            Back To Proifile
          </Link>
          {auth.isAuthentication &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-primary">
                Edit Profile
              </Link>
            )}

          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map((experience) => {
                    return (
                      <ProfileExperince
                        key={experience._id}
                        experience={experience}
                      />
                    );
                  })}
                </>
              ) : (
                <h3 className="lead">No Experience Credentials</h3>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 Name="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((education) => {
                    return (
                      <ProfileEducation
                        key={education._id}
                        education={education}
                      />
                    );
                  })}
                </>
              ) : (
                <h3>No Education Credentials</h3>
              )}
            </div>
            {/* {profile.githubusername && (
              <ProfileGithubRepos githubusername={profile.githubusername} />
            )} */}
          </div>
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStatToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth,
  };
};

export default connect(mapStatToProps, { getProfileById })(Profile);
