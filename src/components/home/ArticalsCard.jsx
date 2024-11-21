import React from "react";
import { Link } from "react-router-dom";

const ArticalsCard = ({ title, description, link, imgSrc }) => {
  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="news_col">
        <div className="post_img ratio ratio-4x3">
          <img src={imgSrc} alt={`News Articals`} />
        </div>
        <div className="post_content">
          <h5>{title}</h5>
          <p>{description}</p>
          <Link to={link} className="btn-border">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticalsCard;
