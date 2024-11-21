import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ imgURL, title, link, date, author }) => {
  return (
    <div className="col-md-4 col-12">
      <div className="blog-advice">
        <div className="blog-img ratio ratio-4x3">
          <img src={imgURL} alt={`Latest News `} />
        </div>
        {date && author && (
          <div className="postedby">
            <span>
              By<Link to="/">{author}</Link>
            </span>{" "}
            | <span>{date}</span>
          </div>
        )}
        <h5>
          <Link to={link}>{title}</Link>
        </h5>
      </div>
    </div>
  );
};

export default BlogCard;
