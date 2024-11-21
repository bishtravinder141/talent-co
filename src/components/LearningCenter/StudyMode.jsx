import React from "react";

const StudyMode = ({ number, title, description }) => {
  return (
    <div className="study-mode-col">
      <div className="mode-counter">{number}</div>
      <div className="study-mode-content">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default StudyMode;
