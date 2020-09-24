import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ setAlerts }) =>
  setAlerts !== null &&
  setAlerts.length > 0 &&
  setAlerts.map((alert) => {
    return (
      <div key={alert.id} className={`alert alert-${alert.alertType} `}>
        {alert.msg}
      </div>
    );
  });

Alert.propTypes = {
  setAlerts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
  return {
    setAlerts: state.alert,
  };
};
export default connect(mapStateToProps)(Alert);
