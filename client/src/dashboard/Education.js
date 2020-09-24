import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../action-reducers/action/profileAction";

const Education = ({ education, deleteEducation }) => {
  const educate = education.map((edu) => {
    return (
      <tr key={edu._id}>
        <td className="sm-hide">{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment>-
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => deleteEducation(edu._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <>
      <h1 className="my-2">Education Credentials</h1>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="sm-hide">Degree</th>
            <th className="sm-hide">Year</th>
          </tr>
          <tr></tr>
        </thead>
        <tbody>{educate}</tbody>
      </table>
    </>
  );
};
Education.propTypes = {
  education: PropTypes.array,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
