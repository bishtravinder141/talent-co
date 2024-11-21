import React from "react";

const FilterTabs = ({
  handleClickTab,
  showCount = false,
  count,
  title,
  active,
}) => {
  return (
    <>
      {title && (
        <li className="nav-item" role="presentation">
          <button
            className={`${active ? "active" : ""} nav-link`}
            type="button"
            role="tab"
            aria-controls="applied"
            aria-selected="true"
            onClick={handleClickTab}
          >
            {title}{" "}
            {showCount && (
              <span className="applications-counnter">{count}</span>
            )}
          </button>
        </li>
      )}
    </>
  );
};

export default FilterTabs;
