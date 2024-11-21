import React from "react";
import { latestNews } from "./constant";
import { Link } from "react-router-dom";

const LatestNews = () => {
  return (
    <>
      {latestNews.map((item, index) => (
        <div key={index} className="col-md-4 col-12">
          <div className="blog-advice">
            <div className="blog-img ratio ratio-4x3">
              <img src={item.imageSrc} alt={`Latest News ${index}`} />
            </div>
            <h5>
              <Link to={item.link}>{item.title}</Link>
            </h5>
          </div>
        </div>
      ))}
    </>
  );
};

export default LatestNews;
