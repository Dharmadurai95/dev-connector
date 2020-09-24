import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { educationAdd } from "../action-reducers/action/profileAction";
import { Link, withRouter } from "react-router-dom";

const AddEducation = ({ educationAdd, history }) => {
  const [formData, setformData] = useState({
    school: "",
    degree: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [togledisabled, settogledisabled] = useState(false);
  const { school, degree, from, to, current, description } = formData;
  const onchange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    educationAdd(formData, history);
  };
  return (
    <>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onsubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School"
            name="school"
            required
            value={school}
            onChange={(e) => onchange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree"
            name="degree"
            required
            value={degree}
            onChange={(e) => onchange(e)}
          />
        </div>
        <div className="form-group"></div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onchange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={(e) => {
                setformData({ ...formData, current: !current });
                settogledisabled(!togledisabled);
              }}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            disabled={togledisabled ? "disabled" : ""}
            value={to}
            onChange={(e) => onchange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Programme Description"
            value={description}
            onChange={(e) => onchange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};
AddEducation.propTypes = {
  educationAdd: PropTypes.func.isRequired,
};
export default connect(null, { educationAdd })(withRouter(AddEducation));
