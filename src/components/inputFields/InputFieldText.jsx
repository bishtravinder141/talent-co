import ErrorMessage from "../errorMsg/ErrorMessage";

const NameInputText = ({placeholder, icon, value, handleChange, validation, error}) => {
  return (
    <>
    <div className="fieldset">
      <input
        type="text"
        placeholder={placeholder}
        className="form-control input-icon user-field"
        {...validation}
      />
      <span className="input-field-icon">
        <img src={icon} />
      </span>
    </div>
    {error && <ErrorMessage msg={error} />}
    </>
  );
};

export default NameInputText;
