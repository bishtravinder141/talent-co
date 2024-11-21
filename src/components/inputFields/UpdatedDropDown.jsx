import React from "react";
import Select from "react-select";

const UpdatedDropDown = ({
  handleOnChange,
  placeholderText,
  icon,
  option,
  selectedValue,
  type,
  isSearchable = true,
}) => {
  const bgImg = () => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundImage: `url(${icon})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: icon ? 20 : 0,
      height: 10,
      width: 10,
    },
  });

  const inputBg = () => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundImage: `url(${icon})`,
      content: '" "',
      display: "block",
      marginRight: icon ? 8 : 0,
      height: "22px",
      width: "22px",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  });

  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      border: "none",
      height: "100%",
      boxShadow: "none",
    }),
    input: (styles) => ({ ...styles, ...inputBg() }),
    placeholder: (styles) => ({ ...styles, ...bgImg() }),
    singleValue: (styles, { data }) => ({ ...styles, ...bgImg(data.color) }),
  };

  return (
    <div className="fieldset">
      <Select
        className="form-control language-field worktimeSelection"
        onChange={(e) => handleOnChange(e, type)}
        options={option}
        styles={customStyles}
        placeholder={placeholderText}
        value={selectedValue}
        isSearchable={isSearchable}
      />
    </div>
  );
};

export default UpdatedDropDown;
