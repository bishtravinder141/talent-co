const DropdownField = ({
  label,
  option,
  icon,
  selected,
  handleOnChange,
  validation,
  disabledField = false,
  smallDropdown = false
}) => {
  return (
    <div className="fieldset">
      <select
        className={`form-control ${
          smallDropdown ? "bg-dark custom-select-bx text-white" : ""
        } ${icon ? "input-icon language-field" : ""}`}
        onChange={(e) => handleOnChange(e.target.value)}
        {...validation}
        value={selected}
        defaultValue={selected ? selected : ''}
        disabled={disabledField}
        aria-label={label}
      >
        {selected && (
          <option value={selected} disabled>
            {selected}
          </option>
        )}
        {option?.map((opt, i) => (
          <option value={opt?.value ? opt.value : opt} key={i}>
            {opt?.name ? opt?.name : opt}
          </option>
        ))}
      </select>
      {icon && (
        <span className="input-field-icon">
          <img src={icon} alt={label} />
        </span>
      )}
    </div>
  );
};

export default DropdownField;
