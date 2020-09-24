import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { current, from, to, degree, description, school },
}) => {
  return (
    <div>
      <h3 className="text-dark">{school && <span>{school}</span>}</h3>
      <p>
        <Moment format={"YYYY/MM/DD"}>{from}</Moment> -{" "}
        {current ? <span>Now</span> : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
