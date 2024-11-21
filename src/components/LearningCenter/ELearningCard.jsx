import React from "react";

const ELearningCard = ({ imgSrc, title, description }) => {
  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="e-learning_col">
        <div className="e-learning_img ratio ratio-1x1">
          <img src={imgSrc} alt="E-Learning" />
        </div>
        <div className="e-learning_content">
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ELearningCard;
