import React from "react";

export default function RatingInput({
    name,
    values,
    selectedValue,
    skillName,
    handleRatingChange,
  }) {
    return (
      <>
        <div className="give-rating">
          <span>{skillName}</span>
          <div className="rating-btn">
            {values.map((value, index) => (
              <div className="rateRadio" key={index}>
                {" "}
                <input
                  type="radio"
                  name={name}
                  aria-label={`${value}`}
                  value={value}
                  checked={value === selectedValue}
                  onChange={(event) =>
                    handleRatingChange(
                      event.target.name,
                      parseInt(event.target.value)
                    )
                  }
                />
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }