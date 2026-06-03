import "./toast.scss";

const ICONS = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

const Toast = ({ toasts, onRemove }) => {
  if (!toasts.length) return null;

  return (
    <div className="toastWrapper">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.type}`}>
          <span className="toast__icon">{ICONS[toast.type]}</span>
          <p className="toast__message">{toast.message}</p>
          <button className="toast__close" onClick={() => onRemove(toast.id)}>
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
