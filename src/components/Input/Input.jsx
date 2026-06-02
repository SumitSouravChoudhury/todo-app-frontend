import "./input.scss";

const Input = ({
  label,
  id,
  type = "text",
  placeholder = "",
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  className = "",
  ...rest
}) => {
  return (
    <div className={`inputField${className ? ` ${className}` : ""}`}>
      {label && (
        <label htmlFor={id} className="inputField__label">
          {label}
          {required && <span className="inputField__required">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        className={`inputField__input${error ? " inputField__input--error" : ""}`}
        {...rest}
      />
      {error && <span className="inputField__error">{error}</span>}
    </div>
  );
};

export default Input;
