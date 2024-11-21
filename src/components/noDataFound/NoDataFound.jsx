import React from "react";

const NoDataFound = ({ msg = "No Data Found" }) => {
  return <div className="d-flex">{msg}</div>;
};

export default NoDataFound;
