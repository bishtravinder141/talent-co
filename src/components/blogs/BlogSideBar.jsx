import React from "react";
import { sidebarItems } from "./constant";
import { Link } from "react-router-dom";

const BlogSideBar = () => {
  return (
    <>
      {sidebarItems.map((item, index) => (
        <div key={index} className={item.type}>
          {item.type === "ads" ? (
            <Link to={item.link}>
              <img src={item.imageSrc} alt={`Ads ${index}`} />
            </Link>
          ) : (
            <>
              <h5>
                <Link to={item.link}>{item.title}</Link>
              </h5>
              <div className="blog-img ratio ratio-4x3">
                <img src={item.imageSrc} alt={`Image ${index}`} />
              </div>
              <h5>
                <Link to={item.link}>{item.content}</Link>
              </h5>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default BlogSideBar;
