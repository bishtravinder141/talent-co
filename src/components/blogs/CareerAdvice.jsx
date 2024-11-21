import React, { Fragment } from "react";
import { featuredCareerAdvice } from "./constant";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";

const CareerAdvice = () => {
  return (
    <>
      {featuredCareerAdvice.map((item, index) => (
        <Fragment key={index}>
          <BlogCard
            imgURL={item.imageSrc}
            title={item.title}
            link={item.link}
            date={item.date}
            author={item.author}
          />
        </Fragment>
      ))}
    </>
  );
};

export default CareerAdvice;
