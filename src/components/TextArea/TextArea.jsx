import "./textArea.scss";

const TextArea = ({
  label,
  id,
  placeholder = "",
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  rows = 4,
  resize = "vertical",
  className = "",
  ...rest
}) => {
  return (
    <div className={`textAreaField${className ? ` ${className}` : ""}`}>
      {label && (
        <label htmlFor={id} className="textAreaField__label">
          {label}
          {required && <span className="textAreaField__required">*</span>}
        </label>
      )}
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`textAreaField__textarea${error ? " textAreaField__textarea--error" : ""}`}
        style={{ resize }}
        {...rest}
      />
      {error && <span className="textAreaField__error">{error}</span>}
    </div>
  );
};

export default TextArea;
