import React from "react";
import { Link } from "react-router-dom";

const TopSection = ({ heading, subText }) => {
  return (
    <section className="hero py-100">
      <div className="container">
        <div className="row align-items-center flex-row-reverse">
          <div className="col-md-6 col-12">
            <div className="hero_img">
              <img src="./assets/images/hero-graphic.svg" />
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="hero_content">
              <h2>{heading}</h2>
              <p>{subText}</p>

              <Link to={"/register"} className="btn-design">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
