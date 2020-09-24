import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

const ProfileAbout = ({
  profile: {
    skills,
    bio,
    user: { name },
  },
}) => {
  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <>
          <h2 className="text-primary">{name.trim().split(" ")[0]} Bio</h2>
          <p>{bio}</p>
          <div className="line"></div>
        </>
      )}
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills.map((skill) => {
          return (
            <div className="p-1" key={uuidv4()}>
              <i className="fa fa-check"></i>
              {skill}
            </div>
          );
        })}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
