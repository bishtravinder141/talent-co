import React from "react";
import { PLANS } from "../../pages/job/settings/constant";

const PlansCard = ({ plan,handleUpgrade }) => {
  return (
    <div className="col-md-4 col-12">
      <div className={`pricing-col ${plan.plan_selected ? "selected-plans" : ""}`}>
        <h3 className="text-capitalize">{plan.name}</h3>
        <p>{plan.plan_description}</p>
        <div className="pricing-price">
          {plan.plan_name === "free" ? (
            "Free"
          ) : (
            <>
              <sup>$</sup>{" "}
              {/* {plansPer === PLANS.MONTHLY
                ? plan.monthly_price
                : plan.yearly_plan_price}{" "} */}
              {/* <span className="text-capitalize">/ {plansPer}</span> */}
              {plan?.plan_price}
            </>
          )}
        </div>
        <div className="description text-capitalize">
          <p>{plan?.description}</p>
        </div>
        <button
          type="button"
          className={`btn-design ${plan.plan_selected ? "border-btn" : ""}`}
          data-bs-toggle="modal"
          data-bs-target="#experiencePopup"
          disabled = {plan?.plan_selected}
          onClick={()=>{handleUpgrade(plan)}}
        >
          {plan.plan_selected ? "Selected" : "Upgrade"}
        </button>
      </div>
    </div>
  );
};

export default PlansCard;
