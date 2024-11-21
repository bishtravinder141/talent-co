const DropdownFieldCommon = ({
  name,
  option,
  icon,
  selected,
  handleOnChange,
  validation,
  disabledField = false,
}) => {
  return (
    <div className="fieldset">
      <select
        aria-label={name}
        name={name}
        value={selected} // Use the value prop to control the selected option
        defaultValue={selected}
        className={`form-control ${icon ? 'input-icon language-field' : ''}`}
        onChange={(e) => handleOnChange(e)}
        {...validation}
        disabled={disabledField}
      >
        <option value={selected} disabled>
          {selected}
        </option>
        {option?.map((opt, i) => (
          <option value={opt} key={i}>
            {opt}
          </option>
        ))}
      </select>
      {icon && (
        <span className="input-field-icon">
          <img src={icon} alt={name} />
        </span>
      )}
    </div>
  );
};

export default DropdownFieldCommon;
