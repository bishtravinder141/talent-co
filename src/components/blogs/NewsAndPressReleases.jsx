import React from "react";
import { newsAndPressReleases } from "./constant";
import { Link } from "react-router-dom";

const NewsAndPressReleases = () => {
  return (
    <>
      {newsAndPressReleases.map((item, index) => (
        <div key={index} className="blog-releases">
          <div className="blog-releases-img ratio ratio-4x3">
            <img src={item.imageSrc} alt={`News & Press Release ${index}`} />
          </div>
          <div className="blog-releases-content">
            <h6>By {item.author}</h6>
            <h5>
              <Link to={item.link}>{item.title}</Link>
            </h5>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewsAndPressReleases;
