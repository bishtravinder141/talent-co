import React from "react";
import { Link } from "react-router-dom";

const EducationProvider = ({ name, link, courses, rating }) => {
  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="education_col">
        <div className="education_top">
          <div className="education_icon">
            <img src="assets/images/education_icon.svg" alt="Provider" />
          </div>
          <h5>{name}</h5>
          <Link to={link} className="arrow_right">
            <img src="./assets/images/arrow-right.svg" alt="Link ${index}" />
          </Link>
        </div>

        <div className="education_bottom">
          <div className="education_courses">
            <img src="./assets/images/courses_icon.svg" alt="Courses Icon" />{" "}
            {courses} courses
          </div>
          <div className="education_courses_rating">
            <img src="assets/images/star_icon.svg" alt="Rating Icon" /> {rating}{" "}
            rating
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationProvider;
