import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ link, title, imgSrc }) => {
  return (
    <div className="col-lg-4 col-md-6 col-12">
      <Link to={link}>
        <div className="courses_col">
          <div className="courses_icon">
            <img src={imgSrc} alt="Course" />
          </div>
          <p>{title}</p>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
