import ErrorMessage from "../errorMsg/ErrorMessage";

const InputFieldTime = ({ disableField=false, min, validation, max }) => {
  return (
    <>
      <input className='form-control' type="time" disabled={disableField} min={min} {...validation} max={max} />
    </>
  );
};

export default InputFieldTime;
