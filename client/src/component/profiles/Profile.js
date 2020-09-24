import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Profile = ({
  profile: {
    user: { _id, avatar, name },
    location,
    skills,
    company,
    status,
  },
}) => {
  return (
    <>
      <div className="profile bg-light">
        <img src={avatar} alt="User Profile" className="round-img" />
        <div>
          <h2>{name}</h2>
          <p>
            {status}
            {company && <span>at {company}</span>}
          </p>
          <p className="my-1">{location && <span>{location}</span>}</p>
          <Link to={`/profile/${_id}`} className="btn btn-primary">
            View profile
          </Link>
        </div>
        <ul>
          {skills.slice(0, 4).map((skill) => {
            return (
              <li className="text-primary" key={skill._id}>
                <i className="fas fa-check"></i>
                {skill}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

Profile.propTypes = { profile: PropTypes.object.isRequired };

export default Profile;
