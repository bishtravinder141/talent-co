import React from "react";
import { latestPressReleases } from "./constant";
import { Link } from "react-router-dom";

const LatestPressReleases = () => {
  return (
    <>
      {latestPressReleases.map((item, index) => (
        <div key={index} className="col-md-4 col-12">
          <div className="blog-advice">
            <div className="blog-img ratio ratio-4x3">
              <img src={item.imageSrc} alt={`Latest Press Release ${index}`} />
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

export default LatestPressReleases;
