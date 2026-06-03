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
  rightIcon,
  onRightIconClick,
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
      <div className="inputField__wrapper">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={`inputField__input${rightIcon ? " inputField__input--withIcon" : ""}${error ? " inputField__input--error" : ""}`}
          {...rest}
        />
        {rightIcon && (
          <img
            src={rightIcon}
            alt="input-icon"
            className={`inputField__rightIcon${onRightIconClick ? " inputField__rightIcon--clickable" : ""}`}
            onClick={onRightIconClick}
          />
        )}
      </div>
      {error && <span className="inputField__error">{error}</span>}
    </div>
  );
};

export default Input;
