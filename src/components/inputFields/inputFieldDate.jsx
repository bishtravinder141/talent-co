import React from "react";

const InputFieldDate = ({ disableField=false, min, validation, max }) => {
  return (
    <input className='form-control' type="date" disabled={disableField} min={min} {...validation} max={max} />
  );
};

export default InputFieldDate;
