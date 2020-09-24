import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperiece } from "../action-reducers/action/profileAction";
const Experince = ({ experince, deleteExperiece }) => {
  const experi = experince.map((exp) => {
    return (
      <tr key={exp._id}>
        <td className="sm-hide">{exp.title}</td>
        <td>{exp.company}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment>-
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => deleteExperiece(exp._id)}
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
      <h1 className="my-2">Experince Credentials</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="sm-hide">Company</th>
            <th className="sm-hide">Year</th>
          </tr>
          <tr></tr>
        </thead>
        <tbody>{experi}</tbody>
      </table>
    </>
  );
};
Experince.propTypes = {
  experince: PropTypes.array,
  deleteExperiece: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperiece })(Experince);
