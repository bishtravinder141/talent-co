import phoneIcon from "../../assets/images/phone-icon.svg";

const NumberField = ({validation}) => {
  return (
    <div className="fieldset">
      <input
        type="text"
        placeholder="Phone number"
        className="phone-number form-control input-icon"
        {...validation}
      />
      <span className="input-field-icon">
        <img src={phoneIcon} />
      </span>
    </div>
  );
};

export default NumberField;
