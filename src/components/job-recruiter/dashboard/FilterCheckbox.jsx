import React from "react";

const FilterCheckbox = ({ handleChangeFilter, checked, title, id, type }) => {
  return (
    <div className="col-12">
      <div className="fieldset checkbox-set">
        <input
          type="checkbox"
          name="job-type"
          onChange={(e) => handleChangeFilter(e, id, type)}
          checked={checked}
        />
        <span>{title}</span>
      </div>
    </div>
  );
};

export default FilterCheckbox;
