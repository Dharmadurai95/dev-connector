import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ExperinceAdd } from "../action-reducers/action/profileAction";
import { Link, withRouter } from "react-router-dom";

const AddExperince = ({ ExperinceAdd, history }) => {
  const [formData, setformData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [togledisabled, settogledisabled] = useState(false);
  const { title, company, location, from, to, current, description } = formData;
  const onchange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    ExperinceAdd(formData, history);
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
            placeholder="* Job Title"
            name="title"
            required
            value={title}
            onChange={(e) => onchange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            required
            value={company}
            onChange={(e) => onchange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onchange(e)}
          />
        </div>
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
            placeholder="Job Description"
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
AddExperince.propTypes = {
  ExperinceAdd: PropTypes.func.isRequired,
};
export default connect(null, { ExperinceAdd })(withRouter(AddExperince));
