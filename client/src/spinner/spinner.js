import React from "react";
import loading from "./loading.gif";

const Spinner = () => {
  return (
    <>
      <img
        src={loading}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="loading..."
      />
    </>
  );
};

export default Spinner;
