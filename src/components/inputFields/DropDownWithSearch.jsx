import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const DropDownWithSearch = ({
  selectedValue,
  searchBy,
  placeholder,
  icon,
  setProfileDetails,
  profileDetails,
  setSelectedValue,
  field,
  list,
  isMulti = true,
  validation
}) => {
  const NoOptionsMessage = () => {
    return (
      <p style={{ textAlign: "center", marginTop: "4px", color: "#b2afaf" }}>
        No Result Found
      </p>
    );
  };
  return (
    <>
      <Select
        closeMenuOnSelect={!isMulti}
        value={selectedValue}
        components={{ animatedComponents, NoOptionsMessage }}
        isMulti={isMulti}
        isSearchable
        options={list}
        className={`${!icon ? 'no-icon': ''} form-control input-icon pin-field`}
        placeholder={placeholder}
        styles={{
          control: (provided, state) => ({
            ...provided,
            width: "100%", // Set the desired width
            height: "100%", // Set the desired height
          }),
        }}
        onChange={(option) => setSelectedValue(option, field)}
        {...validation}
      />
      {icon && (
        <span className="input-field-icon">
          <img src={icon} />
        </span>
      )}
    </>
  );
};

export default DropDownWithSearch;
