import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createOrUpdateProfile,
  getCurrentProfile,
} from "../action-reducers/action/profileAction";
import { Link, withRouter } from "react-router-dom";

const EditProfile = ({
  profile: { profile, loading },
  createOrUpdateProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setformData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    githubusername: "",
    facebook: "",
    youtube: "",
    linkedin: "",
  });

  const [ToggleSocialInput, setToggleSocialInput] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    facebook,
    youtube,
    linkedin,
  } = formData;

  useEffect(() => {
    getCurrentProfile();

    setformData({
      company: loading && !profile.company ? "" : profile.company,
      website: loading && !profile.website ? "" : profile.website,
      location: loading && !profile.location ? "" : profile.location,
      status: loading && !profile.status ? "" : profile.status,
      skills: loading && !profile.skills ? "" : profile.skills.join(","),
      bio: loading && !profile.bio ? "" : profile.bio,
      githubusername:
        loading && !profile.githubusername ? "" : profile.githubusername,
      facebook:
        loading && !profile.social.facebook ? "" : profile.social.facebook,
      youtube: loading && !profile.social.youtube ? "" : profile.social.youtube,
      linkedin:
        loading && !profile.social.linkedin ? "" : profile.social.linkedin,
    });
  }, [getCurrentProfile]);

  const onchange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    let edit = true;
    createOrUpdateProfile(formData, history, edit);
  };
  return (
    <div>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>

      <form className="form" onSubmit={(e) => onsubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onchange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => onchange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onchange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onchange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={(e) => onchange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onchange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onchange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            class="btn btn-light"
            onClick={(e) => setToggleSocialInput(!ToggleSocialInput)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {ToggleSocialInput && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onchange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onchange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onchange(e)}
              />
            </div>
          </>
        )}

        <input type="submit" class="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  createOrUpdateProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};
export default connect(mapStateToProps, {
  createOrUpdateProfile,
  getCurrentProfile,
})(withRouter(EditProfile));
