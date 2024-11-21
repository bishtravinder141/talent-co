import React from "react";
import { categoriesData } from "./constant";

const CategoryCard = () => {
  return (
    <section className="categories_sec">
      <div className="container">
        <div className="border-top py-100">
          <div className="row">
            <div className="col-12">
              <h2>Explore Climate, Nature and ESG job Categories.</h2>
              <p>Find out more about the employement Opportunities that each category offers</p>
            </div>
            {categoriesData.map((category) => (
              <div key={category.id} className="col-lg-3 col-md-6 col-6">
                <a href="#">
                  <div className="categories_col">
                    <div className="categories_icon">
                      <img src={category.iconSrc} alt={category.title} />
                    </div>
                    <h5>{category.title}</h5>
                  </div>
                </a>
              </div>
            ))}
            <div className="col-12 text-center mt-4">
              <a href="#" className="btn-design">
                Browse All Categories
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryCard;
