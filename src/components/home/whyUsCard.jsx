import React from "react";

const WhyUsCard = ({ imgSrc, title, description }) => {
  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="whyUs_col">
        <div className="why_icon">
          <img src={imgSrc} alt="Icon" />
        </div>
        <div className="why_content">
          <h6>{title}</h6>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default WhyUsCard;
