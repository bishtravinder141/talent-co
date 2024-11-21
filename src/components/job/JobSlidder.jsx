import React from "react";
import { slideItems } from "./constant";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const JobSlidder = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: false, // Remove the previous arrow
    nextArrow: false, // Remove the next arrow
  };
  return (
    <section className="single-slide-section slider-common blue-shape-bg py-100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="single-slide-slider text-center">
              <Slider {...settings}>
                {slideItems.map((item, index) => (
                  <div key={index} className="slide-items">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <div className="slide-btn">
                      <Link
                        to={"/register"}
                        className="btn-design btn-yellow"
                      >
                        Sign Up
                      </Link>
                      <Link
                        to={"/register"}
                        className="btn-design btn-white"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSlidder;
