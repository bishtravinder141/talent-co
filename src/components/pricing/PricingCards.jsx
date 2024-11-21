import React from "react";
import { Link } from "react-router-dom";

const PricingCards = ({ avaliablePlans }) => {
  return (
    <div className="row mt-5 pt-5">
      {Array.isArray(avaliablePlans) &&
        avaliablePlans.length > 0 &&
        avaliablePlans.map((plan, index) => {
          if (index === 1) {
            return (
              <div key={index} className="col-md-4 col-12">
                <div className="pricing-col recommended-col">
                  <div className="recommended">Recommended</div>
                  <h3>{plan?.name}</h3>
                  <p>{plan?.description}</p>
                  <div className="pricing-price">
                    <sup>$</sup> {plan.plan_price} <span>/ month</span>
                  </div>
                  <Link to={"/payment-gateway"} className="btn-design">
                    Get Started
                  </Link>
                </div>
              </div>
            );
          }

          return (
            <div key={index} className="col-md-4 col-12">
              <div className="pricing-col">
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
                <div className="pricing-price">
                  {" "}
                  <sup>$</sup>
                  {plan.plan_price} <span>/ month</span>{" "}
                </div>
                <Link to={"/payment-gateway"} className="btn-design border-btn">
                  Get Started
                </Link>
              </div>
            </div>
          );
        })}
      {/* <div className="col-12 text-center mt-5">
        <Link to="/register" className="btn-design">
          Get Started
        </Link>
      </div> */}
    </div>
  );
};

export default PricingCards;
